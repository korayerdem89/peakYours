import { Timestamp } from '@react-native-firebase/firestore';

export interface UserTasks {
  points: number;
  lastRefresh: Timestamp;
  completedTasks: string[];
  refreshesLeft: number;
}

export interface Task {
  id: string;
  trait: string;
  text: {
    tr: string;
    en: string;
    es: string;
  };
  color: string;
  type: 'goodsides' | 'badsides';
}
