import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FirestoreService } from '@/services/firestore';
import { UserTasksService } from '@/services/userTasks';
import { UserTasks } from '@/types/tasks';

export function useTasks(userId: string | undefined) {
  const queryClient = useQueryClient();

  const { data: taskData } = useQuery({
    queryKey: ['userTasks', userId],
    queryFn: async () => {
      if (!userId) return null;
      const data = await FirestoreService.getDoc<UserTasks>('userTasks', userId);
      if (!data) {
        return UserTasksService.initializeUserTasks(userId);
      }
      return data;
    },
    enabled: !!userId,
  });

  const updateTaskPoints = useMutation({
    mutationFn: async (points: number) => {
      if (!userId) throw new Error('User not found');
      await UserTasksService.updateUserTaskPoints(userId, points);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userTasks', userId] });
    },
  });

  const refreshTasks = useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error('User not found');
      await UserTasksService.refreshUserTasks(userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userTasks', userId] });
    },
  });

  const decrementRefreshes = useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error('User not found');
      await UserTasksService.decrementRefreshes(userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userTasks', userId] });
    },
  });

  return { taskData, updateTaskPoints, refreshTasks, decrementRefreshes };
}
