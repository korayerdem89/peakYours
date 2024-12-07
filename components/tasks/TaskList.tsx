import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from '@/providers/LanguageProvider';
import { theme } from '@/constants/theme';
import { Task } from '@/types/tasks';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

interface TaskListProps {
  tasks: Task[];
  completedTasks: string[];
  refreshLimit: number;
  onRefreshTask: (taskId: string, trait: string) => void;
  onCompleteTask: (taskId: string, trait: string) => void;
}

export function TaskList({
  tasks,
  completedTasks,
  refreshLimit,
  onRefreshTask,
  onCompleteTask,
}: TaskListProps) {
  const { t, locale } = useTranslation();

  const handleRefresh = async (taskId: string, trait: string) => {
    if (refreshLimit <= 0) return; // Early return if no refreshes left
    onRefreshTask(taskId, trait);
  };

  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <View className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
        {tasks.map((task, index) => (
          <View key={task.id}>
            <View className="flex-row items-center justify-between py-3">
              <View className="mr-4 flex-1">
                <Text
                  className="mb-1 font-medium text-xs"
                  style={{
                    color:
                      theme.colors.personality[task.trait as keyof typeof theme.colors.personality],
                  }}>
                  #{t(`personality.traits.${task.trait}`)}
                </Text>
                <Text
                  className={`text-sm text-gray-800 dark:text-gray-200 ${
                    completedTasks.includes(task.id) ? 'text-gray-400 line-through' : ''
                  }`}>
                  {task.text[locale as keyof typeof task.text]}
                </Text>
              </View>

              <View className="flex-row items-center gap-4">
                {!completedTasks.includes(task.id) && (
                  <TouchableOpacity
                    onPress={() => handleRefresh(task.id, task.trait)}
                    disabled={refreshLimit <= 0}
                    className={`p-2 ${refreshLimit <= 0 ? 'opacity-30' : ''}`}>
                    <Ionicons
                      name="refresh"
                      size={20}
                      color={
                        refreshLimit <= 0
                          ? theme.colors.text.light
                          : theme.colors.personality[
                              task.trait as keyof typeof theme.colors.personality
                            ]
                      }
                    />
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={() => onCompleteTask(task.id, task.trait)}>
                  <Ionicons
                    name={
                      completedTasks.includes(task.id)
                        ? 'checkmark-circle'
                        : 'checkmark-circle-outline'
                    }
                    size={24}
                    color={
                      theme.colors.personality[task.trait as keyof typeof theme.colors.personality]
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>

            {index < tasks.length - 1 && (
              <View className="h-[1px] w-full bg-gray-200 dark:bg-gray-700" />
            )}
          </View>
        ))}
      </View>
      <BannerAd
        unitId={'ca-app-pub-6312844121446107/2492397048'}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdFailedToLoad={(error: Error) => {
          console.error('Banner ad failed to load:', error);
        }}
      />
    </ScrollView>
  );
}
