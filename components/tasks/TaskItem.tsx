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
    type: 'goodsides' | 'badsides';
  };
  onRefresh: () => void;
  onComplete: () => void;
  isCompleted: boolean;
  isRefreshDisabled: boolean;
  isLastItem?: boolean;
}

export default function TaskItem({
  task,
  onRefresh,
  onComplete,
  isCompleted,
  isRefreshDisabled,
  isLastItem = false,
}: TaskItemProps) {
  const { colorScheme } = useColorScheme();
  const { t, locale } = useTranslation();
  const isDark = colorScheme === 'dark';

  return (
    <>
      <View className={`p-4 ${isCompleted ? 'opacity-70' : ''}`}>
        <View className="flex-row items-start justify-between space-x-4">
          <View className="flex-1">
            <View className="mb-2 flex-row items-center space-x-2">
              <Text className="font-poppins-medium text-xs" style={{ color: task.color }}>
                #{t(`personality.traits.${task.trait}`)}
              </Text>
            </View>
            <Text
              className={`font-poppins text-sm text-text-light dark:text-text-dark ${
                isCompleted ? 'line-through' : ''
              }`}>
              {task.text[locale as keyof typeof task.text]}
            </Text>
          </View>

          <View className="flex-row items-center space-x-2">
            <TouchableOpacity
              onPress={onRefresh}
              disabled={isRefreshDisabled}
              className={`rounded-full p-2 ${isRefreshDisabled ? 'opacity-30' : ''}`}
              accessibilityLabel={t('tasks.refreshTask')}>
              <Ionicons
                name="refresh"
                size={20}
                color={isDark ? theme.colors.text.dark : theme.colors.text.light}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onComplete}
              className="rounded-full p-2"
              accessibilityLabel={t('tasks.completeTask')}>
              <Ionicons
                name={isCompleted ? 'checkmark-circle' : 'checkmark-circle-outline'}
                size={24}
                color={
                  isCompleted
                    ? task.color
                    : isDark
                      ? theme.colors.text.dark
                      : theme.colors.text.light
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {!isLastItem && <View className="h-[1px] w-full bg-text-light/10 dark:bg-text-dark/10" />}
    </>
  );
}
