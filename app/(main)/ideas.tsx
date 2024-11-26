import { View, Image, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useState, useEffect, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/store/useAuth';
import { ZodiacModal } from '@/components/ZodiacModal';
import { useTranslation } from '@/providers/LanguageProvider';
import { Alert } from 'react-native';
import { useUpdateUser } from '@/hooks/useUserQueries';
import { useTraitAverages } from '@/hooks/useTraitAverages';
import { useUserData } from '@/hooks/useUserQueries';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withRepeat,
  useSharedValue,
  withDelay,
} from 'react-native-reanimated';
import { theme } from '@/constants/theme';
import { ZODIAC_SIGNS } from '@/constants/zodiac';
import { useTraitDetails } from '@/hooks/useTraitDetails';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Types
interface PersonalityAnimal {
  id: string;
  image: any; // For require() image imports
}

interface TraitAverage {
  trait: string;
  averagePoints: number;
}

interface StoredAnalysis {
  spiritAnimal: string;
  analysis: string;
  lastUpdatedAt: number;
  lastRaterCount: number;
  zodiacSign: string;
  locale: string;
}

const PERSONALITY_ANIMALS: Record<string, PersonalityAnimal> = {
  INDEPENDENT_CAT: {
    id: 'cat',
    image: require('@/assets/animals/cat.png'),
  },
  ADAPTABLE_CHAMELEON: {
    id: 'chameleon',
    image: require('@/assets/animals/chameleon.png'),
  },
  PROTECTIVE_CRAB: {
    id: 'crab',
    image: require('@/assets/animals/crab.png'),
  },
  POWERFUL_DRAGON: {
    id: 'dragon',
    image: require('@/assets/animals/dragon.png'),
  },
  GRACEFUL_FLAMINGO: {
    id: 'flamingo',
    image: require('@/assets/animals/flamingo.png'),
  },
  CLEVER_FOX: {
    id: 'fox',
    image: require('@/assets/animals/fox.png'),
  },
  DETERMINED_GOAT: {
    id: 'goat',
    image: require('@/assets/animals/goat.png'),
  },
  STRONG_GORILLA: {
    id: 'gorilla',
    image: require('@/assets/animals/gorilla.png'),
  },
  CAUTIOUS_HEDGEHOG: {
    id: 'hedgehog',
    image: require('@/assets/animals/hedgehog.png'),
  },
  AMBITIOUS_HORSE: {
    id: 'horse',
    image: require('@/assets/animals/horse.png'),
  },
  ENERGETIC_KANGAROO: {
    id: 'kangaroo',
    image: require('@/assets/animals/kangaroo.png'),
  },
  LEADER_LION: {
    id: 'lion',
    image: require('@/assets/animals/lion.png'),
  },
  WISE_OWL: {
    id: 'owl',
    image: require('@/assets/animals/owl.png'),
  },
  RESILIENT_PHOENIX: {
    id: 'phoenix',
    image: require('@/assets/animals/phoenix.png'),
  },
  GENTLE_SEAHORSE: {
    id: 'seahorse',
    image: require('@/assets/animals/seahorse.png'),
  },
  PLAYFUL_SEAL: {
    id: 'seal',
    image: require('@/assets/animals/seal.png'),
  },
  STRATEGIC_SNAKE: {
    id: 'snake',
    image: require('@/assets/animals/snake.png'),
  },
  PATIENT_SPIDER: {
    id: 'spider',
    image: require('@/assets/animals/spider.png'),
  },
  RESOURCEFUL_SQUIRREL: {
    id: 'squirrel',
    image: require('@/assets/animals/squirrel.png'),
  },
  SOCIAL_TOUCAN: {
    id: 'toucan',
    image: require('@/assets/animals/toucan.png'),
  },
  STEADY_TURTLE: {
    id: 'turtle',
    image: require('@/assets/animals/turtle.png'),
  },
  PEACEFUL_WHALE: {
    id: 'whale',
    image: require('@/assets/animals/whale.png'),
  },
  LOYAL_WOLF: {
    id: 'wolf',
    image: require('@/assets/animals/wolf.png'),
  },
  DILIGENT_WOODPECKER: {
    id: 'woodpecker',
    image: require('@/assets/animals/woodpecker.png'),
  },
};

export default function Ideas() {
  const { user, updateUserData } = useAuth();
  const { t, locale } = useTranslation();
  const [showZodiacModal, setShowZodiacModal] = useState(!user?.zodiacSign);
  const [personalityAnimal, setPersonalityAnimal] = useState<PersonalityAnimal | null>(null);
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const { data: userData } = useUserData(user?.uid);
  const { data: goodTraits } = useTraitAverages(userData?.refCodes?.en, 'goodsides');
  const { data: badTraits } = useTraitAverages(userData?.refCodes?.en, 'badsides');
  const { data: traitDetails } = useTraitDetails(userData?.refCodes?.en, 'goodsides');
  const updateUser = useUpdateUser();

  const systemMessages = {
    en: `You are a friendly and witty personality analyst who loves combining astrology with personality traits! 
    While you're an expert in both fields, you prefer explaining things in a warm, casual tone with occasional humor.
    Think of yourself as a supportive friend who happens to be really good at understanding people.
    
    Your analysis should:
    - Be conversational and engaging
    - Include light-hearted observations
    - Use playful metaphors when appropriate
    - Stay encouraging and positive, even when discussing areas for improvement
    
    Always respond in English and in valid JSON format with exactly two fields: spiritAnimal and analysis.`,

    tr: `Sen astroloji ve kişilik özelliklerini birleştirmeyi seven, samimi ve esprili bir kişilik analistisin! 
    Her iki alanda da uzman olsan da, açıklamalarını sıcak ve günlük bir dille, ara sıra espri katarak yapmayı tercih edersin.
    Kendini, insanları anlamada gerçekten iyi olan destekleyici bir arkadaş gibi düşün.
    
    Analizin şöyle olmalı:
    - Sohbet havasında ve ilgi çekici
    - Eğlenceli gözlemler içeren
    - Uygun yerlerde oyuncu benzetmeler kullanan
    - Gelişim alanlarını tartışırken bile cesaretlendirici ve pozitif kalan
    
    Her zaman Türkçe dilinde ve tam olarak iki alan içeren geçerli JSON formatında yanıt ver: spiritAnimal ve analysis.`,

    es: `¡Eres un analista de personalidad amigable e ingenioso que adora combinar la astrología con los rasgos de personalidad! 
    Aunque eres experto en ambos campos, prefieres explicar las cosas en un tono cálido y casual con toques de humor ocasionales.
    Piensa en ti mismo como un amigo comprensivo que resulta ser muy bueno entendiendo a las personas.
    
    Tu análisis debe:
    - Ser conversacional y atractivo
    - Incluir observaciones divertidas
    - Usar metáforas juguetonas cuando sea apropiado
    - Mantenerse alentador y positivo, incluso al discutir áreas de mejora
    
    Responde siempre en español y en formato JSON válido con exactamente dos campos: spiritAnimal y analysis.`,
  };

  function generatePrompt(
    goodTraits: TraitAverage[],
    badTraits: TraitAverage[],
    zodiacSign: string,
    locale: string
  ) {
    const zodiacInfo = ZODIAC_SIGNS.find((sign: { id: string }) => sign.id === zodiacSign);

    const languageInstructions = {
      en: 'Write the analysis in English.',
      tr: 'Analizi Türkçe dilinde yaz.',
      es: 'Escribe el análisis en español.',
    }[locale];

    return `Let's create a detailed and fun personality reading! ${languageInstructions}

Here's what I know about you:

✨ Your Amazing Strengths (and how awesome you are at them):
${goodTraits.map((t) => `   🌟 ${t.trait}: ${t.averagePoints * 10}%`).join('\n')}

🌱 Areas Where You're Growing (everyone's got them!):
${badTraits.map((t) => `   💫 ${t.trait}: ${t.averagePoints * 10}%`).join('\n')}

🌟 Your Zodiac Sign: ${zodiacInfo ? `${t(zodiacInfo.name)} (${zodiacInfo.date})` : zodiacSign}

Available Spirit Animals: ${Object.keys(PERSONALITY_ANIMALS)
      .map((key) => key.split('_')[1])
      .join(', ')}

Please create:

1. Your Perfect Spirit Animal Match: Choose ONE that best represents:
   - The combination of your personality traits
   - Your zodiac sign's characteristics
   - The unique way these elements blend together

2. Your Personal Story (Write exactly 3 paragraphs, 400 words total):

   First Paragraph (±150 words):
   - Paint a vivid picture of who you are
   - Show how your zodiac traits and personality measurements create your unique character
   - Use warm, friendly language and relatable examples
   - Include some playful observations about how your traits make you special

   Second Paragraph (±150 words):
   - Discuss your strengths and areas for growth with warmth and understanding
   - Show how your zodiac sign influences these traits
   - Use encouraging language and gentle humor
   - Highlight how your different traits work together

   Third Paragraph (±100 words):
   - Offer specific, actionable advice for personal growth
   - Include 3-4 practical tips that combine zodiac wisdom with personality insights
   - Make the suggestions fun and motivating
   - End with an uplifting message about your potential

Format your response as JSON:
{
  "spiritAnimal": "EXACT_KEY_FROM_LIST",
  "analysis": "YOUR_FRIENDLY_ANALYSIS_HERE"
}`;
  }

  const generatePersonalityAnalysis = async (
    goodTraits: TraitAverage[] | undefined,
    badTraits: TraitAverage[] | undefined,
    zodiacSign: string
  ) => {
    try {
      setIsLoading(true);

      if (!goodTraits || !badTraits) {
        throw new Error('Trait data is missing');
      }

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
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error Details:', errorData);
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      try {
        const result = JSON.parse(data.choices[0].message.content);

        const animalKey = Object.keys(PERSONALITY_ANIMALS).find((key) =>
          key.includes(result.spiritAnimal.toUpperCase())
        );

        if (!animalKey || !PERSONALITY_ANIMALS[animalKey]) {
          throw new Error('Invalid spirit animal');
        }

        setPersonalityAnimal(PERSONALITY_ANIMALS[animalKey]);
        setAnalysis(result.analysis);
      } catch (parseError) {
        console.error('Error parsing OpenAI response:', parseError);
        throw new Error('Invalid API response format');
      }
    } catch (error: any) {
      console.error('Analysis generation error:', error);

      if (error.response?.status === 401) {
        Alert.alert(t('common.error'), t('ideas.unauthorizedError'));
      } else if (error.response?.status === 429) {
        Alert.alert(t('common.error'), t('ideas.rateLimitError'));
      } else {
        Alert.alert(t('common.error'), t('ideas.analysisError'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const shouldUpdateAnalysis = async (
    currentRaters: number,
    lastStoredRaters: number,
    currentZodiacSign: string,
    currentLocale: string
  ): Promise<boolean> => {
    try {
      const stored = await AsyncStorage.getItem(`personality_analysis_${user?.uid}`);
      const storedData = stored ? JSON.parse(stored) : null;

      if (!storedData) return true;

      if (storedData.zodiacSign !== currentZodiacSign) return true;

      if (storedData.locale !== currentLocale) return true;

      if (lastStoredRaters === 0) return true;

      const raterDifference = currentRaters - lastStoredRaters;
      return raterDifference >= 5;
    } catch (error) {
      console.error('Error in shouldUpdateAnalysis:', error);
      return true;
    }
  };

  const getStoredAnalysis = async (): Promise<StoredAnalysis | null> => {
    try {
      const stored = await AsyncStorage.getItem(`personality_analysis_${user?.uid}`);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Error reading stored analysis:', error);
      return null;
    }
  };

  const storeAnalysis = async (
    spiritAnimal: string,
    analysis: string,
    raterCount: number,
    zodiacSign: string,
    locale: string
  ) => {
    try {
      const dataToStore: StoredAnalysis = {
        spiritAnimal,
        analysis,
        lastUpdatedAt: Date.now(),
        lastRaterCount: raterCount,
        zodiacSign,
        locale,
      };
      await AsyncStorage.setItem(`personality_analysis_${user?.uid}`, JSON.stringify(dataToStore));
    } catch (error) {
      console.error('Error storing analysis:', error);
    }
  };

  useEffect(() => {
    const loadAnalysis = async () => {
      if (!goodTraits || !badTraits || !user?.zodiacSign || !traitDetails) return;
      try {
        setIsLoading(true);
        const currentRaters = traitDetails.totalRaters || 0;
        const storedData = await getStoredAnalysis();
        const lastStoredRaters = storedData?.lastRaterCount || 0;

        const needsUpdate = await shouldUpdateAnalysis(
          currentRaters,
          lastStoredRaters,
          user.zodiacSign,
          locale
        );

        if (storedData && !needsUpdate) {
          const animalKey = Object.keys(PERSONALITY_ANIMALS).find((key) =>
            key.includes(storedData.spiritAnimal.toUpperCase())
          );

          if (animalKey && PERSONALITY_ANIMALS[animalKey]) {
            setPersonalityAnimal(PERSONALITY_ANIMALS[animalKey]);
            setAnalysis(storedData.analysis);
            setIsLoading(false);
            return;
          }
        }

        await generatePersonalityAnalysis(goodTraits, badTraits, user.zodiacSign);

        if (personalityAnimal && analysis) {
          await storeAnalysis(
            personalityAnimal.id,
            analysis,
            currentRaters,
            user.zodiacSign,
            locale
          );
        }
      } catch (error) {
        console.error('Error in loadAnalysis:', error);
        Alert.alert(t('common.error'), t('ideas.analysisError'));
      } finally {
        setIsLoading(false);
      }
    };

    loadAnalysis();
  }, [goodTraits, badTraits, user?.zodiacSign, traitDetails?.totalRaters, locale]);

  const handleZodiacSubmit = async (zodiacId: string) => {
    if (!user?.uid) return;

    try {
      await updateUser.mutateAsync({
        userId: user.uid,
        data: {
          zodiacSign: zodiacId,
        },
      });
      updateUserData({ zodiacSign: zodiacId });
      setShowZodiacModal(false);
    } catch (error) {
      console.error('Error updating zodiac sign:', error);
      Alert.alert(t('common.error'), t('settings.zodiacCard.updateError'));
    }
  };

  // Bounce animasyonu için shared value
  const bounceValue = useSharedValue(0);

  // 5 saniyede bir tekrarlanan bounce efekti
  useEffect(() => {
    const interval = setInterval(() => {
      bounceValue.value = withSequence(
        withSpring(-10), // Yukarı zıpla
        withDelay(100, withSpring(0)) // Aşağı in
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const bounceStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bounceValue.value }],
  }));

  if (!user?.zodiacSign) {
    return (
      <View className="flex-1 bg-background-light dark:bg-background-dark">
        <ZodiacModal visible={showZodiacModal} onClose={() => {}} onSubmit={handleZodiacSubmit} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center gap-3 bg-background-light dark:bg-background-dark">
        <ActivityIndicator size="large" color={theme.colors.primary.light} />
        <Text className="font-medium text-base text-primary-dark/70 dark:text-primary-light/70">
          {t('common.analyzing')}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{
          paddingTop: 16,
          paddingBottom: 96,
        }}
        showsVerticalScrollIndicator={false}>
        {/* Header Warning - Daha yumuşak bir görünüm */}
        <Animated.View
          entering={FadeIn.duration(500)}
          className="dark:bg-accent-dark/20 rounded-2xl bg-accent-light/20 p-5">
          <Text className="text-center font-medium text-sm text-secondary-dark/80 dark:text-secondary-light/80">
            ✨ {t('ideas.accuracyWarning')} ✨
          </Text>
        </Animated.View>

        {/* Spirit Animal Card - Daha canlı ve eğlenceli */}
        <Animated.View
          entering={FadeIn.delay(200).duration(500)}
          className="mt-6 rounded-2xl bg-surface-light p-6 shadow-lg dark:bg-surface-dark">
          <View className="flex-row items-center justify-between">
            {personalityAnimal && (
              <View className="flex-row items-center gap-5">
                {/* Zıplayan hayvan ikonu */}
                <Animated.View
                  style={bounceStyle}
                  className="items-center justify-center rounded-full bg-primary-light/15 p-4 shadow-sm dark:bg-primary-dark/25">
                  <Image
                    source={personalityAnimal.image}
                    className="h-14 w-14" // Biraz daha büyük
                    resizeMode="contain"
                  />
                </Animated.View>

                {/* Text Content - Daha canlı renkler ve spacing */}
                <View className="flex-1">
                  <Text className="mb-2 font-medium text-sm text-primary-dark/70 dark:text-primary-light/70">
                    ⭐ {t('ideas.spiritAnimal.title')}
                  </Text>
                  <Text className="font-bold text-2xl text-primary-dark dark:text-primary-light">
                    {t(`ideas.animals.${personalityAnimal.id}.name`)}
                  </Text>
                  <Text className="mt-2 font-medium text-sm text-text-light-secondary/80 dark:text-text-dark-secondary/80">
                    {t(`ideas.animals.${personalityAnimal.id}.trait`)}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </Animated.View>

        {/* Analysis Card - Daha yumuşak köşeler ve gölgeler */}
        <Animated.View
          entering={FadeIn.delay(400).duration(500)}
          className="my-6 rounded-2xl bg-surface-light p-6 shadow-lg dark:bg-surface-dark">
          <Text className="mb-4 font-semibold text-xl text-primary-dark dark:text-primary-light">
            🔮 {t('ideas.analysis.title')}
          </Text>
          <Text
            className="text-base leading-relaxed text-text-light dark:text-text-dark-secondary"
            style={{ paddingBottom: 12 }}>
            {analysis}
          </Text>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
