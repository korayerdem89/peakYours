import { View, Image, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useState, useEffect, useLayoutEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/store/useAuth';
import { useTranslation } from '@/providers/LanguageProvider';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  withSpring,
  withSequence,
  useSharedValue,
  withDelay,
} from 'react-native-reanimated';
import { theme } from '@/constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DailyHoroscope } from '@/components/ideas/DailyHoroscope';
import Toast from 'react-native-toast-message';
import { UpgradeButton } from '@/components/buttons/UpgradeButton';
import { useTraits } from '@/providers/TraitProvider';
import { PersonalityAnimal, StoredAnalysis, PERSONALITY_ANIMALS } from '@/types/ideas';
import { generateAIAnalysis } from '@/constants/ideas/prompts';

export default function Ideas() {
  // Core hooks
  const { user } = useAuth();
  const { t, locale } = useTranslation();
  const { userData, traitDetails, goodTraits, badTraits } = useTraits();

  // Animation values
  const bounceValue = useSharedValue(0);
  const bounceStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bounceValue.value }],
  }));

  // State management
  const [personalityAnimal, setPersonalityAnimal] = useState<PersonalityAnimal | null>(null);
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Analysis generation
  const generateAnalysis = async () => {
    try {
      setIsLoading(true);

      if (!user?.zodiacSign || !goodTraits?.length || !badTraits?.length) {
        throw new Error('Missing required data');
      }

      const result = await generateAIAnalysis(goodTraits, badTraits, user.zodiacSign, locale);
      const animalKey = Object.keys(PERSONALITY_ANIMALS).find((key) => key === result.spiritAnimal);

      if (!animalKey || !PERSONALITY_ANIMALS[animalKey]) {
        throw new Error(`Invalid spirit animal: ${result.spiritAnimal}`);
      }

      setPersonalityAnimal(PERSONALITY_ANIMALS[animalKey]);
      setAnalysis(result.analysis);

      await storeAnalysis(
        animalKey,
        result.analysis,
        traitDetails?.totalRaters || 0,
        user.zodiacSign,
        locale
      );
    } catch (error) {
      console.error('Analysis generation error:', error);
      Toast.show({
        type: 'error',
        text1: t('ideas.analysisError'),
        position: 'bottom',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Storage functions
  const getStoredAnalysis = async (): Promise<StoredAnalysis | null> => {
    try {
      const stored = await AsyncStorage.getItem(`personality_analysis_${user?.uid}`);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Error reading stored analysis:', error);
      return null;
    }
  };

  const storeAnalysis = async (
    spiritAnimal: string,
    analysis: string,
    raterCount: number,
    zodiacSign: string,
    locale: string
  ) => {
    try {
      const dataToStore: StoredAnalysis = {
        spiritAnimal,
        analysis,
        lastUpdatedAt: Date.now(),
        lastRaterCount: raterCount,
        zodiacSign,
        locale,
      };
      await AsyncStorage.setItem(`personality_analysis_${user?.uid}`, JSON.stringify(dataToStore));
    } catch (error) {
      console.error('Error storing analysis:', error);
    }
  };

  // Effects
  useEffect(() => {
    const interval = setInterval(() => {
      bounceValue.value = withSequence(withSpring(-10), withDelay(100, withSpring(0)));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useLayoutEffect(() => {
    const loadAnalysis = async () => {
      if (!goodTraits || !badTraits || !user?.zodiacSign || !traitDetails) return;

      try {
        setIsLoading(true);
        const storedData = await getStoredAnalysis();

        if (
          !storedData ||
          storedData.zodiacSign !== user.zodiacSign ||
          storedData.locale !== locale ||
          !storedData.analysis
        ) {
          await generateAnalysis();
        } else {
          const animalKey = Object.keys(PERSONALITY_ANIMALS).find(
            (key) => key === storedData.spiritAnimal
          );

          if (animalKey && PERSONALITY_ANIMALS[animalKey]) {
            setPersonalityAnimal(PERSONALITY_ANIMALS[animalKey]);
            setAnalysis(storedData.analysis);
          } else {
            await generateAnalysis();
          }
        }
      } catch (error) {
        console.error('Error in loadAnalysis:', error);
        Toast.show({
          type: 'error',
          text1: t('ideas.analysisError'),
          position: 'bottom',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadAnalysis();
  }, [goodTraits, badTraits, user?.zodiacSign, traitDetails?.totalRaters, locale]);

  // Render functions
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center gap-3 bg-background-light dark:bg-background-dark">
        <ActivityIndicator size="large" color={theme.colors.primary.light} />
        <Text className="font-medium text-base text-primary-dark/70 dark:text-primary-light/70">
          {t('common.analyzing')}
        </Text>
      </View>
    );
  }

  if (userData?.membership?.type !== 'pro') {
    const features = t('ideas.freemember.features', {
      returnObjects: 'true' as const,
      defaultValue: '',
    }) as unknown as string[];

    return (
      <SafeAreaView className="flex-1 bg-accent-light pt-20 dark:bg-background-dark">
        <ScrollView
          className="flex-1 p-4"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}>
          <Animated.View entering={FadeIn.duration(1000)} className="mt-6 flex-1">
            <View className="rounded-sm bg-surface-light p-6 shadow-sm dark:bg-surface-dark">
              <Animated.View style={bounceStyle} className="mb-8 items-center">
                <Image
                  source={{ uri: 'https://picsum.photos/800/200' }}
                  className="h-24 w-full"
                  resizeMode="contain"
                />
              </Animated.View>

              <Text className="text-primary-default mb-4 text-center font-bold text-2xl dark:text-primary-light">
                {t('ideas.freemember.title')}
              </Text>

              <View className="mb-6 gap-1">
                {features.map((feature: string, index: number) => (
                  <Text
                    key={index}
                    className="text-base text-text-light-secondary dark:text-text-dark-secondary">
                    {feature}
                  </Text>
                ))}
              </View>

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
      <ScrollView
        className="flex-1 p-4"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <View className="flex-1 gap-4">
          <Animated.View
            entering={FadeIn.duration(500)}
            className="dark:bg-accent-dark/20 rounded-sm bg-accent-light/20 p-5">
            <Text className="text-center font-medium text-sm text-secondary-dark/80 dark:text-secondary-light/80">
              ✨ {t('ideas.accuracyWarning')} ✨
            </Text>
            <Text className="mt-2 text-center font-regular text-xs text-text-light dark:text-text-dark-secondary/60">
              {t('ideas.updateFrequency')}
            </Text>
          </Animated.View>
          {personalityAnimal && (
            <View className="flex-row items-center gap-5">
              {/* Zıplayan hayvan ikonu */}
              <Animated.View
                style={bounceStyle}
                className="items-center justify-center rounded-sm bg-amber-50 p-4  shadow-sm shadow-gray-500 dark:bg-primary-dark/25">
                <Image
                  source={personalityAnimal.image}
                  className="h-14 w-14 " // Biraz daha büyük
                  resizeMode="contain"
                />
              </Animated.View>

              {/* Text Content - Daha canlı renkler ve spacing */}
              <View className="flex-1">
                <Text className="mb-2 font-medium text-sm text-amber-500 dark:text-primary-light/70">
                  ⭐ {t('ideas.spiritAnimal.title')}
                </Text>
                <Text className="font-bold text-2xl text-amber-600 dark:text-primary-light">
                  {t(`ideas.animals.${personalityAnimal.id}.name`)}
                </Text>
                <Text className="mt-2 font-medium text-sm text-gray-400 dark:text-text-dark-secondary/80">
                  {t(`ideas.animals.${personalityAnimal.id}.trait`)}
                </Text>
              </View>
            </View>
          )}
          {user?.zodiacSign && (
            <DailyHoroscope
              goodTraits={goodTraits}
              badTraits={badTraits}
              zodiacSign={user?.zodiacSign}
            />
          )}
          {analysis && (
            <Animated.View
              entering={FadeIn.delay(400).duration(500)}
              className="rounded-sm bg-surface-light p-6 shadow-lg dark:bg-surface-dark">
              <Text className="mb-4 font-semibold text-xl text-primary-dark dark:text-primary-light">
                🔮 {t('ideas.analysis.title')}
              </Text>
              <Text
                className="text-base leading-relaxed text-text-light dark:text-text-dark-secondary"
                style={{ paddingBottom: 12 }}>
                {analysis || t('ideas.analysisError')}
              </Text>
            </Animated.View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
