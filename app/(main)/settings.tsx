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
import * as Localization from 'expo-localization';
import { useState, useCallback } from 'react';
import { Switch } from 'react-native-gesture-handler';
import Animated, { FadeIn } from 'react-native-reanimated';
import { i18n } from '@/providers/LanguageProvider';
import { theme } from '@/constants/theme';

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'tr', label: 'TR' },
  { code: 'es', label: 'ES' },
  { code: 'zh', label: 'ZH' },
];

const DEFAULT_AVATAR = 'https://ui-avatars.com/api/?background=random';

export default function SettingsScreen() {
  const { colorScheme, toggleColorScheme: originalToggle } = useColorScheme();
  const { user } = useAuth();
  const [selectedLang, setSelectedLang] = useState(Localization.locale.split('-')[0]);
  const [isTogglingTheme, setIsTogglingTheme] = useState(false);

  const toggleColorScheme = useCallback(() => {
    if (isTogglingTheme) return;

    setIsTogglingTheme(true);
    requestAnimationFrame(() => {
      originalToggle();
      setTimeout(() => setIsTogglingTheme(false), 500);
    });
  }, [isTogglingTheme, originalToggle]);

  const handleLanguageChange = (langCode: string) => {
    setSelectedLang(langCode);
    i18n.locale = langCode;
  };

  const handleSignOut = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      Alert.alert(i18n.t('common.error'), i18n.t('auth.errors.unexpected'));
      console.error('Sign out error:', error);
    }
  };

  return (
    <SafeAreaView className="bg-background-tab flex-1 dark:bg-background-dark">
      {/* Loading Modal */}
      <Modal transparent visible={isTogglingTheme} animationType="fade" statusBarTranslucent>
        <View className="flex-1 items-center justify-center bg-black/50">
          <View className="mx-8 rounded-2xl bg-background-light p-6 dark:bg-surface-dark">
            <ActivityIndicator size="large" color="#7C4DFF" />
            <Text className="mt-4 text-center font-medium text-base text-text-light dark:text-text-dark">
              {i18n.t('settings.theme.changing')}
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
                selectedLang === lang.code
                  ? 'bg-primary-light dark:bg-primary-dark'
                  : 'bg-background-light dark:bg-surface-dark'
              }`}>
              <Text
                className={`font-medium ${
                  selectedLang === lang.code ? 'text-white' : 'text-text-light dark:text-text-dark'
                }`}>
                {lang.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Profile Section */}
        <Animated.View entering={FadeIn.duration(500)} className="mt-8 items-center">
          <Image
            source={{ uri: user?.photoURL || DEFAULT_AVATAR }}
            className="h-24 w-24 rounded-full"
          />
          <Text className="mt-4 font-semibold text-xl text-text-light dark:text-text-dark">
            {user?.displayName || i18n.t('settings.anonymous')}
          </Text>
          <Text className="mt-1 text-text-light-secondary dark:text-text-dark-secondary">
            {user?.email}
          </Text>

          {/* Credit Score */}
          <View className="mt-4 w-full rounded-lg bg-background-light p-4 dark:bg-surface-dark">
            <Text className="text-center text-text-light dark:text-text-dark">
              {i18n.t('settings.creditScore')}
            </Text>
            <Text className="mt-2 text-center font-bold text-2xl text-secondary-dark dark:text-accent-light">
              1000
            </Text>
          </View>
        </Animated.View>

        {/* Theme Toggle */}
        <Animated.View className="bg-gray- mt-8 flex-row items-center justify-between rounded-lg bg-background-light p-4 dark:bg-surface-dark">
          <Text className="text-text-light dark:text-text-dark">
            {i18n.t('settings.theme.title')}
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
          <Accordion title={i18n.t('settings.accountSettings')}>
            <Text className="border-t-2 border-gray-100 p-4 text-text-light dark:text-text-dark">
              accordion collapsed
            </Text>
          </Accordion>
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity
          onPress={handleSignOut}
          className="mb-8 mt-8 rounded-lg bg-error-light p-4 dark:bg-error-dark">
          <Text className="text-center font-medium text-white">{i18n.t('settings.signOut')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
