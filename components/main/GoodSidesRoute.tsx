import { View } from 'react-native';
import Animated, {
  withTiming,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withDelay,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { Text } from 'react-native';
import { useTranslation } from '@/providers/LanguageProvider';
import { theme } from '@/constants/theme';
import ReferralShare from './ReferralShare';

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
          duration: 1200,
        })
      )
    );
  }, []);

  return (
    <View className="flex-row items-center ">
      <View className="flex-1">
        <Text style={{ color }} className="font-medium text-base">
          {t(`personality.traits.${trait}`)}
        </Text>
        <Text className="text-md mt-1 font-semibold text-gray-900">
          {value}%{' '}
          <Text className="mt-1 font-regular text-xs text-gray-900">{t('personality.level')}</Text>
        </Text>
      </View>
      <View className="h-4 flex-1 overflow-hidden rounded-lg bg-gray-100">
        <Animated.View style={[animatedStyle]} className="h-full rounded-lg" />
      </View>
    </View>
  );
}

export default function GoodSidesRoute() {
  const { t } = useTranslation();

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
    </View>
  );
}
