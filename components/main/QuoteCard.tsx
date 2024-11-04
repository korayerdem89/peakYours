import { View, Text } from 'react-native';
import { useTranslation } from '@/providers/LanguageProvider';
import { quotes } from '@/constants/quotes';
import { useMemo } from 'react';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function QuoteCard() {
  const { locale, t } = useTranslation();

  const todaysQuote = useMemo(() => {
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24
    );
    const quoteIndex = dayOfYear % quotes.length;
    return quotes[quoteIndex];
  }, []);

  return (
    <LinearGradient
      colors={['#7C4DFF20', '#7C4DFF10']}
      className="mb-3 overflow-hidden rounded-xl p-0.5">
      <View className="rounded-xl bg-surface-light p-4 dark:bg-surface-dark">
        <View className="mb-2 flex-row items-center">
          <View className="mr-2 rounded-full bg-primary-light/20 p-1.5 dark:bg-primary-dark/20">
            <Feather
              name="book-open"
              size={14}
              color="#7C4DFF"
              className="dark:text-primary-light"
            />
          </View>
          <Text
            className="text-xs text-primary-dark/60 dark:text-gray-400"
            style={{ fontFamily: 'Philosopher_400Regular' }}>
            {t('common.quoteOfDay')}
          </Text>
        </View>

        <View className="mb-2">
          <Text
            className="text-sm leading-5 text-primary-dark dark:text-gray-200"
            style={{ fontFamily: 'Philosopher_400Regular' }}>
            {todaysQuote.quote[locale as keyof typeof todaysQuote.quote]}
          </Text>
        </View>

        <Text
          className="text-xs italic text-primary-dark/70 dark:text-gray-400"
          style={{ fontFamily: 'Philosopher_400Regular_Italic' }}>
          — {todaysQuote.author}
        </Text>
      </View>
    </LinearGradient>
  );
}
