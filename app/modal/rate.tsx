import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from '@/providers/LanguageProvider';
import { Stack } from 'expo-router';

export default function RateModal() {
  const { t } = useTranslation();

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <Stack.Screen
        options={{
          title: t('personality.rating.title'),
          headerShown: true,
          presentation: 'modal', // modal stili
          animation: 'fade_from_bottom', // alttan yukarı animasyon
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: 'transparent',
          },
        }}
      />
      <View className="flex-1 p-4">{/* Rate modal içeriği buraya gelecek */}</View>
    </SafeAreaView>
  );
}
