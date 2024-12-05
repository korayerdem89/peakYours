import { TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { StorageService } from '@/utils/storage';
import { useAuth } from '@/store/useAuth';
import { useTranslation } from '@/providers/LanguageProvider';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

export function TaskDebug() {
  const { user } = useAuth();
  const { t } = useTranslation();

  const handleClearCache = async () => {
    if (!user?.uid) return;

    try {
      await StorageService.clearTaskData(user.uid);
      Toast.show({
        type: 'success',
        text1: t('tasks.debug.cacheCleared'),
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: t('tasks.debug.clearError'),
      });
    }
  };

  return (
    <TouchableOpacity
      onPress={handleClearCache}
      className="mt-4 flex-row items-center justify-center space-x-2 rounded-lg bg-red-500/10 p-3">
      <MaterialIcons name="delete-outline" size={20} color="#EF4444" />
      <Text className="font-poppins-medium text-sm text-red-500">
        {t('tasks.debug.clearCache')}
      </Text>
    </TouchableOpacity>
  );
}
