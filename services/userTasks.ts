import { FirestoreService } from './firestore';
import firestore from '@react-native-firebase/firestore';
import { UserTasks } from '@/types/tasks';

export class UserTasksService {
  static async initializeUserTasks(userId: string) {
    const userTasks: UserTasks = {
      points: 0,
      lastRefresh: firestore.Timestamp.now(),
      refreshesLeft: 7,
    };

    await FirestoreService.setDoc('userTasks', userId, userTasks);
    return userTasks;
  }

  static async updateUserTaskPoints(userId: string, points: number) {
    await FirestoreService.updateDoc('userTasks', userId, {
      points: firestore.FieldValue.increment(points),
    });
  }

  static async refreshUserTasks(userId: string) {
    await FirestoreService.updateDoc('userTasks', userId, {
      lastRefresh: firestore.Timestamp.now(),
      refreshesLeft: 7,
    });
  }

  static async decrementRefreshes(userId: string) {
    await FirestoreService.updateDoc('userTasks', userId, {
      refreshesLeft: firestore.FieldValue.increment(-1),
    });
  }
}
