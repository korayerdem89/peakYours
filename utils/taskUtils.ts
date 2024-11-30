import {
  empathicTasks,
  reliableTasks,
  helpfulTasks,
  honestTasks,
  patientTasks,
  respectfulTasks,
  friendlyTasks,
  lazyTasks,
  angryTasks,
  selfishTasks,
  jealousTasks,
  forgetfulTasks,
  pessimisticTasks,
  arrogantTasks,
} from '@/constants/tasks';

const taskMappings: Record<string, any[]> = {
  // Good sides
  empathic: empathicTasks,
  reliable: reliableTasks,
  helpful: helpfulTasks,
  honest: honestTasks,
  patient: patientTasks,
  respectful: respectfulTasks,
  friendly: friendlyTasks,

  // Bad sides
  lazy: lazyTasks,
  angry: angryTasks,
  arrogant: arrogantTasks,
  selfish: selfishTasks,
  jealous: jealousTasks,
  forgetful: forgetfulTasks,
  pessimistic: pessimisticTasks,
};

export function getRandomTask(trait: string) {
  const tasks = taskMappings[trait];
  if (!tasks || tasks.length === 0) {
    console.warn(`No tasks found for trait: ${trait}`);
    return null;
  }

  const randomIndex = Math.floor(Math.random() * tasks.length);
  const task = tasks[randomIndex];

  if (!task) {
    console.warn(`Null task found for trait: ${trait} at index: ${randomIndex}`);
    return null;
  }

  return {
    ...task,
    id: `${trait}-${randomIndex}-${Date.now()}`, // Benzersiz ID oluştur
  };
}
