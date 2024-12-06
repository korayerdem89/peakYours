import Animated, {
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { theme } from '@/constants/theme';
import { useTranslation } from '@/providers/LanguageProvider';

interface TraitLevelUpAnimationProps {
  trait: string;
  onComplete: () => void;
  type: 'goodsides' | 'badsides';
}

export function TraitLevelUpAnimation({ trait, onComplete, type }: TraitLevelUpAnimationProps) {
  const { t } = useTranslation();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withSequence(
        withTiming(1, { duration: 500 }),
        withDelay(
          2000,
          withTiming(0, {
            duration: 1500,
            easing: Easing.out(Easing.ease),
          })
        )
      ),
      transform: [
        {
          translateY: withSequence(
            withTiming(-100, {
              duration: 2000,
              easing: Easing.out(Easing.ease),
            }),
            withDelay(
              2000,
              withTiming(-150, {
                duration: 1500,
                easing: Easing.out(Easing.ease),
              })
            )
          ),
        },
      ],
    };
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => clearTimeout(timeout);
  }, [onComplete]);

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          bottom: 100,
          alignSelf: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: theme.colors.personality[trait as keyof typeof theme.colors.personality],
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 20,
        },
        animatedStyle,
      ]}>
      <Animated.Text className="font-poppins-semibold mr-2 text-base text-white">
        {t(`personality.traits.${trait}`)}
      </Animated.Text>
      <Animated.Text className="font-poppins-bold text-base text-white">
        {type === 'goodsides' ? '+1' : '-1'}
      </Animated.Text>
    </Animated.View>
  );
}
