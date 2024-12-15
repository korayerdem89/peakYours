import { View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTranslation } from '@/providers/LanguageProvider';
import { theme } from '@/constants/theme';

export function TaskMotivation() {
  const { t } = useTranslation();

  return (
    <View className="flex-row items-center justify-center">
      <FontAwesome name="star" size={20} color={theme.colors.primary.default} className="mr-2" />
      <Text className="text-text-light-primary font-extralight text-sm dark:text-text-dark-secondary">
        {t('tasks.motivation')}
      </Text>
    </View>
  );
}
