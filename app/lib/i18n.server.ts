import {isbot} from 'isbot';
import {
  LANGUAGE_COOKIE,
  LANGUAGE_COOKIE_MAX_AGE,
  isLanguageCode,
  languageFromPath,
  localizePath,
  type LanguageCode,
} from '~/lib/i18n';

/** Handlers that aren't pages (auth, cart links, discount links, files) keep their URL. */
const NON_PAGE_PATH =
  /^\/(?:[a-z]{2}-[a-z]{2}\/)?(?:account|cart\/|discount\/|newsletter\/)|\.[a-z0-9]+$/i;

/** The language the visitor picked in a switcher, if any. */
function pickedLanguage(request: Request): LanguageCode | null {
  const value = request.headers
    .get('Cookie')
    ?.match(new RegExp(`(?:^|;\\s*)${LANGUAGE_COOKIE}=([^;]*)`))?.[1];
  return isLanguageCode(value) ? value : null;
}

/**
 * The best match for the browser's (phone's) languages: English when none of
 * them is supported, null when it names none (e.g. "*", i.e. "anything").
 */
function browserLanguage(acceptLanguage: string): LanguageCode | null {
  const ranked = acceptLanguage
    .split(',')
    .map((entry, index) => {
      const [tag = '', ...params] = entry.trim().split(';');
      const quality = params.map((p) => p.trim()).find((p) => p.startsWith('q='));
      return {
        code: tag.trim().split('-')[0].toLowerCase(),
        quality: quality ? Number(quality.slice(2)) : 1,
        index,
      };
    })
    .filter(({code, quality}) => code && code !== '*' && quality > 0)
    .sort((a, b) => b.quality - a.quality || a.index - b.index);
  if (!ranked.length) return null;
  const match = ranked.find(({code}) => isLanguageCode(code))?.code;
  return isLanguageCode(match) ? match : 'en';
}

/**
 * Sends a visitor who opens a page in a language other than theirs to that
 * page in their language: the one they picked in a switcher, else their
 * phone's (English when we don't have it). Only full page loads by people:
 * client-side navigations (that's how the switchers change language),
 * crawlers and link previews (so every version stays reachable), and requests
 * without any language signal keep the URL they asked for.
 */
export function getLanguageRedirect(request: Request): Response | null {
  if (request.method !== 'GET') return null;
  const isPageLoad =
    request.headers.get('Sec-Fetch-Dest') === 'document' ||
    (request.headers.get('Accept') ?? '').includes('text/html');
  if (!isPageLoad || isbot(request.headers.get('User-Agent'))) return null;

  const url = new URL(request.url);
  if (NON_PAGE_PATH.test(url.pathname)) return null;

  const acceptLanguage = request.headers.get('Accept-Language');
  const language =
    pickedLanguage(request) ??
    (acceptLanguage ? browserLanguage(acceptLanguage) : null);
  if (!language || language === languageFromPath(url.pathname)) return null;

  return new Response(null, {
    status: 302,
    headers: {
      Location: localizePath(url.pathname, language) + url.search,
      Vary: 'Accept-Language, Cookie',
      'Cache-Control': 'private, no-store',
    },
  });
}

/**
 * Re-issues a picked language from the server. The switchers set the cookie
 * from the page, and Safari expires cookies set by scripts after 7 days;
 * one sent by the server keeps its full lifetime.
 */
export function languageCookieRefresh(request: Request): string | null {
  const language = pickedLanguage(request);
  if (!language) return null;
  return `${LANGUAGE_COOKIE}=${language}; Max-Age=${LANGUAGE_COOKIE_MAX_AGE}; Path=/; SameSite=Lax`;
}
