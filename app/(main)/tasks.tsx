import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from '@/providers/LanguageProvider';
import { useAuth } from '@/store/useAuth';
import { useUserData } from '@/hooks/useUserQueries';
import { useTraitAverages } from '@/hooks/useTraitAverages';
import { useUpdateTaskTrait } from '@/hooks/useTaskQueries';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { getRandomTask } from '@/utils/taskUtils';
import { useTraitDetails } from '@/hooks/useTraitDetails';
import Animated, {
  FadeIn,
  useSharedValue,
  withSequence,
  withSpring,
  withDelay,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { theme } from '@/constants/theme';
import * as Progress from 'react-native-progress';
import { useTasks } from '@/hooks/useTasks';
import { Accordion } from '@/components/Accordion';
import { useRouter } from 'expo-router';
import { StorageService } from '@/utils/storage';
import { TraitLevelUpAnimation } from '@/components/TraitLevelUpAnimation';

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
  const { taskData, updateTaskPoints, refreshTasks, decrementRefreshes } = useTasks(user?.uid);
  const [refreshLimit, setRefreshLimit] = useState(7);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const { data: traitDetails } = useTraitDetails(userData?.refCodes?.en, 'goodsides');
  const router = useRouter();
  const [levelUpTrait, setLevelUpTrait] = useState<string | null>(null);

  const bounceValue = useSharedValue(0);

  useEffect(() => {
    const interval = setInterval(() => {
      bounceValue.value = withSequence(withSpring(-10), withDelay(100, withSpring(0)));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const bounceStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bounceValue.value }],
  }));

  if (!traitDetails?.totalRaters) {
    return (
      <SafeAreaView className="flex-1 bg-accent-light dark:bg-background-dark">
        <ScrollView
          className="flex-1 p-4"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}>
          <Animated.View entering={FadeIn.duration(1000)} className="flex-1 justify-center">
            <View className="rounded-2xl bg-surface-light p-6 shadow-sm dark:bg-surface-dark">
              <Animated.View style={bounceStyle} className="mb-8 items-center">
                <Image
                  source={{ uri: 'https://picsum.photos/200/300' }}
                  className="h-48 w-48"
                  resizeMode="contain"
                />
              </Animated.View>

              <Text className="text-primary-default mb-4 text-center font-bold text-2xl dark:text-primary-light">
                {t('tasks.noRatingsWarning.title')}
              </Text>

              <Text className="mb-6 text-center font-medium text-base text-text-light-secondary dark:text-text-dark-secondary">
                {t('tasks.noRatingsWarning.description')}
              </Text>

              <View className="mt-4 rounded-xl bg-primary-light/10 p-4 dark:bg-primary-dark/10">
                <Text className="text-center font-semibold text-sm text-primary-dark dark:text-primary-light">
                  {t('tasks.noRatingsWarning.cta')}
                </Text>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Load initial tasks and completed tasks
  useEffect(() => {
    async function loadTaskData() {
      if (!user?.uid || !goodTraits || !badTraits) return;

      try {
        // Get saved tasks and last refresh time
        const savedTasks = await StorageService.getDailyTasks(user.uid);
        const lastRefreshTime = await StorageService.getLastRefreshTime(user.uid);
        const savedCompletedTasks = await StorageService.getCompletedTasks(user.uid);
        const now = new Date();

        // Check if we need new tasks (no saved tasks or 24 hours passed)
        if (
          !savedTasks ||
          !lastRefreshTime ||
          now.getTime() - lastRefreshTime.getTime() > 24 * 60 * 60 * 1000
        ) {
          // Generate new tasks
          const newTasks = getInitialTasks();
          setTasks(newTasks);
          setCompletedTasks([]);
          setRefreshLimit(7);

          // Save new state
          await StorageService.saveDailyTasks(user.uid, newTasks);
          await StorageService.saveCompletedTasks(user.uid, []);
          await StorageService.saveLastRefreshTime(user.uid);
          await refreshTasks.mutateAsync();
        } else {
          // Use existing tasks and completed tasks
          setTasks(savedTasks);
          setCompletedTasks(savedCompletedTasks);

          // Set refresh limit from Firestore data
          setRefreshLimit(taskData?.refreshesLeft ?? 7);
        }
      } catch (error) {
        console.error('Error loading task data:', error);
        Toast.show({
          type: 'error',
          text1: t('tasks.loadError'),
        });
      }
    }

    loadTaskData();
  }, [user?.uid, goodTraits, badTraits]); // Dependencies include traits data

  // Remove getInitialTasks call from here if it exists
  useEffect(() => {
    if (goodTraits && badTraits) {
      // Don't set tasks here anymore
      // The tasks will be managed by the loadTaskData function
    }
  }, [goodTraits, badTraits]);

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

  const handleCompleteTask = async (taskId: string, trait: string) => {
    if (!user?.uid || completedTasks.includes(taskId)) {
      return;
    }

    try {
      // Get current trait value
      const currentTraitValue = userData?.traits?.[trait] || 0;
      const willLevelUp = (currentTraitValue + 1) % 5 === 0;

      // Update task trait in users collection
      await updateTaskTrait.mutateAsync(trait);

      // Update points in userTasks collection
      await updateTaskPoints.mutateAsync(10);

      // Update completed tasks in local state and storage
      const newCompletedTasks = [...completedTasks, taskId];
      setCompletedTasks(newCompletedTasks);
      await StorageService.saveCompletedTasks(user.uid, newCompletedTasks);

      // Show level up animation if applicable
      if (willLevelUp) {
        setLevelUpTrait(trait);
      }

      Toast.show({
        type: 'success',
        text1: t('tasks.completed'),
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: t('tasks.error'),
      });
    }
  };

  const handleRefreshTask = async (taskId: string, trait: string) => {
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
          task.id === taskId ? { ...newTask, id: `${trait}-${Date.now()}`, type: task.type } : task
        );

        setTasks(newTasks);
        await StorageService.saveDailyTasks(user.uid, newTasks);
        await decrementRefreshes.mutateAsync();
        setRefreshLimit((prev) => prev - 1);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: t('tasks.error'),
      });
    }
  };

  // Calculate remaining time
  const timeUntilRefresh = useCallback(() => {
    if (!taskData?.lastRefresh) return 0;
    const lastRefresh = taskData.lastRefresh.toDate();
    const now = new Date();
    const diff = 24 * 60 * 60 * 1000 - (now.getTime() - lastRefresh.getTime());
    return Math.max(0, diff / (24 * 60 * 60 * 1000));
  }, [taskData?.lastRefresh]);

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <View className="flex-1 p-4">
        {/* Modernized Header with Icon */}

        {/* Header with Info */}
        <View className="mb-6">
          <Animated.View entering={FadeIn.duration(1000)} className="mb-6 items-center">
            <View className="flex-row items-center justify-center space-x-2 rounded-2xl bg-primary-light/10 px-6 py-3 dark:bg-primary-dark/10">
              <MaterialCommunityIcons
                name="checkbox-marked-circle-outline"
                size={28}
                color={theme.colors.primary.default}
                className="mr-2"
              />
              <Text className="font-poppins-semibold text-2xl text-primary-dark dark:text-primary-light">
                {t('tasks.dailyTasks')}
              </Text>
            </View>

            <View className="mt-2 h-1 w-16 rounded-full bg-primary-light/20 dark:bg-primary-dark/20" />
          </Animated.View>

          <Accordion title={t('tasks.howItWorks')}>
            <Text className="p-4 text-sm text-text-light dark:text-text-dark">
              {t('tasks.completionInfo')}
            </Text>
          </Accordion>
        </View>

        {/* Refresh Counter */}
        <View className="mb-4 flex-row items-center">
          <MaterialCommunityIcons name="refresh" size={20} color={theme.colors.secondary.default} />
          <Text className="font-poppins-medium ml-2 text-text-light dark:text-text-dark">
            {taskData?.refreshesLeft || 7}
            <Text className="text-sm text-text-light-secondary"> {t('tasks.refreshes')}</Text>
          </Text>
        </View>

        {/* Tasks List */}
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
                          theme.colors.personality[
                            task.trait as keyof typeof theme.colors.personality
                          ],
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
                        onPress={() => handleRefreshTask(task.id, task.trait)}
                        disabled={refreshLimit <= 0}
                        className={`p-2 ${refreshLimit <= 0 ? 'opacity-30' : ''}`}>
                        <Ionicons
                          name="refresh"
                          size={20}
                          color={
                            theme.colors.personality[
                              task.trait as keyof typeof theme.colors.personality
                            ]
                          }
                        />
                      </TouchableOpacity>
                    )}

                    <TouchableOpacity onPress={() => handleCompleteTask(task.id, task.trait)}>
                      <Ionicons
                        name={
                          completedTasks.includes(task.id)
                            ? 'checkmark-circle'
                            : 'checkmark-circle-outline'
                        }
                        size={24}
                        color={
                          theme.colors.personality[
                            task.trait as keyof typeof theme.colors.personality
                          ]
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
        </ScrollView>

        {/* Bottom Stats */}
        <View className="mt-4 space-y-4">
          {/* Time Progress */}
          <View className="items-center space-y-2">
            <Progress.Bar
              progress={timeUntilRefresh()}
              width={null}
              height={8}
              color={theme.colors.primary.default}
              unfilledColor={theme.colors.background.tab}
              borderWidth={0}
              className="w-full rounded-full"
            />
            <Text className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
              {t('tasks.refreshIn')}
            </Text>
          </View>

          {/* Points & Leaderboard */}
          <View className="flex-row items-center justify-between rounded-lg bg-surface-light p-4 dark:bg-surface-dark">
            <View>
              <Text className="font-poppins-medium text-lg text-text-light dark:text-text-dark">
                {taskData?.points || 0}
                <Text className="text-sm text-text-light-secondary"> {t('tasks.points')}</Text>
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => router.push('/modal/leaderboard')}
              className="bg-primary-default flex-row items-center rounded-full px-4 py-2">
              <Ionicons name="trophy" size={20} color="white" className="mr-2" />
              <Text className="font-poppins-medium text-white">{t('tasks.leaderboard')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Level Up Animation */}
        {levelUpTrait && (
          <TraitLevelUpAnimation trait={levelUpTrait} onComplete={() => setLevelUpTrait(null)} />
        )}
      </View>
    </SafeAreaView>
  );
}
