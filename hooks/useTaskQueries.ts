import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FirestoreService } from '@/services/firestore';
import { useAuth } from '@/store/useAuth';
import firestore from '@react-native-firebase/firestore';

interface TaskTrait {
  name: string;
  points: number;
}

export function useTaskTraits() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['taskTraits', user?.uid],
    queryFn: async () => {
      if (!user?.uid) return null;
      const data = await FirestoreService.getDoc<{ traits: Record<string, number> }>(
        'users',
        `${user.uid}/traits`
      );
      return data?.traits || {};
    },
    enabled: !!user?.uid,
  });
}

export function useUpdateTaskTrait() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (trait: string) => {
      if (!user?.uid) throw new Error('User not found');

      const traitRef = `traits.${trait}`;
      await FirestoreService.updateDoc('users', user.uid, {
        [traitRef]: firestore.FieldValue.increment(1),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['taskTraits'] });
      queryClient.invalidateQueries({ queryKey: ['traitAverages'] });
    },
  });
}