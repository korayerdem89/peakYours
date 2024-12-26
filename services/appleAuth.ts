import { appleAuth } from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import { Platform } from 'react-native';

export const AppleAuthService = {
  async signIn() {
    try {
      // Apple Sign-in'i başlat
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      // Credential oluştur
      const { identityToken, nonce } = appleAuthRequestResponse;

      if (!identityToken) {
        throw new Error('No identity token provided');
      }

      // Firebase credential oluştur
      const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

      // Firebase ile sign in
      const userCredential = await auth().signInWithCredential(appleCredential);

      return userCredential.user;
    } catch (error) {
      console.error('Apple Sign In Error:', error);
      throw error;
    }
  },

  // Cihazın Apple Sign In'i destekleyip desteklemediğini kontrol et
  isSupported: Platform.OS === 'ios' && appleAuth.isSupported,
};
