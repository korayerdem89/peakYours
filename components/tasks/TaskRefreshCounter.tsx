import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from '@/providers/LanguageProvider';
import { theme } from '@/constants/theme';

interface TaskRefreshCounterProps {
  refreshesLeft: number;
}

export function TaskRefreshCounter({ refreshesLeft }: TaskRefreshCounterProps) {
  const { t } = useTranslation();

  // Ensure refreshesLeft never goes below 0
  const displayRefreshes = Math.max(0, refreshesLeft);

  return (
    <View className="mb-4 flex-row items-center justify-end">
      <MaterialCommunityIcons
        name="refresh"
        size={20}
        color={displayRefreshes > 0 ? theme.colors.secondary.default : theme.colors.text.light}
      />
      <Text className="font-poppins-semibold text-md mr-2 text-text-light dark:text-text-dark">
        <Text className="text-sm text-text-light-secondary"> {t('tasks.refreshes')} = </Text>
        {displayRefreshes}
      </Text>
    </View>
  );
}
