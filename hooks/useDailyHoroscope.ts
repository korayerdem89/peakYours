import { useQuery } from '@tanstack/react-query';
import { generateAIHoroscope } from '@/utils/aiHelpers';

interface UseDailyHoroscopeProps {
  goodTraits: Array<{ trait: string; value: number }>;
  badTraits: Array<{ trait: string; value: number }>;
  zodiacSign: string;
  locale: string;
  enabled?: boolean;
}

export function useDailyHoroscope({
  goodTraits,
  badTraits,
  zodiacSign,
  locale,
  enabled = true,
}: UseDailyHoroscopeProps) {
  return useQuery({
    queryKey: ['dailyHoroscope', zodiacSign, locale],
    queryFn: () => generateAIHoroscope({ goodTraits, badTraits, zodiacSign, locale }),
    staleTime: 24 * 60 * 60 * 1000,
    enabled,
  });
}
