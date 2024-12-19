import { useQuery } from '@tanstack/react-query';
import { DailyHoroscopeService } from '@/services/dailyHoroscopeService';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UseDailyHoroscopeProps {
  goodTraits: Array<{ trait: string; value: number; color: string }>;
  badTraits: Array<{ trait: string; value: number; color: string }>;
  zodiacSign: string;
  locale: string;
  enabled?: boolean;
}

interface StoredHoroscope {
  general: string;
  love: string;
  career: string;
  date: string;
  locale: string;
  zodiacSign: string;
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
    queryFn: async () => {
      // Önce stored horoscope'u kontrol et
      const stored = await AsyncStorage.getItem('dailyHoroscope');
      const today = new Date().toISOString().split('T')[0];

      if (stored) {
        const storedData: StoredHoroscope = JSON.parse(stored);

        // Aynı gün ve aynı burç/dil için stored horoscope'u kullan
        if (
          storedData.date === today &&
          storedData.locale === locale &&
          storedData.zodiacSign === zodiacSign
        ) {
          return storedData;
        }
      }

      // Yeni horoscope oluştur
      const newHoroscope = await DailyHoroscopeService.getDailyHoroscope(
        goodTraits,
        badTraits,
        zodiacSign,
        locale
      );

      // Yeni horoscope'u sakla
      const horoscopeToStore: StoredHoroscope = {
        ...newHoroscope,
        date: today,
        locale,
        zodiacSign,
      };

      await AsyncStorage.setItem('dailyHoroscope', JSON.stringify(horoscopeToStore));

      return horoscopeToStore;
    },
    staleTime: Infinity, // Veriyi süresiz taze tut
    gcTime: 24 * 60 * 60 * 1000, // 24 saat garbage collection'da tut
    enabled: enabled && !!zodiacSign && !!locale,
  });
}
