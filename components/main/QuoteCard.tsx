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
    <LinearGradient colors={['#7C4DFF20', '#7C4DFF10']} className="  overflow-hidden rounded-sm">
      <View className="rounded-sm bg-primary-light/5 p-2 ">
        <View className="mb-1 flex-row items-center">
          <View className="mr-1 rounded-full bg-primary-light/20 p-1.5">
            <Feather
              name="book-open"
              size={14}
              color="#7C4DFF"
              className="dark:text-primary-dark"
            />
          </View>
          <Text
            className="font-medium text-xs text-primary-dark dark:text-gray-500"
            style={{ fontFamily: 'Philosopher_400Regular' }}>
            {t('common.quoteOfDay')}
          </Text>
        </View>

        <View className="my-1">
          <Text
            className="font-regular text-sm text-text-light"
            style={{ fontFamily: 'Philosopher_400Regular' }}>
            {todaysQuote.quote[locale as keyof typeof todaysQuote.quote]}
            {'  '}
            <Text
              className="text-xs italic text-text-light"
              style={{ fontFamily: 'Philosopher_400Regular_Italic' }}>
              — {todaysQuote.author}
            </Text>
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}
