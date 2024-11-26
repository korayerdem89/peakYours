import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { useColorScheme } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Accordion } from '@/components/Accordion';
import { useAuth } from '@/store/useAuth';
import auth from '@react-native-firebase/auth';
import { useState, useCallback } from 'react';
import { Switch } from 'react-native-gesture-handler';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useTranslation } from '@/providers/LanguageProvider';
import { theme } from '@/constants/theme';
import { ZodiacModal } from '@/components/ZodiacModal';
import { useUpdateUser } from '@/hooks/useUserQueries';
import { ZODIAC_SIGNS, type ZodiacSign } from '@/constants/zodiac';

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'tr', label: 'TR' },
  { code: 'es', label: 'ES' },
];

const DEFAULT_AVATAR = 'https://ui-avatars.com/api/?background=random';

export default function SettingsScreen() {
  const { colorScheme, toggleColorScheme: originalToggle } = useColorScheme();
  const { user, updateUserData } = useAuth();
  const { locale, setAppLocale, t } = useTranslation();
  const [isTogglingTheme, setIsTogglingTheme] = useState(false);
  const [isZodiacModalVisible, setIsZodiacModalVisible] = useState(false);

  const updateUser = useUpdateUser();

  const toggleColorScheme = useCallback(() => {
    if (isTogglingTheme) return;

    setIsTogglingTheme(true);
    requestAnimationFrame(() => {
      originalToggle();
      setTimeout(() => setIsTogglingTheme(false), 500);
    });
  }, [isTogglingTheme, originalToggle]);

  const handleLanguageChange = async (langCode: string) => {
    if (langCode === locale) return;
    await setAppLocale(langCode);
  };

  const handleSignOut = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      Alert.alert(t('common.error'), t('auth.errors.unexpected'));
      console.error('Sign out error:', error);
    }
  };

  const handleZodiacSubmit = async (zodiacId: string) => {
    if (!user?.uid) return;

    try {
      await updateUser.mutateAsync({
        userId: user.uid,
        data: {
          zodiacSign: zodiacId,
        },
      });
      updateUserData({ zodiacSign: zodiacId });
      setIsZodiacModalVisible(false);
    } catch (error) {
      console.error('Error updating zodiac sign:', error);
      Alert.alert(t('common.error'), t('settings.zodiacCard.updateError'));
    }
  };

  const getZodiacInfo = (zodiacId: string | null | undefined): ZodiacSign | null => {
    if (!zodiacId) return null;
    return ZODIAC_SIGNS.find((sign) => sign.id === zodiacId) || null;
  };

  const zodiacInfo = getZodiacInfo(user?.zodiacSign);

  return (
    <SafeAreaView className="flex-1 bg-background-tab dark:bg-background-dark">
      {/* Loading Modal */}
      <Modal transparent visible={isTogglingTheme} animationType="fade" statusBarTranslucent>
        <View className="flex-1 items-center justify-center bg-black/50">
          <View className="mx-8 rounded-2xl bg-background-light p-6 dark:bg-surface-dark">
            <ActivityIndicator size="large" color="#7C4DFF" />
            <Text className="mt-4 text-center font-medium text-base text-text-light dark:text-text-dark">
              {t('settings.theme.changing')}
            </Text>
          </View>
        </View>
      </Modal>

      <ScrollView className="flex-1 px-4">
        {/* Language Selector */}
        <View className="mt-4 flex-row gap-2">
          {LANGUAGES.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              onPress={() => handleLanguageChange(lang.code)}
              className={`rounded-full px-4 py-2 ${
                locale === lang.code
                  ? 'bg-primary-light dark:bg-primary-dark'
                  : 'bg-background-light dark:bg-surface-dark'
              }`}>
              <Text
                className={`font-medium text-[15px] ${
                  locale === lang.code ? 'text-white' : 'text-text-light dark:text-text-dark'
                }`}>
                {lang.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Profile Section */}
        <Animated.View entering={FadeIn.duration(500)} className="mt-4 items-center">
          <Image
            source={{ uri: user?.photoURL || DEFAULT_AVATAR }}
            className="h-20 w-20 rounded-full"
          />
          <Text className="mt-2 font-bold text-xl tracking-tight text-text-light dark:text-text-dark">
            {user?.displayName || t('settings.anonymous')}
          </Text>
          <Text className="mt-1 font-regular text-[15px] text-text-light-secondary dark:text-text-dark-secondary">
            {user?.email}
          </Text>

          {/* Zodiac Sign Card */}
          <TouchableOpacity
            onPress={() => setIsZodiacModalVisible(true)}
            className="mt-2 w-full rounded-lg bg-background-light p-4 dark:bg-surface-dark">
            <Text className="pb-2 text-center font-medium text-[15px] text-text-light-secondary dark:text-text-dark-secondary">
              {t('settings.zodiacCard.title')}
            </Text>
            {updateUser.isPending ? (
              <ActivityIndicator className="py-2" />
            ) : zodiacInfo ? (
              <>
                <View className="flex-row items-center justify-center gap-1 space-x-2">
                  <Text className="text-3xl">{zodiacInfo.icon}</Text>
                  <Text className="font-semibold text-lg tracking-tight text-text-light dark:text-text-dark">
                    {t(zodiacInfo.name)}
                  </Text>
                </View>
                <Text className="mt-1 text-center font-regular text-[14px] text-text-light-secondary dark:text-text-dark-secondary">
                  {zodiacInfo.date}
                </Text>
              </>
            ) : (
              <Text className="text-center font-regular text-base text-text-light dark:text-text-dark">
                {t('settings.zodiacCard.description')}
              </Text>
            )}
          </TouchableOpacity>

          {/* Credit Score Card */}
          <View className="mt-4 w-full rounded-lg bg-background-light p-4 dark:bg-surface-dark">
            <Text className="pb-1 text-center font-medium text-[15px] text-text-light-secondary dark:text-text-dark-secondary">
              {t('settings.creditScore')}
            </Text>
            <Text className="text-center font-bold text-3xl tracking-tight text-secondary-dark dark:text-accent-light">
              1000
            </Text>
          </View>
        </Animated.View>

        {/* Theme Toggle */}
        <Animated.View className="bg-gray- mt-4 flex-row items-center justify-between rounded-lg bg-background-light p-4 dark:bg-surface-dark">
          <Text className="pb-1 text-center font-medium text-[15px] text-text-light-secondary dark:text-text-dark-secondary">
            {t('settings.theme.title')}
          </Text>
          <Switch
            value={colorScheme === 'dark'}
            onValueChange={toggleColorScheme}
            disabled={isTogglingTheme}
            trackColor={{
              true: colorScheme === 'dark' ? '#d1d5db' : theme.colors.primary.light,
              false: '#767577',
            }}
            thumbColor={colorScheme === 'dark' ? theme.colors.primary.light : '#d1d5db'}
          />
        </Animated.View>

        {/* Account Settings Accordion */}
        <View className="mt-4">
          <Accordion title={t('settings.accountSettings')}>
            <Text className="border-t-2 border-gray-100 p-4 font-regular text-base text-text-light dark:text-text-dark">
              accordion collapsed
            </Text>
          </Accordion>
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity
          onPress={handleSignOut}
          className="mb-4 mt-4 rounded-lg bg-error-light p-4 dark:bg-error-dark">
          <Text className="text-center font-semibold text-[16px] text-white">
            {t('settings.signOut')}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Zodiac Modal */}
      <ZodiacModal
        visible={isZodiacModalVisible}
        onClose={() => setIsZodiacModalVisible(false)}
        onSubmit={handleZodiacSubmit}
      />
    </SafeAreaView>
  );
}
