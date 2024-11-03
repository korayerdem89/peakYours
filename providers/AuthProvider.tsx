import { ReactNode, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { useAuth } from '@/store/useAuth';
import { UserService } from '@/services/user';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { setUser, updateUserData, setLoading } = useAuth();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        // Önce Firebase auth verilerini set et
        setUser(firebaseUser);

        // Sonra Firestore'dan user verilerini al
        try {
          const userData = await UserService.getUser(firebaseUser.uid);
          if (userData?.zodiacSign) {
            updateUserData({ zodiacSign: userData.zodiacSign });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return children;
}
