import { View, Text, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import Button from '@/components/Button';

export default function HomeScreen() {
  return (
    <SafeAreaView className="bg-background-tab flex-1 dark:bg-background-dark">
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
    </SafeAreaView>
  );
}
