import { Stack, router } from 'expo-router';
import { useAuth } from '@/store/useAuth';
import { useEffect } from 'react';

export default function OnboardingLayout() {
  const { user } = useAuth();

  useEffect(() => {
    if (user?.uid) {
      router.replace('/(main)/you');
    }
  }, [user?.uid]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
