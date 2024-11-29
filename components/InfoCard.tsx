import React from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from '@/providers/LanguageProvider';
import { theme } from '@/constants/theme';
import { useColorScheme } from 'nativewind';

interface InfoCardProps {
  type?: 'warning' | 'info' | 'error';
  message: string;
}

export default function InfoCard({ type = 'info', message }: InfoCardProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const getIconProps = () => {
    switch (type) {
      case 'warning':
        return {
          name: 'warning',
          color: '#FFA726',
        };
      case 'error':
        return {
          name: 'error',
          color: '#EF5350',
        };
      default:
        return {
          name: 'info',
          color: '#29B6F6',
        };
    }
  };

  const { name, color } = getIconProps();

  return (
    <View className="rounded-xl bg-white/80 p-6 shadow-sm dark:bg-black/20">
      <View className="flex-row items-center gap-4">
        <MaterialIcons name={name as any} size={24} color={color} />
        <Text className="font-poppins-medium flex-1 text-sm text-text-light dark:text-text-dark">
          {message}
        </Text>
      </View>
    </View>
  );
}
