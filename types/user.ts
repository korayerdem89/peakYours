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
  refCodes?: {
    en: string;
  };
  traits?: {
    [key: string]: number; // Her bir trait için sayısal değer
  };
}

export type AuthUser = Pick<
  UserData,
  'uid' | 'email' | 'displayName' | 'photoURL' | 'zodiacSign' | 'refCodes' | 'traits'
>;

export type BasicUserInfo = Pick<UserData, 'uid' | 'email' | 'displayName' | 'photoURL'>;

export type ZodiacUpdateData = Partial<Pick<UserData, 'zodiacSign'>>;

export interface Trait {
  trait: string;
  points: number;
}

export interface TraitAverage {
  trait: string;
  averagePoints: number;
}

export interface UserTraits {
  [key: string]: number;
}
