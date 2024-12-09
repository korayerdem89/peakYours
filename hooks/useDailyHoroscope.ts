import { useQuery } from '@tanstack/react-query';
import { DailyHoroscopeService } from '@/services/dailyHoroscopeService';
import { useTranslation } from '@/providers/LanguageProvider';

interface Trait {
  trait: string;
  value: number;
  color: string;
}

interface UseDailyHoroscopeProps {
  goodTraits: Trait[];
  badTraits: Trait[];
  zodiacSign: string;
  enabled?: boolean;
}

export function useDailyHoroscope({
  goodTraits,
  badTraits,
  zodiacSign,
  enabled = true,
}: UseDailyHoroscopeProps) {
  const { locale } = useTranslation();

  return useQuery({
    queryKey: ['dailyHoroscope', zodiacSign, locale],
    queryFn: () =>
      DailyHoroscopeService.getDailyHoroscope(goodTraits, badTraits, zodiacSign, locale),
    enabled,
    staleTime: 24 * 60 * 60 * 1000, // 24 saat
  });
}
