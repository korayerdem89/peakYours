import { View, Modal, ActivityIndicator, Text } from 'react-native';
import { useTranslation } from '@/providers/LanguageProvider';
import { theme } from '@/constants/theme';
import { useLoadingStore } from '@/store/useLoadingStore';

interface LoadingModalProps {
  visible: boolean;
}

export function LoadingModal({ visible }: LoadingModalProps) {
  const { t } = useTranslation();
  const { isLoading } = useLoadingStore();

  if (!isLoading) return null;
  return (
    <Modal transparent visible={visible} animationType="fade" statusBarTranslucent>
      <View className="flex-1 items-center justify-center bg-black/50">
        <View className="mx-8 rounded-2xl bg-background-light p-6 dark:bg-surface-dark">
          <ActivityIndicator size="large" color={theme.colors.primary.light} />
          <Text className="mt-4 text-center font-medium text-base text-text-light dark:text-text-dark">
            {t('common.loading')}
          </Text>
        </View>
      </View>
    </Modal>
  );
}
