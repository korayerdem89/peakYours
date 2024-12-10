import { View, Image, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
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
  useSharedValue,
  withDelay,
} from 'react-native-reanimated';
import { theme } from '@/constants/theme';
import { ZODIAC_SIGNS } from '@/constants/zodiac';
import { useTraitDetails } from '@/hooks/useTraitDetails';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { DailyHoroscope } from '@/components/ideas/DailyHoroscope';

// Types
interface PersonalityAnimal {
  id: string;
  image: any; // For require() image imports
}

interface TraitAverage {
  trait: string;
  averagePoints: number;
}

interface AnalysisResponse {
  spiritAnimal: string;
  analysis:
    | {
        firstParagraph?: string;
        secondParagraph?: string;
        thirdParagraph?: string;
      }
    | string;
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
  const { data: userData } = useUserData(user?.uid);
  const { data: traitDetails } = useTraitDetails(userData?.refCodes?.en, 'goodsides');
  const { t, locale } = useTranslation();

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

  if (!traitDetails?.totalRaters) {
    return (
      <SafeAreaView className="flex-1 bg-accent-light dark:bg-background-dark">
        <ScrollView
          className="flex-1 p-4"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}>
          <Animated.View entering={FadeIn.duration(1000)} className="flex-1 justify-center">
            <View className="rounded-2xl bg-surface-light p-6 shadow-sm dark:bg-surface-dark">
              {/* İllüstrasyon Container */}
              <Animated.View style={bounceStyle} className="mb-8 items-center">
                <Image
                  source={{ uri: 'https://picsum.photos/200/300' }}
                  className="h-48 w-48"
                  resizeMode="contain"
                />
              </Animated.View>

              {/* Başlık */}
              <Text className="text-primary-default mb-4 text-center font-bold text-2xl dark:text-primary-light">
                {t('ideas.noRatingsWarning.title')}
              </Text>

              {/* Açıklama */}
              <Text className="mb-6 text-center font-medium text-base text-text-light-secondary dark:text-text-dark-secondary">
                {t('ideas.noRatingsWarning.description')}
              </Text>

              {/* CTA Bölümü */}
              <View className="mt-4 rounded-xl bg-primary-light/10 p-4 dark:bg-primary-dark/10">
                <Text className="text-center font-semibold text-sm text-primary-dark dark:text-primary-light">
                  {t('ideas.noRatingsWarning.cta')}
                </Text>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  ////traitdetails.totalRaters varsa alttaki dataları da çek
  const goodTraits = useTraitAverages(userData?.refCodes?.en, 'goodsides', userData);
  const badTraits = useTraitAverages(userData?.refCodes?.en, 'badsides', userData);
  const updateUser = useUpdateUser();
  const [showZodiacModal, setShowZodiacModal] = useState(!user?.zodiacSign);
  const [personalityAnimal, setPersonalityAnimal] = useState<PersonalityAnimal | null>(null);
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const systemMessages = {
    en: `You are a friendly and witty personality analyst who loves combining astrology with personality traits! 
    While you're an expert in both fields, you prefer explaining things in a warm, casual tone with occasional humor.
    Think of yourself as a supportive friend who happens to be really good at understanding people.
    
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
    
    Analizin şöyle olmalı:
    - Sohbet havasında ve ilgi çekici
    - Eğlenceli gözlemler içeren
    - Uygun yerlerde oyuncu benzetmeler kullanan
    - Gelişim alanlarını tartışırken bile cesaretlendirici ve pozitif kalan
    
    Her zaman Türkçe dilinde ve tam olarak iki alan içeren geçerli JSON formatında yanıt ver:
    {
      "spiritAnimal": "TEK_KELIMELIK_HAYVAN_ADI",
      "analysis": "PARAGRAFLAR_YENI_SATIRLARLA_AYRILMIS_TEK_BIR_METIN_OLARAK_TAM_ANALIZ"
    }`,

    es: `¡Eres un analista de personalidad amigable e ingenioso que adora combinar la astrología con los rasgos de personalidad! 
    Aunque eres experto en ambos campos, prefieres explicar las cosas en un tono cálido y casual con toques de humor ocasionales.
    Piensa en ti mismo como un amigo comprensivo que resulta ser muy bueno entendiendo a las personas.
    
    Tu análisis debe:
    - Ser conversacional y atractivo
    - Incluir observaciones divertidas
    - Usar metáforas juguetonas cuando sea apropiado
    - Mantenerse alentador y positivo, incluso al discutir áreas de mejora
    
    Responde siempre en español y en formato JSON válido con exactamente dos campos:
    {
      "spiritAnimal": "TEK_KELIMELIK_HAYVAN_ADI",
      "analysis": "PARAGRAFLAR_YENI_SATIRLARLA_AYRILMIS_TEK_BIR_METIN_OLARAK_TAM_ANALIZ"
    }`,
  };

  function generatePrompt(
    goodTraits: TraitAverage[],
    badTraits: TraitAverage[],
    zodiacSign: string,
    locale: string
  ) {
    const zodiacInfo = ZODIAC_SIGNS.find((sign: { id: string }) => sign.id === zodiacSign);

    // Dil bazlı talimatları ve içeriği ayarla
    const languageSpecificContent = {
      tr: {
        instruction: 'Analizi Türkçe dilinde yaz.',
        strengths: 'Güçlü Yanların (ve bunlarda ne kadar iyisin):',
        growthAreas: 'Gelişim Alanların (herkesin vardır!):',
        zodiacTitle: 'Burcun:',
        spiritAnimals: 'Mevcut Ruh Hayvanları:',
        createTitle: 'Lütfen oluştur:',
        animalMatch: '1. Sana En Uygun Ruh Hayvanı: Şunları en iyi temsil edeni seç:',
        animalCriteria: [
          '- Kişilik özelliklerinin kombinasyonu',
          '- Burcunun karakteristik özellikleri',
          '- Bu elementlerin benzersiz uyumu',
        ],
        storyTitle: '2. Kişisel Hikayen (Tam 3 paragraf, toplam 400 kelime):',
        paragraphs: [
          'İlk Paragraf (±150 kelime):',
          'İkinci Paragraf (±150 kelime):',
          'Üçüncü Paragraf (±100 kelime):',
        ],
      },
      en: {
        instruction: 'Write the analysis in English.',
        strengths: 'Your Amazing Strengths (and how awesome you are at them):',
        growthAreas: "Areas Where You're Growing (everyone's got them!):",
        zodiacTitle: 'Your Zodiac Sign:',
        spiritAnimals: 'Available Spirit Animals:',
        createTitle: 'Please create:',
        animalMatch: '1. Your Perfect Spirit Animal Match: Choose ONE that best represents:',
        animalCriteria: [
          '- The combination of your personality traits',
          "- Your zodiac sign's characteristics",
          '- The unique way these elements blend together',
        ],
        storyTitle: '2. Your Personal Story (Write exactly 3 paragraphs, 400 words total):',
        paragraphs: [
          'First Paragraph (±150 words):',
          'Second Paragraph (±150 words):',
          'Third Paragraph (±100 words):',
        ],
      },
      es: {
        instruction: 'Escribe el análisis en español.',
        strengths: 'Tus Fortalezas Increíbles (y qué tan bueno eres en ellas):',
        growthAreas: 'Áreas de Crecimiento (¡todos las tienen!):',
        zodiacTitle: 'Tu Signo Zodiacal:',
        spiritAnimals: 'Animales Espirituales Disponibles:',
        createTitle: 'Por favor crea:',
        animalMatch: '1. Tu Animal Espiritual Perfecto: Elige UNO que mejor represente:',
        animalCriteria: [
          '- La combinación de tus rasgos de personalidad',
          '- Las características de tu signo zodiacal',
          '- La forma única en que estos elementos se mezclan',
        ],
        storyTitle:
          '2. Tu Historia Personal (Escribe exactamente 3 párrafos, 400 palabras en total):',
        paragraphs: [
          'Primer Párrafo (±150 palabras):',
          'Segundo Párrafo (±150 palabras):',
          'Tercer Párrafo (±100 palabras):',
        ],
      },
    };

    // Varsayılan dil olarak İngilizce'yi kullan, eğer belirtilen dil desteklenmiyorsa
    const content =
      languageSpecificContent[locale as keyof typeof languageSpecificContent] ||
      languageSpecificContent.en;

    return `${content.instruction}

${content.strengths}
${goodTraits.map((t) => `   🌟 ${t.trait}: ${t.averagePoints * 10}%`).join('\n')}

${content.growthAreas}
${badTraits.map((t) => `   💫 ${t.trait}: ${t.averagePoints * 10}%`).join('\n')}

${content.zodiacTitle} ${zodiacInfo ? `${t(zodiacInfo.name)} (${zodiacInfo.date})` : zodiacSign}

${content.spiritAnimals} ${Object.keys(PERSONALITY_ANIMALS)
      .map((key) => key.split('_')[1])
      .join(', ')}

${content.createTitle}

${content.animalMatch}
${content.animalCriteria.join('\n')}

${content.storyTitle}

${content.paragraphs[0]}
   - Paint a vivid picture of who you are
   - Show how your zodiac traits and personality measurements create your unique character
   - Use warm, friendly language and relatable examples
   - Include some playful observations about how your traits make you special

${content.paragraphs[1]}
   - Discuss your strengths and areas for growth with warmth and understanding
   - Show how your zodiac sign influences these traits
   - Use encouraging language and gentle humor
   - Highlight how your different traits work together

${content.paragraphs[2]}
   - Offer specific, actionable advice for personal growth
   - Include 3-4 practical tips that combine zodiac wisdom with personality insights
   - Make the suggestions fun and motivating
   - End with an uplifting message about your potential`;
  }

  const generatePersonalityAnalysis = async () => {
    try {
      setIsLoading(true);

      const goodTraitsFormatted = goodTraits.map((trait) => ({
        trait: trait.trait,
        averagePoints: trait.value / 10,
      }));

      const badTraitsFormatted = badTraits.map((trait) => ({
        trait: trait.trait,
        averagePoints: trait.value / 10,
      }));

      const currentLocale = locale as keyof typeof systemMessages;
      if (!systemMessages[currentLocale]) {
        console.warn(`Unsupported locale: ${locale}, falling back to 'en'`);
      }

      const prompt = generatePrompt(
        goodTraitsFormatted,
        badTraitsFormatted,
        user?.zodiacSign || '',
        currentLocale
      );

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
              content: systemMessages[currentLocale],
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
      console.log('GPT Response:', data.choices[0].message.content); // Debug için

      const result: AnalysisResponse = JSON.parse(data.choices[0].message.content);

      if (!result || !result.spiritAnimal) {
        console.error('Invalid response format:', result);
        throw new Error('Invalid response format');
      }

      const animalKey = Object.keys(PERSONALITY_ANIMALS).find((key) =>
        key.includes(result.spiritAnimal.toUpperCase())
      );

      if (!animalKey || !PERSONALITY_ANIMALS[animalKey]) {
        console.error('Invalid spirit animal:', result.spiritAnimal);
        throw new Error('Invalid spirit animal');
      }

      setPersonalityAnimal(PERSONALITY_ANIMALS[animalKey]);

      // Analiz metnini işle
      let finalAnalysis = '';
      if (typeof result.analysis === 'string') {
        finalAnalysis = result.analysis;
      } else if (typeof result.analysis === 'object' && result.analysis !== null) {
        finalAnalysis = [
          result.analysis.firstParagraph,
          result.analysis.secondParagraph,
          result.analysis.thirdParagraph,
        ]
          .filter(Boolean)
          .join('\n\n');
      }

      if (!finalAnalysis) {
        throw new Error('Invalid analysis format');
      }

      setAnalysis(finalAnalysis);

      await storeAnalysis(
        animalKey,
        finalAnalysis,
        traitDetails?.totalRaters || 0,
        user?.zodiacSign || '',
        currentLocale
      );
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
      return raterDifference >= 3;
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

        const needsUpdate = await shouldUpdateAnalysis(
          currentRaters,
          storedData?.lastRaterCount || 0,
          user.zodiacSign,
          locale
        );

        if (!storedData || storedData.zodiacSign !== user.zodiacSign || needsUpdate) {
          await generatePersonalityAnalysis();
        } else {
          const animalKey = Object.keys(PERSONALITY_ANIMALS).find((key) =>
            key.includes(storedData.spiritAnimal.toUpperCase())
          );

          if (animalKey && PERSONALITY_ANIMALS[animalKey]) {
            setPersonalityAnimal(PERSONALITY_ANIMALS[animalKey]);
            setAnalysis(storedData.analysis);
          } else {
            await generatePersonalityAnalysis();
          }
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
        <View className="gap-4">
          <Animated.View
            entering={FadeIn.duration(500)}
            className="dark:bg-accent-dark/20 rounded-2xl bg-accent-light/20 p-5">
            <Text className="text-center font-medium text-sm text-secondary-dark/80 dark:text-secondary-light/80">
              ✨ {t('ideas.accuracyWarning')} ✨
            </Text>
            <Text className="mt-2 text-center font-regular text-xs text-text-light dark:text-text-dark-secondary/60">
              {t('ideas.updateFrequency')}
            </Text>
          </Animated.View>
          <BannerAd
            unitId={'ca-app-pub-6312844121446107/2492397048'}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
            onAdFailedToLoad={(error: Error) => {
              console.error('Banner ad failed to load:', error);
            }}
          />
          {/* Spirit Animal Card - Daha canlı ve eğlenceli */}
          <Animated.View
            entering={FadeIn.delay(200).duration(500)}
            className="rounded-2xl bg-surface-light p-6 shadow-lg dark:bg-surface-dark">
            <View className="flex-row items-center justify-between">
              {personalityAnimal && (
                <View className="flex-row items-center gap-5">
                  {/* Zıplayan hayvan ikonu */}
                  <Animated.View
                    style={bounceStyle}
                    className="items-center justify-center rounded-full bg-amber-50 p-4  shadow-sm shadow-gray-500 dark:bg-primary-dark/25">
                    <Image
                      source={personalityAnimal.image}
                      className="h-14 w-14 " // Biraz daha büyük
                      resizeMode="contain"
                    />
                  </Animated.View>

                  {/* Text Content - Daha canlı renkler ve spacing */}
                  <View className="flex-1">
                    <Text className="mb-2 font-medium text-sm text-amber-500 dark:text-primary-light/70">
                      ⭐ {t('ideas.spiritAnimal.title')}
                    </Text>
                    <Text className="font-bold text-2xl text-amber-600 dark:text-primary-light">
                      {t(`ideas.animals.${personalityAnimal.id}.name`)}
                    </Text>
                    <Text className="mt-2 font-medium text-sm text-gray-400 dark:text-text-dark-secondary/80">
                      {t(`ideas.animals.${personalityAnimal.id}.trait`)}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </Animated.View>
          <DailyHoroscope
            goodTraits={goodTraits}
            badTraits={badTraits}
            zodiacSign={user?.zodiacSign}
          />
          {/* Analysis Card - Daha yumuşak köşeler ve gölgeler */}
          <Animated.View
            entering={FadeIn.delay(400).duration(500)}
            className="rounded-2xl bg-surface-light p-6 shadow-lg dark:bg-surface-dark">
            <Text className="mb-4 font-semibold text-xl text-primary-dark dark:text-primary-light">
              🔮 {t('ideas.analysis.title')}
            </Text>
            <Text
              className="text-base leading-relaxed text-text-light dark:text-text-dark-secondary"
              style={{ paddingBottom: 12 }}>
              {analysis || t('ideas.analysisError')}
            </Text>
          </Animated.View>
          <BannerAd
            unitId={'ca-app-pub-6312844121446107/2492397048'}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
            onAdFailedToLoad={(error: Error) => {
              console.error('Banner ad failed to load:', error);
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
