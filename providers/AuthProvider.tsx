import { ReactNode, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { useAuth } from '@/store/useAuth';
import { useQueryClient } from '@tanstack/react-query';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { setUser, setLoading, setQueryClient } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    setQueryClient(queryClient);
  }, [queryClient]);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (firebaseUser) => {
      setLoading(true);
      try {
        if (firebaseUser) {
          await setUser(firebaseUser.uid);
          console.log('User logged in:', firebaseUser.uid);
        } else {
          await setUser(null);
          console.log('User is not logged inn');
        }
      } catch (error) {
        console.error('Auth state change error:', error);
        await setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  return children;
}
