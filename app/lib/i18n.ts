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
