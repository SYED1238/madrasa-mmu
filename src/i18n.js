import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/common.json';
import translationUR from './locales/ur/common.json';

const resources = {
  en: {
    common: translationEN
  },
  ur: {
    common: translationUR
  }
};

const savedLanguage = localStorage.getItem('mmu-language') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'en',
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false
    }
  });

// Save language settings to document element
document.documentElement.lang = savedLanguage;

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
  localStorage.setItem('mmu-language', lng);
});

export default i18n;
