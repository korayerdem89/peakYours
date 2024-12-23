import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type MembershipType = 'free' | 'pro';

export interface Membership {
  type: MembershipType;
  startDate: FirebaseFirestoreTypes.Timestamp;
  endDate: FirebaseFirestoreTypes.Timestamp | null;
  lastUpdated: FirebaseFirestoreTypes.Timestamp;
  identifier: string;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  zodiacSign?: string | null;
  membership?: Membership;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
}

export interface UserProfile extends User {
  refCodes?: {
    en: string;
  };
  traits?: {
    [key: string]: number;
  };
  lastTasksDates?: {
    [trait: string]: string;
  };
}

export interface UpdateUserPayload {
  userId: string;
  data: Partial<UserProfile>;
}

export interface MembershipUpdatePayload {
  userId: string;
  membershipType: MembershipType;
}

export interface MembershipStatus {
  isActive: boolean;
  type: MembershipType;
  expiresAt: Date | null;
}

export interface UserTraits {
  [key: string]: number;
}

export interface TraitAverage {
  trait: string;
  averagePoints: number;
  totalRatings: number;
}
