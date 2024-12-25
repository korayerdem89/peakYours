import { useState, useEffect } from 'react';
import { AppUsageService } from '@/services/appUsageService';

export function useAppUsage() {
  const [usageCount, setUsageCount] = useState<number>(0);
  const [isFirstTime, setIsFirstTime] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const initializeUsage = async () => {
      try {
        const currentCount = await AppUsageService.getUsageCount();
        if (!isMounted) return;

        setIsFirstTime(currentCount === 0);
        const newCount = await AppUsageService.incrementUsageCount();
        if (!isMounted) return;

        setUsageCount(newCount);
      } catch (error) {
        console.error('Error initializing app usage:', error);
      }
    };

    initializeUsage();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    usageCount,
    isFirstTime,
  };
}
