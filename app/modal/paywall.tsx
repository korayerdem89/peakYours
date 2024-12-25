import { View, Text, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { useTranslation } from '@/providers/LanguageProvider';
import { router } from 'expo-router';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { useColorScheme } from 'nativewind';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { SUBSCRIPTION_PLANS as plans } from '@/constants/plans';
import { useRevenueCat } from '@/providers/RevenueCatProvider';
import { PurchasesPackage } from 'react-native-purchases';

export default function Paywall() {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { packages, subscribeUser } = useRevenueCat();

  const benefits = [
    {
      icon: '🚀',
      title: t('paywall.ideas.benefits.growth.title'),
      description: t('paywall.ideas.benefits.growth.description'),
    },
    {
      icon: '💪',
      title: t('paywall.ideas.benefits.confidence.title'),
      description: t('paywall.ideas.benefits.confidence.description'),
    },
    {
      icon: '🤝',
      title: t('paywall.ideas.benefits.relationships.title'),
      description: t('paywall.ideas.benefits.relationships.description'),
    },
  ];

  return (
    <Animated.View entering={FadeIn} className="flex-1 bg-accent">
      <ImageBackground
        className="flex-1"
        resizeMode="cover"
        source={require('@/assets/paywall/paywallBackground.png')}>
        <View className=" items-end px-4 pt-10">
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-10 w-10 items-center justify-center rounded-full bg-surface-light dark:bg-surface-dark">
            <Ionicons
              name="close"
              size={24}
              color={isDark ? theme.colors.text.dark : theme.colors.text.light}
            />
          </TouchableOpacity>
        </View>
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Hero Section */}
          <View className="mb-6 mt-4 items-center justify-center bg-background-light py-1 shadow-2xl">
            <Text className="mb-2 text-center font-bold text-3xl text-primary-dark dark:text-primary-light">
              {t('paywall.ideas.title')}
            </Text>
          </View>

          {/* Benefits */}
          <View className="mb-6 px-6">
            {benefits.map((benefit, index) => (
              <Animated.View
                key={index}
                entering={SlideInDown.delay(index * 200)}
                className="mb-4 flex-row items-start rounded-xl bg-surface-light p-4 opacity-90">
                <Text className="mr-4 text-2xl">{benefit.icon}</Text>
                <View className="flex-1">
                  <Text className="mb-1 font-semibold text-base text-text-light dark:text-text-dark">
                    {benefit.title}
                  </Text>
                  <Text className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                    {benefit.description}
                  </Text>
                </View>
              </Animated.View>
            ))}
          </View>

          {/* Plans */}
          <View className="mb-6 px-6">
            {plans.map((plan, index) => {
              const selectedPlan = packages.find(
                (p) => p.packageType === plan.packageType
              ) as PurchasesPackage;
              return (
                <TouchableOpacity
                  onPress={() => {
                    subscribeUser(selectedPlan);
                  }}
                  key={index}
                  className={`mb-4 rounded-xl border-2 bg-surface-light/40 p-4 ${
                    plan.isPopular
                      ? 'border-primary-light '
                      : 'border-border-light/60 bg-surface-light/50'
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
