import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from '@/providers/LanguageProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const languages = [
  {
    code: 'en',
    name: 'English',
    flag: require('@/assets/flags/en.png'),
  },
  {
    code: 'es',
    name: 'Español',
    flag: require('@/assets/flags/es.png'),
  },
  {
    code: 'tr',
    name: 'Türkçe',
    flag: require('@/assets/flags/tr.png'),
  },
];

const LANGUAGE_CHANGE_KEY = 'last_language_change';

export default function LanguageSelect() {
  const router = useRouter();
  const { setAppLocale } = useTranslation();

  const handleLanguageSelect = async (languageCode: string) => {
    await setAppLocale(languageCode);
    await AsyncStorage.setItem(LANGUAGE_CHANGE_KEY, Date.now().toString());
    router.replace('/(onboarding)');
  };

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <View className="flex-1 items-center justify-center px-4">
        <View className="w-full max-w-sm">
          <Text className="mb-8 text-center font-bold text-2xl text-text-light dark:text-text-dark">
            Select Language
          </Text>

          <View className="gap-12">
            {languages.map((language) => (
              <TouchableOpacity
                key={language.code}
                onPress={() => handleLanguageSelect(language.code)}
                className="flex-row items-center justify-between rounded-lg bg-surface-light p-4 dark:bg-surface-dark"
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                }}>
                <View className="flex-row items-center space-x-4">
                  <Image source={language.flag} className="h-8 w-12 rounded" resizeMode="cover" />
                  <Text className="ml-4 font-medium text-lg text-text-light dark:text-text-dark">
                    {language.name}
                  </Text>
                </View>
                <Text className="text-text-light-secondary dark:text-text-dark-secondary">›</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
