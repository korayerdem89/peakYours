import AsyncStorage from '@react-native-async-storage/async-storage';

const APP_USAGE_KEY = '@app_usage_count';
const LAST_INCREMENT_TIME_KEY = '@last_increment_time';
const COOLDOWN_PERIOD = 20 * 60 * 1000; // 20 dakika (milisaniye cinsinden)

export const AppUsageService = {
  async getUsageCount(): Promise<number> {
    try {
      const count = await AsyncStorage.getItem(APP_USAGE_KEY);
      return count ? parseInt(count, 10) : 0;
    } catch (error) {
      console.error('Error getting usage count:', error);
      return 0;
    }
  },

  async getLastIncrementTime(): Promise<number> {
    try {
      const lastTime = await AsyncStorage.getItem(LAST_INCREMENT_TIME_KEY);
      return lastTime ? parseInt(lastTime, 10) : 0;
    } catch (error) {
      console.error('Error getting last increment time:', error);
      return 0;
    }
  },

  async incrementUsageCount(): Promise<number> {
    try {
      const currentTime = Date.now();
      const lastIncrementTime = await this.getLastIncrementTime();

      // 20 dakika geçmediyse mevcut sayıyı döndür
      if (currentTime - lastIncrementTime < COOLDOWN_PERIOD) {
        return await this.getUsageCount();
      }

      // 20 dakika geçtiyse sayacı artır ve zamanı güncelle
      const currentCount = await this.getUsageCount();
      const newCount = currentCount + 1;

      await AsyncStorage.setItem(APP_USAGE_KEY, newCount.toString());
      await AsyncStorage.setItem(LAST_INCREMENT_TIME_KEY, currentTime.toString());

      return newCount;
    } catch (error) {
      console.error('Error incrementing usage count:', error);
      return 0;
    }
  },

  async resetUsageCount(): Promise<void> {
    try {
      await AsyncStorage.setItem(APP_USAGE_KEY, '0');
      await AsyncStorage.setItem(LAST_INCREMENT_TIME_KEY, '0');
    } catch (error) {
      console.error('Error resetting usage count:', error);
    }
  },
};
