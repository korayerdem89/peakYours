import { View, Text } from 'react-native';
import { router } from 'expo-router';
import Button from '@/components/Button';

export default function SignUpScreen() {
  return (
    <View className="flex-1 items-center justify-center p-4 gap-4">
      <Text className="text-2xl font-poppins-semibold text-text-light dark:text-text-dark mb-4">
        Sign Up Screen
      </Text>

      <Button 
        onPress={() => router.push('/(auth)/sign-in')}
        variant="secondary"
        className="w-full"
        title="Back to Sign In"
      />
 
      <Button 
        onPress={() => router.push('/(main)/home')}
        className="w-full"
        title="Go to Home"
      />
 
    </View>
  );
} 