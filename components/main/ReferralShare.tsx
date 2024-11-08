import React from 'react';
import { View, Text, Pressable, Share, useWindowDimensions } from 'react-native';
import { useTranslation } from '@/providers/LanguageProvider';
import { useAuth } from '@/store/useAuth';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';

export default function ReferralShare() {
  const { t, locale } = useTranslation();
  const { user } = useAuth();
  const layout = useWindowDimensions();

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
      className="xs:mt-1 xs:p-2 flex-row items-center justify-center rounded-xl border border-secondary-dark bg-[#eaf0fd] dark:bg-surface-dark sm:mt-1.5 sm:p-2.5 md:mt-2 md:p-3"
      style={({ pressed }) => ({
        transform: [{ scale: pressed ? 0.98 : 1 }],
        shadowColor: theme.colors.secondary.default,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      })}>
      <View className="xs:gap-1 flex-row items-center justify-center sm:gap-1.5 md:gap-2">
        <MaterialIcons
          name="share"
          size={layout.width < 380 ? 16 : layout.width < 420 ? 18 : 20}
          color={theme.colors.secondary.default}
          style={{ transform: [{ rotate: '-5deg' }] }}
        />
        <Text className="xs:text-xs font-medium text-secondary-dark sm:text-sm md:text-base">
          {t('personality.referral.shareButton')}
        </Text>
        <MaterialIcons
          name="arrow-forward-ios"
          size={layout.width < 380 ? 14 : layout.width < 420 ? 16 : 18}
          color={theme.colors.secondary.default}
        />
      </View>
    </Pressable>
  );
}
