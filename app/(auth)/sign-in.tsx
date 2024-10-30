import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import Button from '@/components/Button';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useAuth } from '@/store/useAuth';
import { useState, useCallback } from 'react';
import { UserService } from '@/services/user';
import { i18n } from '@/providers/LanguageProvider';

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
  const [currentLanguage, setCurrentLanguage] = useState(i18n.locale);

  const changeLanguage = useCallback((lang: string) => {
    i18n.locale = lang;
    setCurrentLanguage(lang);
  }, []);

  const signIn = async () => {
    try {
      setIsLoading(true);
      await GoogleSignin.hasPlayServices();

      const { data } = await GoogleSignin.signIn();

      if (data) {
        const credential = auth.GoogleAuthProvider.credential(data.idToken);
        const { user } = await auth().signInWithCredential(credential);
        await UserService.saveUserToFirestore(user);
        setUser(user);
        router.replace('/(main)/home');
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            Alert.alert(i18n.t('common.error'), i18n.t('auth.errors.inProgress'));
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            Alert.alert(i18n.t('common.error'), i18n.t('auth.errors.playServices'));
            break;
          default:
            Alert.alert(i18n.t('common.error'), i18n.t('auth.errors.default'));
            console.error('Google Sign-In Error:', error);
        }
      } else {
        Alert.alert(i18n.t('common.error'), i18n.t('auth.errors.unexpected'));
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 items-center justify-center gap-4 bg-background-light p-4 dark:bg-background-dark">
      {/* Dil Seçim Butonları */}
      <View className="absolute right-4 top-12 flex-row gap-2">
        <TouchableOpacity
          onPress={() => changeLanguage('tr')}
          className={`rounded-lg px-3 py-2 ${
            currentLanguage === 'tr' ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
          }`}>
          <Text
            className={`${
              currentLanguage === 'tr' ? 'text-white' : 'text-text-light dark:text-text-dark'
            }`}>
            TR
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => changeLanguage('en')}
          className={`rounded-lg px-3 py-2 ${
            currentLanguage === 'en' ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
          }`}>
          <Text
            className={`${
              currentLanguage === 'en' ? 'text-white' : 'text-text-light dark:text-text-dark'
            }`}>
            EN
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => changeLanguage('es')}
          className={`rounded-lg px-3 py-2 ${
            currentLanguage === 'es' ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
          }`}>
          <Text
            className={`${
              currentLanguage === 'es' ? 'text-white' : 'text-text-light dark:text-text-dark'
            }`}>
            ES
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => changeLanguage('zh')}
          className={`rounded-lg px-3 py-2 ${
            currentLanguage === 'zh' ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
          }`}>
          <Text
            className={`${
              currentLanguage === 'zh' ? 'text-white' : 'text-text-light dark:text-text-dark'
            }`}>
            中文
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="font-poppins-semibold mb-4 text-2xl text-text-light dark:text-text-dark">
        {i18n.t('auth.signIn.title')}
      </Text>

      <Button
        onPress={signIn}
        variant="primary"
        className="w-full"
        title={i18n.t('auth.signIn.googleButton')}
        isLoading={isLoading}
      />

      <Button
        onPress={() => router.push('/(auth)/sign-up')}
        variant="secondary"
        className="w-full"
        title={i18n.t('auth.signIn.goToSignUp')}
        disabled={isLoading}
      />

      <Button
        onPress={() => router.push('/(main)/home')}
        className="w-full"
        title={i18n.t('auth.signIn.goToHome')}
        disabled={isLoading}
      />

      {/* Debug bilgisi */}
      <Text className="mt-4 text-text-light dark:text-text-dark">
        Current locale: {currentLanguage}
      </Text>
    </View>
  );
}
