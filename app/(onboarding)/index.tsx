import { View, Text } from 'react-native';
import { router } from 'expo-router';
import Button from '@/components/Button';

export default function OnboardingScreen() {
  return (
    <View className="flex-1 items-center justify-center p-4">
      <Text className="text-2xl font-poppins-semibold text-text-light dark:text-text-dark mb-8">
        Onboarding Screen
      </Text>
      
      <Button 
        onPress={() => router.push('/(auth)/sign-in')}
        className="w-full"
        title="Go to Sign In"
      />
    
    </View>
  );
} 