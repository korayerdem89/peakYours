import { useEffect } from 'react';
import { AppState, AppStateStatus, Platform } from 'react-native';
import { focusManager } from '@tanstack/react-query';

export function useAppState() {
  useEffect(() => {
    if (Platform.OS !== 'web') {
      const subscription = AppState.addEventListener('change', (status: AppStateStatus) => {
        focusManager.setFocused(status === 'active');
      });

      return () => {
        subscription.remove();
      };
    }
  }, []);
}
