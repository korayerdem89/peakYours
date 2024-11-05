import { Pressable, View } from 'react-native';
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
    <View className="mb-3 flex-row items-center">
      <View className="flex-1">
        <Text style={{ color }} className="font-medium text-base">
          {t(`personality.negativeTraits.${trait}`)}
        </Text>
        <View className="mt-1 flex-row items-center">
          <Animated.View className="h-2 rounded-full" style={animatedStyle} />
        </View>
      </View>
      <Text className="ml-2 text-sm text-gray-600 dark:text-gray-400">
        {value}% {t('personality.level')}
      </Text>
    </View>
  );
}

export default function BadSidesRoute() {
  const { t } = useTranslation();
  const shakeAnimation = useSharedValue(0);

  // Renk paleti (koyudan açığa)
  const colorPalette = [
    '#FF6B6B', // En koyu kırmızı
    '#FF8E72',
    '#FFA07A',
    '#FFB88C',
    '#FFC1A1',
    '#FFCBB5',
    '#FFD5C9', // En açık kırmızı
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
    <View className="m-2 rounded-2xl bg-white p-6 pb-12 dark:bg-gray-300">
      <Text className="font-semibold text-xl text-gray-800">
        {t('personality.negativeTraitsTitle')} 🎯
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
      <Text className="mt-4 text-center font-medium text-base text-gray-600 dark:text-gray-500">
        {t('personality.referral.inviteText')}
      </Text>
      <ReferralShare />
      <View className="my-2 flex-row items-center justify-center">
        <Text className="text-gray-500 dark:text-gray-400">{t('common.or')}</Text>
      </View>
      <Animated.View style={animatedStyle}>
        <Pressable
          onPress={handleRatePress}
          className="mt-2 flex-row items-center justify-center rounded-2xl border border-primary-dark
bg-[#f7f1ff] p-4  "
          style={({ pressed }) => ({
            transform: [{ scale: pressed ? 0.98 : 1 }],
            shadowColor: theme.colors.primary.default,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          })}>
          <View className="flex-row items-center justify-center space-x-3">
            <AntDesign
              name="star"
              size={24}
              color={theme.colors.primary.default}
              style={{ transform: [{ rotate: '-5deg' }] }}
            />
            <Text className="text-primary-default font-poppins-semibold text-base  text-primary-dark">
              {t('personality.rating.rateFriends')}
            </Text>
            <MaterialIcons
              name="arrow-forward-ios"
              size={20}
              color={theme.colors.primary.default}
            />
          </View>
        </Pressable>
      </Animated.View>
    </View>
  );
}
