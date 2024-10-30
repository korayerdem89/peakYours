import { View, Text, Alert } from 'react-native';
import { router } from 'expo-router';
import Button from '@/components/Button';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useAuth } from '@/store/useAuth';
import { useState } from 'react';
import { fbAuth } from '@/config/firebase';

// Google Sign-In konfigürasyonu
GoogleSignin.configure({
  webClientId: '262209119081-5kl21a7353t3s88bp82jgrcce2iiiq33.apps.googleusercontent.com',
  offlineAccess: true,
  forceCodeForRefreshToken: true,
});

// Response type guard
function isSuccessResponse(response: any): response is { data: any } {
  return response && response.data;
}

// Error type guard
function isErrorWithCode(error: any): error is { code: string } {
  return error && typeof error.code === 'string';
}

export default function SignInScreen() {
  const { setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async () => {
    try {
      setIsLoading(true);
      console.log('hasplay');
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      console.log('signOut');
      await GoogleSignin.signOut();
      console.log('signIn');
      const response = await GoogleSignin.signIn();

      if (isSuccessResponse(response)) {
        console.log('response', response);
        // User bilgisini global state'e kaydet
        setUser(response.data);
        // Ana sayfaya yönlendir
        router.replace('/(main)/home');
      } else {
        // Kullanıcı giriş işlemini iptal etti
        Alert.alert('Bilgi', 'Giriş işlemi iptal edildi');
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        if (isErrorWithCode(error)) {
          switch (error.code) {
            case statusCodes.IN_PROGRESS:
              Alert.alert('Hata', 'Giriş işlemi zaten devam ediyor');
              break;
            case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
              Alert.alert('Hata', 'Google Play Services kullanılamıyor');
              break;
            default:
              Alert.alert('Hata', 'Giriş yapılırken bir hata oluştu');
              console.error('Google Sign-In Error:', error);
          }
        }
      } else {
        // Google Sign-In ile ilgili olmayan bir hata oluştu
        Alert.alert('Hata', 'Beklenmeyen bir hata oluştu');
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 items-center justify-center gap-4 bg-background-light p-4 dark:bg-background-dark">
      <Text className="font-poppins-semibold mb-4 text-2xl text-text-light dark:text-text-dark">
        Sign In Screen
      </Text>

      <Button
        onPress={signIn}
        variant="primary"
        className="w-full"
        title="Google ile Giriş Yap"
        isLoading={isLoading}
      />

      <Button
        onPress={() => router.push('/(auth)/sign-up')}
        variant="secondary"
        className="w-full"
        title="Go to Sign Up"
        disabled={isLoading}
      />

      <Button
        onPress={() => router.push('/(main)/home')}
        className="w-full"
        title="Go to Home"
        disabled={isLoading}
      />
    </View>
  );
}
