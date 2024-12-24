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
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Accordion } from '@/components/Accordion';
import { useAuth } from '@/store/useAuth';
import auth from '@react-native-firebase/auth';
import { useState, useCallback } from 'react';
import { Switch } from 'react-native-gesture-handler';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useTranslation } from '@/providers/LanguageProvider';
import { theme } from '@/constants/theme';
import { ZodiacModal } from '@/components/ZodiacModal';
import { useUpdateUser, useUserData } from '@/hooks/useUserQueries';
import { ZODIAC_SIGNS, type ZodiacSign } from '@/constants/zodiac';
import { signOut } from '@/config/firebase';
import { deleteUser, resetUserTraits } from '@/services/userService';
import Toast from 'react-native-toast-message';
import { useLoadingStore } from '@/store/useLoadingStore';
import { useRouter } from 'expo-router';

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'tr', label: 'TR' },
  { code: 'es', label: 'ES' },
];

const DEFAULT_AVATAR = 'https://ui-avatars.com/api/?background=random';

const LANGUAGE_CHANGE_KEY = 'last_language_change';
const HOURS_24 = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const ZODIAC_CHANGE_KEY = 'last_zodiac_change';
const HOURS_48 = 48 * 60 * 60 * 1000; // 48 hours in milliseconds

const TRAITS_RESET_KEY = 'last_traits_reset';
const DAYS_7 = 7 * 24 * 60 * 60 * 1000; // 7 gün milisaniye cinsinden

export default function SettingsScreen() {
  const { colorScheme, toggleColorScheme: originalToggle } = useColorScheme();
  const { user, updateUserData } = useAuth();
  const { locale, setAppLocale, t } = useTranslation();
  const [isTogglingTheme, setIsTogglingTheme] = useState(false);
  const [isZodiacModalVisible, setIsZodiacModalVisible] = useState(false);
  const { setIsLoading } = useLoadingStore();
  const router = useRouter();
  const { data: userData } = useUserData(user?.uid) || null;
  const updateUser = useUpdateUser();

  // const toggleColorScheme = useCallback(() => {
  //   if (isTogglingTheme) return;

  //   setIsTogglingTheme(true);
  //   requestAnimationFrame(() => {
  //     originalToggle();
  //     setTimeout(() => setIsTogglingTheme(false), 500);
  //   });
  // }, [isTogglingTheme, originalToggle]);

  const checkLanguageChangeEligibility = async () => {
    try {
      const lastChange = await AsyncStorage.getItem(LANGUAGE_CHANGE_KEY);
      if (!lastChange) return true;

      const lastChangeTime = parseInt(lastChange, 10);
      const now = Date.now();
      const timeDiff = now - lastChangeTime;

      if (timeDiff < HOURS_24) {
        const remainingTime = HOURS_24 - timeDiff;
        const hours = Math.floor(remainingTime / (60 * 60 * 1000));
        const minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));

        Alert.alert(t('common.error'), t('settings.language.timeRemaining', { hours, minutes }));
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error checking language change eligibility:', error);
      return true;
    }
  };

  const handleLanguageChange = async (langCode: string) => {
    if (langCode === locale) return;

    try {
      const canChange = await checkLanguageChangeEligibility();
      if (!canChange) return;

      Alert.alert(
        t('settings.language.changeConfirmTitle'),
        t('settings.language.changeConfirmMessage'),
        [
          {
            text: t('common.cancel'),
            style: 'cancel',
          },
          {
            text: t('settings.language.changeButton'),
            onPress: async () => {
              await setAppLocale(langCode);
              await AsyncStorage.setItem(LANGUAGE_CHANGE_KEY, Date.now().toString());
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error handling language change:', error);
      Alert.alert(t('common.error'), t('common.unexpectedError'));
    }
  };

  const handleSignOut = async () => {
    try {
      Alert.alert(t('settings.signOut'), t('settings.signOutConfirm'), [
        {
          text: t('common.cancel'),
          style: 'cancel',
        },
        {
          text: t('common.confirm'),
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
            } catch (error) {
              console.error('Sign out error:', error);
              Alert.alert(t('common.error'), t('auth.errors.unexpected'));
            }
          },
        },
      ]);
    } catch (error) {
      console.error('Sign out error:', error);
      Alert.alert(t('common.error'), t('auth.errors.unexpected'));
    }
  };

  const checkZodiacChangeEligibility = async () => {
    try {
      const lastChange = await AsyncStorage.getItem(ZODIAC_CHANGE_KEY);
      if (!lastChange) return true;

      const lastChangeTime = parseInt(lastChange, 10);
      const now = Date.now();
      const timeDiff = now - lastChangeTime;

      if (timeDiff < HOURS_48) {
        const remainingTime = HOURS_48 - timeDiff;
        const hours = Math.floor(remainingTime / (60 * 60 * 1000));
        const minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));

        Alert.alert(
          t('settings.zodiac.timeRestriction.title'),
          t('settings.zodiac.timeRestriction.timeRemaining', { hours, minutes })
        );
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error checking zodiac change eligibility:', error);
      return true;
    }
  };

  const handleZodiacCardPress = async () => {
    try {
      const canChange = await checkZodiacChangeEligibility();
      if (!canChange) return;

      Alert.alert(
        t('settings.zodiac.timeRestriction.title'),
        t('settings.zodiac.timeRestriction.message'),
        [
          {
            text: t('common.cancel'),
            style: 'cancel',
          },
          {
            text: t('settings.zodiac.timeRestriction.proceed'),
            onPress: async () => {
              setIsZodiacModalVisible(true);
              await AsyncStorage.setItem(ZODIAC_CHANGE_KEY, Date.now().toString());
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error handling zodiac card press:', error);
      Alert.alert(t('common.error'), t('common.unexpectedError'));
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

  const handleDeleteAccount = async () => {
    try {
      Alert.alert(t('settings.deleteAccount.title'), t('settings.deleteAccount.message'), [
        {
          text: t('common.cancel'),
          style: 'cancel',
        },
        {
          text: t('settings.deleteAccount.confirm'),
          style: 'destructive',
          onPress: async () => {
            try {
              setIsLoading(true);
              await deleteUser(user?.uid);
              Toast.show({
                type: 'success',
                text1: t('settings.deleteAccount.success'),
              });
              await signOut();
            } catch (error) {
              console.error('Delete account error:', error);
              Toast.show({
                type: 'error',
                text1: t('settings.deleteAccount.error'),
              });
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]);
    } catch (error) {
      console.error('Delete account error:', error);
      Toast.show({
        type: 'error',
        text1: t('settings.deleteAccount.error'),
      });
    }
  };

  const checkTraitsResetEligibility = async () => {
    try {
      const lastReset = await AsyncStorage.getItem(TRAITS_RESET_KEY);
      if (!lastReset) return true;

      const lastResetTime = parseInt(lastReset, 10);
      const now = Date.now();
      const timeDiff = now - lastResetTime;

      if (timeDiff < DAYS_7) {
        const remainingTime = DAYS_7 - timeDiff;
        const days = Math.floor(remainingTime / (24 * 60 * 60 * 1000));
        const hours = Math.floor((remainingTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));

        Alert.alert(
          t('settings.resetTraits.timeRestriction.title'),
          t('settings.resetTraits.timeRestriction.timeRemaining', { days, hours })
        );
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error checking traits reset eligibility:', error);
      return true;
    }
  };

  const handleResetTraits = async () => {
    try {
      const canReset = await checkTraitsResetEligibility();
      if (!canReset) return;

      Alert.alert(
        t('settings.resetTraits.timeRestriction.title'),
        t('settings.resetTraits.timeRestriction.message'),
        [
          {
            text: t('common.cancel'),
            style: 'cancel',
          },
          {
            text: t('settings.resetTraits.timeRestriction.proceed'),
            style: 'destructive',
            onPress: async () => {
              try {
                setIsLoading(true);
                await resetUserTraits(user?.uid as string);
                await AsyncStorage.setItem(TRAITS_RESET_KEY, Date.now().toString());
                Toast.show({
                  type: 'success',
                  text1: t('settings.resetTraits.success'),
                });
              } catch (error) {
                console.error('Reset traits error:', error);
                Toast.show({
                  type: 'error',
                  text1: t('settings.resetTraits.error'),
                });
              } finally {
                setIsLoading(false);
              }
            },
          },
        ]
      );
    } catch (error) {
      console.error('Reset traits error:', error);
      Toast.show({
        type: 'error',
        text1: t('settings.resetTraits.error'),
      });
    }
  };

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
            onPress={handleZodiacCardPress}
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

          {/* Membership Type Card */}
          <View className="mt-4 w-full rounded-lg bg-background-light p-4 dark:bg-surface-dark">
            <Text className="pb-1 text-center font-medium text-[15px] text-text-light-secondary dark:text-text-dark-secondary">
              {t('settings.membershipType')}
            </Text>
            <View className="flex-row items-center justify-between px-4">
              <View className="flex-1" />
              <Text
                className={`pr-2 text-center font-bold text-lg tracking-tight ${
                  userData?.membership?.type === 'free'
                    ? 'text-text-light dark:text-text-dark'
                    : 'text-secondary dark:text-secondary-dark'
                }`}>
                {userData?.membership?.type === 'pro' ? 'Pro' : 'Free'}
              </Text>
              <View className="flex-1">
                {userData?.membership?.type === 'free' && (
                  <TouchableOpacity
                    onPress={() => router.push('/modal/paywall')}
                    className="active:opacity-60">
                    <Text className="pt-1 font-semibold text-sm text-primary underline">
                      {t('settings.upgrade')}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Theme Toggle */}
        {/* <Animated.View className="bg-gray- mt-4 flex-row items-center justify-between rounded-lg bg-background-light p-4 dark:bg-surface-dark">
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
        </Animated.View> */}

        {/* Account Settings Section with Accordion */}
        <View className="mt-4 overflow-hidden rounded-2xl bg-background-light dark:bg-surface-dark">
          <Accordion title={t('settings.accountSettings')}>
            <View className="border-t border-gray-100 dark:border-gray-800">
              {/* Reset Traits Button */}
              <TouchableOpacity
                onPress={handleResetTraits}
                className="flex-row items-center justify-between px-4 py-4 active:bg-gray-50 dark:active:bg-gray-800">
                <View className="flex-row items-center space-x-3">
                  <Text className="font-medium text-gray-500 dark:text-gray-600">
                    {t('settings.resetTraits.button')}
                  </Text>
                </View>
                <Text className="text-text-light-secondary dark:text-text-dark-secondary">›</Text>
              </TouchableOpacity>

              {/* Delete Account Button */}
              <TouchableOpacity
                onPress={handleDeleteAccount}
                className="flex-row items-center justify-between border-t border-gray-100 px-4 py-4 active:bg-gray-50 dark:border-gray-800 dark:active:bg-gray-800">
                <View className="flex-row items-center space-x-3">
                  <Text className="font-medium text-gray-400 dark:text-gray-500">
                    {t('settings.deleteAccount.button')}
                  </Text>
                </View>
                <Text className="text-text-light-secondary dark:text-text-dark-secondary">›</Text>
              </TouchableOpacity>

              {/* Sign Out Button */}
              <TouchableOpacity
                onPress={handleSignOut}
                className="flex-row items-center justify-between border-t border-gray-100 px-4 py-4 active:bg-gray-50 dark:border-gray-800 dark:active:bg-gray-800">
                <View className="flex-row items-center space-x-3">
                  <Text className="font-medium text-error-light dark:text-error-dark">
                    {t('settings.signOut')}
                  </Text>
                </View>
                <Text className="text-text-light-secondary dark:text-text-dark-secondary">›</Text>
              </TouchableOpacity>
            </View>
          </Accordion>
        </View>

        {/* Zodiac Modal */}
        <ZodiacModal
          visible={isZodiacModalVisible}
          onClose={() => setIsZodiacModalVisible(false)}
          onSubmit={handleZodiacSubmit}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
