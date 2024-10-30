import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface DarkModeState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (isDark: boolean) => void;
}

export const useDarkMode = create<DarkModeState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setDarkMode: (isDark) => set({ isDarkMode: isDark }),
    }),
    {
      name: 'dark-mode-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
