import { View, Text } from 'react-native';
import * as Progress from 'react-native-progress';
import { useTranslation } from '@/providers/LanguageProvider';
import { theme } from '@/constants/theme';

interface TaskProgressProps {
  progress: number;
}

export function TaskProgress({ progress }: TaskProgressProps) {
  const { t } = useTranslation();

  return (
    <View className="gap-4">
      <View className="items-center space-y-2">
        <Progress.Bar
          progress={progress}
          width={null}
          height={8}
          color={theme.colors.primary.default}
          unfilledColor={theme.colors.background.tab}
          borderWidth={0}
          className="w-full rounded-full"
        />
        <Text className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
          {t('tasks.refreshIn')}
        </Text>
      </View>
    </View>
  );
}
