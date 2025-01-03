import { View, Text, ScrollView, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { useTranslation } from '@/providers/LanguageProvider';
import { router } from 'expo-router';
import Animated, {
  FadeIn,
  SlideInDown,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useColorScheme } from 'nativewind';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { SUBSCRIPTION_PLANS as plans } from '@/constants/plans';
import { useRevenueCat } from '@/providers/RevenueCatProvider';
import { PurchasesPackage } from 'react-native-purchases';
import LinearGradient from 'react-native-linear-gradient';

export default function DiscountedPaywall() {
  const { t, locale } = useTranslation();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { allPackages, subscribeUser } = useRevenueCat();

  const pulseStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withRepeat(
            withSequence(
              withTiming(1, { duration: 100 }),
              withTiming(1.05, { duration: 1000 }),
              withTiming(1, { duration: 1000 })
            ),
            -1, // sonsuz tekrar
            true // yumuşak geçiş için
          ),
        },
      ],
    };
  });

  return (
    <Animated.View entering={FadeIn} className="flex-1 bg-accent">
      <ImageBackground
        className="flex-1"
        resizeMode="cover"
        source={require('@/assets/paywall/discountedPaywallBackground.png')}>
        <View className=" items-end px-4 pt-10">
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-10 w-10 items-center justify-center rounded-full bg-surface-light shadow-lg">
            <Ionicons
              name="close"
              size={24}
              color={isDark ? theme.colors.text.dark : theme.colors.text.light}
            />
          </TouchableOpacity>
        </View>
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Hero Section */}
          <View className="mb-6 mt-4 items-center justify-center bg-background-light py-[2px]  shadow-xl shadow-black">
            <ImageBackground
              source={require('@/assets/paywall/bgPattern.png')}
              resizeMode="contain"
              className="h-16 w-full"
            />
          </View>

          {/* Limited Time Banner */}
          <Animated.View entering={SlideInDown.delay(600)} className="mb-4 px-6">
            <View className="rounded-lg bg-primary-light/10 px-4 py-3 dark:bg-primary-dark/10">
              <Text className="text-center font-semibold text-error-dark">
                {t('paywall.ideas.limitedTime')}
              </Text>
            </View>
          </Animated.View>

          {/* Discount Rate */}
          <View className="mb-6 items-center gap-3 px-6">
            <View className="items-center">
              {/* Best Deal Badge */}

              {/* Discount Rate Image */}
              <Animated.View className="relative rotate-[-6deg]" style={pulseStyle}>
                <Image
                  source={require('@/assets/paywall/discountRate.png')}
                  className="h-[240px] w-[240px]"
                  resizeMode="cover"
                />
                <Text className="absolute bottom-16 left-0 right-0 text-center font-bold text-xl text-background-light">
                  Discount
                </Text>
              </Animated.View>
            </View>
          </View>

          {/* Plans */}
          <View className="px-6">
            {plans.map((plan, index) => {
              const selectedPlan = allPackages.find(
                (p) => p.packageType === plan.packageType && p.offeringIdentifier === 'discounted'
              ) as PurchasesPackage;

              return (
                <TouchableOpacity
                  onPress={() => {
                    subscribeUser(selectedPlan, locale);
                  }}
                  key={index}
                  className={`mb-4 rounded-xl border-2 bg-surface-light/60 p-4   ${
                    plan.isPopular ? 'border-primary-light ' : 'border-border-light/90  '
                  }`}>
                  <View className="mb-2 flex-row items-center justify-between">
                    <Text className="font-semibold text-lg capitalize text-text-light dark:text-text-dark">
                      {t(`paywall.ideas.plans.${plan.type}.title`)}
                    </Text>
                    {plan.isPopular && (
                      <View className="rounded-full bg-primary-light/20 px-3 py-1 dark:bg-primary-dark/20">
                        <Text className="font-medium text-xs text-primary-dark dark:text-primary-light">
                          {t('paywall.ideas.popular')}
                        </Text>
                      </View>
                    )}
                  </View>
                  <View className="flex-row items-baseline">
                    <Text className="font-bold text-2xl text-primary-dark dark:text-primary-light">
                      {selectedPlan ? selectedPlan.product.priceString : '...'}
                    </Text>
                    <Text className="ml-1 font-medium text-sm text-text-light dark:text-text-dark">
                      {t(`paywall.ideas.plans.${plan.type}.period`)}
                    </Text>
                  </View>
                  {plan.savings && (
                    <View className="self-start">
                      <Text className="mt-1 rounded-full bg-success-dark px-2 py-1 font-medium text-sm text-text-dark">
                        {t('paywall.ideas.savings', { amount: plan.savings })}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Terms */}
          <View className="items-center justify-center">
            <Text className="font-medium text-xs text-primary-dark">
              {t('paywall.ideas.terms')}
            </Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </Animated.View>
  );
}
