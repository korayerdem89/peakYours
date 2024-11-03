import { create } from 'zustand';
import { AuthUser } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { UserService } from '@/services/user';

let queryClient: ReturnType<typeof useQueryClient> | null = null;

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  setUser: (userId: string | null) => Promise<void>;
  setLoading: (loading: boolean) => void;
  setQueryClient: (client: ReturnType<typeof useQueryClient>) => void;
  updateUserData: (data: Partial<AuthUser>) => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  setUser: async (userId) => {
    try {
      if (userId && queryClient) {
        const userData = await queryClient.fetchQuery({
          queryKey: ['user', userId],
          queryFn: () => UserService.getUser(userId),
        });

        if (userData) {
          set({ user: userData });
        }
      } else {
        set({ user: null });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      set({ user: null });
    }
  },
  updateUserData: (data) => {
    set((state) => {
      const updatedUser = state.user ? { ...state.user, ...data } : null;

      if (updatedUser && queryClient) {
        // User query'sini invalidate et
        queryClient.invalidateQueries({ queryKey: ['user', updatedUser.uid] });

        // Yeni veriyi hemen fetch et
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
}));
