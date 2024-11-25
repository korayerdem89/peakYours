import { I18n } from 'i18n-js';
import { getLocales } from 'expo-localization';
import en from '@/constants/translations/en';
import tr from '@/constants/translations/tr';
import es from '@/constants/translations/es';

const translations = {
  en,
  tr,
  es,
};

const i18n = new I18n(translations);

// Varsayılan dil ayarları
i18n.enableFallback = true;
i18n.defaultLocale = 'en';

// Cihaz dilini al ve ayarla
const locale = getLocales()[0].languageCode;
i18n.locale = locale || i18n.defaultLocale;

export default i18n;
