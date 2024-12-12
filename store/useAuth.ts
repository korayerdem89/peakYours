import { create } from 'zustand';
import { AuthUser } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { UserService } from '@/services/user';
import { registerClearAuthStates } from '@/config/firebase';

let queryClient: ReturnType<typeof useQueryClient> | null = null;

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  setUser: (userId: string | null) => Promise<void>;
  setLoading: (loading: boolean) => void;
  setQueryClient: (client: ReturnType<typeof useQueryClient>) => void;
  updateUserData: (data: Partial<AuthUser>) => void;
  clearAuth: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => {
  const clearAuth = async () => {
    try {
      set({ isLoading: true });

      if (queryClient) {
        // Önce tüm active query'leri iptal et
        await queryClient.cancelQueries();
        // Cache'i temizle
        queryClient.clear();
        // Query state'i sıfırla
        await queryClient.resetQueries();
        // Query cache'i geçersiz kıl
        await queryClient.invalidateQueries();
      }

      // Kısa bir bekleme ekle
      await new Promise((resolve) => setTimeout(resolve, 200));

      set({ user: null, isLoading: false });
    } catch (error) {
      console.error('Error in clearAuth:', error);
      set({ user: null, isLoading: false });
    }
  };

  registerClearAuthStates(clearAuth);

  return {
    user: null,
    isLoading: true,
    clearAuth,
    setUser: async (userId) => {
      try {
        if (!queryClient) {
          console.error('QueryClient is not initialized');
          set({ user: null });
          return;
        }

        if (userId) {
          // Önceki query'leri temizle
          await queryClient.cancelQueries({ queryKey: ['user'] });

          // Cache'i temizle ve yeni veriyi getir
          await queryClient.resetQueries({ queryKey: ['user'] });

          const userData = await queryClient.fetchQuery({
            queryKey: ['user', userId],
            queryFn: () => UserService.getUser(userId),
            staleTime: 0,
            gcTime: 0,
            retry: false,
          });

          if (userData) {
            set({ user: userData });
            console.log('User data set successfully:', userData);
          } else {
            console.warn('No user data found for ID:', userId);
            await clearAuth();
          }
        } else {
          await clearAuth();
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        await clearAuth();
        throw error;
      }
    },
    updateUserData: (data) => {
      set((state) => {
        const updatedUser = state.user ? { ...state.user, ...data } : null;
        return { user: updatedUser };
      });
    },
    setLoading: (loading) => set({ isLoading: loading }),
    setQueryClient: (client) => {
      queryClient = client;
    },
  };
});
