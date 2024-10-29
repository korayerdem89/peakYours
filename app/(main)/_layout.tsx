import { Tabs } from 'expo-router';
import { Home, User, Settings } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

export default function MainLayout() {
  const { colorScheme } = useColorScheme();
  
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#1A2138' : '#FFFFFF',
          borderTopColor: colorScheme === 'dark' ? '#222B45' : '#E4E9F2',
        },
        tabBarActiveTintColor: '#7C4DFF',
        tabBarInactiveTintColor: colorScheme === 'dark' ? '#C5CEE0' : '#8F9BB3',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <User size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Settings size={24} color={color} />
        }}
      />
    </Tabs>
  );
} 