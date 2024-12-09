import { FirestoreService } from './firestore';

interface DailyHoroscope {
  general: string;
  love: string;
  career: string;
  lastUpdated: Date;
}

const systemMessages = {
  en: `You are an insightful astrologer who combines zodiac signs with personality traits to provide daily horoscope readings.
  Keep responses concise (40-50 words each) and engaging. Respond in valid JSON format with three fields: general, love, and career.`,

  tr: `Sen burçları kişilik özellikleriyle birleştirerek günlük yorumlar yapan içgörülü bir astrologsun.
  Yanıtları kısa (her biri 40-50 kelime) ve ilgi çekici tut. Üç alanlı (general, love, career) geçerli JSON formatında yanıt ver.`,

  es: `Eres un astrólogo perspicaz que combina los signos zodiacales con rasgos de personalidad para proporcionar lecturas diarias del horóscopo.
  Mantén las respuestas concisas (40-50 palabras cada una) y atractivas. Responde en formato JSON válido con tres campos: general, love y career.`,
};

export class DailyHoroscopeService {
  static async generateDailyHoroscope(
    userId: string,
    zodiacSign: string,
    traits: Record<string, number>,
    locale: string
  ) {
    const prompt = this.generatePrompt(zodiacSign, traits, locale);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: systemMessages[locale as keyof typeof systemMessages],
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('API Error Details:', errorData);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const horoscope = JSON.parse(data.choices[0].message.content);

    await this.storeDailyHoroscope(userId, horoscope);
    return horoscope;
  }

  private static generatePrompt(
    zodiacSign: string,
    traits: Record<string, number>,
    locale: string
  ) {
    const traitsList = Object.entries(traits)
      .map(([trait, value]) => `${trait}: ${value * 10}%`)
      .join('\n');

    return `Create daily horoscope readings based on:

Zodiac Sign: ${zodiacSign}
Personality Traits:
${traitsList}

Provide three short, personalized readings:
1. General outlook for the day
2. Love and relationships
3. Career and professional life

Consider both zodiac traits and personality measurements in your readings.`;
  }

  static async storeDailyHoroscope(userId: string, horoscope: Partial<DailyHoroscope>) {
    await FirestoreService.setDoc(
      'dailyHoroscopes',
      userId,
      {
        ...horoscope,
        lastUpdated: new Date(),
      },
      { merge: true }
    );
  }

  static async getDailyHoroscope(userId: string): Promise<DailyHoroscope | null> {
    return FirestoreService.getDoc<DailyHoroscope>('dailyHoroscopes', userId);
  }
}
