import { create } from 'zustand';
import { AuthUser, BasicUserInfo, ZodiacUpdateData } from '@/types';

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  setUser: (user: BasicUserInfo | null) => void;
  updateUserData: (data: ZodiacUpdateData) => void;
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
