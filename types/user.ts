import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  lastLoginAt: FirebaseFirestoreTypes.FieldValue | null;
  createdAt: FirebaseFirestoreTypes.FieldValue | null;
  zodiacSign?: string | null;
  updatedAt?: FirebaseFirestoreTypes.FieldValue;
}

export type AuthUser = Pick<UserData, 'uid' | 'email' | 'displayName' | 'photoURL' | 'zodiacSign'>;

export type BasicUserInfo = Pick<UserData, 'uid' | 'email' | 'displayName' | 'photoURL'>;

export type ZodiacUpdateData = Partial<Pick<UserData, 'zodiacSign'>>;