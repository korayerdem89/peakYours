import { create } from 'zustand';
import { UserData } from '@/services/user';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

interface AuthState {
  user: Pick<UserData, 'uid' | 'email' | 'displayName' | 'photoURL' | 'zodiacSign'> | null;
  isLoading: boolean;
  setUser: (user: FirebaseAuthTypes.User | null) => void;
  updateUserData: (data: Partial<Pick<UserData, 'zodiacSign'>>) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (firebaseUser) =>
    set({
      user: firebaseUser
        ? {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            zodiacSign: null, // Başlangıçta null, Firestore'dan gelecek
          }
        : null,
    }),
  updateUserData: (data) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...data } : null,
    })),
  setLoading: (loading) => set({ isLoading: loading }),
}));
