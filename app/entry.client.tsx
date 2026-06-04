import {HydratedRouter} from 'react-router/dom';
import {startTransition, StrictMode} from 'react';
import {hydrateRoot} from 'react-dom/client';
import {NonceProvider} from '@shopify/hydrogen';
import i18n, {localeToLanguage} from '~/i18n/config';

// Sync i18next language from the URL BEFORE hydration so the first
// client render matches the server HTML and event handlers attach correctly.
const firstSegment =
  window.location.pathname.split('/')[1]?.toUpperCase() ?? '';
const lng = /^[A-Z]{2}-[A-Z]{2}$/.test(firstSegment)
  ? localeToLanguage(firstSegment.split('-')[0])
  : 'en';
if (i18n.language !== lng) {
  i18n.changeLanguage(lng);
}

if (!window.location.origin.includes('webcache.googleusercontent.com')) {
  startTransition(() => {
    // Extract nonce from existing script tags
    const existingNonce =
      document.querySelector<HTMLScriptElement>('script[nonce]')?.nonce;

    hydrateRoot(
      document,
      <StrictMode>
        <NonceProvider value={existingNonce}>
          <HydratedRouter />
        </NonceProvider>
      </StrictMode>,
    );
  });
}
