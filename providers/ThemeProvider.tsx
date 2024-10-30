import React from 'react';
import { useDarkMode } from '@/store/useDarkMode';
import { View } from 'react-native';
import { theme } from '@/constants/theme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { isDarkMode } = useDarkMode();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? theme.colors.background.dark : theme.colors.background.light,
      }}>
      {children}
    </View>
  );
}
