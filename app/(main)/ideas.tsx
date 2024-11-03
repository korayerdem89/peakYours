import { View, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { useAuth } from '@/store/useAuth';
import { UserService } from '@/services/user';
import { ZodiacModal } from '@/components/ZodiacModal';
import { useTranslation } from '@/providers/LanguageProvider';
import { Alert } from 'react-native';
import { useUserData } from '@/hooks/useUserQueries';

export default function Ideas() {
  const { user, updateUserData } = useAuth();
  const { t } = useTranslation();
  const [showZodiacModal, setShowZodiacModal] = useState(false);

  const { data: userData, isLoading } = useUserData(user?.uid);

  const handleZodiacSubmit = async (zodiacId: string) => {
    if (!user?.uid) return;

    try {
      await UserService.updateUser(user.uid, {
        zodiacSign: zodiacId,
      });

      updateUserData({ zodiacSign: zodiacId });

      setShowZodiacModal(false);
    } catch (error) {
      console.error('Error updating zodiac sign:', error);
      Alert.alert(t('common.error'), t('settings.zodiacCard.updateError'));
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-background-light dark:bg-background-dark">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!userData?.zodiacSign) {
    return (
      <View className="flex-1 bg-background-light dark:bg-background-dark">
        <ZodiacModal visible={true} onClose={() => {}} onSubmit={handleZodiacSubmit} />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background-light dark:bg-background-dark">
      {/* Analysis content will go here */}
    </View>
  );
}
