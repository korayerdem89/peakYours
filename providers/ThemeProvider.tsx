import React from 'react';
import { useDarkMode } from '@/store/useDarkMode';
import { View } from 'react-native';
import { useColorScheme } from 'nativewind';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { isDarkMode } = useDarkMode();
  const { setColorScheme } = useColorScheme();

  React.useEffect(() => {
    setColorScheme(isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return <View className="flex-1">{children}</View>;
}
