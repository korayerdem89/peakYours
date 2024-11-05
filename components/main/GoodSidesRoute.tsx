import { Pressable, View } from 'react-native';
import Animated, {
  withTiming,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withDelay,
  withRepeat,
  withSpring,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { Text } from 'react-native';
import { useTranslation } from '@/providers/LanguageProvider';
import { theme } from '@/constants/theme';
import ReferralShare from './ReferralShare';
import { router } from 'expo-router';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

interface TraitBarProps {
  trait: string;
  value: number;
  color: string;
  delay: number;
}

function TraitBar({ trait, value, color, delay }: TraitBarProps) {
  const { t } = useTranslation();
  const width = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${width.value}%`,
    backgroundColor: color,
  }));

  useEffect(() => {
    width.value = withDelay(
      delay,
      withSequence(
        withTiming(value, {
          duration: 600,
        })
      )
    );
  }, []);

  return (
    <View className="mb-3 flex-row items-center">
      <View className="flex-1">
        <Text style={{ color }} className="font-medium text-base">
          {t(`personality.traits.${trait}`)}
        </Text>
        <View className="mt-1 flex-row items-center">
          <Animated.View className="h-2 rounded-full" style={animatedStyle} />
        </View>
      </View>
      <Text className="ml-2 text-sm text-gray-600 dark:text-gray-400">
        {value}% {t('personality.level')}
      </Text>
    </View>
  );
}

export default function GoodSidesRoute() {
  const { t } = useTranslation();
  const shakeAnimation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(shakeAnimation.value * 4, {
            damping: 1,
            stiffness: 200,
          }),
        },
      ],
    };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      shakeAnimation.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 100 }),
          withTiming(-1, { duration: 100 }),
          withTiming(0, { duration: 100 })
        ),
        3
      );
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const traits = [
    {
      trait: 'friendly',
      color: theme.colors.personality.friendly,
      value: Math.floor(Math.random() * 100),
    },
    {
      trait: 'adventurous',
      color: theme.colors.personality.adventurous,
      value: Math.floor(Math.random() * 100),
    },
    {
      trait: 'thinker',
      color: theme.colors.personality.thinker,
      value: Math.floor(Math.random() * 100),
    },
    {
      trait: 'protective',
      color: theme.colors.personality.protective,
      value: Math.floor(Math.random() * 100),
    },
    {
      trait: 'cheerful',
      color: theme.colors.personality.cheerful,
      value: Math.floor(Math.random() * 100),
    },
    {
      trait: 'creativity',
      color: theme.colors.personality.creativity,
      value: Math.floor(Math.random() * 100),
    },
    {
      trait: 'leader',
      color: theme.colors.personality.leader,
      value: Math.floor(Math.random() * 100),
    },
  ];

  const handleRatePress = () => {
    router.push('/modal/rate');
  };

  return (
    <View className="m-2 rounded-2xl bg-white p-6 dark:bg-gray-300">
      <Text className="font-semibold text-xl text-gray-800">
        {t('personality.positiveTraits')} ✨
      </Text>
      {traits.map((trait, index) => (
        <TraitBar
          key={trait.trait}
          trait={trait.trait}
          value={trait.value}
          color={trait.color}
          delay={index * 150}
        />
      ))}

      <ReferralShare />
      <Animated.View style={animatedStyle}>
        <Pressable
          onPress={handleRatePress}
          className="mt-1 flex-row items-center justify-center rounded-2xl border border-primary-dark bg-surface-light p-4 dark:bg-surface-dark">
          <View className="flex-row items-center justify-center gap-2 space-x-3">
            <AntDesign
              name="star"
              size={24}
              color={theme.colors.primary.default}
              style={{ transform: [{ rotate: '-15deg' }] }}
            />
            <Text className="top-[1px] font-medium text-primary-dark">
              {t('personality.rating.rateFriends')}
            </Text>
          </View>
        </Pressable>
      </Animated.View>
    </View>
  );
}
