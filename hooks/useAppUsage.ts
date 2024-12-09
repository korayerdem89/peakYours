import { useState, useEffect } from 'react';
import { AppUsageService } from '@/services/appUsageService';

export function useAppUsage() {
  const [usageCount, setUsageCount] = useState<number>(0);
  const [isFirstTime, setIsFirstTime] = useState<boolean>(true);

  useEffect(() => {
    const initializeUsage = async () => {
      try {
        const currentCount = await AppUsageService.getUsageCount();
        setIsFirstTime(currentCount === 0);
        const newCount = await AppUsageService.incrementUsageCount();
        setUsageCount(newCount);
      } catch (error) {
        console.error('Error initializing app usage:', error);
      }
    };

    initializeUsage();
  }, []);

  return {
    usageCount,
    isFirstTime,
  };
}
