interface AIHoroscopeParams {
  zodiacSign: string;
  date: string;
  goodTraits: Array<{ trait: string; value: number }>;
  badTraits: Array<{ trait: string; value: number }>;
  language: string;
}

interface AIHoroscopeResponse {
  general: string;
  love: string;
  career: string;
}

const systemMessages = {
  en: `You are a friendly and empathetic life advisor! Your role is to provide warm, practical daily advice that helps people grow.

  Guidelines for your advice:
  - Each advice section must be EXACTLY 60 words or less
  - Use a warm, friendly, and encouraging tone
  - Make suggestions specific and actionable
  - Consider both personality strengths and areas for improvement
  - Focus on daily actions and small steps
  - Be supportive and positive, like a caring friend
  
  Always respond in English and in valid JSON format with exactly three fields: general, love, and career.
  Each field should contain advice that is exactly 60 words or less.`,

  tr: `Sen sıcak ve empatik bir yaşam danışmanısın! Rolün, insanların gelişimine yardımcı olacak samimi ve pratik günlük tavsiyeler vermek.

  Tavsiyelerin için kurallar:
  - Her tavsiye bölümü TAM OLARAK 60 kelime veya daha az olmalı
  - Sıcak, samimi ve cesaretlendirici bir ton kullan
  - Önerilerin spesifik ve uygulanabilir olsun
  - Hem kişilik güçlerini hem de gelişim alanlarını göz önünde bulundur
  - Günlük eylemlere ve küçük adımlara odaklan
  - Önemseyici bir arkadaş gibi destekleyici ve pozitif ol
  
  Her zaman Türkçe dilinde ve tam olarak üç alan içeren geçerli JSON formatında yanıt ver: general, love ve career.
  Her alan tam olarak 60 kelime veya daha az tavsiye içermeli.`,

  es: `¡Eres un consejero de vida amigable y empático! Tu papel es brindar consejos diarios cálidos y prácticos que ayuden a las personas a crecer.

  Pautas para tus consejos:
  - Cada sección de consejo debe tener EXACTAMENTE 60 palabras o menos
  - Usa un tono cálido, amigable y alentador
  - Haz sugerencias específicas y realizables
  - Considera tanto las fortalezas de la personalidad como las áreas de mejora
  - Concéntrate en acciones diarias y pequeños pasos
  - Sé solidario y positivo, como un amigo que se preocupa
  
  Responde siempre en español y en formato JSON válido con exactamente tres campos: general, love y career.
  Cada campo debe contener un consejo de exactamente 60 palabras o menos.`,
};

const generatePrompt = (
  goodTraits: Array<{ trait: string; value: number }>,
  badTraits: Array<{ trait: string; value: number }>,
  language: string
) => {
  const languageInstructions = {
    en: 'Write the advice in English.',
    tr: 'Tavsiyeleri Türkçe dilinde yaz.',
    es: 'Escribe los consejos en español.',
  }[language];

  return `Let's create meaningful daily advice! ${languageInstructions}

Your task is to provide three pieces of warm, practical advice based on this person's personality profile:

Strong Traits:
${goodTraits.map((t) => `✨ ${t.trait}: ${t.value}%`).join('\n')}

Areas for Growth:
${badTraits.map((t) => `🌱 ${t.trait}: ${t.value}%`).join('\n')}

Please provide three types of advice (EXACTLY 60 words or less each):

1. General Life Advice:
   - A practical tip for overall well-being
   - Consider their personality traits
   - Focus on today's opportunities

2. Relationship/Social Advice:
   - How to better connect with others
   - Ways to nurture relationships
   - Using their strengths in social situations

3. Career/Personal Growth Advice:
   - Professional development tips
   - How to overcome challenges
   - Leveraging strengths at work

Remember:
- Keep each advice EXACTLY 60 words or less
- Be warm and supportive
- Make suggestions specific and actionable
- Focus on today's opportunities
- Consider both strengths and areas for growth

Format as JSON with three fields: general, love, career`;
};

export async function generateAIHoroscope({
  zodiacSign,
  date,
  goodTraits,
  badTraits,
  language,
}: AIHoroscopeParams): Promise<AIHoroscopeResponse> {
  try {
    const prompt = generatePrompt(goodTraits, badTraits, language);

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
            content: systemMessages[language as keyof typeof systemMessages],
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
      const errorData = await response.json().catch(() => ({}));
      console.error('API Error Details:', errorData);
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
