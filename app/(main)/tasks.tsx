import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from '@/providers/LanguageProvider';
import { useAuth } from '@/store/useAuth';
import { useUserData } from '@/hooks/useUserQueries';
import { useTraitAverages } from '@/hooks/useTraitAverages';
import { useUpdateTaskTrait } from '@/hooks/useTaskQueries';
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
import { useTasks } from '@/hooks/useTasks';
import { StorageService } from '@/utils/storage';
import { TraitLevelUpAnimation } from '@/components/TraitLevelUpAnimation';
import { TaskHeader } from '@/components/tasks/TaskHeader';
import { TaskRefreshCounter } from '@/components/tasks/TaskRefreshCounter';
import { TaskList } from '@/components/tasks/TaskList';
import { TaskProgress } from '@/components/tasks/TaskProgress';
import { TaskInfo } from '@/components/tasks/TaskInfo';
import { UserData } from '@/services/user';
import { TaskDebug } from '@/components/tasks/TaskDebug';
import { TaskMotivation } from '@/components/tasks/TaskMotivation';
import { updateUserTaskDate } from '@/services/user';
import { theme } from '@/constants/theme';
import { BannerAdSize } from 'react-native-google-mobile-ads';
import { BannerAd } from 'react-native-google-mobile-ads';
import { useInterstitialAd } from '@/store/useInterstitialAd';
import { useLoadingStore } from '@/store/useLoadingStore';

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
  const { data: userData } = useUserData(user?.uid) || null;
  const { data: traitDetails } = useTraitDetails(userData?.refCodes?.en, 'goodsides');

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

  const { showAd, isLoaded, canShowAd } = useInterstitialAd();

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

  ////traitdetails.totalRaters varsa alttaki dataları da çek
  const [levelUpTrait, setLevelUpTrait] = useState<{
    trait: string;
    type: 'goodsides' | 'badsides';
  } | null>(null);
  const { data: goodTraits } = useTraitAverages(userData?.refCodes?.en, 'goodsides');
  const { data: badTraits } = useTraitAverages(userData?.refCodes?.en, 'badsides');
  const updateTaskTrait = useUpdateTaskTrait();
  const { taskData, refreshTasks, decrementRefreshes } = useTasks(user?.uid);
  const [refreshLimit, setRefreshLimit] = useState(taskData?.refreshesLeft ?? 0);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const { setIsLoading } = useLoadingStore();
  const [isFirstRefresh, setFirstRefresh] = useState(true);

  // Refresh sayacını taskData ile senkronize et
  useEffect(() => {
    if (taskData?.refreshesLeft !== undefined) {
      setRefreshLimit(taskData.refreshesLeft);
    }
  }, [taskData?.refreshesLeft]);

  // Load initial tasks and completed tasks
  useEffect(() => {
    async function loadTaskData() {
      setIsLoading(true);
      if (!user?.uid || !goodTraits || !badTraits || !userData) return;
      try {
        const today = new Date().toISOString().split('T')[0];
        let currentTasks: Task[] = [];
        let currentCompletedTasks: string[] = [];

        // 1. Önce kaydedilmiş taskları kontrol et
        const savedTasks = await StorageService.getDailyTasks(user.uid);

        if (savedTasks) {
          currentTasks = savedTasks;
        } else {
          // Eğer kaydedilmiş task yoksa yeni tasklar oluştur
          currentTasks = getInitialTasks();
          await StorageService.saveDailyTasks(user.uid, currentTasks);
          await refreshTasks.mutateAsync();
        }

        // 2. Firebase'den gelen lastTasksDates'e göre completed taskları belirle
        if (userData.lastTasksDates) {
          currentTasks.forEach((task) => {
            const lastCompletedDate = userData.lastTasksDates?.[task.trait];
            if (lastCompletedDate === today) {
              currentCompletedTasks.push(task.id);
            }
          });
        }

        // 3. State'leri güncelle
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
  }, [user?.uid, goodTraits, badTraits, userData]);

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

      // Level up kontrolü
      const task = tasks.find((t) => t.id === taskId);
      if (task) {
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
      // Önce reklam göstermeyi dene
      let adShown = false;
      if (isLoaded && (canShowAd() || isFirstRefresh)) {
        adShown = await showAd();
      }

      // Reklam gösterilsin veya gösterilmesin, task yenileme işlemine devam et
      const newTask = getRandomTask(trait);
      if (newTask) {
        const newTasks = tasks.map((task) =>
          task.id === taskId ? { ...newTask, id: `${trait}-${Date.now()}`, type: task.type } : task
        );

        // Task yenileme işlemlerini yap
        await Promise.all([
          StorageService.saveDailyTasks(user.uid, newTasks),
          decrementRefreshes.mutateAsync(),
        ]);

        setTasks(newTasks);
        setRefreshLimit((prev) => Math.max(0, prev - 1));
        setFirstRefresh(false);
        // Başarılı işlem mesajı
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
      <View className="flex-1 gap-4 p-4 pb-10">
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
        <TaskHeader />
        <TaskMotivation />

        <TaskInfo userData={userData ?? ({} as UserData)} />

        <TaskRefreshCounter refreshesLeft={refreshLimit} />
        {/* <TaskDebug /> */}
        <TaskList
          tasks={tasks}
          completedTasks={completedTasks}
          refreshLimit={refreshLimit}
          onRefreshTask={handleRefreshTask}
          onCompleteTask={handleCompleteTask}
        />

        <TaskProgress progress={timeUntilRefresh()} />

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
