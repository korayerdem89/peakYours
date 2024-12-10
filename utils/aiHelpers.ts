import { systemMessages } from '../constants/aiSystemMessages';

interface GenerateAIHoroscopeParams {
  goodTraits: Array<{ trait: string; value: number }>;
  badTraits: Array<{ trait: string; value: number }>;
  zodiacSign: string;
  locale: string;
}

export async function generateAIHoroscope({
  goodTraits,
  badTraits,
  zodiacSign,
  locale,
}: GenerateAIHoroscopeParams) {
  try {
    const currentLocale = locale as keyof typeof systemMessages;
    const selectedMessage = systemMessages[currentLocale] || systemMessages.en;

    const prompt = generateHoroscopePrompt(goodTraits, badTraits, zodiacSign, currentLocale);

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
            content: selectedMessage,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);

    return {
      general: result.general || 'Genel tavsiye oluşturulamadı.',
      love: result.love || 'İlişki tavsiyesi oluşturulamadı.',
      career: result.career || 'Kariyer tavsiyesi oluşturulamadı.',
    };
  } catch (error) {
    console.error('Error in generateAIHoroscope:', error);
    throw error;
  }
}

function generateHoroscopePrompt(
  goodTraits: Array<{ trait: string; value: number }>,
  badTraits: Array<{ trait: string; value: number }>,
  zodiacSign: string,
  locale: keyof typeof systemMessages
) {
  const traits = {
    strengths: goodTraits.map((t) => `${t.trait}: ${t.value}%`).join(', '),
    improvements: badTraits.map((t) => `${t.trait}: ${t.value}%`).join(', '),
  };

  const prompts: Record<keyof typeof systemMessages, string> = {
    tr: `Burç: ${zodiacSign}
Güçlü Yanlar: ${traits.strengths}
Gelişim Alanları: ${traits.improvements}

Lütfen bu kişi için günlük tavsiyeler oluştur.`,

    en: `Zodiac Sign: ${zodiacSign}
Strengths: ${traits.strengths}
Areas for Improvement: ${traits.improvements}

Please generate daily advice for this person.`,

    es: `Signo Zodiacal: ${zodiacSign}
Fortalezas: ${traits.strengths}
Áreas de Mejora: ${traits.improvements}

Por favor, genera consejos diarios para esta persona.`,
  };

  return prompts[locale] || prompts.en;
}
