import React from 'react';
import { View, Text, Pressable, Share } from 'react-native';
import { useTranslation } from '@/providers/LanguageProvider';
import { useAuth } from '@/store/useAuth';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';

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
    <Pressable
      onPress={handleShare}
      className="mt-2 flex-row items-center justify-center rounded-2xl border border-secondary-dark bg-[#eaf0fd] p-4 dark:bg-surface-dark"
      style={({ pressed }) => ({
        transform: [{ scale: pressed ? 0.98 : 1 }],
        shadowColor: theme.colors.secondary.default,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      })}>
      <View className="flex-row items-center justify-center gap-2">
        <MaterialIcons
          name="share"
          size={24}
          color={theme.colors.secondary.default}
          style={{ transform: [{ rotate: '-5deg' }] }}
        />
        <Text className="text-secondary-default font-poppins-semibold text-base text-secondary-dark">
          {t('personality.referral.shareButton')}
        </Text>
        <MaterialIcons name="arrow-forward-ios" size={20} color={theme.colors.secondary.default} />
      </View>
    </Pressable>
  );
}
