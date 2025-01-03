import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  FadeIn,
  useSharedValue,
  withSequence,
  withSpring,
  withDelay,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import { useFocusEffect } from '@react-navigation/native';

// Providers & Store
import { useTranslation } from '@/providers/LanguageProvider';
import { useAuth } from '@/store/useAuth';
import { useLoadingStore } from '@/store/useLoadingStore';
import { useTraits } from '@/providers/TraitProvider';

// Hooks & Services
import { useTasks } from '@/hooks/useTasks';
import { useUpdateTaskTrait } from '@/hooks/useTaskQueries';
import { StorageService } from '@/utils/storage';
import { updateUserTaskDate } from '@/services/user';
import { useQueryClient } from '@tanstack/react-query';
// Utils & Types
import { Task } from '@/types/tasks';
import { getRandomTask } from '@/utils/taskUtils';

// Components
import { TraitLevelUpAnimation } from '@/components/TraitLevelUpAnimation';
import { TaskHeader } from '@/components/tasks/TaskHeader';
import { TaskRefreshCounter } from '@/components/tasks/TaskRefreshCounter';
import { TaskList } from '@/components/tasks/TaskList';
import { TaskInfo } from '@/components/tasks/TaskInfo';
import QuoteCard from '@/components/main/QuoteCard';
import { UpgradeButton } from '@/components/buttons/UpgradeButton';

interface TaskLevelUpTrait {
  trait: string;
  type: 'goodsides' | 'badsides';
}

export default function TasksScreen() {
  // Core hooks
  const { user } = useAuth();
  const { t } = useTranslation();
  const { setIsLoading } = useLoadingStore();
  const { userData, traitDetails, goodTraits, badTraits } = useTraits();
  const updateTaskTrait = useUpdateTaskTrait();
  const queryClient = useQueryClient();

  // Animation values
  const bounceValue = useSharedValue(0);
  const bounceStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bounceValue.value }],
  }));

  // State management
  const [levelUpTrait, setLevelUpTrait] = useState<TaskLevelUpTrait | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  // Task related data
  const { taskData, refreshTasks, decrementRefreshes } = useTasks(user?.uid);
  const [refreshLimit, setRefreshLimit] = useState(taskData?.refreshesLeft ?? 0);

  // Effects
  useEffect(() => {
    if (userData?.membership?.type === 'free') return;
    if (taskData?.refreshesLeft !== undefined) {
      setRefreshLimit(taskData.refreshesLeft);
    }
  }, [taskData?.refreshesLeft]);

  useEffect(() => {
    if (userData?.membership?.type === 'free') return;
    const interval = setInterval(() => {
      bounceValue.value = withSequence(withSpring(-10), withDelay(100, withSpring(0)));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getInitialTasks = useCallback(() => {
    if (!goodTraits || !badTraits || userData?.membership?.type === 'free') return [];

    // En düşük puanlı 3 good trait
    const lowestGoodTraits = [...goodTraits]
      .sort((a, b) => a.value - b.value) // Küçükten büyüğe sırala
      .slice(0, 3);

    // En yüksek puanlı 3 bad trait
    const highestBadTraits = [...badTraits]
      .sort((a, b) => b.value - a.value) // Büyükten küçüğe sırala
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

  // Calculate remaining time
  const timeUntilRefresh = useCallback(() => {
    if (userData?.membership?.type === 'free' || !taskData?.lastRefresh) return 0;
    const lastRefresh = taskData.lastRefresh.toDate();
    const now = new Date();
    const diff = 24 * 60 * 60 * 1000 - (now.getTime() - lastRefresh.getTime());
    return Math.max(0, diff / (24 * 60 * 60 * 1000));
  }, [taskData?.lastRefresh]);

  useEffect(() => {
    async function loadTaskData() {
      if (!user?.uid || !userData) return;
      setIsLoading(true);
      try {
        const today = new Date().toISOString().split('T')[0];
        let currentTasks: Task[] = [];
        let currentCompletedTasks: string[] = [];

        if (userData.membership?.type === 'pro') {
          const savedTasks = await StorageService.getDailyTasks(user.uid);

          if (savedTasks && savedTasks.length > 0) {
            currentTasks = savedTasks;
          } else {
            if (goodTraits && badTraits) {
              currentTasks = getInitialTasks();
              if (currentTasks.length > 0) {
                await StorageService.saveDailyTasks(user.uid, currentTasks);
                await refreshTasks.mutateAsync();
              } else {
                await new Promise((resolve) => setTimeout(resolve, 500));
                const retryTasks = getInitialTasks();
                if (retryTasks.length > 0) {
                  currentTasks = retryTasks;
                  await StorageService.saveDailyTasks(user.uid, currentTasks);
                  await refreshTasks.mutateAsync();
                }
              }
            }
          }

          if (userData.lastTasksDates) {
            currentTasks.forEach((task) => {
              const lastCompletedDate = userData.lastTasksDates?.[task.trait];
              if (lastCompletedDate === today) {
                currentCompletedTasks.push(task.id);
              }
            });
          }
        }

        setTasks(currentTasks);
        setCompletedTasks(currentCompletedTasks);
        setRefreshLimit(taskData?.refreshesLeft ?? 0);
      } catch (error) {
        console.error('Error loading task data:', error);
        Toast.show({
          type: 'error',
          text1: t('tasks.loadError'),
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadTaskData();
  }, [user?.uid, userData?.membership?.type, goodTraits, badTraits]);

  //Task handlers
  const handleCompleteTask = useCallback(
    async (taskId: string, trait: string) => {
      if (!user?.uid || completedTasks.includes(taskId)) return;
      try {
        const today = new Date().toISOString().split('T')[0];
        const updatedCompletedTasks = [...completedTasks, taskId];
        setCompletedTasks(updatedCompletedTasks);

        await Promise.all([
          StorageService.saveCompletedTasks(user.uid, updatedCompletedTasks),
          updateUserTaskDate(user.uid, trait, today),
          updateTaskTrait.mutateAsync(trait),
        ]);

        const task = tasks.find((t) => t.id === taskId);
        queryClient.invalidateQueries({ queryKey: ['user'] });
        const shouldShowLevelUpTrait =
          userData?.traits?.[trait] && (userData?.traits?.[trait] + 1) % 5 === 0;

        if (task && shouldShowLevelUpTrait) {
          setLevelUpTrait({
            trait: task.trait,
            type: task.type,
          });
        }
      } catch (error) {
        console.error('Error completing task:', error);
        Toast.show({
          type: 'error',
          text1: t('tasks.error'),
        });
      }
    },
    [user?.uid, completedTasks, tasks, t]
  );

  const handleRefreshTask = useCallback(
    async (taskId: string, trait: string) => {
      if (!user?.uid || refreshLimit <= 0) {
        Toast.show({
          type: 'error',
          text1: t('tasks.noRefreshes'),
        });
        return;
      }
      try {
        const newTask = getRandomTask(trait);
        if (newTask) {
          const newTasks = tasks.map((task) =>
            task.id === taskId
              ? { ...newTask, id: `${trait}-${Date.now()}`, type: task.type }
              : task
          );

          await Promise.all([
            StorageService.saveDailyTasks(user.uid, newTasks),
            decrementRefreshes.mutateAsync(),
          ]);

          setTasks(newTasks);
          setRefreshLimit((prev) => Math.max(0, prev - 1));

          Toast.show({
            type: 'success',
            text1: t('tasks.refreshSuccess'),
          });
        }
      } catch (error) {
        console.error('Error in handleRefreshTask:', error);
        Toast.show({
          type: 'error',
          text1: t('tasks.error'),
        });
      }
    },
    [user?.uid, refreshLimit, tasks, t, decrementRefreshes]
  );

  // Render conditions
  if (!userData || !traitDetails) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#7C4DFF" />
      </View>
    );
  }

  if (userData.membership?.type === 'free') {
    return (
      <SafeAreaView className="flex-1 bg-accent-light pt-20 dark:bg-background-dark">
        <ScrollView
          className="flex-1 p-4"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}>
          <Animated.View entering={FadeIn.duration(1000)} className="mt-6 flex-1">
            <View className="rounded-sm bg-surface-light p-4 shadow-sm dark:bg-surface-dark">
              <Animated.View style={[bounceStyle]} className="items-center overflow-hidden ">
                <Image
                  source={require('@/assets/tasks/inviteBanner.png')}
                  className="w-full rounded-xl"
                  resizeMode="contain"
                />
              </Animated.View>

              <Text className="mb-4 text-center  font-bold text-2xl text-primary-dark">
                {t('tasks.freemember.title')}
              </Text>

              <Text className="mb-6  text-center text-base  leading-6 text-text-light">
                {t('tasks.freemember.value')}
              </Text>

              <UpgradeButton />
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Main render
  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <View className="flex-1 gap-4 p-4 pb-24">
        <QuoteCard />
        <TaskHeader />
        <TaskInfo userData={userData} />
        <TaskRefreshCounter refreshesLeft={refreshLimit} />
        <TaskList
          timeUntilRefresh={timeUntilRefresh()}
          tasks={tasks}
          completedTasks={completedTasks}
          refreshLimit={refreshLimit}
          onRefreshTask={handleRefreshTask}
          onCompleteTask={handleCompleteTask}
        />
        {levelUpTrait && (
          <TraitLevelUpAnimation
            trait={levelUpTrait.trait}
            type={levelUpTrait.type}
            onComplete={() => setLevelUpTrait(null)}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
