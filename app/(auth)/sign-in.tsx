import { View, Text, Alert } from 'react-native';
import { router } from 'expo-router';
import Button from '@/components/Button';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useAuth } from '@/store/useAuth';
import { useState } from 'react';
import { UserService } from '@/services/user';

// Google Sign-In konfigürasyonu
GoogleSignin.configure({
  webClientId: '262209119081-5kl21a7353t3s88bp82jgrcce2iiiq33.apps.googleusercontent.com',
  offlineAccess: true,
  forceCodeForRefreshToken: true,
});

function isErrorWithCode(error: any): error is { code: string } {
  return error && typeof error.code === 'string';
}

export default function SignInScreen() {
  const { setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async () => {
    try {
      setIsLoading(true);
      await GoogleSignin.hasPlayServices();

      // Google Sign-In
      const { data } = await GoogleSignin.signIn();

      if (data) {
        // Firebase credential oluştur
        const credential = auth.GoogleAuthProvider.credential(data.idToken);

        // Firebase ile giriş yap
        const { user } = await auth().signInWithCredential(credential);

        // Firestore'a kaydet
        await UserService.saveUserToFirestore(user);

        // User'ı store'a kaydet
        setUser(user);

        // Ana sayfaya yönlendir
        router.replace('/(main)/home');
      }
    } catch (error) {
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
      } else {
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
