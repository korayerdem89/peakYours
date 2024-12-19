import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  withTiming,
  withSpring,
  SharedValue,
  useSharedValue,
  interpolate,
  Layout,
  Easing,
  FadeOut,
} from 'react-native-reanimated';
import { useState, useMemo } from 'react';
import { useTranslation } from '@/providers/LanguageProvider';
import { theme } from '@/constants/theme';
import { UserProfile } from '@/types/user';

interface TaskInfoProps {
  userData: UserProfile;
}

export function TaskInfo({ userData }: TaskInfoProps) {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const animationHeight = useSharedValue(0);

  const totalTasksCompleted = useMemo(() => {
    if (!userData?.traits) return 0;
    return Object.values(userData.traits).reduce((sum: number, value: number) => sum + value, 0);
  }, [userData?.traits]);

  const rotateStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withSpring(`${interpolate(animationHeight.value, [0, 1], [0, 180])}deg`, {
            damping: 15,
            stiffness: 100,
          }),
        },
      ],
    };
  });

  const contentStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(animationHeight.value, {
        duration: 200,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      }),
      maxHeight: withSpring(isExpanded ? 200 : 0, {
        damping: 15,
        stiffness: 100,
      }),
    };
  });

  const toggleExpand = () => {
    animationHeight.value = withSpring(isExpanded ? 0 : 1, {
      damping: 15,
      stiffness: 100,
    });
    setIsExpanded(!isExpanded);
  };

  return (
    <View className="rounded-sm bg-gray-100 dark:bg-gray-800/50">
      <TouchableOpacity
        onPress={toggleExpand}
        className="flex-row items-center justify-between p-4">
        <View className="flex-row items-center">
          <MaterialIcons
            name="info-outline"
            size={24}
            color={theme.colors.primary.default}
            className="mr-3"
          />
          <View>
            <Text className="font-semibold text-base text-text-light dark:text-text-dark-secondary">
              {t('tasks.info.title')}
            </Text>
            <Text className="font-medium text-sm text-text-light-secondary dark:text-text-dark-secondary">
              {t('tasks.info.completedTasks', { count: totalTasksCompleted })}
            </Text>
          </View>
        </View>
        <Animated.View style={rotateStyle}>
          <MaterialIcons name="keyboard-arrow-down" size={24} color={theme.colors.text.light} />
        </Animated.View>
      </TouchableOpacity>

      <Animated.View style={contentStyle} layout={Layout.springify()} className="overflow-hidden">
        <View className="px-4 pb-4">
          <View className="space-y-3 border-t border-gray-200 pt-3 dark:border-gray-700">
            <InfoItem icon="stars" text={t('tasks.info.general')} />
            <InfoItem icon="trending-up" text={t('tasks.info.levelUp')} />
            <InfoItem icon="update" text={t('tasks.info.dailyRefresh')} />
            <InfoItem icon="refresh" text={t('tasks.info.refreshLimit')} />
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

function InfoItem({ icon, text }: { icon: keyof typeof MaterialIcons.glyphMap; text: string }) {
  return (
    <View className="mb-1 flex-row items-start">
      <MaterialIcons name={icon} size={18} color={theme.colors.text.light} className="mr-3 mt-1" />
      <Text className="flex-1 font-regular text-sm text-text-light dark:text-text-dark">
        {text}
      </Text>
    </View>
  );
}
