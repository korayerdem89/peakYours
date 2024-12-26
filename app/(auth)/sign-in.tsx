import { View, Text, Alert, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native';
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
import { AppleButton } from '@invertase/react-native-apple-authentication';
import { AppleAuthService } from '@/services/appleAuth';
import { EmailAuthService } from '@/services/emailAuth';
import { theme } from '@/constants/theme';
import { useState } from 'react';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const { setUser } = useAuth();
  const { colorScheme } = useColorScheme();
  const { t } = useTranslation();
  const { isLoading, setIsLoading } = useLoadingStore();
  const isDark = colorScheme === 'dark';

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

  const handleEmailAuth = async () => {
    try {
      setIsLoading(true);

      let firebaseUser;
      if (isSignUp) {
        firebaseUser = await EmailAuthService.signUp(email, password);
      } else {
        firebaseUser = await EmailAuthService.signIn(email, password);
      }

      await UserService.saveUserToFirestore(firebaseUser);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await setUser(firebaseUser.uid);
    } catch (error: any) {
      let errorMessage = t('auth.errors.default');

      switch (error.message) {
        case 'invalid-email':
          errorMessage = t('auth.errors.invalidEmail');
          break;
        case 'user-not-found':
          errorMessage = t('auth.errors.userNotFound');
          break;
        case 'wrong-password':
          errorMessage = t('auth.errors.wrongPassword');
          break;
        case 'email-already-in-use':
          errorMessage = t('auth.errors.emailInUse');
          break;
        case 'weak-password':
          errorMessage = t('auth.errors.weakPassword');
          break;
      }

      Alert.alert(t('common.error'), errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-accent-light dark:bg-background-dark">
      <Image
        source={require('@/assets/banner.png')}
        className="my-10 w-full rounded-xl"
        style={{ width: width, height: height / 10 }}
        resizeMode="contain"
      />

      <View className="flex-1 items-center justify-center gap-6 p-6">
        <Image
          source={require('@/assets/sign-in/signin.png')}
          className="w-full rounded-xl"
          style={{ height: BANNER_HEIGHT }}
          resizeMode="contain"
        />
        <View className="w-full gap-3">
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={isDark ? GoogleSigninButton.Color.Light : GoogleSigninButton.Color.Dark}
            onPress={signIn}
            disabled={isLoading}
            style={{ width: '100%', height: 48 }}
          />

          {!AppleAuthService.isSupported && (
            <AppleButton
              buttonStyle={AppleButton.Style.BLACK}
              buttonType={AppleButton.Type.SIGN_IN}
              style={{
                alignSelf: 'center',
                width: '98%',
                height: 42,
              }}
              onPress={handleAppleSignIn}
            />
          )}
        </View>
        <Text className="text-center font-regular text-sm text-text-light">{t('auth.or')}</Text>
        <View className="w-full gap-4">
          <View className="w-full gap-2">
            <TextInput
              className="h-12 w-full rounded-sm border border-gray-200 bg-background-light px-4 text-text-light dark:border-gray-700 dark:bg-surface-dark dark:text-text-dark"
              placeholder={t('auth.email')}
              placeholderTextColor={theme.colors.text.light}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <TextInput
              className="h-12 w-full rounded-sm border border-gray-200 bg-background-light px-4 text-text-light dark:border-gray-700 dark:bg-surface-dark dark:text-text-dark"
              placeholder={t('auth.password')}
              placeholderTextColor={theme.colors.text.light}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          <TouchableOpacity
            onPress={handleEmailAuth}
            disabled={isLoading}
            className="h-12 w-full items-center justify-center rounded-sm bg-primary-light active:opacity-60">
            <Text className="font-medium text-white">
              {isSignUp ? t('auth.signUp.button') : t('auth.signIn.button')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)} className="active:opacity-60">
            <Text className="text-center text-sm text-text-light-secondary dark:text-text-dark-secondary">
              {isSignUp ? t('auth.signIn.switch') : t('auth.signUp.switch')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
