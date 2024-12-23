import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from '@/providers/LanguageProvider';
import { router } from 'expo-router';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
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

  const features = [
    {
      icon: '🧠',
      title: t('paywall.ideas.features.ai.title'),
      description: t('paywall.ideas.features.ai.description'),
    },
    {
      icon: '🎯',
      title: t('paywall.ideas.features.tasks.title'),
      description: t('paywall.ideas.features.tasks.description'),
    },
    {
      icon: '📊',
      title: t('paywall.ideas.features.insights.title'),
      description: t('paywall.ideas.features.insights.description'),
    },
  ];

  return (
    <BlurView intensity={90} tint={isDark ? 'dark' : 'light'} className="absolute h-full w-full">
      <Animated.View
        entering={FadeIn}
        className="flex-1 bg-background-light/90 dark:bg-background-dark/90">
        {/* Header */}
        <View className="flex-row items-center justify-between p-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-10 w-10 items-center justify-center rounded-full bg-surface-light dark:bg-surface-dark">
            <Ionicons
              name="close"
              size={24}
              color={isDark ? theme.colors.text.dark : theme.colors.text.light}
            />
          </TouchableOpacity>
          <Text className="font-medium text-base text-text-light dark:text-text-dark">
            {t('paywall.ideas.title')}
          </Text>
          <View style={{ width: 40 }} />
        </View>
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Hero Section */}
          <View className="items-center justify-center p-6">
            <Text className="mb-2 text-center font-bold text-3xl text-primary-dark dark:text-primary-light">
              {t('paywall.ideas.hero.title')}
            </Text>
            <Text className="text-center font-medium text-base text-text-light-secondary dark:text-text-dark-secondary">
              {t('paywall.ideas.hero.subtitle')}
            </Text>
          </View>

          {/* Features */}
          <View className="mb-6 px-6">
            {features.map((feature, index) => (
              <Animated.View
                key={index}
                entering={SlideInDown.delay(index * 200)}
                className="mb-4 flex-row items-start rounded-xl bg-surface-light p-4 dark:bg-surface-dark">
                <Text className="mr-4 text-2xl">{feature.icon}</Text>
                <View className="flex-1">
                  <Text className="mb-1 font-semibold text-base text-text-light dark:text-text-dark">
                    {feature.title}
                  </Text>
                  <Text className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                    {feature.description}
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
                  onPress={() => subscribeUser(selectedPlan)}
                  key={index}
                  className={`mb-4 rounded-xl border-2 p-4 ${
                    plan.isPopular
                      ? 'border-primary-light dark:border-primary-dark'
                      : 'border-border-light dark:border-border-dark'
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
                      {selectedPlan.product.priceString}
                    </Text>
                    <Text className="ml-1 text-sm text-text-light-secondary dark:text-text-dark-secondary">
                      {t(`paywall.ideas.plans.${plan.type}.period`)}
                    </Text>
                  </View>
                  {plan.savings && (
                    <Text className="mt-1 text-sm text-success-dark dark:text-success-light">
                      {t('paywall.ideas.savings', { amount: plan.savings })}
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Terms */}
          <Text className="mb-6 px-6 text-center text-xs text-text-light-secondary dark:text-text-dark-secondary">
            {t('paywall.ideas.terms')}
          </Text>
        </ScrollView>
      </Animated.View>
    </BlurView>
  );
}
