import { View, Text, Pressable } from 'react-native';
import { useState, useCallback, useMemo, memo, useEffect } from 'react';
import { theme } from '@/constants/theme';
import { useTranslation } from '@/providers/LanguageProvider';
import { TraitBar } from './TraitBar';
import Toast from 'react-native-toast-message';
import { RatingService } from '@/services/rating';
import { useAuth } from '@/store/useAuth';
import Button from '../Button';
import { useQueryClient } from '@tanstack/react-query';
import * as Haptics from 'expo-haptics';
const TOTAL_POINTS = 35;
const MAX_TRAIT_POINTS = 10;

interface Trait {
  name: keyof typeof theme.colors.personality;
  points: number;
}

interface GoodSidesRateRouteProps {
  referenceCode: string;
  onTabChange: () => void;
}

export const GoodSidesRateRoute = memo(
  ({ referenceCode, onTabChange }: GoodSidesRateRouteProps) => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasExistingRating, setHasExistingRating] = useState(false);
    const [traits, setTraits] = useState<Trait[]>([
      { name: 'empathic', points: 0 },
      { name: 'friendly', points: 0 },
      { name: 'helpful', points: 0 },
      { name: 'honest', points: 0 },
      { name: 'patient', points: 0 },
      { name: 'reliable', points: 0 },
      { name: 'respectful', points: 0 },
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
      if (!user?.uid) return;

      const checkExistingRating = async () => {
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
          }
        } catch (error) {
          console.error('Error checking existing rating:', error);
        }
      };

      checkExistingRating();
    }, [referenceCode, user?.uid]);

    const handleReset = useCallback(async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['traitDetails', referenceCode],
        }),
        queryClient.invalidateQueries({
          queryKey: ['traitAverages', referenceCode, 'goodsides'],
        }),
      ]);
      setIsSubmitted(false);
      setHasExistingRating(false);
      setTraits(traits.map((trait) => ({ ...trait, points: 0 })));
    }, [queryClient, referenceCode]);

    const handleSubmit = useCallback(async () => {
      if (!user?.uid || remainingPoints !== 0) return;

      try {
        setIsLoading(true);
        await RatingService.saveRating(
          referenceCode,
          user.uid,
          traits,
          'goodsides',
          user?.displayName || ''
        );

        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: ['traitDetails', referenceCode],
          }),
          queryClient.invalidateQueries({
            queryKey: ['traitAverages', referenceCode, 'goodsides'],
          }),
        ]);

        setIsSubmitted(true);
        setHasExistingRating(true);

        Toast.show({
          type: 'info',
          text1: t('personality.rating.nextBadSides'),
          position: 'bottom',
          visibilityTime: 3000,
          onHide: () => onTabChange(),
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
    }, [user, remainingPoints, traits, referenceCode, queryClient, onTabChange, t]);

    // const handleTestSubmit = async () => {
    //   if (!user?.uid) return;

    //   const testUserId = Math.random().toString(36).substring(2, 15);

    //   const randomTraits = traits.map((trait) => ({
    //     ...trait,
    //     points: Math.floor(Math.random() * (MAX_TRAIT_POINTS + 1)),
    //   }));

    //   try {
    //     await RatingService.saveRating(
    //       referenceCode,
    //       testUserId,
    //       randomTraits,
    //       'goodsides',
    //       user?.displayName || ''
    //     );
    //     await Promise.all([
    //       queryClient.invalidateQueries({
    //         queryKey: ['traitDetails', referenceCode],
    //       }),
    //       queryClient.invalidateQueries({
    //         queryKey: ['traitAverages', referenceCode, 'goodsides'],
    //       }),
    //     ]);
    //     Toast.show({
    //       type: 'success',
    //       text1: t('personality.rating.testSuccess'),
    //       position: 'bottom',
    //       visibilityTime: 3000,
    //     });
    //   } catch (error) {
    //     Toast.show({
    //       type: 'error',
    //       text1: t('personality.rating.testError'),
    //       position: 'bottom',
    //       visibilityTime: 4000,
    //     });
    //   }
    // };

    return (
      <View className="xs:p-2 flex-1 sm:p-3 md:p-4">
        <View className="mb-3 flex-row items-center justify-between rounded-lg bg-surface-light p-2 dark:bg-surface-dark">
          <Text
            className={`font-medium text-sm ${!isSubmitted ? 'text-text-light' : 'w-full text-center text-secondary-dark'}`}>
            {isSubmitted
              ? t('personality.rating.yourRating')
              : t('personality.rating.remainingPoints')}
          </Text>
          {!(isSubmitted || hasExistingRating) && (
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
            onIncrease={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              handlePointChange(index, true);
            }}
            onDecrease={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              handlePointChange(index, false);
            }}
            remainingPoints={remainingPoints}
            label={t(`personality.traits.${trait.name}`)}
            disabled={isSubmitted || hasExistingRating}
          />
        ))}
        {!(isSubmitted || hasExistingRating) && (
          <Button
            size="sm"
            title={isSubmitted ? t('personality.rating.saved') : t('personality.rating.complete')}
            onPress={handleSubmit}
            disabled={remainingPoints !== 0 || isSubmitted || isLoading || hasExistingRating}
            className={`mt-4 ${
              remainingPoints !== 0 || isSubmitted || isLoading || hasExistingRating
                ? 'bg-gray-300'
                : 'bg-primary-default'
            }`}
          />
        )}

        {(hasExistingRating || isSubmitted) && (
          <Pressable
            onPress={handleReset}
            className="mt-4 items-center rounded-lg border border-secondary-dark bg-background-light p-2 shadow-lg shadow-secondary-light">
            <Text className="font-medium text-secondary-dark">
              {t('personality.rating.rateAgain')}
            </Text>
          </Pressable>
        )}

        {/* <Button
          size="sm"
          title="Test Submit"
          onPress={handleTestSubmit}
          className="mt-2 bg-gray-300 dark:bg-gray-600"
        /> */}
      </View>
    );
  }
);
