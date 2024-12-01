import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FirestoreService } from '@/services/firestore';
import { Timestamp } from '@react-native-firebase/firestore';
import { UserTasks } from '@/types/tasks';

export function useTasks(userId: string | undefined) {
  const queryClient = useQueryClient();

  const { data: taskData } = useQuery({
    queryKey: ['userTasks', userId],
    queryFn: () => FirestoreService.getDoc<UserTasks>('userTasks', userId!),
    enabled: !!userId,
  });

  const updateTaskPoints = useMutation({
    mutationFn: (points: number) =>
      FirestoreService.updateDoc('userTasks', userId!, {
        points: (taskData?.points || 0) + points,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userTasks', userId] });
    },
  });

  const refreshTasks = useMutation({
    mutationFn: () =>
      FirestoreService.updateDoc('userTasks', userId!, {
        lastRefresh: Timestamp.now(),
        refreshesLeft: 7,
        completedTasks: [],
      }),
  });

  return { taskData, updateTaskPoints, refreshTasks };
}
