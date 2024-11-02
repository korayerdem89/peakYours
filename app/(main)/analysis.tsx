import { View } from 'react-native';
import { useEffect, useState } from 'react';
import { useAuth } from '@/store/useAuth';
import { UserService } from '@/services/user';
import { ZodiacModal } from '@/components/ZodiacModal';
import { useTranslation } from '@/providers/LanguageProvider';

export default function Analysis() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [showZodiacModal, setShowZodiacModal] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkUserZodiac() {
      if (!user?.uid) return;

      try {
        const userDoc = await UserService.getUser(user.uid);
        setUserData(userDoc);

        if (!userDoc?.zodiacSign) {
          setShowZodiacModal(true);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    checkUserZodiac();
  }, [user]);

  const handleZodiacSubmit = async (zodiacId: string) => {
    if (!user?.uid) return;

    try {
      await UserService.updateUser(user.uid, {
        zodiacSign: zodiacId,
      });

      setUserData((prev: any) => ({
        ...prev,
        zodiacSign: zodiacId,
      }));

      setShowZodiacModal(false);
    } catch (error) {
      console.error('Error updating zodiac sign:', error);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-background-light dark:bg-background-dark">
        {/* Loading indicator will go here */}
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
