import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UserService } from '@/services/user';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

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
    staleTime: 1000 * 60 * 5, // 5 dakika
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, data }: { userId: string; data: Partial<UpdateUserData> }) => {
      await UserService.updateUser(userId, data);
    },
    onSuccess: (_, { userId }) => {
      // Başarılı güncelleme sonrası cache'i invalidate et
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
    },
  });
}
