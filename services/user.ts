import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { FirestoreService } from './firestore';

// User veri tipi tanımı
interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  lastLoginAt: FirebaseFirestoreTypes.FieldValue | null;
  createdAt: FirebaseFirestoreTypes.FieldValue | null;
  zodiacSign?: string | null;
  updatedAt?: FirebaseFirestoreTypes.FieldValue;
}

export class UserService {
  static async saveUserToFirestore(user: FirebaseAuthTypes.User) {
    try {
      const userData: Omit<UserData, 'lastLoginAt' | 'createdAt'> & {
        lastLoginAt: FirebaseFirestoreTypes.FieldValue;
        createdAt: FirebaseFirestoreTypes.FieldValue;
      } = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        lastLoginAt: firestore.FieldValue.serverTimestamp(),
        createdAt: firestore.FieldValue.serverTimestamp(),
      };

      await FirestoreService.setDoc('users', user.uid, userData, { merge: true });
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
