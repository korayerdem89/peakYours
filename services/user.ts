import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { FirestoreService } from './firestore';
import { generateRefCodes } from '@/utils/generateRefCode';

export interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  lastLoginAt: FirebaseFirestoreTypes.FieldValue | null;
  createdAt: FirebaseFirestoreTypes.FieldValue | null;
  zodiacSign?: string | null;
  updatedAt?: FirebaseFirestoreTypes.FieldValue;
  refCodes?: {
    en: string;
  };
  traits?: {
    [key: string]: number; // Her bir trait için sayısal değer
  };
}

export class UserService {
  static async saveUserToFirestore(user: FirebaseAuthTypes.User) {
    try {
      console.log('Saving user to Firestore:', user.uid);

      // Önce kullanıcının mevcut dökümanını kontrol et
      const existingUser = await FirestoreService.getDoc<UserData>('users', user.uid);

      // Eğer kullanıcının zaten ref kodları varsa, onları kullan
      if (existingUser?.refCodes) {
        console.log('User already has ref codes:', existingUser.refCodes);

        // User dökümanını güncelle
        const userData: Partial<UserData> = {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          lastLoginAt: firestore.FieldValue.serverTimestamp(),
          updatedAt: firestore.FieldValue.serverTimestamp(),
        };

        await FirestoreService.updateDoc('users', user.uid, userData);
        console.log('User data updated successfully');
        return;
      }

      // Ref kodu yoksa yeni oluştur
      const refCodes = generateRefCodes(user.uid);
      console.log('Generated new ref codes:', refCodes);

      // Batch işlemi başlat
      const batch = firestore().batch();

      // İngilizce ref code dökümanı
      const enRefDoc = firestore().collection('refCodes').doc(refCodes.en);
      const enData = {
        userId: user.uid,
        code: refCodes.en,
        language: 'en',
        createdAt: firestore.FieldValue.serverTimestamp(),
      };
      batch.set(enRefDoc, enData);
      console.log('Adding EN ref code:', enData);

      // User dökümanını oluştur
      const userData: UserData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        lastLoginAt: firestore.FieldValue.serverTimestamp(),
        createdAt: firestore.FieldValue.serverTimestamp(),
        refCodes,
        traits: {}, // Boş traits objesi ile başlat
      };

      const userDoc = firestore().collection('users').doc(user.uid);
      batch.set(userDoc, userData, { merge: true });

      try {
        // Batch işlemini commit et
        await batch.commit();
        console.log('Batch commit successful');
      } catch (batchError) {
        console.error('Batch commit error:', batchError);
        throw batchError;
      }
    } catch (error) {
      console.error('Save user error:', error);
      throw error;
    }
  }

  static async getUser(uid: string): Promise<UserData | null> {
    return await FirestoreService.getDoc<UserData>('users', uid);
  }

  static async updateUser(uid: string, data: Partial<UserData>): Promise<void> {
    try {
      await FirestoreService.updateDoc('users', uid, {
        ...data,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  }
}
