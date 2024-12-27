import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';
import { FirestoreService } from './firestore';
import { generateRefCodes } from '@/utils/generateRefCode';
import { MembershipType, UserProfile, Membership, MembershipStatus } from '@/types/user';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { db } from '@/config/firebase';

export type UserData = UserProfile;

export interface CreateUserData {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  membership?: Membership;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
}

export class UserService {
  static async saveUserToFirestore(user: FirebaseAuthTypes.User, displayName?: string) {
    try {
      console.log('Saving user to Firestore:', user.uid);
      const existingUser = await FirestoreService.getDoc<UserData>('users', user.uid);

      if (existingUser) {
        console.log('User already exists');
        return existingUser;
      }

      const now = firestore.Timestamp.now();

      const defaultMembership: Membership = {
        type: 'free',
        startDate: now,
        endDate: null,
        lastUpdated: now,
        identifier: 'free',
      };

      const refCode = generateRefCodes(user.uid);

      const userData: UserData = {
        uid: user.uid,
        email: user.email,
        displayName: displayName || user.displayName || 'Anonymous User',
        photoURL: user.photoURL,
        membership: defaultMembership,
        refCodes: {
          en: refCode.en,
        },
        createdAt: now,
        updatedAt: now,
        zodiacSign: null,
      };

      const refCodeData = {
        userId: user.uid,
        createdAt: now,
        updatedAt: now,
        language: 'en' as const,
      };

      const batch = firestore().batch();

      const userRef = firestore().collection('users').doc(user.uid);
      const refCodeRef = firestore().collection('refCodes').doc(refCode.en);

      batch.set(userRef, userData);
      batch.set(refCodeRef, refCodeData);

      await user.updateProfile({
        displayName: displayName || user.displayName || 'Anonymous User',
      });

      await batch.commit();
      console.log('User and refCode data saved successfully');

      return userData;
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
      const updateData = {
        ...data,
        updatedAt: firestore.Timestamp.now(),
      };
      await FirestoreService.updateDoc('users', uid, updateData);
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  }
}

export async function createUser(data: CreateUserData): Promise<void> {
  const defaultMembership: Membership = {
    type: 'free',
    startDate: FirebaseFirestoreTypes.Timestamp.now(),
    endDate: null,
    lastUpdated: FirebaseFirestoreTypes.Timestamp.now(),
    identifier: 'free',
  };

  const userData: CreateUserData = {
    ...data,
    membership: data.membership || defaultMembership,
    createdAt: FirebaseFirestoreTypes.Timestamp.now(),
    updatedAt: FirebaseFirestoreTypes.Timestamp.now(),
  };

  await FirestoreService.setDoc('users', data.uid, userData);
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

export async function updateUserMembership(
  userId: string,
  membershipType: MembershipType
): Promise<void> {
  const now = FirebaseFirestoreTypes.Timestamp.now();
  let endDate: FirebaseFirestoreTypes.Timestamp | null = null;

  const membershipData = {
    'membership.type': membershipType,
    'membership.startDate': now,
    'membership.endDate': endDate,
    'membership.lastUpdated': now,
    updatedAt: now,
  };

  await FirestoreService.updateDoc('users', userId, membershipData);
}

export async function checkMembershipStatus(userId: string): Promise<MembershipStatus> {
  const userData = await FirestoreService.getDoc<UserData>('users', userId);

  if (!userData) {
    return {
      isActive: false,
      type: 'free',
      expiresAt: null,
    };
  }

  const { membership } = userData;
  const now = FirebaseFirestoreTypes.Timestamp.now();

  // Free üyelik her zaman aktif
  if (membership?.type === 'free') {
    return {
      isActive: true,
      type: 'free',
      expiresAt: null,
    };
  }

  // Ücretli üyeliklerin süre kontrolü
  if (membership?.endDate) {
    const isActive = now.toMillis() <= membership.endDate.toMillis();
    return {
      isActive,
      type: membership.type,
      expiresAt: membership.endDate.toDate(),
    };
  }

  return {
    isActive: false,
    type: membership?.type || 'free',
    expiresAt: null,
  };
}
