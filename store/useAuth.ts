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
}

export const useAuth = create<AuthState>((set) => {
  registerClearAuthStates(() => {
    set({ user: null, isLoading: true });
  });

  return {
    user: null,
    isLoading: true,
    setUser: async (userId) => {
      try {
        if (!queryClient) {
          console.error('QueryClient is not initialized');
          set({ user: null });
          return;
        }

        if (userId) {
          const userData = await queryClient.fetchQuery({
            queryKey: ['user', userId],
            queryFn: () => UserService.getUser(userId),
            staleTime: 0,
          });

          if (userData) {
            set({ user: userData });
            console.log('User data set successfully:', userData);
          } else {
            console.warn('No user data found for ID:', userId);
            set({ user: null });
          }
        } else {
          set({ user: null });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        set({ user: null });
        throw error;
      }
    },
    updateUserData: (data) => {
      set((state) => {
        const updatedUser = state.user ? { ...state.user, ...data } : null;

        if (updatedUser && queryClient) {
          queryClient.invalidateQueries({ queryKey: ['user', updatedUser.uid] });
          queryClient.fetchQuery({
            queryKey: ['user', updatedUser.uid],
            queryFn: () => UserService.getUser(updatedUser.uid),
          });
        }

        return { user: updatedUser };
      });
    },
    setLoading: (loading) => set({ isLoading: loading }),
    setQueryClient: (client) => {
      queryClient = client;
    },
  };
});
