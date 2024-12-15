import { Tabs } from 'expo-router';
import { CustomTabBar } from '@/components/CustomTabBar';
import { Platform } from 'react-native';
import { useEffect } from 'react';
import { useInterstitialAd } from '@/store/useInterstitialAd';
import { useTranslation } from '@/providers/LanguageProvider';

export default function MainLayout() {
  const loadAd = useInterstitialAd((state) => state.loadAd);
  const { t } = useTranslation();

  useEffect(() => {
    loadAd();
  }, []);

  return (
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
          title: t('tabs.tasks'),
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
  );
}
