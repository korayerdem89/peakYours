import { View, Image, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useState, useEffect, useLayoutEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/store/useAuth';
import { useTranslation } from '@/providers/LanguageProvider';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  withSpring,
  withSequence,
  useSharedValue,
  withDelay,
} from 'react-native-reanimated';
import { theme } from '@/constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DailyHoroscope } from '@/components/ideas/DailyHoroscope';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';
import { UpgradeButton } from '@/components/buttons/UpgradeButton';
import { useTraits } from '@/providers/TraitProvider';
import {
  PersonalityAnimal,
  AnalysisResponse,
  StoredAnalysis,
  languageSpecificContent,
  PERSONALITY_ANIMALS,
} from '@/types/ideas';

export default function Ideas() {
  // Core hooks
  const { user } = useAuth();
  const { t, locale } = useTranslation();
  const { userData, traitDetails, goodTraits, badTraits } = useTraits();

  // Animation values
  const bounceValue = useSharedValue(0);
  const bounceStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bounceValue.value }],
  }));

  // State management
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

  // Analysis generation
  const generateAnalysis = async () => {
    try {
      setIsLoading(true);

      if (!user?.zodiacSign || !goodTraits?.length || !badTraits?.length) {
        throw new Error('Missing required data');
      }

      const prompt = generatePrompt(
        goodTraits,
        badTraits,
        user.zodiacSign,
        locale as keyof typeof languageSpecificContent
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

      const animalKey = Object.keys(PERSONALITY_ANIMALS).find((key) => key === result.spiritAnimal);

      if (!animalKey || !PERSONALITY_ANIMALS[animalKey]) {
        throw new Error(`Invalid spirit animal: ${result.spiritAnimal}`);
      }

      setPersonalityAnimal(PERSONALITY_ANIMALS[animalKey]);
      setAnalysis(result.analysis);

      await storeAnalysis(
        animalKey,
        result.analysis,
        traitDetails?.totalRaters || 0,
        user.zodiacSign,
        locale
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

  // Storage functions
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

  // Effects
  useEffect(() => {
    const interval = setInterval(() => {
      bounceValue.value = withSequence(withSpring(-10), withDelay(100, withSpring(0)));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useLayoutEffect(() => {
    const loadAnalysis = async () => {
      if (!goodTraits || !badTraits || !user?.zodiacSign || !traitDetails) return;

      try {
        setIsLoading(true);
        const storedData = await getStoredAnalysis();

        if (
          !storedData ||
          storedData.zodiacSign !== user.zodiacSign ||
          storedData.locale !== locale ||
          !storedData.analysis
        ) {
          await generateAnalysis();
        } else {
          const animalKey = Object.keys(PERSONALITY_ANIMALS).find(
            (key) => key === storedData.spiritAnimal
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
        Toast.show({
          type: 'error',
          text1: t('ideas.analysisError'),
          position: 'bottom',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadAnalysis();
  }, [goodTraits, badTraits, user?.zodiacSign, traitDetails?.totalRaters, locale]);

  // Loading state check
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

  // Membership check
  if (userData?.membership?.type !== 'pro') {
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

  // Main render
  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <ScrollView
        className="flex-1 p-4"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <View className="flex-1 gap-4">
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
          {user?.zodiacSign && (
            <DailyHoroscope
              goodTraits={goodTraits}
              badTraits={badTraits}
              zodiacSign={user?.zodiacSign}
            />
          )}
          {analysis && (
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
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
