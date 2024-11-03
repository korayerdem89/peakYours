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
      try {
        if (firebaseUser) {
          await setUser(firebaseUser.uid);
        } else {
          await setUser(null);
        }
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  return children;
}
