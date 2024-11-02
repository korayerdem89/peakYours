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
    <View className="mb-6 flex-row items-center">
      <View className="w-36">
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
      trait: 'extraversion',
      color: theme.colors.personality.extraversion,
      value: Math.floor(Math.random() * 100),
    },
    {
      trait: 'agreeableness',
      color: theme.colors.personality.agreeableness,
      value: Math.floor(Math.random() * 100),
    },
    {
      trait: 'conscientiousness',
      color: theme.colors.personality.conscientiousness,
      value: Math.floor(Math.random() * 100),
    },
    {
      trait: 'emotional',
      color: theme.colors.personality.emotional,
      value: Math.floor(Math.random() * 100),
    },
    {
      trait: 'openness',
      color: theme.colors.personality.openness,
      value: Math.floor(Math.random() * 100),
    },
    {
      trait: 'empathy',
      color: theme.colors.personality.empathy,
      value: Math.floor(Math.random() * 100),
    },
    {
      trait: 'creativity',
      color: theme.colors.personality.creativity,
      value: Math.floor(Math.random() * 100),
    },
  ];

  return (
    <View className="rounded-2xl bg-white p-6">
      <Text className="mb-6 font-semibold text-xl text-gray-800">
        {t('personality.positiveTraits')}
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
    </View>
  );
}
