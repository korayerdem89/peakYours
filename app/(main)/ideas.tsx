import { View, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { useAuth } from '@/store/useAuth';
import { ZodiacModal } from '@/components/ZodiacModal';
import { useTranslation } from '@/providers/LanguageProvider';
import { Alert } from 'react-native';
import { useUpdateUser } from '@/hooks/useUserQueries';

export default function Ideas() {
  const { user, updateUserData } = useAuth();
  const { t } = useTranslation();
  const [showZodiacModal, setShowZodiacModal] = useState(!user?.zodiacSign);

  const updateUser = useUpdateUser();

  const handleZodiacSubmit = async (zodiacId: string) => {
    if (!user?.uid) return;

    try {
      await updateUser.mutateAsync({
        userId: user.uid,
        data: {
          zodiacSign: zodiacId,
        },
      });
      updateUserData({ zodiacSign: zodiacId });
      setShowZodiacModal(false);
    } catch (error) {
      console.error('Error updating zodiac sign:', error);
      Alert.alert(t('common.error'), t('settings.zodiacCard.updateError'));
    }
  };

  if (!user?.zodiacSign) {
    return (
      <View className="flex-1 bg-background-light dark:bg-background-dark">
        <ZodiacModal visible={showZodiacModal} onClose={() => {}} onSubmit={handleZodiacSubmit} />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background-light dark:bg-background-dark">
      {/* Analysis content will go here */}
    </View>
  );
}
