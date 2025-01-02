import { Tabs } from 'expo-router';
import { CustomTabBar } from '@/components/CustomTabBar';
import { Alert, Platform } from 'react-native';
import { useState } from 'react';
import { useTranslation } from '@/providers/LanguageProvider';
import { useAuth } from '@/store/useAuth';
import { useUpdateUser } from '@/hooks/useUserQueries';
import { ZodiacModal } from '@/components/ZodiacModal';

export default function MainLayout() {
  const { t } = useTranslation();
  const { user, updateUserData } = useAuth();
  const updateUser = useUpdateUser();
  const [isZodiacModalVisible, setIsZodiacModalVisible] = useState(user?.zodiacSign ? false : true);

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
      setIsZodiacModalVisible(false);
    } catch (error) {
      console.error('Error updating zodiac sign:', error);
      Alert.alert(t('common.error'), t('settings.zodiacCard.updateError'));
    }
  };

  return (
    <>
      <ZodiacModal
        visible={isZodiacModalVisible}
        onClose={() => setIsZodiacModalVisible(false)}
        onSubmit={handleZodiacSubmit}
      />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarStyle: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: Platform.OS === 'ios' ? 85 : 70,
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            elevation: 0,
          },
        }}
        tabBar={(props) => <CustomTabBar {...props} />}>
        <Tabs.Screen
          name="you"
          options={{
            title: t('tabs.you'),
          }}
        />
        <Tabs.Screen
          name="ideas"
          options={{
            title: t('tabs.ideas'),
          }}
        />
        <Tabs.Screen
          name="tasks"
          options={{
            title: t('tabs.tasks'),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: t('tabs.settings'),
          }}
        />
      </Tabs>
    </>
  );
}
