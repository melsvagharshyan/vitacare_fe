import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en.json';
import ruTranslations from './locales/ru.json';
import hyTranslations from './locales/hy.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslations,
    },
    ru: {
      translation: ruTranslations,
    },
    hy: {
      translation: hyTranslations,
    },
  },
  lng: 'en', // Always start with 'en' to avoid hydration mismatch
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
