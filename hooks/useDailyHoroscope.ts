import { useQuery } from '@tanstack/react-query';
import { DailyHoroscopeService } from '@/services/dailyHoroscopeService';
import { useAuth } from '@/store/useAuth';
import { useTranslation } from '@/providers/LanguageProvider';

export function useDailyHoroscope(traits: Record<string, number> | undefined) {
  const { user } = useAuth();
  const { locale } = useTranslation();

  return useQuery({
    queryKey: ['dailyHoroscope', user?.uid, locale],
    queryFn: async () => {
      if (!user?.uid || !user.zodiacSign || !traits) return null;

      const stored = await DailyHoroscopeService.getDailyHoroscope(user.uid);
      const now = new Date();

      if (stored?.lastUpdated) {
        const lastUpdate = new Date(stored.lastUpdated);
        const isSameDay =
          lastUpdate.getDate() === now.getDate() &&
          lastUpdate.getMonth() === now.getMonth() &&
          lastUpdate.getFullYear() === now.getFullYear();

        if (isSameDay) return stored;
      }

      return DailyHoroscopeService.generateDailyHoroscope(
        user.uid,
        user.zodiacSign,
        traits,
        locale
      );
    },
    enabled: !!user?.uid && !!user.zodiacSign && !!traits,
  });
}
