import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

interface AppUsageStore {
  isFirstTime: boolean;
  usageCount: number;
  lastUpdateTime: number | null;
  setIsFirstTime: (value: boolean) => void;
  setUsageCount: (value: number) => void;
  initializeUsage: () => Promise<void>;
}

export const useAppUsageStore = create<AppUsageStore>((set) => ({
  isFirstTime: false,
  usageCount: 0,
  lastUpdateTime: null,
  setIsFirstTime: (value) => set({ isFirstTime: value }),
  setUsageCount: (value) => set({ usageCount: value }),
  initializeUsage: async () => {
    try {
      const count = await AsyncStorage.getItem('@app_usage_count');
      const lastUpdate = await AsyncStorage.getItem('@last_update_time');
      const currentTime = Date.now();

      if (count === null) {
        // İlk kullanım
        set({
          isFirstTime: true,
          usageCount: 1,
          lastUpdateTime: currentTime,
        });
        await AsyncStorage.setItem('@app_usage_count', '1');
        await AsyncStorage.setItem('@last_update_time', currentTime.toString());
      } else {
        const lastUpdateTime = lastUpdate ? parseInt(lastUpdate) : 0;
        const timeDiff = currentTime - lastUpdateTime;
        const TWENTY_MINUTES = 20 * 60 * 1000; // 20 dakika (milisaniye)

        if (timeDiff >= TWENTY_MINUTES) {
          // 20 dakika geçmişse sayacı artır
          const newCount = parseInt(count) + 1;
          set({
            isFirstTime: false,
            usageCount: newCount,
            lastUpdateTime: currentTime,
          });
          await AsyncStorage.setItem('@app_usage_count', newCount.toString());
          await AsyncStorage.setItem('@last_update_time', currentTime.toString());
        } else {
          // 20 dakika geçmemişse mevcut değerleri koru
          set({
            isFirstTime: false,
            usageCount: parseInt(count),
            lastUpdateTime: lastUpdateTime,
          });
        }
      }
    } catch (error) {
      console.error('Error initializing usage:', error);
    }
  },
}));
