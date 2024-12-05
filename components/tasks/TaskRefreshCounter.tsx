import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from '@/providers/LanguageProvider';
import { theme } from '@/constants/theme';

interface TaskRefreshCounterProps {
  refreshesLeft: number;
}

export function TaskRefreshCounter({ refreshesLeft }: TaskRefreshCounterProps) {
  const { t } = useTranslation();

  return (
    <View className="mb-4 flex-row items-center">
      <MaterialCommunityIcons name="refresh" size={20} color={theme.colors.secondary.default} />
      <Text className="font-poppins-medium ml-2 text-text-light dark:text-text-dark">
        {refreshesLeft}
        <Text className="text-sm text-text-light-secondary"> {t('tasks.refreshes')}</Text>
      </Text>
    </View>
  );
}
