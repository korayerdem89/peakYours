import { View, Text, Pressable } from 'react-native';
import { useState, useCallback, useMemo, memo, useEffect } from 'react';
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
  const [hasExistingRating, setHasExistingRating] = useState(false);
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

  useEffect(() => {
    const checkExistingRating = async () => {
      if (!user?.uid) return;

      try {
        const exists = await RatingService.checkExistingRating(
          referenceCode,
          user.uid,
          'goodsides'
        );
        if (exists) {
          const previousRating = await RatingService.getPreviousRating(
            referenceCode,
            user.uid,
            'goodsides'
          );
          if (previousRating) {
            setTraits(
              previousRating.traits.map((trait) => ({
                name: trait.name as keyof typeof theme.colors.personality,
                points: trait.points,
              }))
            );
          }
          setIsSubmitted(true);
          setHasExistingRating(true);
          Toast.show({
            type: 'info',
            text1: t('personality.rating.alreadyRated'),
            position: 'bottom',
            visibilityTime: 3000,
          });
        }
      } catch (error) {
        console.error('Error checking existing rating:', error);
      }
    };

    checkExistingRating();
  }, [referenceCode, user?.uid, t]);

  const handleSubmit = async () => {
    if (!user?.uid || remainingPoints !== 0) return;

    try {
      setIsLoading(true);
      await RatingService.saveRating(referenceCode, user.uid, traits, 'goodsides');

      setIsSubmitted(true);
      setHasExistingRating(true);

      Toast.show({
        type: 'success',
        text1: t('personality.rating.success'),
        text2: t('personality.rating.successMessage'),
        position: 'bottom',
        visibilityTime: 3000,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: t('personality.rating.errorMessage'),
        position: 'bottom',
        visibilityTime: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = useCallback(() => {
    setIsSubmitted(false);
    setHasExistingRating(false);
    setTraits(traits.map((trait) => ({ ...trait, points: 0 })));
  }, []);

  return (
    <View className="xs:p-2 flex-1 sm:p-3 md:p-4">
      <View className="mb-3 flex-row items-center justify-between rounded-lg bg-surface-light p-2 dark:bg-surface-dark">
        <Text
          className={`font-medium text-sm ${!isSubmitted ? 'text-text-light' : 'text-secondary-dark'} dark:text-text-dark`}>
          {isSubmitted
            ? t('personality.rating.yourRating')
            : t('personality.rating.remainingPoints')}
        </Text>
        {!isSubmitted && (
          <Text className="font-semibold text-base text-secondary-dark">{remainingPoints}</Text>
        )}
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
          disabled={isSubmitted || hasExistingRating}
        />
      ))}

      <Button
        size="sm"
        title={isSubmitted ? t('personality.rating.saved') : t('personality.rating.complete')}
        onPress={handleSubmit}
        disabled={remainingPoints !== 0 || isSubmitted || isLoading}
        className={`mt-4 ${
          remainingPoints !== 0 || isSubmitted || isLoading
            ? 'bg-gray-300 dark:bg-gray-600'
            : 'bg-primary-default'
        }`}
      />

      {hasExistingRating && (
        <Pressable onPress={handleReset} className="mt-4 items-center">
          <Text className="font-medium text-secondary-dark">
            {t('personality.rating.rateAgain')}
          </Text>
        </Pressable>
      )}
    </View>
  );
});
