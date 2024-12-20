import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

// Kişilik özellikleri için tip tanımlamaları
export interface TraitRating {
  name: string;
  points: number;
}

// Ortalama puanlar için tip tanımlaması
export interface TraitAverages {
  trait: string;
  averagePoints: number;
  totalRatings: number;
}

// Rating verisi için tip tanımlaması
export interface RatingData {
  traits: TraitRating[];
  ratedBy: string;
  displayName: string;
  createdAt: FirebaseFirestoreTypes.FieldValue;
  updatedAt: FirebaseFirestoreTypes.FieldValue;
}

export interface UserRating {
  userId: string;
  traits: TraitRating[];
  ratedAt: string;
  displayName: string;
}

export interface TraitDetails {
  totalRaters: number;
  userRatings: UserRating[];
}
