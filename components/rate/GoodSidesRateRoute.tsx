import { View, Text, Pressable } from 'react-native';
import { useState, useCallback, useMemo, memo } from 'react';
import { theme } from '@/constants/theme';
import { useTranslation } from '@/providers/LanguageProvider';
import { TraitBar } from './TraitBar';
import Toast from 'react-native-toast-message';
import { RatingService } from '@/services/rating';
import { useAuth } from '@/store/useAuth';
import Button from '../Button';

const TOTAL_POINTS = 35;
const MAX_TRAIT_POINTS = 10;

interface Trait {
  name: keyof typeof theme.colors.personality;
  points: number;
}

interface GoodSidesRateRouteProps {
  referenceCode: string;
}

export const GoodSidesRateRoute = memo(({ referenceCode }: GoodSidesRateRouteProps) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showReset, setShowReset] = useState(false);
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

  const handleSubmit = async () => {
    if (!user?.uid || remainingPoints !== 0) return;
    try {
      console.log('trying');
      setIsLoading(true);
      await RatingService.saveRating(referenceCode, user.uid, traits, 'goodsides');
      setIsSubmitted(true);
      setShowReset(true);
      Toast.show({
        type: 'success',
        text1: t('personality.rating.saveSuccess'),
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: t('personality.rating.saveError'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async () => {
    if (!user?.uid) return;

    try {
      setIsLoading(true);
      await RatingService.deleteRating(referenceCode, user.uid, 'goodsides');
      setTraits(traits.map((trait) => ({ ...trait, points: 0 })));
      setIsSubmitted(false);
      setShowReset(false);
      Toast.show({
        type: 'success',
        text1: t('personality.rating.ratingDeleted'),
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: t('personality.rating.deleteError'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="xs:p-2 flex-1 sm:p-3 md:p-4">
      <View className="mb-3 flex-row items-center justify-between rounded-lg bg-surface-light p-2 dark:bg-surface-dark">
        <Text className="font-medium text-sm text-text-light dark:text-text-dark">
          {t('personality.rating.remainingPoints')}
        </Text>
        <Text className="font-semibold text-base text-secondary-dark">{remainingPoints}</Text>
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
      <Button
        size="sm"
        title={t('personality.rating.complete')}
        onPress={handleSubmit}
        disabled={remainingPoints !== 0 || isSubmitted || isLoading}
      />

      <Pressable
        onPress={handleSubmit}
        disabled={remainingPoints !== 0 || isSubmitted || isLoading}
        className="xs:mt-3 bg-primary-default rounded-xl p-3 disabled:opacity-50 sm:mt-3.5 md:mt-4">
        <Text className="xs:text-sm text-center font-semibold text-white sm:text-base md:text-lg">
          {isSubmitted ? t('personality.rating.saved') : t('personality.rating.complete')}
        </Text>
      </Pressable>

      {showReset && (
        <Pressable onPress={handleReset} className="xs:mt-2 sm:mt-2.5 md:mt-3">
          <Text className="xs:text-xs text-center font-medium text-secondary-dark sm:text-sm md:text-base">
            {t('personality.rating.rateAgain')}
          </Text>
        </Pressable>
      )}
    </View>
  );
});
