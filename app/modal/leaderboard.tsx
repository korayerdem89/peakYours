import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from '@/providers/LanguageProvider';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import Animated, { FadeIn } from 'react-native-reanimated';

interface LeaderboardItem {
  rank: number;
  name: string;
  points: number;
  isCurrentUser: boolean;
}

export default function LeaderboardModal() {
  const router = useRouter();
  const { t } = useTranslation();

  // Mock data - replace with real data from your API
  const leaderboardData: LeaderboardItem[] = [
    { rank: 1, name: 'Sarah Johnson', points: 2500, isCurrentUser: false },
    { rank: 2, name: 'Mike Chen', points: 2350, isCurrentUser: false },
    { rank: 3, name: 'Emma Davis', points: 2200, isCurrentUser: false },
    { rank: 4, name: 'You', points: 2100, isCurrentUser: true },
    // ... more items
  ];

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <View className="flex-1 p-4">
        {/* Header */}
        <View className="mb-6 flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="close" size={24} color={theme.colors.text.light} />
          </TouchableOpacity>
          <Text className="font-poppins-semibold text-xl text-primary-dark dark:text-primary-light">
            {t('leaderboard.title')}
          </Text>
          <View className="w-10" /> {/* Spacing for center alignment */}
        </View>

        {/* Trophy Section */}
        <Animated.View entering={FadeIn.duration(500)} className="mb-6 items-center">
          <Ionicons
            name="trophy"
            size={64}
            color={theme.colors.primary.default}
            style={{ opacity: 0.9 }}
          />
          <Text className="font-poppins-medium mt-4 text-sm text-text-light-secondary dark:text-text-dark-secondary">
            {t('leaderboard.subtitle')}
          </Text>
        </Animated.View>

        {/* Leaderboard List */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {leaderboardData.map((item) => (
            <Animated.View
              key={item.rank}
              entering={FadeIn.delay(item.rank * 100).duration(400)}
              className={`mb-3 rounded-lg p-4 ${
                item.isCurrentUser
                  ? 'bg-primary-light/10 dark:bg-primary-dark/10'
                  : 'bg-surface-light dark:bg-surface-dark'
              }`}>
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Text
                    className={`font-poppins-semibold text-lg ${
                      item.rank <= 3
                        ? 'text-primary-dark dark:text-primary-light'
                        : 'text-text-light-secondary'
                    }`}>
                    #{item.rank}
                  </Text>
                  <Text className="font-poppins-medium ml-4 text-base text-text-light dark:text-text-dark">
                    {item.name}
                  </Text>
                  {item.isCurrentUser && (
                    <View className="ml-2 rounded-full bg-primary-light/20 px-2 py-1">
                      <Text className="font-poppins-medium text-xs text-primary-dark dark:text-primary-light">
                        {t('leaderboard.you')}
                      </Text>
                    </View>
                  )}
                </View>
                <Text className="font-poppins-semibold text-base text-primary-dark dark:text-primary-light">
                  {item.points}
                </Text>
              </View>
            </Animated.View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
