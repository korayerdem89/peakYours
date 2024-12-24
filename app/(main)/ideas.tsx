import { View, Image, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/store/useAuth';
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
import { useTraitDetails } from '@/hooks/useTraitDetails';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { DailyHoroscope } from '@/components/ideas/DailyHoroscope';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';
import { UpgradeButton } from '@/components/buttons/UpgradeButton';
import { useTraits } from '@/providers/TraitProvider';

// Types
interface PersonalityAnimal {
  id: string;
  image: any; // For require() image imports
}

// Language specific content types
interface LanguageContent {
  instruction: string;
  strengths: string;
  growthAreas: string;
  zodiacTitle: string;
  spiritAnimals: string;
  createTitle: string;
  animalMatch: string;
  animalCriteria: string[];
  storyTitle: string;
  paragraphs: string[];
}

const languageSpecificContent: Record<string, LanguageContent> = {
  en: {
    instruction:
      'Analyze the personality traits and zodiac sign to find the most suitable spirit animal.',
    strengths: 'Strengths:',
    growthAreas: 'Growth Areas:',
    zodiacTitle: 'Zodiac Sign:',
    spiritAnimals: 'Available Spirit Animals:',
    createTitle: 'Create Analysis',
    animalMatch: 'Match the most suitable spirit animal based on:',
    animalCriteria: [
      '- Personality trait scores',
      '- Zodiac sign characteristics',
      '- Overall personality pattern',
    ],
    storyTitle: 'Create a personalized story that:',
    paragraphs: [
      '- Explains why this spirit animal matches their personality',
      "- Highlights their strengths through the animal's characteristics",
      '- Suggests growth areas using gentle metaphors',
    ],
  },
  tr: {
    instruction:
      "Kişilik özelliklerini ve burç özelliklerini analiz ederek en uygun spirit animal'ı bul.",
    strengths: 'Güçlü Yönler:',
    growthAreas: 'Gelişim Alanları:',
    zodiacTitle: 'Burç:',
    spiritAnimals: 'Mevcut Spirit Animals:',
    createTitle: 'Analiz Oluştur',
    animalMatch: "En uygun spirit animal'ı şunlara göre seç:",
    animalCriteria: ['- Kişilik özelliği puanları', '- Burç özellikleri', '- Genel kişilik yapısı'],
    storyTitle: 'Şu özelliklere sahip kişisel bir hikaye oluştur:',
    paragraphs: [
      "- Bu spirit animal'ın neden kişiliğiyle eşleştiğini açıkla",
      '- Hayvanın özellikleri üzerinden güçlü yanlarını vurgula',
      '- Nazik metaforlar kullanarak gelişim alanlarını öner',
    ],
  },
  es: {
    instruction:
      'Analiza los rasgos de personalidad y el signo zodiacal para encontrar el animal espiritual más adecuado.',
    strengths: 'Fortalezas:',
    growthAreas: 'Áreas de Crecimiento:',
    zodiacTitle: 'Signo Zodiacal:',
    spiritAnimals: 'Animales Espirituales Disponibles:',
    createTitle: 'Crear Análisis',
    animalMatch: 'Encuentra el animal espiritual más adecuado basado en:',
    animalCriteria: [
      '- Puntuaciones de rasgos de personalidad',
      '- Características del signo zodiacal',
      '- Patrón general de personalidad',
    ],
    storyTitle: 'Crea una historia personalizada que:',
    paragraphs: [
      '- Explique por qué este animal espiritual coincide con su personalidad',
      '- Destaque sus fortalezas a través de las características del animal',
      '- Sugiera áreas de crecimiento usando metáforas suaves',
    ],
  },
};

// Analiz response tipi
interface AnalysisResponse {
  spiritAnimal: string;
  analysis: string;
}

// Stored analysis tipi
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
  const { user } = useAuth();
  const { t, locale } = useTranslation();
  const { userData, traitDetails, goodTraits, badTraits } = useTraits();

  // Animation hook'larını en üste alalım
  const bounceValue = useSharedValue(0);
  const bounceStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bounceValue.value }],
  }));

  // Bounce animasyonu için useEffect
  useEffect(() => {
    const interval = setInterval(() => {
      bounceValue.value = withSequence(withSpring(-10), withDelay(100, withSpring(0)));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Membership kontrolü
  if (!userData) {
    return <ActivityIndicator />;
  }

  if (userData.membership?.type !== 'pro') {
    const features = t('ideas.freemember.features', {
      returnObjects: 'true' as const,
      defaultValue: '',
    }) as unknown as string[];

    return (
      <SafeAreaView className="flex-1 bg-accent-light pt-20 dark:bg-background-dark">
        <ScrollView
          className="flex-1 p-4"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}>
          <Animated.View entering={FadeIn.duration(1000)} className="mt-6 flex-1">
            <View className="rounded-sm bg-surface-light p-6 shadow-sm dark:bg-surface-dark">
              <Animated.View style={bounceStyle} className="mb-8 items-center">
                <Image
                  source={{ uri: 'https://picsum.photos/800/200' }}
                  className="h-24 w-full"
                  resizeMode="contain"
                />
              </Animated.View>

              <Text className="text-primary-default mb-4 text-center font-bold text-2xl dark:text-primary-light">
                {t('ideas.freemember.title')}
              </Text>

              <View className="mb-6 gap-1">
                {features.map((feature: string, index: number) => (
                  <Text
                    key={index}
                    className="text-base text-text-light-secondary dark:text-text-dark-secondary">
                    {feature}
                  </Text>
                ))}
              </View>

              <UpgradeButton />
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (!traitDetails?.totalRaters) {
    return (
      <SafeAreaView className="flex-1 bg-accent-light dark:bg-background-dark">
        <ScrollView
          className="flex-1 p-4"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}>
          <Animated.View entering={FadeIn.duration(1000)} className="flex-1 justify-center">
            <View className="rounded-sm bg-surface-light p-6 shadow-sm dark:bg-surface-dark">
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
              <View className="mt-4 rounded-sm bg-primary-light/10 p-4 dark:bg-primary-dark/10">
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
  const [personalityAnimal, setPersonalityAnimal] = useState<PersonalityAnimal | null>(null);
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [bannerError, setBannerError] = useState(false);

  const systemMessages = {
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

  const generateAnalysis = async () => {
    try {
      setIsLoading(true);

      if (!user?.zodiacSign || !goodTraits?.length || !badTraits?.length) {
        throw new Error('Missing required data');
      }

      // useTraitAverages'dan gelen veriyi doğru şekilde formatlayalım
      const personalityData = {
        zodiacSign: user.zodiacSign,
        goodTraits: goodTraits.map((trait) => ({
          name: trait.trait,
          score: trait.value, // averagePoints yerine value kullanılmalı
        })),
        badTraits: badTraits.map((trait) => ({
          name: trait.trait,
          score: trait.value, // averagePoints yerine value kullanılmalı
        })),
      };

      // API'ye gönderilecek prompt
      const prompt = generatePrompt(
        goodTraits,
        badTraits,
        user.zodiacSign,
        locale as keyof typeof systemMessages
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
      const result: AnalysisResponse = JSON.parse(data.choices[0].message.content);

      // Gelen spirit animal'ı kontrol et ve set et
      const animalKey = Object.keys(PERSONALITY_ANIMALS).find((key) => key === result.spiritAnimal);

      if (!animalKey || !PERSONALITY_ANIMALS[animalKey]) {
        throw new Error(`Invalid spirit animal: ${result.spiritAnimal}`);
      }

      setPersonalityAnimal(PERSONALITY_ANIMALS[animalKey]);
      setAnalysis(typeof result.analysis === 'string' ? result.analysis : '');

      // Analizi cache'le
      await storeAnalysis(
        animalKey,
        result.analysis,
        traitDetails?.totalRaters || 0,
        user.zodiacSign,
        locale as string
      );
    } catch (error) {
      console.error('Analysis generation error:', error);
      Toast.show({
        type: 'error',
        text1: t('ideas.analysisError'),
        position: 'bottom',
      });
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

  useLayoutEffect(() => {
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
          await generateAnalysis();
        } else {
          const animalKey = Object.keys(PERSONALITY_ANIMALS).find((key) =>
            key.includes(storedData.spiritAnimal.toUpperCase())
          );

          if (animalKey && PERSONALITY_ANIMALS[animalKey]) {
            setPersonalityAnimal(PERSONALITY_ANIMALS[animalKey]);
            setAnalysis(storedData.analysis);
          } else {
            await generateAnalysis();
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

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected && bannerError) {
        setBannerError(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [bannerError]);

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
            className="dark:bg-accent-dark/20 rounded-sm bg-accent-light/20 p-5">
            <Text className="text-center font-medium text-sm text-secondary-dark/80 dark:text-secondary-light/80">
              ✨ {t('ideas.accuracyWarning')} ✨
            </Text>
            <Text className="mt-2 text-center font-regular text-xs text-text-light dark:text-text-dark-secondary/60">
              {t('ideas.updateFrequency')}
            </Text>
          </Animated.View>
          {/* Spirit Animal Card - Daha canlı ve eğlenceli */}
          <Animated.View
            entering={FadeIn.delay(200).duration(500)}
            className="rounded-sm bg-surface-light p-6 shadow-lg dark:bg-surface-dark">
            <View className="flex-row items-center justify-between">
              {personalityAnimal && (
                <View className="flex-row items-center gap-5">
                  {/* Zıplayan hayvan ikonu */}
                  <Animated.View
                    style={bounceStyle}
                    className="items-center justify-center rounded-sm bg-amber-50 p-4  shadow-sm shadow-gray-500 dark:bg-primary-dark/25">
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
          {user?.zodiacSign && (
            <DailyHoroscope
              goodTraits={goodTraits}
              badTraits={badTraits}
              zodiacSign={user?.zodiacSign}
            />
          )}
          {/* Analysis Card - Daha yumuşak köşeler ve gölgeler */}
          <Animated.View
            entering={FadeIn.delay(400).duration(500)}
            className="rounded-sm bg-surface-light p-6 shadow-lg dark:bg-surface-dark">
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
