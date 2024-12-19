import { View, Text, Modal, Pressable, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useTranslation } from '@/providers/LanguageProvider';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import Button from '../Button';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';

interface PaywallModalProps {
  visible: boolean;
  onClose: () => void;
  onSubscribe: (plan: 'monthly' | 'annual') => void;
}

export default function PaywallModal({ visible, onClose, onSubscribe }: PaywallModalProps) {
  const { t } = useTranslation();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('annual');

  const plans = {
    monthly: {
      price: 5.99,
      savings: 0,
      period: t('subscription.monthly'),
    },
    annual: {
      price: 35.99,
      savings: 50,
      period: t('subscription.annual'),
      monthlyPrice: 2.99,
    },
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View className="flex-1 bg-black/50">
        <Animated.View
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}
          className="flex-1 justify-end">
          <View className="rounded-t-3xl bg-background-light dark:bg-background-dark">
            {/* Header */}
            <View className="items-end p-4">
              <Pressable onPress={onClose}>
                <MaterialIcons name="close" size={24} color={theme.colors.text.light} />
              </Pressable>
            </View>

            {/* Hero Image */}
            <View className="items-center px-6">
              <Image
                source={require('@/assets/paywall/example.png')}
                className="h-48 w-48"
                resizeMode="contain"
              />
            </View>

            {/* Content */}
            <View className="px-6 py-4">
              <Text className="mb-2 text-center font-bold text-2xl text-primary-dark dark:text-primary-light">
                {t('subscription.unlockPro')}
              </Text>

              <Text className="mb-6 text-center text-base text-text-light-secondary dark:text-text-dark-secondary">
                {t('subscription.description')}
              </Text>

              {/* Features List */}
              <View className="mb-6 space-y-3">
                {['analysis', 'tasks', 'ratings', 'updates'].map((feature) => (
                  <View key={feature} className="flex-row items-center">
                    <MaterialIcons
                      name="check-circle"
                      size={20}
                      color={theme.colors.primary.default}
                    />
                    <Text className="ml-3 text-text-light dark:text-text-dark">
                      {t(`subscription.features.${feature}`)}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Plan Selection */}
              <View className="mb-6 gap-3">
                {/* Annual Plan */}
                <TouchableOpacity
                  onPress={() => setSelectedPlan('annual')}
                  className={`rounded-xl border-2 p-4 ${
                    selectedPlan === 'annual'
                      ? 'border-primary-default bg-primary-default/10'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}>
                  <View className="flex-row items-center justify-between">
                    <View>
                      <Text className="font-semibold text-text-light dark:text-text-dark">
                        {t('subscription.annual')}
                      </Text>
                      <Text className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                        ${plans.annual.monthlyPrice}/mo (${plans.annual.price}/yr)
                      </Text>
                    </View>
                    <View className="rounded-full bg-primary-light/20 px-3 py-1">
                      <Text className="font-medium text-sm text-primary-dark">
                        Save {plans.annual.savings}%
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>

                {/* Monthly Plan */}
                <TouchableOpacity
                  onPress={() => setSelectedPlan('monthly')}
                  className={`rounded-xl border-2 p-4 ${
                    selectedPlan === 'monthly'
                      ? 'border-primary-default bg-primary-default/10'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}>
                  <View className="flex-row items-center justify-between">
                    <View>
                      <Text className="font-semibold text-text-light dark:text-text-dark">
                        {t('subscription.monthly')}
                      </Text>
                      <Text className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                        ${plans.monthly.price}/mo
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Subscribe Button */}
              <Button
                size="lg"
                title={t('subscription.subscribe')}
                onPress={() => onSubscribe(selectedPlan)}
                className="bg-primary-default mb-2"
              />

              {/* Terms */}
              <Text className="mb-6 text-center text-xs text-text-light-secondary dark:text-text-dark-secondary">
                {t('subscription.terms')}
              </Text>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}
