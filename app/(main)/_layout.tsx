import { Tabs } from 'expo-router';
import { Settings, Radar, MessageCircle, ClipboardList } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { theme } from '@/constants/theme';
export default function MainLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#131A2A' : '#FAFAFA',
        },
        tabBarActiveTintColor:
          colorScheme === 'dark' ? theme.colors.accent.light : theme.colors.primary.dark,
        tabBarInactiveTintColor: colorScheme === 'dark' ? '#C5CEE0' : '#8F9BB3',
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Chart',
          tabBarIcon: ({ color }) => <Radar size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="analysis"
        options={{
          title: 'Analysis',
          tabBarIcon: ({ color }) => <MessageCircle size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: 'Tasks',
          tabBarIcon: ({ color }) => <ClipboardList size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Settings size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
