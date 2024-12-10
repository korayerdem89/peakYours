import { View, Text, ScrollView, useWindowDimensions } from 'react-native';
import { useTranslation } from '@/providers/LanguageProvider';
import { useDailyHoroscope } from '@/hooks/useDailyHoroscope';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, {
  FadeIn,
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withRepeat,
  withTiming,
  withSequence,
  withDelay,
} from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import { useMemo, useEffect, useState } from 'react';

interface DailyHoroscopeProps {
  goodTraits: Array<{ trait: string; value: number; color: string }>;
  badTraits: Array<{ trait: string; value: number; color: string }>;
  zodiacSign: string;
}

function LoadingAnimation() {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration: 2000 }), -1);
    scale.value = withRepeat(
      withSequence(withTiming(1.2, { duration: 1000 }), withTiming(1, { duration: 1000 })),
      -1
    );
    opacity.value = withRepeat(
      withSequence(withTiming(0.5, { duration: 1000 }), withTiming(1, { duration: 1000 })),
      -1
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }, { scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <View className="items-center justify-center space-y-4 py-8">
      <Animated.View style={animatedStyle}>
        <MaterialCommunityIcons name="lightbulb-on" size={40} color={theme.colors.primary.dark} />
      </Animated.View>
      <LoadingDots />
    </View>
  );
}

function LoadingDots() {
  const dots = [0, 1, 2];
  const animations = dots.map(() => useSharedValue(0));
  const { t } = useTranslation();
  useEffect(() => {
    dots.forEach((_, index) => {
      animations[index].value = withRepeat(
        withSequence(
          withDelay(index * 200, withTiming(1, { duration: 500 })),
          withDelay(600, withTiming(0, { duration: 500 }))
        ),
        -1
      );
    });
  }, []);

  return (
    <View className="flex-row items-center justify-center space-x-2">
      <Text className="text-base text-text-light/70 dark:text-text-dark/70">
        {t('ideas.dailyHoroscope.loading')}
      </Text>
    </View>
  );
}

interface StoredAdvice {
  general: string;
  love: string;
  career: string;
  timestamp: number;
  locale: string;
}

export function DailyHoroscope({ goodTraits, badTraits, zodiacSign }: DailyHoroscopeProps) {
  const { t, locale } = useTranslation();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [storedAdvice, setStoredAdvice] = useState<StoredAdvice | null>(null);
  const { width } = useWindowDimensions();
  const cardWidth = width - 64;
  const scrollX = useSharedValue(0);

  const {
    data: horoscope,
    isLoading,
    refetch,
  } = useDailyHoroscope({
    goodTraits,
    badTraits,
    zodiacSign,
    locale,
    enabled: false,
  });

  useEffect(() => {
    const loadNewAdvice = async () => {
      try {
        setIsInitialLoading(true);
        const newAdvice = await refetch();
        if (newAdvice.data) {
          const adviceWithTimestamp: StoredAdvice = {
            ...newAdvice.data,
            timestamp: Date.now(),
            locale,
          };
          await AsyncStorage.setItem('dailyAdvice', JSON.stringify(adviceWithTimestamp));
          setStoredAdvice(adviceWithTimestamp);
        }
      } catch (error) {
        console.error('Error loading advice for new locale:', error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    loadNewAdvice();
  }, [locale]);

  useEffect(() => {
    checkAndLoadAdvice();
  }, []);

  const checkAndLoadAdvice = async () => {
    try {
      const stored = await AsyncStorage.getItem('dailyAdvice');
      if (stored) {
        const parsedAdvice: StoredAdvice = JSON.parse(stored);
        const now = Date.now();
        const hoursSinceLastAdvice = (now - parsedAdvice.timestamp) / (1000 * 60 * 60);

        if (hoursSinceLastAdvice < 24 && parsedAdvice.locale === locale) {
          setStoredAdvice(parsedAdvice);
          setIsInitialLoading(false);
          return;
        }
      }

      const newAdvice = await refetch();
      if (newAdvice.data) {
        const adviceWithTimestamp: StoredAdvice = {
          ...newAdvice.data,
          timestamp: Date.now(),
          locale,
        };
        await AsyncStorage.setItem('dailyAdvice', JSON.stringify(adviceWithTimestamp));
        setStoredAdvice(adviceWithTimestamp);
      }
    } catch (error) {
      console.error('Error loading daily advice:', error);
    } finally {
      setIsInitialLoading(false);
    }
  };

  const currentAdvice = storedAdvice || horoscope;
  const isLoaderVisible = isInitialLoading || (isLoading && !storedAdvice);

  const cards = useMemo(
    () => [
      { tag: t('ideas.dailyHoroscope.tags.general'), content: currentAdvice?.general },
      { tag: t('ideas.dailyHoroscope.tags.love'), content: currentAdvice?.love },
      { tag: t('ideas.dailyHoroscope.tags.career'), content: currentAdvice?.career },
    ],
    [currentAdvice, t]
  );

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  if (!currentAdvice) return null;

  return (
    <Animated.View
      entering={FadeIn.delay(400).duration(500)}
      className="rounded-2xl bg-surface-light p-6 shadow-lg dark:bg-surface-dark">
      <View className="mb-4 flex-row items-center">
        <Text className="font-semibold text-xl text-primary-dark dark:text-primary-light">
          💡 {t('ideas.dailyHoroscope.title')}
        </Text>
      </View>

      {isLoaderVisible ? (
        <LoadingAnimation />
      ) : (
        <>
          <Animated.ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={cardWidth}
            decelerationRate="fast"
            snapToAlignment="center"
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            contentContainerStyle={{
              paddingHorizontal: 0,
              gap: 0,
            }}>
            {cards.map((card, index) => (
              <HoroscopeCard
                key={card.tag}
                tag={card.tag}
                content={card.content || ''}
                width={cardWidth}
              />
            ))}
          </Animated.ScrollView>

          <View className="mt-4 flex-row justify-center space-x-2">
            {cards.map((_, index) => (
              <PaginationDot key={index} index={index} scrollX={scrollX} cardWidth={cardWidth} />
            ))}
          </View>
        </>
      )}
    </Animated.View>
  );
}

function PaginationDot({
  index,
  scrollX,
  cardWidth,
}: {
  index: number;
  scrollX: Animated.SharedValue<number>;
  cardWidth: number;
}) {
  const animatedDotStyle = useAnimatedStyle(() => {
    const inputRange = [(index - 1) * cardWidth, index * cardWidth, (index + 1) * cardWidth];

    const width = interpolate(scrollX.value, inputRange, [8, 24, 8], 'clamp');

    const opacity = interpolate(scrollX.value, inputRange, [0.5, 1, 0.5], 'clamp');

    return {
      width,
      opacity,
    };
  });

  return (
    <Animated.View
      style={[animatedDotStyle]}
      className="h-2 rounded-full bg-primary-light dark:bg-primary-dark"
    />
  );
}

function HoroscopeCard({ tag, content, width }: { tag: string; content: string; width: number }) {
  return (
    <View style={{ width }} className="rounded-xl bg-primary-light/10 p-4 dark:bg-primary-dark/10">
      <Text className="mb-3 font-medium text-sm text-primary-dark/70 dark:text-primary-light/70">
        #{tag}
      </Text>
      <Text className="font-regular text-base text-text-light dark:text-text-dark">{content}</Text>
    </View>
  );
}
