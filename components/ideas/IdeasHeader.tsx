import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from '@/providers/LanguageProvider';
import { theme } from '@/constants/theme';

export function IdeasHeader() {
  const { t } = useTranslation();

  return (
    <View>
      <View className="flex-row items-center justify-center space-x-2 rounded-sm bg-secondary-light/10 px-6 py-3">
        <MaterialCommunityIcons
          name="compass-rose"
          size={28}
          color={theme.colors.secondary.default}
          className="mr-2"
        />
        <Text className="font-poppins-semibold text-2xl text-secondary-dark">
          {t('ideas.title')}
        </Text>
      </View>
    </View>
  );
}
