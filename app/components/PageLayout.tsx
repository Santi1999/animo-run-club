import {Await, NavLink, useLocation} from 'react-router';
import {Suspense, useState} from 'react';
import {useTranslation} from 'react-i18next';
import type {CartApiQueryFragment, HeaderQuery} from 'storefrontapi.generated';
import {Aside, useAside} from '~/components/Aside';
import {useLocalePrefix} from '~/lib/i18n';
import {Footer} from '~/components/Footer';
import {Header, HeaderMenu} from '~/components/Header';
import {CartMain} from '~/components/CartMain';
import {CookieBanner} from '~/components/CookieBanner';
import {CookieModal} from '~/components/CookieModal';
import {SearchFormPredictive} from '~/components/SearchFormPredictive';

interface PageLayoutProps {
  cart: Promise<CartApiQueryFragment | null>;
  header: HeaderQuery;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
  children?: React.ReactNode;
}

export function PageLayout({
  cart,
  children = null,
  header,
  isLoggedIn,
  publicStoreDomain,
}: PageLayoutProps) {
  const [cookieModalOpen, setCookieModalOpen] = useState(false);

  return (
    <Aside.Provider>
      <CartAside cart={cart} />
      <SearchAside />
      <MobileMenuAside header={header} publicStoreDomain={publicStoreDomain} />
      {header && (
        <Header
          header={header}
          cart={cart}
          isLoggedIn={isLoggedIn}
          publicStoreDomain={publicStoreDomain}
        />
      )}
      <main style={{paddingTop: 'var(--header-height)'}}>{children}</main>
      <Footer onOpenCookieSettings={() => setCookieModalOpen(true)} />
      <CookieBanner
        onOpenSettings={() => setCookieModalOpen(true)}
        recheckTrigger={cookieModalOpen}
      />
      <CookieModal
        isOpen={cookieModalOpen}
        onClose={() => setCookieModalOpen(false)}
      />
    </Aside.Provider>
  );
}

function CartAside({cart}: {cart: PageLayoutProps['cart']}) {
  const {t} = useTranslation();
  return (
    <Aside type="cart" heading={t('page_layout.cart_heading')}>
      <Suspense fallback={<p>{t('page_layout.loading_cart')}</p>}>
        <Await resolve={cart}>
          {(cart) => {
            return <CartMain cart={cart} layout="aside" />;
          }}
        </Await>
      </Suspense>
    </Aside>
  );
}

function SearchAside() {
  const {type, close} = useAside();
  const {t} = useTranslation();
  const isOpen = type === 'search';

  return (
    <div
      className={`search-overlay${isOpen ? ' expanded' : ''}`}
      role="dialog"
      aria-label={t('page_layout.search_placeholder')}
      aria-modal={isOpen}
    >
      <div className="search-overlay-bar">
        <SearchFormPredictive>
          {({fetchResults, inputRef}) => (
            <input
              name="q"
              onChange={fetchResults}
              onFocus={fetchResults}
              placeholder={t('page_layout.search_placeholder')}
              ref={inputRef}
              type="search"
              className="search-overlay-input"
              autoComplete="off"
            />
          )}
        </SearchFormPredictive>
        <button className="search-overlay-close reset" onClick={close}>
          {t('page_layout.close')}
        </button>
      </div>

      <div className="search-overlay-body">
        <div className="search-overlay-section">
          <h3 className="search-overlay-section-title">{t('page_layout.collections')}</h3>
          <p className="search-overlay-coming-soon">{t('page_layout.coming_soon')}</p>
        </div>
        <div className="search-overlay-section">
          <h3 className="search-overlay-section-title">{t('page_layout.highlights')}</h3>
          <p className="search-overlay-coming-soon">{t('page_layout.coming_soon')}</p>
        </div>
      </div>
    </div>
  );
}

function MobileMenuAside({
  header,
  publicStoreDomain,
}: {
  header: PageLayoutProps['header'];
  publicStoreDomain: PageLayoutProps['publicStoreDomain'];
}) {
  const {close, open} = useAside();
  const {t} = useTranslation();
  const localePrefix = useLocalePrefix();

  if (!header.menu || !header.shop.primaryDomain?.url) return null;

  return (
    <Aside
      type="mobile"
      heading={t('page_layout.menu')}
      side="left"
      customHeader={
        <div className="mobile-menu-header">
          <button
            className="reset header-icon-btn"
            onClick={close}
            aria-label={t('page_layout.close_menu')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              viewBox="0 0 24 24"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <button
            className="reset header-icon-btn"
            onClick={() => open('search')}
            aria-label="Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>
      }
    >
      <HeaderMenu
        menu={header.menu}
        viewport="mobile"
        primaryDomainUrl={header.shop.primaryDomain.url}
        publicStoreDomain={publicStoreDomain}
      />
      <nav className="mobile-menu-footer">
        {/* <NavLink
          to="/account"
          className="mobile-menu-footer-item"
          onClick={close}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            viewBox="0 0 24 24"
          >
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          Log in or Register
        </NavLink>
        <button
          className="reset mobile-menu-footer-item"
          onClick={() => {
            close();
            open('cart');
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            viewBox="0 0 24 24"
          >
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          Shopping bag
        </button>
        <NavLink
          to="/wishlist"
          className="mobile-menu-footer-item"
          onClick={close}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            viewBox="0 0 24 24"
          >
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
          Wishlist
        </NavLink> */}
        <NavLink
          to={`${localePrefix}/contact-us`}
          className="mobile-menu-footer-item"
          onClick={close}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            viewBox="0 0 24 24"
          >
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
          {t('page_layout.contact_us')}
        </NavLink>
        <LanguageSwitcher onNavigate={close} />
      </nav>
    </Aside>
  );
}

const LANGUAGES = [
  {prefix: '', label: 'EN', locale: 'EN-US'},
  {prefix: '/ES-US', label: 'ES', locale: 'ES-US'},
];

function LanguageSwitcher({onNavigate}: {onNavigate: () => void}) {
  const {pathname, search} = useLocation();

  const firstSegment = pathname.split('/')[1]?.toUpperCase() ?? '';
  const hasLocalePrefix = /^[A-Z]{2}-[A-Z]{2}$/.test(firstSegment);
  const currentLocale = hasLocalePrefix ? firstSegment : 'EN-US';
  const pathWithoutLocale = hasLocalePrefix
    ? '/' + pathname.split('/').slice(2).join('/')
    : pathname;

  return (
    <div className="mobile-menu-footer-item mobile-menu-footer-lang">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
      <div className="flex items-center gap-1">
        {LANGUAGES.map((lang, i) => (
          <span key={lang.locale} className="flex items-center gap-1">
            {i > 0 && <span className="text-gray-300">|</span>}
            {lang.locale === currentLocale ? (
              <span className="font-semibold">{lang.label}</span>
            ) : (
              <NavLink
                to={`${lang.prefix}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}${search}`}
                onClick={onNavigate}
                className="opacity-50 hover:opacity-100 transition-opacity"
              >
                {lang.label}
              </NavLink>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
