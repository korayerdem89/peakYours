import { Tabs } from 'expo-router';
import { CustomTabBar } from '@/components/CustomTabBar';
import { Platform } from 'react-native';

export default function MainLayout() {
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
        name="chart"
        options={{
          title: 'Chart',
        }}
      />
      <Tabs.Screen
        name="analysis"
        options={{
          title: 'Analysis',
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
