import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { useAuth } from '@/store/useAuth';
import { FirestoreService } from '@/services/firestore';
import { UserData } from '@/services/user';

interface UpdateUserData {
  zodiacSign?: string;
  updatedAt?: FirebaseFirestoreTypes.FieldValue;
}

export function useUserData(userId: string | undefined) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => (userId ? FirestoreService.getDoc<UserData>('users', userId) : null),
    enabled: !!userId,
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ userId, data }: { userId: string; data: Partial<UpdateUserData> }) => {
      await FirestoreService.updateDoc('users', userId, data);
    },
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ['user', userId] });

      if (user?.uid === userId) {
        queryClient.fetchQuery({
          queryKey: ['user', userId],
          queryFn: () => FirestoreService.getDoc<UserData>('users', userId),
        });
      }
    },
  });
}
