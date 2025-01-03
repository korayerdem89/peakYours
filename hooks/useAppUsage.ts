import { useState, useEffect } from 'react';
import { AppUsageService } from '@/services/appUsageService';
import { useAppUsageStore } from '@/store/useAppUsage';

export function useAppUsage() {
  const { isFirstTime, usageCount, initializeUsage } = useAppUsageStore();

  useEffect(() => {
    initializeUsage();
  }, []);

  return { isFirstTime, usageCount };
}
