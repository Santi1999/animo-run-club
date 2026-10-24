import {useLocation} from 'react-router';
import type {I18nBase} from '@shopify/hydrogen';

export interface I18nLocale extends I18nBase {
  pathPrefix: string;
}

/**
 * Languages that the Shopify Storefront API accepts for this store.
 * Frontend translations (i18next) are handled separately — the URL prefix
 * still drives the UI language even when the Storefront API stays in EN.
 */
const SHOPIFY_SUPPORTED_LANGUAGES = new Set(['EN']);

export function getLocaleFromRequest(request: Request): I18nLocale {
  const url = new URL(request.url);
  const firstPathPart = url.pathname.split('/')[1]?.toUpperCase() ?? '';

  type I18nFromUrl = [I18nLocale['language'], I18nLocale['country']];

  let pathPrefix = '';
  let [language, country]: I18nFromUrl = ['EN', 'US'];

  if (/^[A-Z]{2}-[A-Z]{2}$/i.test(firstPathPart)) {
    pathPrefix = '/' + firstPathPart;
    const [urlLang, urlCountry] = firstPathPart.split('-') as I18nFromUrl;
    country = urlCountry;
    // Only pass the language to Shopify if the store supports it;
    // otherwise keep EN so the Storefront API doesn't 400.
    language = SHOPIFY_SUPPORTED_LANGUAGES.has(urlLang) ? urlLang : 'EN';
  }

  return {language, country, pathPrefix};
}

/**
 * Returns the current locale URL prefix (e.g. "/ES-US" or "").
 * Use this to build locale-aware links: `${prefix}/collections`
 */
export function useLocalePrefix(): string {
  const {pathname} = useLocation();
  const firstSegment = pathname.split('/')[1]?.toUpperCase() ?? '';
  const hasLocalePrefix = /^[A-Z]{2}-[A-Z]{2}$/.test(firstSegment);
  return hasLocalePrefix ? `/${firstSegment}` : '';
}

/** Languages the UI is translated into; English is the unprefixed default. */
export const LANGUAGES = [
  {code: 'en', label: 'EN', prefix: ''},
  {code: 'es', label: 'ES', prefix: '/ES-US'},
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]['code'];

/**
 * Cookie holding the language a visitor picked in a language switcher. It
 * beats their browser's language when choosing which version to show (see
 * i18n.server.ts).
 */
export const LANGUAGE_COOKIE = 'lang';
export const LANGUAGE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function isLanguageCode(value: unknown): value is LanguageCode {
  return LANGUAGES.some((language) => language.code === value);
}

/** The UI language a path is shown in, from its locale prefix. */
export function languageFromPath(pathname: string): LanguageCode {
  const firstSegment = pathname.split('/')[1]?.toUpperCase() ?? '';
  const match = LANGUAGES.find(
    (language) => language.prefix && language.prefix.slice(1) === firstSegment,
  );
  return match?.code ?? 'en';
}

/** `pathname` in another language: its locale prefix swapped for that language's. */
export function localizePath(pathname: string, language: LanguageCode) {
  const [, firstSegment = '', ...rest] = pathname.split('/');
  const path = /^[A-Z]{2}-[A-Z]{2}$/i.test(firstSegment)
    ? '/' + rest.join('/')
    : pathname;
  const prefix = LANGUAGES.find(({code}) => code === language)?.prefix ?? '';
  if (!prefix) return path;
  return path === '/' ? prefix : prefix + path;
}

/** Remember a language picked in a switcher, so later visits open in it. */
export function rememberLanguage(language: LanguageCode) {
  document.cookie = `${LANGUAGE_COOKIE}=${language}; Max-Age=${LANGUAGE_COOKIE_MAX_AGE}; Path=/; SameSite=Lax`;
}
