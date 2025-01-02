import {
  View,
  Text,
  Alert,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Platform,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
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
import { useState, useEffect, useMemo } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

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
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useAuth();
  const { colorScheme } = useColorScheme();
  const { t } = useTranslation();
  const { isLoading, setIsLoading } = useLoadingStore();
  const isDark = colorScheme === 'dark';
  const translateY = useSharedValue(0);
  const [name, setName] = useState('');

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        translateY.value = withTiming(-e.endCoordinates.height / 3, {
          duration: 250,
        });
      }
    );

    const hideSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        translateY.value = withTiming(0, {
          duration: 250,
        });
      }
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const signIn = async () => {
    try {
      setIsLoading(true);

      if (!email && !password) {
        await GoogleSignin.hasPlayServices();
      }

      const { data } = await GoogleSignin.signIn();

      if (!data?.idToken) {
        throw new Error('No ID token received');
      }

      // Firebase credential ve auth
      const credential = auth.GoogleAuthProvider.credential(data.idToken);
      const { user: firebaseUser } = await auth().signInWithCredential(credential);

      // Önce Firestore'a kaydet
      await UserService.saveUserToFirestore(firebaseUser);

      // Kısa bir gecikme ekle
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Sonra global state'i güncelle
      await setUser(firebaseUser.uid);
      console.log('Sign-in complete, user set');
    } catch (error: any) {
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
        Alert.alert(error?.message || error);
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
        // Kayıt olduktan sonra displayName'i güncelle
      } else {
        firebaseUser = await EmailAuthService.signIn(email, password);
      }

      await UserService.saveUserToFirestore(firebaseUser, name);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await setUser(firebaseUser.uid);
    } catch (error: any) {
      let errorMessage = t('auth.errors.default');
      console.log(error.message);
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

      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: errorMessage,
        position: 'bottom',
        visibilityTime: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    try {
      if (!email) {
        Alert.alert('Error', 'Please enter your email address first');
        return;
      }

      await auth().sendPasswordResetEmail(email);
      Alert.alert('Success', t('auth.forgotPassword.success'));
    } catch (error) {
      console.error('Password reset error:', error);
      Alert.alert('Error', t('auth.forgotPassword.error'));
    }
  };

  // Validation fonksiyonları
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPassword = (password: string) => {
    return password.length >= 8 && /[0-9]/.test(password) && /[a-zA-Z]/.test(password);
  };

  const isValidName = (name: string) => {
    return name.length >= 3;
  };

  // Form validation
  const isFormValid = useMemo(() => {
    if (isSignUp) {
      return isValidName(name) && isValidEmail(email) && isValidPassword(password);
    }
    return isValidEmail(email) && password.length > 0;
  }, [isSignUp, name, email, password]);

  return (
    <SafeAreaView className="flex-1 bg-accent-light dark:bg-background-dark">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={{ flexGrow: 1 }}>
          <Animated.View className="flex-1" style={animatedStyles}>
            <Image
              source={require('@/assets/banner.png')}
              className="my-10 w-full rounded-xl"
              style={{ width: width, height: height / 10 }}
              resizeMode="contain"
            />

            <View className="flex-1 items-center justify-center p-6 ">
              <Image
                source={require('@/assets/sign-in/signin.png')}
                className="w-full rounded-xl"
                style={{ height: BANNER_HEIGHT }}
                resizeMode="contain"
              />
              <View className="mt-10 w-full gap-3">
                <GoogleSigninButton
                  size={GoogleSigninButton.Size.Wide}
                  color={isDark ? GoogleSigninButton.Color.Light : GoogleSigninButton.Color.Dark}
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
                      height: 42,
                    }}
                    onPress={handleAppleSignIn}
                  />
                )}
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
