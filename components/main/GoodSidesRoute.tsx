import { Pressable, View, useWindowDimensions } from 'react-native';
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
import { AntDesign } from '@expo/vector-icons';

interface TraitBarProps {
  trait: string;
  value: number;
  color: string;
  delay: number;
}

function TraitBar({ trait, value, color, delay }: TraitBarProps) {
  const { t } = useTranslation();
  const layout = useWindowDimensions();
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
    <View className="xs:mb-1.5 flex-row items-center sm:mb-2 md:mb-2.5">
      <View className="flex-1">
        <Text
          style={{ color }}
          className="xs:text-xs font-medium sm:text-sm md:text-base"
          numberOfLines={1}>
          {t(`personality.traits.${trait}`)}
        </Text>
        <View className="xs:mt-0.5 flex-row items-center sm:mt-1 md:mt-1.5">
          <Animated.View className="xs:h-1 rounded-full sm:h-1.5 md:h-2" style={animatedStyle} />
        </View>
      </View>
      <Text className="xs:text-[10px] ml-2 text-gray-600 dark:text-gray-400 sm:text-xs md:text-sm">
        {value}% {t('personality.level')}
      </Text>
    </View>
  );
}

export default function GoodSidesRoute() {
  const { t } = useTranslation();
  const layout = useWindowDimensions();
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
    <View className="xs:m-1 rounded-sm bg-white dark:bg-gray-300 sm:m-2 md:m-3">
      <View className="xs:p-2 xs:pb-4 sm:p-3 sm:pb-6 md:p-4 md:pb-8">
        <Text className="xs:text-base xs:mb-1.5 font-semibold text-gray-800 sm:mb-2 sm:text-lg md:mb-3 md:text-xl">
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

        <Text className="xs:mt-2 xs:text-xs text-center font-medium text-gray-600 dark:text-gray-500 sm:mt-3 sm:text-sm md:mt-4 md:text-base">
          {t('personality.referral.inviteText')}
        </Text>

        <ReferralShare />

        <View className="xs:my-1 flex-row items-center justify-center sm:my-1.5 md:my-2">
          <Text className="xs:text-[10px] text-gray-500 dark:text-gray-400 sm:text-xs md:text-sm">
            {t('common.or')}
          </Text>
        </View>

        <Animated.View style={animatedStyle}>
          <Pressable
            onPress={handleRatePress}
            className="xs:mt-1 xs:p-2 flex-row items-center justify-center rounded-xl border border-primary-dark bg-[#f7f1ff] dark:bg-surface-dark sm:mt-1.5 sm:p-2.5 md:mt-2 md:p-3">
            <View className="xs:gap-1 flex-row items-center justify-center sm:gap-1.5 md:gap-2">
              <AntDesign
                name="star"
                size={layout.width < 380 ? 16 : layout.width < 420 ? 18 : 20}
                color={theme.colors.primary.default}
                style={{ transform: [{ rotate: '-15deg' }] }}
              />
              <Text className="xs:text-xs font-medium text-primary-dark sm:text-sm md:text-base">
                {t('personality.rating.rateFriends')}
              </Text>
            </View>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
}
