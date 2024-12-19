import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from '@/providers/LanguageProvider';
import { theme } from '@/constants/theme';

export function TaskHeader() {
  const { t } = useTranslation();

  return (
    <View>
      <View className="flex-row items-center justify-center space-x-2 rounded-sm bg-primary-light/10 px-6 py-3 dark:bg-primary-dark/10">
        <MaterialCommunityIcons
          name="checkbox-marked-circle-outline"
          size={28}
          color={theme.colors.primary.default}
          className="mr-2"
        />
        <Text className="font-poppins-semibold text-2xl text-primary-dark dark:text-primary-light">
          {t('tasks.dailyTasks')}
        </Text>
      </View>
    </View>
  );
}
