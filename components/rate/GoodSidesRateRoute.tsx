import { View, Text, Pressable } from 'react-native';
import { useState, useCallback, useMemo, memo } from 'react';
import { theme } from '@/constants/theme';
import { useTranslation } from '@/providers/LanguageProvider';
import { TraitBar } from './TraitBar';

const TOTAL_POINTS = 35;
const MAX_TRAIT_POINTS = 10;

interface Trait {
  name: keyof typeof theme.colors.personality;
  points: number;
}

export const GoodSidesRateRoute = memo(() => {
  const { t } = useTranslation();
  const [traits, setTraits] = useState<Trait[]>([
    { name: 'friendly', points: 0 },
    { name: 'adventurous', points: 0 },
    { name: 'thinker', points: 0 },
    { name: 'protective', points: 0 },
    { name: 'cheerful', points: 0 },
    { name: 'creativity', points: 0 },
    { name: 'leader', points: 0 },
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
    <View className="flex-1 p-4">
      <View className="mb-6 flex-row items-center justify-between rounded-xl bg-surface-light p-3 dark:bg-surface-dark">
        <Text className="font-medium text-base text-text-light dark:text-text-dark">
          {t('personality.rating.remainingPoints')}
        </Text>
        <Text className="font-semibold text-lg text-secondary-dark">{remainingPoints}</Text>
      </View>

      {traits.map((trait, index) => (
        <TraitBar
          key={trait.name}
          name={trait.name}
          points={trait.points}
          color={theme.colors.personality[trait.name]}
          maxPoints={MAX_TRAIT_POINTS}
          onIncrease={() => handlePointChange(index, true)}
          onDecrease={() => handlePointChange(index, false)}
          remainingPoints={remainingPoints}
          label={t(`personality.traits.${trait.name}`)}
        />
      ))}

      <Pressable
        onPress={() => {
          /* Handle save */
        }}
        disabled={remainingPoints !== 0}
        className="bg-primary-default mt-4 rounded-xl p-4 opacity-90 disabled:opacity-50">
        <Text className="text-center font-semibold text-white">
          {t('personality.rating.submit')}
        </Text>
      </Pressable>
    </View>
  );
});
