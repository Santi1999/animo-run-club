import type {LoaderFunctionArgs} from 'react-router';

/** Locale prefixes that the site recognises (lowercase). */
const VALID_LOCALE_PREFIXES = new Set(['en-us', 'es-us']);

export async function loader({params}: LoaderFunctionArgs) {
  if (
    params.locale &&
    !VALID_LOCALE_PREFIXES.has(params.locale.toLowerCase())
  ) {
    // The locale URL segment doesn't match any known locale — 404
    throw new Response(null, {status: 404});
  }

  return null;
}
