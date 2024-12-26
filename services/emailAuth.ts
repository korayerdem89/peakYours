import auth from '@react-native-firebase/auth';

export const EmailAuthService = {
  async signIn(email: string, password: string) {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error: any) {
      if (error.code === 'auth/invalid-email') {
        throw new Error('invalid-email');
      }
      if (error.code === 'auth/user-not-found') {
        throw new Error('user-not-found');
      }
      if (error.code === 'auth/wrong-password') {
        throw new Error('wrong-password');
      }
      throw error;
    }
  },

  async signUp(email: string, password: string) {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error: any) {
      console.log('Email Auth Error:', error);
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('email-already-in-use');
      }
      if (error.code === 'auth/invalid-email') {
        throw new Error('invalid-email');
      }
      if (error.code === 'auth/weak-password') {
        throw new Error('weak-password');
      }
      throw error;
    }
  },
};
