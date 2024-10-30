import { ReactNode } from 'react';
import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

import { en, tr, es, zh } from '@/constants/translations';

// Çeviriler
const translations = {
  en,
  tr,
  es,
  zh,
};

// i18n instance'ını oluştur
export const i18n = new I18n(translations);

// Varsayılan ayarlar
i18n.enableFallback = true;
i18n.defaultLocale = 'en';

// Başlangıç dilini ayarla
i18n.locale = getLocales()[0].languageCode ?? 'en';

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  return <>{children}</>;
}
