import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UserService } from '@/services/user';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { useAuth } from '@/store/useAuth';

interface UpdateUserData {
  zodiacSign?: string;
  updatedAt?: FirebaseFirestoreTypes.FieldValue;
  // Diğer güncellenebilir alanlar...
}

export function useUserData(userId: string | undefined) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => (userId ? UserService.getUser(userId) : null),
    enabled: !!userId,
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ userId, data }: { userId: string; data: Partial<UpdateUserData> }) => {
      await UserService.updateUser(userId, data);
    },
    onSuccess: (_, { userId }) => {
      // User query'sini invalidate et
      queryClient.invalidateQueries({ queryKey: ['user', userId] });

      // Eğer güncellenen user mevcut kullanıcıysa, user query'sini hemen yeniden çek
      if (user?.uid === userId) {
        queryClient.fetchQuery({
          queryKey: ['user', userId],
          queryFn: () => UserService.getUser(userId),
        });
      }
    },
  });
}
