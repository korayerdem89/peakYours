import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import { useTranslation } from '@/providers/LanguageProvider';
import { theme } from '@/constants/theme';

interface TaskItemProps {
  task: {
    id: string;
    trait: string;
    text: {
      tr: string;
      en: string;
      es: string;
    };
    color: string;
  };
  onRefresh: () => void;
  onComplete: () => void;
  isCompleted: boolean;
  isRefreshDisabled: boolean;
}

export default function TaskItem({
  task,
  onRefresh,
  onComplete,
  isCompleted,
  isRefreshDisabled,
}: TaskItemProps) {
  const { colorScheme } = useColorScheme();
  const { locale } = useTranslation();

  return (
    <View className="dark:bg-background-dark-secondary mb-3 flex-row items-center rounded-xl bg-background-light p-4">
      <View className="flex-1">
        <Text
          className={`text-sm ${
            isCompleted
              ? 'text-text-light-secondary/40 line-through dark:text-text-dark-secondary/40'
              : 'text-text-light dark:text-text-dark'
          }`}>
          {task.text[locale as keyof typeof task.text]}
        </Text>
      </View>

      <View className="flex-row items-center gap-3">
        <TouchableOpacity onPress={onRefresh} disabled={isRefreshDisabled} className="p-2">
          <Ionicons
            name="refresh"
            size={20}
            color={
              isRefreshDisabled
                ? theme.colors.text.light + '40'
                : colorScheme === 'dark'
                  ? theme.colors.text.dark
                  : theme.colors.text.light
            }
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={onComplete} className="p-2">
          <Ionicons
            name="checkmark-circle"
            size={22}
            color={
              isCompleted
                ? task.color
                : colorScheme === 'dark'
                  ? theme.colors.text.dark
                  : theme.colors.text.light
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
