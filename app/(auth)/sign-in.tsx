import { View, Text, Alert, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { UserService } from '@/services/user';
import { useTranslation } from '@/providers/LanguageProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import { useAuth } from '@/store/useAuth';
import { useLoadingStore } from '@/store/useLoadingStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppleButton } from '@invertase/react-native-apple-authentication';
import { AppleAuthService } from '@/services/appleAuth';

const { width, height } = Dimensions.get('window');
const BANNER_HEIGHT = height / 4;

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
  const { colorScheme } = useColorScheme();
  const { t } = useTranslation();
  const { isLoading, setIsLoading } = useLoadingStore();

  const signIn = async () => {
    try {
      setIsLoading(true);
      await GoogleSignin.hasPlayServices();

      const { data } = await GoogleSignin.signIn();

      if (!data?.idToken) {
        throw new Error('No ID token received');
      }

      // Firebase credential ve auth
      const credential = auth.GoogleAuthProvider.credential(data.idToken);
      const { user: firebaseUser } = await auth().signInWithCredential(credential);

      // Önce Firestore'a kaydet
      await UserService.saveUserToFirestore(firebaseUser);
      console.log('User saved to Firestore:', firebaseUser);
      // Kısa bir gecikme ekle
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Sonra global state'i güncelle
      await setUser(firebaseUser.uid);
      console.log('Sign-in complete, user set');
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            Alert.alert(t('common.error'), t('auth.errors.cancelled'));
            break;
          case statusCodes.IN_PROGRESS:
            Alert.alert(t('common.error'), t('auth.errors.inProgress'));
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            Alert.alert(t('common.error'), t('auth.errors.playServices'));
            break;
          default:
            Alert.alert(t('common.error'), t('auth.errors.default'));
            console.error('Google Sign-In Error:', error);
        }
      } else {
        Alert.alert(t('common.error'), t('auth.errors.unexpected'));
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      setIsLoading(true);

      // Apple ile giriş yap
      const firebaseUser = await AppleAuthService.signIn();

      // Firestore'a kaydet
      await UserService.saveUserToFirestore(firebaseUser);
      console.log('User saved to Firestore:', firebaseUser);

      // Kısa bir gecikme
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Global state'i güncelle
      await setUser(firebaseUser.uid);
      console.log('Apple Sign-in complete, user set');
    } catch (error) {
      console.error('Apple Sign In Error:', error);
      Alert.alert(t('common.error'), t('auth.errors.default'));
    } finally {
      setIsLoading(false);
    }
  };

  const clearCache = async () => {
    try {
      setIsLoading(true);
      await AsyncStorage.clear();
      await setUser(null);
      console.log('Cache cleared successfully');
      Alert.alert('Success', 'Cache cleared successfully');
    } catch (error) {
      console.error('Clear cache error:', error);
      Alert.alert('Error', 'Failed to clear cache');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-accent-light dark:bg-background-dark">
      <View className="flex-1 items-center justify-center gap-10 p-6">
        <Image
          source={require('@/assets/banner.png')}
          className="mb-10 w-full rounded-xl"
          style={{ width: width, height: height / 10 }}
          resizeMode="contain"
        />
        <Image
          source={require('@/assets/sign-in/signin.png')}
          className="w-full rounded-xl"
          style={{ height: BANNER_HEIGHT }}
          resizeMode="contain"
        />
        <Text className="text-center font-medium text-3xl text-primary dark:text-text-dark">
          {t('auth.signIn.welcomeTitle')}
        </Text>
        <View className="w-full gap-5">
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={
              colorScheme === 'dark'
                ? GoogleSigninButton.Color.Light
                : GoogleSigninButton.Color.Dark
            }
            onPress={signIn}
            disabled={isLoading}
            style={{ width: '100%', height: 48 }}
          />
          {AppleAuthService.isSupported && (
            <AppleButton
              buttonStyle={AppleButton.Style.BLACK}
              buttonType={AppleButton.Type.SIGN_IN}
              style={{
                alignSelf: 'center',
                width: '98%',
                height: 44,
              }}
              onPress={handleAppleSignIn}
            />
          )}

          {/* <TouchableOpacity
            onPress={clearCache}
            disabled={isLoading}
            className="mt-4 h-12 w-full items-center justify-center rounded-xl bg-red-500 dark:bg-red-700">
            <Text className="font-medium text-base text-white">Clear Cache (Test)</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  googleButton: {
    width: '100%',
    padding: 30,
  },
});
