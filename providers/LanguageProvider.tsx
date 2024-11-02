import { ReactNode, useEffect, createContext, useContext, useState } from 'react';
import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState } from 'react-native';
import { en, tr, es, zh } from '@/constants/translations';

// Translations
const translations = {
  en,
  tr,
  es,
  zh,
};

// Create i18n instance
const i18n = new I18n(translations);

// Default settings
i18n.enableFallback = true;
i18n.defaultLocale = 'en';

// Create context
interface LanguageContextType {
  locale: string;
  setAppLocale: (lang: string) => Promise<void>;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [locale, setLocale] = useState(getLocales()[0].languageCode || 'en');

  useEffect(() => {
    async function initLanguage() {
      try {
        const savedLanguage = await AsyncStorage.getItem('@app_language');
        if (savedLanguage) {
          i18n.locale = savedLanguage;
          setLocale(savedLanguage);
        } else {
          const deviceLanguage = getLocales()[0].languageCode;
          i18n.locale = deviceLanguage || 'en';
          setLocale(deviceLanguage || 'en');
        }
      } catch (error) {
        console.error('Error initializing language:', error);
      }
    }

    initLanguage();

    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        initLanguage();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const setAppLocale = async (lang: string) => {
    try {
      await AsyncStorage.setItem('@app_language', lang);
      i18n.locale = lang;
      setLocale(lang);
    } catch (error) {
      console.error('Error setting language:', error);
    }
  };

  const t = (key: string) => {
    return i18n.t(key);
  };

  return (
    <LanguageContext.Provider value={{ locale, setAppLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
