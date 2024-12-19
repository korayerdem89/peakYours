import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { db } from '@/config/firebase';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { FirestoreService } from './firestore';
import { generateRefCodes } from '@/utils/generateRefCode';

export type MembershipType = 'free' | 'monthly' | 'annual';

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
  lastTasksDates?: {
    [trait: string]: string; // { "empathic": "2024-03-20", "reliable": "2024-03-20" }
  };
  membership: {
    type: MembershipType;
    startDate: FirebaseFirestoreTypes.Timestamp;
    endDate: FirebaseFirestoreTypes.Timestamp | null;
    lastUpdated: FirebaseFirestoreTypes.Timestamp;
  };
}

export interface CreateUserData {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  membership?: {
    type: MembershipType;
    startDate: FirebaseFirestoreTypes.Timestamp;
    endDate: FirebaseFirestoreTypes.Timestamp | null;
    lastUpdated: FirebaseFirestoreTypes.Timestamp;
  };
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
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
        membership: {
          type: 'free' as MembershipType,
          startDate: FirebaseFirestoreTypes.Timestamp.now(),
          endDate: null,
          lastUpdated: FirebaseFirestoreTypes.Timestamp.now(),
        },
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

// Günlük task kontrolü için yardımcı fonksiyon
export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

// Task trait tarihini güncelle
export async function updateUserTaskDate(userId: string, trait: string, date: string) {
  try {
    await db
      .collection('users')
      .doc(userId)
      .update({
        [`lastTasksDates.${trait}`]: date,
      });
  } catch (error) {
    console.error('Error updating task date:', error);
    throw error;
  }
}

export async function createUser(data: CreateUserData): Promise<void> {
  const defaultMembership = {
    type: 'free' as MembershipType,
    startDate: FirebaseFirestoreTypes.Timestamp.now(),
    endDate: null,
    lastUpdated: FirebaseFirestoreTypes.Timestamp.now(),
  };

  const userData: CreateUserData = {
    ...data,
    membership: data.membership || defaultMembership,
    createdAt: FirebaseFirestoreTypes.Timestamp.now(),
    updatedAt: FirebaseFirestoreTypes.Timestamp.now(),
  };

  await FirestoreService.setDoc('users', data.uid, userData);
}

export async function updateUserMembership(
  userId: string,
  membershipType: MembershipType
): Promise<void> {
  const now = FirebaseFirestoreTypes.Timestamp.now();
  let endDate: FirebaseFirestoreTypes.Timestamp | null = null;

  // Üyelik bitiş tarihini hesapla
  if (membershipType === 'monthly') {
    const endDateTime = new Date(now.toDate());
    endDateTime.setMonth(endDateTime.getMonth() + 1);
    endDate = FirebaseFirestoreTypes.Timestamp.fromDate(endDateTime);
  } else if (membershipType === 'annual') {
    const endDateTime = new Date(now.toDate());
    endDateTime.setFullYear(endDateTime.getFullYear() + 1);
    endDate = FirebaseFirestoreTypes.Timestamp.fromDate(endDateTime);
  }

  const membershipData = {
    'membership.type': membershipType,
    'membership.startDate': now,
    'membership.endDate': endDate,
    'membership.lastUpdated': now,
    updatedAt: now,
  };

  await FirestoreService.updateDoc('users', userId, membershipData);
}

export async function checkMembershipStatus(userId: string): Promise<boolean> {
  const userData = await FirestoreService.getDoc<UserData>('users', userId);

  if (!userData) return false;

  const { membership } = userData;
  const now = FirebaseFirestoreTypes.Timestamp.now();

  // Free üyelik her zaman aktif
  if (membership.type === 'free') return true;

  // Ücretli üyeliklerin süre kontrolü
  if (membership.endDate) {
    return now.toMillis() <= membership.endDate.toMillis();
  }

  return false;
}
