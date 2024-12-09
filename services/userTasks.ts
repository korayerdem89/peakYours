import { FirestoreService } from './firestore';
import firestore from '@react-native-firebase/firestore';
import { UserTasks } from '@/types/tasks';

const REFRESH_LIMIT = 10;

export class UserTasksService {
  static async initializeUserTasks(userId: string) {
    const userTasks: UserTasks = {
      points: 0,
      lastRefresh: firestore.Timestamp.now(),
      refreshesLeft: REFRESH_LIMIT,
    };

    await FirestoreService.setDoc('userTasks', userId, userTasks);
    return userTasks;
  }

  static async updateUserTaskPoints(userId: string, points: number) {
    await FirestoreService.updateDoc('userTasks', userId, {
      points: firestore.FieldValue.increment(points),
    });
  }

  static async refreshUserTasks(userId: string, forceReset: boolean = false) {
    const updateData = forceReset
      ? {
          lastRefresh: firestore.Timestamp.now(),
          refreshesLeft: REFRESH_LIMIT,
        }
      : {
          lastRefresh: firestore.Timestamp.now(),
        };

    await FirestoreService.updateDoc('userTasks', userId, updateData);
  }

  static async decrementRefreshes(userId: string) {
    await FirestoreService.updateDoc('userTasks', userId, {
      refreshesLeft: firestore.FieldValue.increment(-1),
    });
  }

  static async resetRefreshLimit(userId: string) {
    await FirestoreService.updateDoc('userTasks', userId, {
      refreshesLeft: REFRESH_LIMIT,
      lastRefresh: firestore.Timestamp.now(),
    });
  }
}
