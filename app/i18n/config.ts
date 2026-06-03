import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import es from './es.json';

export const supportedLanguages = ['en', 'es'] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

/**
 * Map the two-letter language code from the URL locale (e.g. "EN" from "EN-US")
 * to the i18next language key.
 */
export function localeToLanguage(
  language: string | undefined,
): SupportedLanguage {
  const code = (language ?? 'en').toLowerCase();
  if (supportedLanguages.includes(code as SupportedLanguage)) {
    return code as SupportedLanguage;
  }
  return 'en';
}

i18n.use(initReactI18next).init({
  resources: {
    en: {translation: en},
    es: {translation: es},
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already escapes
  },
});

export default i18n;
