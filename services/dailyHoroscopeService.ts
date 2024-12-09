import { DailyHoroscope } from '@/types/horoscope';
import { generateAIHoroscope } from '@/utils/aiHelpers';

interface Trait {
  trait: string;
  value: number;
  color: string;
}

export class DailyHoroscopeService {
  static async getDailyHoroscope(
    goodTraits: Trait[],
    badTraits: Trait[],
    zodiacSign: string,
    language: string
  ): Promise<DailyHoroscope> {
    try {
      // En yüksek 3 good trait ve en düşük 3 bad trait'i al
      const topGoodTraits = [...goodTraits]
        .sort((a, b) => b.value - a.value)
        .slice(0, 3)
        .map((t) => ({ trait: t.trait, value: t.value }));

      const topBadTraits = [...badTraits]
        .sort((a, b) => b.value - a.value)
        .slice(0, 3)
        .map((t) => ({ trait: t.trait, value: t.value }));

      // Günlük tarihi al
      const today = new Date().toISOString().split('T')[0];

      // AI'dan horoscope al
      const horoscope = await generateAIHoroscope({
        zodiacSign,
        date: today,
        goodTraits: topGoodTraits,
        badTraits: topBadTraits,
        language,
      });

      return horoscope;
    } catch (error) {
      console.error('Error generating daily horoscope:', error);
      throw error;
    }
  }
}
