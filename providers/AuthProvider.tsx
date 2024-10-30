import { ReactNode, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { useAuth } from '@/store/useAuth';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { setUser, setLoading } = useAuth();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user: any) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return children;
}
