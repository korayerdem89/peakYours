import { View, Text, Alert, Image, Dimensions, StyleSheet } from 'react-native';
import { router } from 'expo-router';
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

const { width, height } = Dimensions.get('window');
const BANNER_HEIGHT = height / 3;

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

      const credential = auth.GoogleAuthProvider.credential(data.idToken);
      const { user: firebaseUser } = await auth().signInWithCredential(credential);

      // Firestore'a kaydet
      await UserService.saveUserToFirestore(firebaseUser);
      console.log('User saved to Firestore:', firebaseUser.uid);

      // User verilerini set et
      await setUser(firebaseUser.uid);
      console.log('Sign-in complete, user set');
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
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

  return (
    <SafeAreaView className="flex-1 bg-accent-light dark:bg-background-dark">
      <View className="flex-1 items-center justify-center gap-10 p-6">
        <Image
          source={{
            uri: `https://picsum.photos/${Math.floor(width)}/${Math.floor(BANNER_HEIGHT)}?random=${Date.now()}`,
          }}
          className="w-full rounded-xl"
          style={{ height: BANNER_HEIGHT }}
          resizeMode="cover"
        />

        <Text className="font-poppins-semibold mb-8 text-center text-3xl text-text-light dark:text-text-dark">
          {t('auth.signIn.welcomeTitle')}
        </Text>

        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={
            colorScheme === 'dark' ? GoogleSigninButton.Color.Light : GoogleSigninButton.Color.Dark
          }
          onPress={signIn}
          disabled={isLoading}
          style={styles.googleButton}
        />
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
