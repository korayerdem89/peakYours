import { View, Text, Pressable } from 'react-native';
import { useState, useCallback, useMemo } from 'react';
import { useTranslation } from '@/providers/LanguageProvider';
import { TraitBar } from './TraitBar';
import Animated, { FadeInDown } from 'react-native-reanimated';

const TOTAL_POINTS = 35;
const MAX_TRAIT_POINTS = 10;
const BAD_TRAIT_COLOR = '#D97650';

interface Trait {
  name: 'stubborn' | 'impatient' | 'moody' | 'arrogant' | 'jealous' | 'lazy' | 'careless';
  points: number;
}

export function BadSidesRateRoute() {
  const { t } = useTranslation();
  const [traits, setTraits] = useState<Trait[]>([
    { name: 'stubborn', points: 0 },
    { name: 'impatient', points: 0 },
    { name: 'moody', points: 0 },
    { name: 'arrogant', points: 0 },
    { name: 'jealous', points: 0 },
    { name: 'lazy', points: 0 },
    { name: 'careless', points: 0 },
  ]);

  const remainingPoints = useMemo(
    () => TOTAL_POINTS - traits.reduce((sum, trait) => sum + trait.points, 0),
    [traits]
  );

  const handlePointChange = useCallback((index: number, increase: boolean) => {
    setTraits((current) =>
      current.map((trait, idx) => {
        if (idx !== index) return trait;
        const newPoints = trait.points + (increase ? 1 : -1);
        if (newPoints < 0 || newPoints > MAX_TRAIT_POINTS) return trait;
        return { ...trait, points: newPoints };
      })
    );
  }, []);

  return (
    <Animated.View
      entering={FadeInDown.duration(300).springify()}
      className="xs:p-2 flex-1 sm:p-3 md:p-4">
      <View className="xs:mb-4 xs:p-2 flex-row items-center justify-between rounded-xl bg-surface-light dark:bg-surface-dark sm:mb-5 sm:p-2.5 md:mb-6 md:p-3">
        <Text className="xs:text-sm font-medium text-text-light dark:text-text-dark sm:text-base md:text-lg">
          {t('personality.rating.remainingPoints')}
        </Text>
        <Text className="xs:text-base font-semibold text-secondary-dark sm:text-lg md:text-xl">
          {remainingPoints}
        </Text>
      </View>

      {traits.map((trait, index) => (
        <TraitBar
          key={trait.name}
          name={trait.name}
          points={trait.points}
          color={BAD_TRAIT_COLOR}
          maxPoints={MAX_TRAIT_POINTS}
          onIncrease={() => handlePointChange(index, true)}
          onDecrease={() => handlePointChange(index, false)}
          remainingPoints={remainingPoints}
          label={t(`personality.negativeTraits.${trait.name}`)}
        />
      ))}

      <Pressable
        onPress={() => {
          /* Handle save */
        }}
        disabled={remainingPoints !== 0}
        className="xs:mt-3 xs:p-2.5 bg-primary-default rounded-xl opacity-90 disabled:opacity-50 sm:mt-3.5 sm:p-3 md:mt-4 md:p-4">
        <Text className="xs:text-sm text-center font-semibold text-white sm:text-base md:text-lg">
          {t('personality.rating.submit')}
        </Text>
      </Pressable>
    </Animated.View>
  );
}
