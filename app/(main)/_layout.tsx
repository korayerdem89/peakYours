import { Tabs } from 'expo-router';
import { CustomTabBar } from '@/components/CustomTabBar';
import { Platform } from 'react-native';
import { useEffect } from 'react';
import { useInterstitialAd } from '@/store/useInterstitialAd';

export default function MainLayout() {
  const loadAd = useInterstitialAd((state) => state.loadAd);

  // İlk yüklemeyi yap
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
          title: 'You',
        }}
      />
      <Tabs.Screen
        name="ideas"
        options={{
          title: 'Ideas',
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: 'Tasks',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
        }}
      />
    </Tabs>
  );
}
