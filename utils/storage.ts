import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '@/types/tasks';

const STORAGE_KEYS = {
  DAILY_TASKS: 'daily_tasks',
  COMPLETED_TASKS: 'completed_tasks',
  LAST_REFRESH_TIME: 'last_refresh_time',
} as const;

export const StorageService = {
  async saveDailyTasks(userId: string, tasks: Task[]) {
    try {
      await AsyncStorage.setItem(`${STORAGE_KEYS.DAILY_TASKS}_${userId}`, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving daily tasks:', error);
    }
  },

  async getDailyTasks(userId: string): Promise<Task[] | null> {
    try {
      const tasks = await AsyncStorage.getItem(`${STORAGE_KEYS.DAILY_TASKS}_${userId}`);
      return tasks ? JSON.parse(tasks) : null;
    } catch (error) {
      console.error('Error getting daily tasks:', error);
      return null;
    }
  },

  async saveCompletedTasks(userId: string, completedTasks: string[]) {
    try {
      await AsyncStorage.setItem(
        `${STORAGE_KEYS.COMPLETED_TASKS}_${userId}`,
        JSON.stringify(completedTasks)
      );
    } catch (error) {
      console.error('Error saving completed tasks:', error);
    }
  },

  async getCompletedTasks(userId: string): Promise<string[]> {
    try {
      const tasks = await AsyncStorage.getItem(`${STORAGE_KEYS.COMPLETED_TASKS}_${userId}`);
      return tasks ? JSON.parse(tasks) : [];
    } catch (error) {
      console.error('Error getting completed tasks:', error);
      return [];
    }
  },

  async saveLastRefreshTime(userId: string) {
    try {
      await AsyncStorage.setItem(
        `${STORAGE_KEYS.LAST_REFRESH_TIME}_${userId}`,
        new Date().toISOString()
      );
    } catch (error) {
      console.error('Error saving last refresh time:', error);
    }
  },

  async getLastRefreshTime(userId: string): Promise<Date | null> {
    try {
      const time = await AsyncStorage.getItem(`${STORAGE_KEYS.LAST_REFRESH_TIME}_${userId}`);
      return time ? new Date(time) : null;
    } catch (error) {
      console.error('Error getting last refresh time:', error);
      return null;
    }
  },

  async clearTaskData(userId: string) {
    try {
      await AsyncStorage.multiRemove([
        `${STORAGE_KEYS.DAILY_TASKS}_${userId}`,
        `${STORAGE_KEYS.COMPLETED_TASKS}_${userId}`,
        `${STORAGE_KEYS.LAST_REFRESH_TIME}_${userId}`,
      ]);
    } catch (error) {
      console.error('Error clearing task data:', error);
    }
  },
};
