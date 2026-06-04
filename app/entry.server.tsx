import {ServerRouter} from 'react-router';
import {isbot} from 'isbot';
import {renderToReadableStream} from 'react-dom/server';
import {
  createContentSecurityPolicy,
  type HydrogenRouterContextProvider,
} from '@shopify/hydrogen';
import type {EntryContext} from 'react-router';
import i18n, {localeToLanguage} from '~/i18n/config';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  reactRouterContext: EntryContext,
  context: HydrogenRouterContextProvider,
) {
  // Sync i18next language from the request URL before SSR so the rendered
  // HTML uses the correct translation strings.
  const url = new URL(request.url);
  const firstSegment = url.pathname.split('/')[1]?.toUpperCase() ?? '';
  const lng = /^[A-Z]{2}-[A-Z]{2}$/.test(firstSegment)
    ? localeToLanguage(firstSegment.split('-')[0])
    : 'en';
  if (i18n.language !== lng) {
    i18n.changeLanguage(lng);
  }
  const {nonce, header, NonceProvider} = createContentSecurityPolicy({
    shop: {
      checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
      storeDomain: context.env.PUBLIC_STORE_DOMAIN,
    },
    scriptSrc: [
      "'self'",
      'https://challenges.cloudflare.com',
      'https://cdn.shopify.com',
    ],
    frameSrc: [
      "'self'",
      'https://customer-b6g02vkp783khfb7.cloudflarestream.com',
      'https://challenges.cloudflare.com',
    ],
  });

  const body = await renderToReadableStream(
    <NonceProvider>
      <ServerRouter
        context={reactRouterContext}
        url={request.url}
        nonce={nonce}
      />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set('Content-Security-Policy', header);

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
