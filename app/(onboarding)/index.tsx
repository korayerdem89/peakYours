import { View, Text, Dimensions, Image, StyleSheet } from 'react-native';
import { router, useRouter } from 'expo-router';
import Button from '@/components/Button';
import { theme } from '@/constants/theme';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  useAnimatedScrollHandler,
  Extrapolate,
  withTiming,
} from 'react-native-reanimated';
import { useCallback, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppUsage } from '@/hooks/useAppUsage';
import { LANGUAGE_CHANGE_KEY } from '@/app/modal/language-select';
import { useTranslation } from '@/providers/LanguageProvider';

const AnimatedImage = Animated.createAnimatedComponent(Image);
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function OnboardingScreen() {
  const scrollX = useSharedValue(0);
  const scrollViewRef = useRef<Animated.ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [countdown, setCountdown] = useState<number | null>(2);
  const router = useRouter();
  const { isFirstTime } = useAppUsage();
  const { t } = useTranslation();

  const ONBOARDING_DATA = [
    {
      id: '1',
      title: t('onboarding.screen1.title'),
      description: t('onboarding.screen1.description'),
      image: require('@/assets/onboarding/rate.png'),
    },
    {
      id: '2',
      title: t('onboarding.screen2.title'),
      description: t('onboarding.screen2.description'),
      image: require('@/assets/onboarding/fortune.png'),
    },
    {
      id: '3',
      title: t('onboarding.screen3.title'),
      description: t('onboarding.screen3.description'),
      image: require('@/assets/onboarding/tasks.png'),
    },
  ];

  const isLastSlide = currentIndex === ONBOARDING_DATA.length - 1;

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((prev: number | null) => {
        if (!prev || prev <= 1) {
          clearInterval(countdownInterval);
          setIsButtonDisabled(false);
          return null;
        }
        return prev - 1;
      });
    }, 2000);

    return () => clearInterval(countdownInterval);
  }, []);

  useEffect(() => {
    async function checkLanguageSettings() {
      try {
        const lastLanguageChange = await AsyncStorage.getItem(LANGUAGE_CHANGE_KEY);
        if (!lastLanguageChange && isFirstTime) {
          router.push('/modal/language-select');
        }
      } catch (error) {
        console.error('Error checking language settings:', error);
      }
    }
    checkLanguageSettings();
  }, [isFirstTime]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const handleNext = useCallback(() => {
    setIsButtonDisabled(true);
    setCountdown(1);

    if (currentIndex < ONBOARDING_DATA.length - 1) {
      const nextIndex = currentIndex + 1;
      scrollViewRef.current?.scrollTo({
        x: nextIndex * SCREEN_WIDTH,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    } else {
      router.push('/(auth)/sign-in');
    }

    const countdownInterval = setInterval(() => {
      setCountdown((prev: number | null) => {
        if (!prev || prev <= 1) {
          clearInterval(countdownInterval);
          setIsButtonDisabled(false);
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [currentIndex]);

  const getButtonTitle = useCallback(() => {
    if (countdown !== null) {
      return `${isLastSlide ? t('common.getStarted') : t('common.next')} (${countdown})`;
    }
    return isLastSlide ? t('common.getStarted') : t('common.next');
  }, [isLastSlide, countdown, t]);

  return (
    <View className="flex-1 bg-accent-light dark:bg-background-dark">
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEnabled={false}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
          setCurrentIndex(newIndex);
        }}
        style={styles.scrollView}>
        {ONBOARDING_DATA.map((item, index) => {
          const inputRange = [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH,
          ];

          const imageAnimatedStyle = useAnimatedStyle(() => ({
            transform: [
              {
                scale: interpolate(scrollX.value, inputRange, [0.8, 1, 0.8], Extrapolate.CLAMP),
              },
            ],
            opacity: interpolate(scrollX.value, inputRange, [0.5, 1, 0.5], Extrapolate.CLAMP),
          }));

          return (
            <View key={item.id} style={styles.slide}>
              <AnimatedImage source={item.image} style={[styles.image, imageAnimatedStyle]} />
              <Text className="mt-8 text-center font-bold text-2xl text-primary-dark dark:text-text-dark">
                {item.title}
              </Text>
              <Text className="mt-4 text-center font-medium text-base text-primary-dark dark:text-text-dark">
                {item.description}
              </Text>
            </View>
          );
        })}
      </Animated.ScrollView>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {ONBOARDING_DATA.map((_, index) => {
            const dotAnimatedStyle = useAnimatedStyle(() => {
              const inputRange = [
                (index - 1) * SCREEN_WIDTH,
                index * SCREEN_WIDTH,
                (index + 1) * SCREEN_WIDTH,
              ];

              return {
                width: interpolate(scrollX.value, inputRange, [8, 20, 8], Extrapolate.CLAMP),
                opacity: interpolate(scrollX.value, inputRange, [0.5, 1, 0.5], Extrapolate.CLAMP),
              };
            });

            return <Animated.View key={index} style={[styles.dot, dotAnimatedStyle]} />;
          })}
        </View>
        <Button
          onPress={handleNext}
          variant="primary"
          size="lg"
          title={getButtonTitle()}
          disabled={isButtonDisabled}
          isLoading={isButtonDisabled}
          className="w-full"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  themeButton: {
    position: 'absolute',
    top: theme.spacing.xl,
    right: theme.spacing.lg,
    zIndex: 10,
    padding: theme.spacing.sm,
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  image: {
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_WIDTH * 0.81,
    borderRadius: theme.borderRadius.lg,
    resizeMode: 'cover',
    ...theme.shadows.md,
  },
  footer: {
    padding: theme.spacing.md,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    gap: theme.spacing.xs,
  },
  dot: {
    height: 8,
    backgroundColor: theme.colors.primary.default,
    borderRadius: theme.borderRadius.full,
  },
});
