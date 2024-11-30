import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from '@/providers/LanguageProvider';
import { useAuth } from '@/store/useAuth';
import { useUserData } from '@/hooks/useUserQueries';
import { useTraitAverages } from '@/hooks/useTraitAverages';
import { useTaskTraits, useUpdateTaskTrait } from '@/hooks/useTaskQueries';
import TaskItem from '@/components/tasks/TaskItem';
import { getRandomTask } from '@/utils/taskUtils';
import Toast from 'react-native-toast-message';

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
  const { t } = useTranslation();
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

    const goodTasks = lowestGoodTraits.flatMap((trait) => {
      const task1 = getRandomTask(trait.trait);
      return [task1 ? { ...task1, type: 'goodsides' as const } : null].filter(
        (t): t is Task => t !== null
      );
    });

    const badTasks = highestBadTraits.flatMap((trait) => {
      const task1 = getRandomTask(trait.trait);

      return [task1 ? { ...task1, type: 'badsides' as const } : null].filter(
        (t): t is Task => t !== null
      );
    });

    return [...goodTasks, ...badTasks];
  }, [goodTraits, badTraits]);

  useEffect(() => {
    if (goodTraits && badTraits) {
      setTasks(getInitialTasks());
    }
  }, [goodTraits, badTraits, getInitialTasks]);

  const handleRefreshTask = useCallback(
    (taskId: string, trait: string) => {
      if (refreshLimit <= 0) return;

      setTasks((prev) =>
        prev.map((task) => {
          if (task.id === taskId) {
            const newTask = getRandomTask(trait);
            return newTask ? { ...newTask, type: task.type } : task;
          }
          return task;
        })
      );

      setRefreshLimit((prev) => prev - 1);
    },
    [refreshLimit]
  );

  const handleCompleteTask = useCallback(
    async (taskId: string, trait: string) => {
      if (completedTasks.includes(taskId)) return;

      setCompletedTasks((prev) => [...prev, taskId]);

      try {
        await updateTaskTrait.mutateAsync(trait);
        Toast.show({
          type: 'success',
          text1: t('tasks.completed'),
          position: 'bottom',
        });
      } catch (error) {
        console.error('Task completion error:', error);
        Toast.show({
          type: 'error',
          text1: t('common.error'),
          position: 'bottom',
        });
      }
    },
    [completedTasks, updateTaskTrait, t]
  );

  return (
    <SafeAreaView className="flex-1 bg-accent-light dark:bg-background-dark">
      <View className="p-4">
        <Text className="mb-6 text-center text-sm text-secondary-dark/80 dark:text-secondary-light/80">
          ✨ {t('tasks.completionInfo')} ✨
        </Text>

        <View className="mb-4 flex-row justify-end">
          <Text className="text-xs text-secondary-dark/60 dark:text-secondary-light/60">
            {t('tasks.refreshLimit')}: {refreshLimit}
          </Text>
        </View>

        <View className="rounded-xl bg-white/80 p-4 shadow-sm dark:bg-black/20">
          {tasks.map((task, index) => (
            <TaskItem
              key={task.id}
              task={task}
              onRefresh={() => handleRefreshTask(task.id, task.trait)}
              onComplete={() => handleCompleteTask(task.id, task.trait)}
              isCompleted={completedTasks.includes(task.id)}
              isRefreshDisabled={refreshLimit <= 0}
              isLastItem={index === tasks.length - 1}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
