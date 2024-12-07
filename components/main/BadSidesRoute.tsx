import { Pressable, View, useWindowDimensions } from 'react-native';
import Animated, {
  withTiming,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withDelay,
} from 'react-native-reanimated';
import { useEffect, useMemo } from 'react';
import { Text } from 'react-native';
import { useTranslation } from '@/providers/LanguageProvider';
import { theme } from '@/constants/theme';
import { router } from 'expo-router';
import { useTraitAverages } from '@/hooks/useTraitAverages';
import { useAuth } from '@/store/useAuth';
import { useUserData } from '@/hooks/useUserQueries';
import { useTraitDetails } from '@/hooks/useTraitDetails';
import { MaterialIcons } from '@expo/vector-icons';
import ReferralShare from './ReferralShare';
import { calculateTraitValue } from '@/utils/numberHelpers';

interface TraitBarProps {
  trait: string;
  value: number;
  color: string;
  delay: number;
  style?: any;
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
  }, [delay, value]);

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
        {value} {t('personality.level')}
      </Text>
    </View>
  );
}

export default function BadSidesRoute() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { data: userData } = useUserData(user?.uid);
  const { data: traitAverages } = useTraitAverages(userData?.refCodes?.en, 'badsides');
  const { data: traitDetails } = useTraitDetails(userData?.refCodes?.en, 'badsides');
  const layout = useWindowDimensions();

  const colorPalette = [
    '#D94141',
    '#D96448',
    '#D97650',
    '#D98E62',
    '#D99777',
    '#D9A18B',
    '#D9AB9F',
  ];

  const traits = useMemo(() => {
    const unsortedTraits = [
      {
        trait: 'arrogant',
        value: calculateTraitValue('arrogant', traitAverages, userData?.traits, false),
      },
      {
        trait: 'jealous',
        value: calculateTraitValue('jealous', traitAverages, userData?.traits, false),
      },
      {
        trait: 'lazy',
        value: calculateTraitValue('lazy', traitAverages, userData?.traits, false),
      },
      {
        trait: 'pessimistic',
        value: calculateTraitValue('pessimistic', traitAverages, userData?.traits, false),
      },
      {
        trait: 'selfish',
        value: calculateTraitValue('selfish', traitAverages, userData?.traits, false),
      },
      {
        trait: 'forgetful',
        value: calculateTraitValue('forgetful', traitAverages, userData?.traits, false),
      },
      {
        trait: 'angry',
        value: calculateTraitValue('angry', traitAverages, userData?.traits, false),
      },
    ];

    return unsortedTraits
      .sort((a, b) => b.value - a.value)
      .map((trait, index) => ({
        ...trait,
        color: colorPalette[index],
      }));
  }, [traitAverages, userData?.traits]);

  return (
    <View className="xs:m-1 rounded-sm bg-white dark:bg-gray-700 sm:m-2 md:m-3">
      <View className="xs:p-2 xs:pb-4 sm:p-3 sm:pb-6 md:p-4 md:pb-8">
        <Text className="xs:text-sm font-semibold text-gray-800 dark:text-gray-900 sm:text-base md:text-lg">
          {t('personality.traitsTitle')} 🎯
        </Text>
        <View className="flex-row items-center justify-between">
          <Text className="mt-1 text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
            {t('personality.details.description', { count: traitDetails?.totalRaters || 0 })}
          </Text>

          {traitDetails?.totalRaters ? (
            <Pressable
              onPress={() => router.push('/modal/TraitDetails?type=badsides')}
              className="mt-2 flex-row items-center">
              <Text className="font-medium text-xs text-primary-dark sm:text-sm">
                {t('personality.details.viewAll')}
              </Text>
              <MaterialIcons
                name="chevron-right"
                size={16}
                color={theme.colors.primary.dark}
                style={{ marginLeft: 4 }}
              />
            </Pressable>
          ) : null}
        </View>
        <View className="my-2 h-[1px] bg-gray-300 dark:bg-border-dark" />
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

        <Animated.View>
          <Pressable
            onPress={() => router.push('/modal/rate')}
            className="xs:mt-1 xs:p-2 flex-row items-center justify-center rounded-xl border border-primary-dark bg-[#f7f1ff] dark:bg-gray-300 sm:mt-1.5 sm:p-2.5 md:mt-2 md:p-3">
            <View className="xs:gap-1 flex-row items-center justify-center sm:gap-1.5 md:gap-2">
              <MaterialIcons
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
