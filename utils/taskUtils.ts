import { empathyTasks } from '@/constants/tasks/empathic-tasks';
import { reliableTasks } from '@/constants/tasks/reliable-tasks';
import { lazyTasks } from '@/constants/tasks/lazy-tasks';

const taskMappings: Record<string, any[]> = {
  empathic: empathyTasks,
  reliable: reliableTasks,
  lazy: lazyTasks,
  // Diğer task mappingleri buraya eklenecek
};

export function getRandomTask(trait: string) {
  const tasks = taskMappings[trait];
  if (!tasks) return null;

  const randomIndex = Math.floor(Math.random() * tasks.length);
  return tasks[randomIndex];
}
