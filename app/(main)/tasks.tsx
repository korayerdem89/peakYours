import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from '@/providers/LanguageProvider';
import { useAuth } from '@/store/useAuth';
import { useUserData } from '@/hooks/useUserQueries';
import { useTraitAverages } from '@/hooks/useTraitAverages';
import { useTaskTraits, useUpdateTaskTrait } from '@/hooks/useTaskQueries';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { getRandomTask } from '@/utils/taskUtils';

interface Task {
  id: string;
  trait: string;
  text: {
    tr: string;
    en: string;
    es: string;
  };
  color: string;
  type: 'goodsides' | 'badsides';
}

export default function TasksScreen() {
  const { t, locale } = useTranslation();
  const { user } = useAuth();
  const { data: userData } = useUserData(user?.uid);
  const { data: goodTraits } = useTraitAverages(userData?.refCodes?.en, 'goodsides');
  const { data: badTraits } = useTraitAverages(userData?.refCodes?.en, 'badsides');
  const updateTaskTrait = useUpdateTaskTrait();
  const [refreshLimit, setRefreshLimit] = useState(3);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  const getInitialTasks = useCallback(() => {
    if (!goodTraits || !badTraits) return [];

    const lowestGoodTraits = [...goodTraits]
      .sort((a, b) => a.averagePoints - b.averagePoints)
      .slice(0, 3);

    const highestBadTraits = [...badTraits]
      .sort((a, b) => b.averagePoints - a.averagePoints)
      .slice(0, 3);

    const goodTasks = lowestGoodTraits
      .map((trait) => {
        const task = getRandomTask(trait.trait);
        return task ? { ...task, type: 'goodsides' as const } : null;
      })
      .filter((task): task is Task => task !== null);

    const badTasks = highestBadTraits
      .map((trait) => {
        const task = getRandomTask(trait.trait);
        return task ? { ...task, type: 'badsides' as const } : null;
      })
      .filter((task): task is Task => task !== null);

    return [...goodTasks, ...badTasks];
  }, [goodTraits, badTraits]);

  useEffect(() => {
    if (goodTraits && badTraits) {
      setTasks(getInitialTasks());
    }
  }, [goodTraits, badTraits, getInitialTasks]);

  const handleCompleteTask = (taskId: string, trait: string) => {
    setCompletedTasks((prev) => [...prev, taskId]);
    updateTaskTrait.mutate(trait);
  };

  const handleRefreshTask = (taskId: string, trait: string) => {
    if (refreshLimit <= 0) {
      Toast.show({
        type: 'error',
        text1: t('tasks.noRefreshes'),
      });
      return;
    }
    setRefreshLimit((prev) => prev - 1);
    const newTask = getRandomTask(trait);
    if (newTask) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...newTask, id: `${trait}-${Date.now()}`, type: task.type } : task
        )
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <View className="flex-1 p-4">
        {/* Header */}
        <View className="mb-4">
          <Text className="font-poppins-semibold text-center text-2xl text-primary-dark dark:text-primary-light">
            {t('tasks.dailyTasks')}
          </Text>
          <View className="mt-2 flex-row items-center justify-center">
            <Text className="text-sm text-secondary-dark/60 dark:text-secondary-light/60">
              {t('tasks.remainingRefreshes')}: {refreshLimit}
            </Text>
          </View>
        </View>

        {/* Tasks List */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="gap-4">
            {tasks.map((task) => (
              <View
                key={task.id}
                className="flex-row items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                <View className="mr-4 flex-1">
                  <Text className="font-poppins-medium mb-1 text-xs" style={{ color: task.color }}>
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
                  <TouchableOpacity
                    onPress={() => handleRefreshTask(task.id, task.trait)}
                    disabled={refreshLimit <= 0}
                    className={`p-2 ${refreshLimit <= 0 ? 'opacity-30' : ''}`}>
                    <Ionicons name="refresh" size={20} color={task.color} />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => handleCompleteTask(task.id, task.trait)}>
                    <Ionicons
                      name={
                        completedTasks.includes(task.id)
                          ? 'checkmark-circle'
                          : 'checkmark-circle-outline'
                      }
                      size={24}
                      color={task.color}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
