import { View, Text } from 'react-native';
import { router } from 'expo-router';
import Button from '@/components/Button';

export default function SignInScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-4 bg-background-light  p-4 dark:bg-background-dark">
      <Text className="font-poppins-semibold mb-4 text-2xl text-text-light dark:text-text-dark">
        Sign In Screen
      </Text>

      <Button
        onPress={() => router.push('/(auth)/sign-up')}
        variant="secondary"
        className="w-full"
        title="Go to Sign Up"
      />

      <Button onPress={() => router.push('/(main)/home')} className="w-full" title="Go to Home" />
    </View>
  );
}
