import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeIn, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useState, useMemo } from 'react';
import { useTranslation } from '@/providers/LanguageProvider';
import { theme } from '@/constants/theme';
import { UserData } from '@/types/user';

interface TaskInfoProps {
  userData: UserData;
}

export function TaskInfo({ userData }: TaskInfoProps) {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  const totalTasksCompleted = useMemo(() => {
    if (!userData?.traits) return 0;
    return Object.values(userData.traits).reduce((sum, value) => sum + value, 0);
  }, [userData?.traits]);

  const rotateStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withTiming(isExpanded ? '180deg' : '0deg', { duration: 300 }),
        },
      ],
    };
  });

  return (
    <View className="mb-4 rounded-xl bg-gray-50/50 dark:bg-gray-800/50">
      <TouchableOpacity
        onPress={() => setIsExpanded(!isExpanded)}
        className="flex-row items-center justify-between p-4">
        <View className="flex-row items-center">
          <MaterialIcons
            name="info-outline"
            size={24}
            color={theme.colors.primary.default}
            className="mr-3"
          />
          <View>
            <Text className="font-poppins-medium text-text-light-primary dark:text-text-dark-primary text-base">
              {t('tasks.info.title')}
            </Text>
            <Text className="font-poppins text-sm text-text-light-secondary dark:text-text-dark-secondary">
              {t('tasks.info.completedTasks', { count: totalTasksCompleted })}
            </Text>
          </View>
        </View>
        <Animated.View style={rotateStyle}>
          <MaterialIcons name="keyboard-arrow-down" size={24} color={theme.colors.text.light} />
        </Animated.View>
      </TouchableOpacity>

      {isExpanded && (
        <Animated.View entering={FadeIn.duration(200)} className="px-4 pb-4">
          <View className="space-y-3 border-t border-gray-200 pt-3 dark:border-gray-700">
            <InfoItem icon="stars" text={t('tasks.info.levelUp')} />
            <InfoItem icon="update" text={t('tasks.info.dailyRefresh')} />
            <InfoItem icon="refresh" text={t('tasks.info.refreshLimit')} />
          </View>
        </Animated.View>
      )}
    </View>
  );
}

function InfoItem({ icon, text }: { icon: any; text: string }) {
  return (
    <View className="flex-row items-start">
      <MaterialIcons name={icon} size={18} color={theme.colors.text.light} className="mr-3 mt-1" />
      <Text className="font-poppins flex-1 text-sm text-text-light-secondary dark:text-text-dark-secondary">
        {text}
      </Text>
    </View>
  );
}
