import { View, ScrollView } from 'react-native';
import { Text } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useTranslation } from '@/providers/LanguageProvider';
import { useAuth } from '@/store/useAuth';
import { useUserData } from '@/hooks/useUserQueries';
import { useTraitDetails } from '@/hooks/useTraitDetails';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import { format } from 'date-fns';

export default function TraitDetails() {
  const { t } = useTranslation();
  const { type = 'goodsides' } = useLocalSearchParams();
  const { user } = useAuth();
  const { data: userData } = useUserData(user?.uid);
  const { data: traitDetails, isLoading } = useTraitDetails(
    userData?.refCodes?.en,
    type as 'goodsides' | 'badsides'
  );

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background-light dark:bg-background-dark">
        <Text className="text-text-light dark:text-text-dark">{t('common.loading')}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background-light pt-6 dark:bg-background-dark">
      {/* Header */}
      <View className="flex-row items-center justify-between border-b border-border-light p-4 dark:border-border-dark">
        <View>
          <Text className="font-semibold text-lg text-text-light dark:text-text-dark">
            {t('personality.details.modalTitle')}
          </Text>
          <Text className="mt-1 text-sm text-text-light-secondary dark:text-text-dark-secondary">
            {t('personality.details.description', { count: traitDetails?.totalRaters || 0 })}
          </Text>
        </View>
        <MaterialIcons
          name="close"
          size={24}
          color={theme.colors.text.light}
          onPress={() => router.back()}
        />
      </View>

      <ScrollView className="flex-1">
        {traitDetails?.userRatings.map((rating, index) => (
          <View
            key={`${rating.userId}-${index}`}
            className="mx-4 my-2 rounded-lg border border-border-light bg-surface-light p-4 dark:border-border-dark dark:bg-surface-dark">
            {/* Rating Header */}
            <View className="mb-3 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <MaterialIcons
                  name="person"
                  size={20}
                  color={theme.colors.primary.default}
                  style={{ marginRight: 8 }}
                />
                <Text className="font-medium text-text-light dark:text-text-dark">
                  {rating.userId}
                </Text>
              </View>
              <Text className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
                {format(new Date(rating.ratedAt), 'dd MMM yyyy')}
              </Text>
            </View>

            {/* Traits Grid */}
            <View className="flex-row flex-wrap gap-2">
              {rating.traits.map((trait) => (
                <View
                  key={trait.name}
                  className="rounded-full px-3 py-1.5"
                  style={{
                    backgroundColor: `${theme.colors.personality[trait.name as keyof typeof theme.colors.personality]}20`,
                  }}>
                  <Text
                    className="font-medium text-xs"
                    style={{
                      color:
                        theme.colors.personality[
                          trait.name as keyof typeof theme.colors.personality
                        ],
                    }}>
                    {t(`personality.traits.${trait.name}`)} • {trait.points}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}

        {(!traitDetails?.userRatings || traitDetails.userRatings.length === 0) && (
          <View className="flex-1 items-center justify-center p-8">
            <MaterialIcons
              name="star-outline"
              size={48}
              color={theme.colors.text.light}
              style={{ opacity: 0.5 }}
            />
            <Text className="mt-4 text-center text-text-light-secondary dark:text-text-dark-secondary">
              {t('personality.details.noRatings')}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
