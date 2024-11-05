import React from 'react';
import { View, Text, TouchableOpacity, Share } from 'react-native';
import { useTranslation } from '@/providers/LanguageProvider';
import { useAuth } from '@/store/useAuth';

export default function ReferralShare() {
  const { t, locale } = useTranslation();
  const { user } = useAuth();

  const handleShare = async () => {
    if (!user?.refCodes) return;

    try {
      const refCode = locale === 'zh' ? user.refCodes.zh : user.refCodes.en;

      await Share.share({
        message: t('personality.referral.shareMessage', { code: refCode }),
        title: t('personality.referral.shareTitle'),
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <View className="mt-6 rounded-xl bg-background-light p-4 dark:bg-surface-dark">
      <Text className="text-center font-medium text-base text-text-light-secondary dark:text-text-dark-secondary">
        {t('personality.referral.title')}
      </Text>

      <TouchableOpacity
        onPress={handleShare}
        className="mt-3 rounded-lg bg-secondary-light p-3 dark:bg-secondary-dark">
        <Text className="text-center font-semibold text-white">
          {t('personality.referral.shareButton')}
        </Text>
      </TouchableOpacity>

      <Text className="mt-2 text-center text-sm text-secondary-dark dark:text-text-dark-secondary">
        {t('personality.referral.description')}
      </Text>
    </View>
  );
}
