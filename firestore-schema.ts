/**
 * Firestore Database Schema
 *
 * This file serves as a reference for the Firestore database structure.
 * It shows the complete schema of collections and documents.
 */

import { Timestamp } from '@react-native-firebase/firestore';

interface FirestoreSchema {
  users: {
    [userId: string]: {
      uid: string;
      email: string | null;
      displayName: string | null;
      photoURL: string | null;
      lastLoginAt: Timestamp;
      createdAt: Timestamp;
      zodiacSign: string | null;
      updatedAt: Timestamp;
      refCodes: {
        en: string;
      };
    };
  };

  refCodes: {
    [code: string]: {
      userId: string;
      createdAt: Timestamp;
      updatedAt: Timestamp;
      language: 'en' | 'tr' | 'es';
      goodsides: {
        [ratedByUserId: string]: {
          traits: Array<{
            name: string;
            points: number;
          }>;
          ratedBy: string;
          createdAt: Timestamp;
          updatedAt: Timestamp;
        };
      };
      badsides: {
        [ratedByUserId: string]: {
          traits: Array<{
            name: string;
            points: number;
          }>;
          ratedBy: string;
          createdAt: Timestamp;
          updatedAt: Timestamp;
        };
      };
    };
  };

  userTasks: {
    [userId: string]: {
      points: number;
      lastRefresh: Timestamp;
      completedTasks: string[];
      refreshesLeft: number;
    };
  };
}
