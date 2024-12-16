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
} from 'react-native-reanimated';
import { useCallback, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppUsage } from '@/hooks/useAppUsage';
import { LANGUAGE_CHANGE_KEY } from '@/app/modal/language-select';

const AnimatedImage = Animated.createAnimatedComponent(Image);
const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ONBOARDING_DATA = [
  {
    id: '1',
    title: 'Track Your Progress',
    description: 'Monitor your fitness journey with detailed analytics',
    image: 'https://picsum.photos/id/237/800/1200',
  },
  {
    id: '2',
    title: 'Join Challenges',
    description: 'Compete with friends and achieve your goals together',
    image: 'https://picsum.photos/id/239/800/1200',
  },
  {
    id: '3',
    title: 'Expert Guidance',
    description: 'Get personalized workout plans from professionals',
    image: 'https://picsum.photos/id/240/800/1200',
  },
];

const AUTO_SCROLL_INTERVAL = 4000;
const COUNTDOWN_DURATION = 1;

export default function OnboardingScreen() {
  const scrollX = useSharedValue(0);
  const scrollViewRef = useRef<Animated.ScrollView>(null);
  const currentIndex = useRef(0);
  const [countdown, setCountdown] = useState(COUNTDOWN_DURATION);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const router = useRouter();
  const { isFirstTime } = useAppUsage();

  useEffect(() => {
    async function checkLanguageSettings() {
      try {
        const lastLanguageChange = await AsyncStorage.getItem(LANGUAGE_CHANGE_KEY);

        // Dil seçimi yapılmamış ve ilk kez giriş yapılıyorsa
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

  const autoScroll = useCallback(() => {
    if (currentIndex.current < ONBOARDING_DATA.length - 1) {
      currentIndex.current += 1;
    } else {
      currentIndex.current = 0;
    }

    scrollViewRef.current?.scrollTo({
      x: currentIndex.current * SCREEN_WIDTH,
      animated: true,
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(autoScroll, AUTO_SCROLL_INTERVAL);
    return () => clearInterval(interval);
  }, [autoScroll]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setIsButtonEnabled(true);
    }
  }, [countdown]);

  return (
    <View className="flex-1 bg-accent-light dark:bg-background-dark">
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
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
              <AnimatedImage
                source={{ uri: item.image }}
                style={[styles.image, imageAnimatedStyle]}
              />
              <Text className="font-poppins-semibold mt-8 text-center text-2xl text-text-light dark:text-text-dark">
                {item.title}
              </Text>
              <Text className="font-poppins-regular mt-4 text-center text-base text-text-light dark:text-text-dark">
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
          onPress={() => router.push('/(auth)/sign-in')}
          variant="primary"
          size="lg"
          title={isButtonEnabled ? 'Get Started' : `Wait ${countdown}s`}
          className={`w-full ${!isButtonEnabled && 'opacity-50'}`}
          disabled={!isButtonEnabled}
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
