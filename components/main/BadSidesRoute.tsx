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
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

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
          {t(`personality.negativeTraits.${trait}`)}
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

export default function BadSidesRoute() {
  const { t } = useTranslation();
  const layout = useWindowDimensions();
  const shakeAnimation = useSharedValue(0);

  // Renk paleti (koyudan açığa)
  const colorPalette = [
    '#D94141', // En koyu kırmızı
    '#D96448',
    '#D97650',
    '#D98E62',
    '#D99777',
    '#D9A18B',
    '#D9AB9F', // En açık kırmızı
  ];

  // Rastgele değerlerle traits oluştur
  const unsortedTraits = [
    { trait: 'stubborn', value: Math.floor(Math.random() * 100) },
    { trait: 'impatient', value: Math.floor(Math.random() * 100) },
    { trait: 'moody', value: Math.floor(Math.random() * 100) },
    { trait: 'arrogant', value: Math.floor(Math.random() * 100) },
    { trait: 'jealous', value: Math.floor(Math.random() * 100) },
    { trait: 'lazy', value: Math.floor(Math.random() * 100) },
    { trait: 'careless', value: Math.floor(Math.random() * 100) },
  ];

  // Value değerine göre sırala ve renkleri ata
  const traits = unsortedTraits
    .sort((a, b) => b.value - a.value) // Büyükten küçüğe sırala
    .map((trait, index) => ({
      ...trait,
      color: colorPalette[index], // Sıralamaya göre renk ata
    }));

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(shakeAnimation.value * 4, {
            damping: 2,
            stiffness: 400,
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
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleRatePress = () => {
    router.push('/modal/rate');
  };

  return (
    <View className="xs:m-1 rounded-xl bg-white dark:bg-gray-300 sm:m-1.5 md:m-2">
      <View className="xs:p-2 xs:pb-4 sm:p-3 sm:pb-6 md:p-4 md:pb-8">
        <Text className="xs:text-base xs:mb-1.5 font-semibold text-gray-800 sm:mb-2 sm:text-lg md:mb-3 md:text-xl">
          {t('personality.negativeTraitsTitle')} 🎯
        </Text>

        {/* TraitBar listesi */}

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
