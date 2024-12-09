import AsyncStorage from '@react-native-async-storage/async-storage';

const APP_USAGE_KEY = '@app_usage_count';

export class AppUsageService {
  static async incrementUsageCount(): Promise<number> {
    try {
      const currentCount = await this.getUsageCount();
      const newCount = currentCount + 1;
      await AsyncStorage.setItem(APP_USAGE_KEY, newCount.toString());
      return newCount;
    } catch (error) {
      console.error('Error incrementing usage count:', error);
      return 0;
    }
  }

  static async getUsageCount(): Promise<number> {
    try {
      const count = await AsyncStorage.getItem(APP_USAGE_KEY);
      return count ? parseInt(count, 10) : 0;
    } catch (error) {
      console.error('Error getting usage count:', error);
      return 0;
    }
  }

  static async resetUsageCount(): Promise<void> {
    try {
      await AsyncStorage.setItem(APP_USAGE_KEY, '0');
    } catch (error) {
      console.error('Error resetting usage count:', error);
    }
  }
}
