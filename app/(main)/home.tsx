import { View, Text } from 'react-native';
import { router } from 'expo-router';
import Button from '@/components/Button';

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="font-poppins-semibold text-2xl text-text-light dark:text-text-dark">
        Home Screen
      </Text>
      <Button
        onPress={() => router.push('/(onboarding)')}
        className="w-full"
        title="Go to Onboarding"
        variant="primary"
        size="sm"
      />
    </View>
  );
}
