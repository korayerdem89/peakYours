import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import { useAuth } from '@/store/useAuth';
import { useEffect, useState } from 'react';
import { ZodiacModal } from '@/components/ZodiacModal';
import { useUpdateUser } from '@/hooks/useUserQueries';
import { Alert } from 'react-native';
import { useTranslation } from '@/providers/LanguageProvider';

export default function MainLayout() {
  const { colorScheme } = useColorScheme();
  const { user, updateUserData } = useAuth();
  const { t } = useTranslation();
  const [isZodiacModalVisible, setIsZodiacModalVisible] = useState(false);
  const updateUser = useUpdateUser();

  useEffect(() => {
    if (user && !user.zodiacSign) {
      setIsZodiacModalVisible(true);
    }
  }, [user]);

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
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colorScheme === 'dark' ? '#7C4DFF' : '#6200EA',
          tabBarInactiveTintColor: colorScheme === 'dark' ? '#9CA3AF' : '#6B7280',
          tabBarStyle: {
            backgroundColor: colorScheme === 'dark' ? '#1F2937' : '#FFFFFF',
            borderTopColor: colorScheme === 'dark' ? '#374151' : '#E5E7EB',
          },
        }}>
        <Tabs.Screen
          name="you"
          options={{
            title: t('tabs.you'),
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="tasks"
          options={{
            title: t('tabs.tasks'),
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="checkbox-marked" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="analysis"
          options={{
            title: t('tabs.analysis'),
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="chart-box" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: t('tabs.settings'),
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cog" size={size} color={color} />
            ),
          }}
        />
      </Tabs>

      <ZodiacModal
        visible={isZodiacModalVisible}
        onClose={() => {}} // Boş fonksiyon çünkü ilk burç seçiminde kapatılmamalı
        onSubmit={handleZodiacSubmit}
      />
    </>
  );
}
