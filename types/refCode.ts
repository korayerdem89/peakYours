import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface RefCode {
  code: string;
  userId: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  language: string;
}
