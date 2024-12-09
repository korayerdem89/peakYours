import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FirestoreService } from '@/services/firestore';
import { UserTasksService } from '@/services/userTasks';
import { UserTasks } from '@/types/tasks';
import firestore from '@react-native-firebase/firestore';

const REFRESH_INTERVAL = 24 * 60 * 60 * 1000; // 24 saat (milisaniye)

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

      // 24 saat kontrolü
      if (data.lastRefresh) {
        const lastRefreshDate = data.lastRefresh.toDate();
        const timeDiff = Date.now() - lastRefreshDate.getTime();

        if (timeDiff >= REFRESH_INTERVAL) {
          await UserTasksService.refreshUserTasks(userId, true);
          return {
            ...data,
            refreshesLeft: 7,
            lastRefresh: firestore.Timestamp.now(),
          };
        }
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
      if (!taskData?.lastRefresh) return;

      const timeDiff = Date.now() - taskData.lastRefresh.toDate().getTime();
      await UserTasksService.refreshUserTasks(userId, timeDiff >= REFRESH_INTERVAL);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userTasks', userId] });
    },
  });

  const decrementRefreshes = useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error('User not found');
      if (!taskData?.refreshesLeft || taskData.refreshesLeft <= 0) {
        throw new Error('No refreshes left');
      }
      await UserTasksService.decrementRefreshes(userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userTasks', userId] });
    },
  });

  return {
    taskData,
    updateTaskPoints,
    refreshTasks,
    decrementRefreshes,
  };
}
