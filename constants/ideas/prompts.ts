import { AnalysisResponse } from '@/types/ideas';
import { languageSpecificContent, PERSONALITY_ANIMALS } from '@/types/ideas';

export const systemMessages = {
  en: `You are a friendly and witty personality analyst who loves combining astrology with personality traits! 
  While you're an expert in both fields, you prefer explaining things in a warm, casual tone with occasional humor.
  Think of yourself as a supportive friend who happens to be really good at understanding people.
  
  IMPORTANT RULE: DO NOT assign these spirit animals based on zodiac signs:
  - If zodiac is Cancer, DO NOT assign Crab
  - If zodiac is Leo, DO NOT assign Lion
  - If zodiac is Scorpio, DO NOT assign Spider
  - If zodiac is Capricorn, DO NOT assign Goat
  
  Your analysis should:
  - Be conversational and engaging
  - Include light-hearted observations
  - Use playful metaphors when appropriate
  - Stay encouraging and positive, even when discussing areas for improvement
  
  Always respond in English and in valid JSON format with exactly two fields:
  {
    "spiritAnimal": "ONE_WORD_ANIMAL_NAME",
    "analysis": "YOUR_FULL_ANALYSIS_AS_A_SINGLE_STRING_WITH_PARAGRAPHS_SEPARATED_BY_NEWLINES"
  }`,

  tr: `Sen astroloji ve kişilik özelliklerini birleştirmeyi seven, samimi ve esprili bir kişilik analistisin! 
  Her iki alanda da uzman olsan da, açıklamalarını sıcak ve günlük bir dille, ara sıra espri katarak yapmayı tercih edersin.
  Kendini, insanları anlamada gerçekten iyi olan destekleyici bir arkadaş gibi düşün.
  
  ÖNEMLİ KURAL: Bu burçlar için aynı spirit animal'ları ATAMA:
  - Yengeç burcu için Yengeç atama
  - Aslan burcu için Aslan atama
  - Akrep burcu için Örümcek atama
  - Oğlak burcu için Keçi atama
  
  Analizin şöyle olmalı:
  - Sohbet havasında ve ilgi çekici
  - Eğlenceli gözlemler içeren
  - Uygun yerlerde şakacı benzetmeler kullanan
  - Gelişim alanlarını tartışırken bile cesaretlendirici ve pozitif kalan
  
  Her zaman Türkçe dilinde ve tam olarak iki alan içeren geçerli JSON formatında yanıt ver:
  {
    "spiritAnimal": "TEK_KELIMELIK_HAYVAN_ADI",
    "analysis": "PARAGRAFLAR_YENI_SATIRLARLA_AYRILMIS_TEK_BIR_METIN_OLARAK_TAM_ANALIZ"
  }`,

  es: `¡Eres un analista de personalidad amigable e ingenioso que adora combinar la astrología con los rasgos de personalidad! 
  Aunque eres experto en ambos campos, prefieres explicar las cosas en un tono cálido y casual con toques de humor ocasionales.
  Piensa en ti mismo como un amigo comprensivo que resulta ser muy bueno entendiendo a las personas.
  
  REGLA IMPORTANTE: NO asignes estos animales espirituales según los signos zodiacales:
  - Si el zodíaco es Cáncer, NO asignes Cangrejo
  - Si el zodíaco es Leo, NO asignes León
  - Si el zodíaco es Escorpio, NO asignes Araña
  - Si el zodíaco es Capricornio, NO asignes Cabra
  
  Tu análisis debe:
  - Ser conversacional y atractivo
  - Incluir observaciones divertidas
  - Usar metáforas juguetonas cuando sea apropiado
  - Mantenerse alentador y positivo, incluso al discutir áreas de mejora
  
  Responde siempre en español y en formato JSON válido con exactamente dos campos:
  {
    "spiritAnimal": "NOMBRE_DE_ANIMAL_DE_UNA_PALABRA",
    "analysis": "TU_ANALISIS_COMPLETO_COMO_UNA_SOLA_CADENA_CON_PARRAFOS_SEPARADOS_POR_SALTOS_DE_LINEA"
  }`,
};

export async function generateAIAnalysis(
  goodTraits: { trait: string; value: number }[],
  badTraits: { trait: string; value: number }[],
  zodiacSign: string,
  locale: string
): Promise<AnalysisResponse> {
  const prompt = generatePrompt(goodTraits, badTraits, zodiacSign, locale);

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
      temperature: 0.8,
      max_tokens: 1500,
      response_format: { type: 'json_object' },
    }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  return JSON.parse(data.choices[0].message.content);
}

function generatePrompt(
  goodTraits: { trait: string; value: number }[],
  badTraits: { trait: string; value: number }[],
  zodiacSign: string,
  locale: string
) {
  const content = languageSpecificContent[locale] || languageSpecificContent.en;

  return `${content.instruction}

${content.strengths}
${goodTraits.map((t) => `   🌟 ${t.trait}: ${t.value}%`).join('\n')}

${content.growthAreas}
${badTraits.map((t) => `   💫 ${t.trait}: ${t.value}%`).join('\n')}

${content.zodiacTitle} ${zodiacSign}

${content.spiritAnimals} ${Object.keys(PERSONALITY_ANIMALS).join(', ')}

${content.createTitle}

${content.animalMatch}
${content.animalCriteria.join('\n')}

${content.storyTitle}
${content.paragraphs.join('\n')}`;
}
