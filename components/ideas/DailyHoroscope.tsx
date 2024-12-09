import { View, Text, ScrollView } from 'react-native';
import { useTranslation } from '@/providers/LanguageProvider';
import { useDailyHoroscope } from '@/hooks/useDailyHoroscope';
import Animated, { FadeIn } from 'react-native-reanimated';

interface DailyHoroscopeProps {
  traits: Record<string, number>;
}

export function DailyHoroscope({ traits }: DailyHoroscopeProps) {
  const { t } = useTranslation();
  const { data: horoscope, isLoading } = useDailyHoroscope(traits);

  if (isLoading || !horoscope) return null;

  return (
    <Animated.View entering={FadeIn.duration(500)} className="mt-6">
      <Text className="mb-4 font-semibold text-xl text-primary-dark dark:text-primary-light">
        {t('ideas.dailyHoroscope.title')}
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingRight: 16 }}>
        <HoroscopeCard tag={t('ideas.dailyHoroscope.tags.general')} content={horoscope.general} />
        <HoroscopeCard tag={t('ideas.dailyHoroscope.tags.love')} content={horoscope.love} />
        <HoroscopeCard tag={t('ideas.dailyHoroscope.tags.career')} content={horoscope.career} />
      </ScrollView>
    </Animated.View>
  );
}

function HoroscopeCard({ tag, content }: { tag: string; content: string }) {
  return (
    <View className="w-72 rounded-2xl bg-surface-light p-5 shadow-sm dark:bg-surface-dark">
      <Text className="mb-3 font-medium text-sm text-primary-dark/70 dark:text-primary-light/70">
        #{tag}
      </Text>
      <Text className="font-regular text-base text-text-light dark:text-text-dark">{content}</Text>
    </View>
  );
}
