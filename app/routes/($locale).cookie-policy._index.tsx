import {Link} from 'react-router';
import {useTranslation} from 'react-i18next';
import type {Route} from './+types/cookie-policy._index';
import {useLocalePrefix} from '~/lib/i18n';

export const meta: Route.MetaFunction = () => {
  const {t} = useTranslation();
  return [{title: t('cookie_policy.page_title')}];
};

export default function CookiePolicyPage() {
  const localePrefix = useLocalePrefix();
  const {t} = useTranslation();

  const strictlyNecessaryCookies = [
    {
      name: '_session_id',
      provider: 'animorunclub.com',
      purpose: t('cookie_policy.cookie_session_id_purpose'),
      duration: t('cookie_policy.duration_session'),
    },
    {
      name: 'cart',
      provider: 'animorunclub.com',
      purpose: t('cookie_policy.cookie_cart_purpose'),
      duration: t('cookie_policy.duration_2weeks'),
    },
    {
      name: '_secure_session_id',
      provider: 'animorunclub.com',
      purpose: t('cookie_policy.cookie_secure_session_purpose'),
      duration: t('cookie_policy.duration_session'),
    },
    {
      name: 'secure_customer_sig',
      provider: 'animorunclub.com',
      purpose: t('cookie_policy.cookie_customer_sig_purpose'),
      duration: t('cookie_policy.duration_20years'),
    },
    {
      name: 'storefront_digest',
      provider: 'animorunclub.com',
      purpose: t('cookie_policy.cookie_storefront_purpose'),
      duration: t('cookie_policy.duration_persistent'),
    },
  ];

  const analyticsPerformanceCookies = [
    {
      name: '_ga',
      provider: 'Google Analytics',
      purpose: t('cookie_policy.cookie_ga_purpose'),
      duration: t('cookie_policy.duration_2years'),
    },
    {
      name: '_ga_*',
      provider: 'Google Analytics',
      purpose: t('cookie_policy.cookie_ga_star_purpose'),
      duration: t('cookie_policy.duration_2years'),
    },
    {
      name: '_gid',
      provider: 'Google Analytics',
      purpose: t('cookie_policy.cookie_gid_purpose'),
      duration: t('cookie_policy.duration_24hours'),
    },
    {
      name: '_gat',
      provider: 'Google Analytics',
      purpose: t('cookie_policy.cookie_gat_purpose'),
      duration: t('cookie_policy.duration_1minute'),
    },
  ];

  const functionalPreferenceCookies = [
    {
      name: 'localization',
      provider: 'animorunclub.com',
      purpose: t('cookie_policy.cookie_localization_purpose'),
      duration: t('cookie_policy.duration_1year'),
    },
    {
      name: 'currency',
      provider: 'animorunclub.com',
      purpose: t('cookie_policy.cookie_currency_purpose'),
      duration: t('cookie_policy.duration_1year'),
    },
    {
      name: 'recently_viewed_products',
      provider: 'animorunclub.com',
      purpose: t('cookie_policy.cookie_recently_viewed_purpose'),
      duration: t('cookie_policy.duration_2weeks'),
    },
  ];

  const marketingTargetingCookies = [
    {
      name: '_fbp',
      provider: 'Meta (Facebook)',
      purpose: t('cookie_policy.cookie_fbp_purpose'),
      duration: t('cookie_policy.duration_3months'),
    },
    {
      name: '_fbc',
      provider: 'Meta (Facebook)',
      purpose: t('cookie_policy.cookie_fbc_purpose'),
      duration: t('cookie_policy.duration_2years'),
    },
    {
      name: 'IDE',
      provider: 'Google (DoubleClick)',
      purpose: t('cookie_policy.cookie_ide_purpose'),
      duration: t('cookie_policy.duration_13months'),
    },
    {
      name: '_tt_enable_cookie / _ttp',
      provider: 'TikTok',
      purpose: t('cookie_policy.cookie_tiktok_purpose'),
      duration: t('cookie_policy.duration_13months'),
    },
  ];

  return (
    <div className="px-8 sm:px-12 lg:px-16 py-12 max-w-3xl">
      <h1 className="text-2xl font-bold mb-2 tracking-wide">
        {t('cookie_policy.heading')}
      </h1>
      <p className="text-xs text-gray-500 mb-10">
        {t('cookie_policy.last_updated')}
      </p>

      <Section title={t('cookie_policy.section_1_title')}>
        <p>{t('cookie_policy.section_1_p1')}</p>
        <p>
          {t('cookie_policy.section_1_p2_start')}{' '}
          <Link to={`${localePrefix}/privacy-policy`} className="underline">
            {t('cookie_policy.privacy_policy_link')}
          </Link>
          {t('cookie_policy.section_1_p2_end')}
        </p>
      </Section>

      <Section title={t('cookie_policy.section_2_title')}>
        <p>{t('cookie_policy.section_2_p1')}</p>
        <p>{t('cookie_policy.section_2_p2')}</p>
        <p>{t('cookie_policy.section_2_p3')}:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>
            <strong>{t('cookie_policy.section_2_list_1')}</strong> — {t('cookie_policy.section_2_list_1_desc')}
          </li>
          <li>
            <strong>{t('cookie_policy.section_2_list_2')}</strong> — {t('cookie_policy.section_2_list_2_desc')}
          </li>
          <li>
            <strong>{t('cookie_policy.section_2_list_3')}</strong> — {t('cookie_policy.section_2_list_3_desc')}
          </li>
          <li>
            <strong>{t('cookie_policy.section_2_list_4')}</strong> — {t('cookie_policy.section_2_list_4_desc')}
          </li>
        </ul>
      </Section>

      <Section title={t('cookie_policy.section_3_title')}>
        <SubSection title={t('cookie_policy.section_3_1_title')}>
          <p>{t('cookie_policy.section_3_1_p')}</p>
          <CookieTable cookies={strictlyNecessaryCookies} />
        </SubSection>

        <SubSection title={t('cookie_policy.section_3_2_title')}>
          <p>{t('cookie_policy.section_3_2_p')}</p>
          <CookieTable cookies={analyticsPerformanceCookies} />
        </SubSection>

        <SubSection title={t('cookie_policy.section_3_3_title')}>
          <p>{t('cookie_policy.section_3_3_p')}</p>
          <CookieTable cookies={functionalPreferenceCookies} />
        </SubSection>

        <SubSection title={t('cookie_policy.section_3_4_title')}>
          <p>{t('cookie_policy.section_3_4_p')}</p>
          <CookieTable cookies={marketingTargetingCookies} />
          <p className="mt-3">{t('cookie_policy.section_3_4_consent')}</p>
        </SubSection>

        <SubSection title={t('cookie_policy.section_3_5_title')}>
          <p>{t('cookie_policy.section_3_5_p')}</p>
        </SubSection>
      </Section>

      <Section title={t('cookie_policy.section_4_title')}>
        <p>{t('cookie_policy.section_4_intro')}:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>{t('cookie_policy.section_4_list_1')}</li>
          <li>{t('cookie_policy.section_4_list_2')}</li>
          <li>{t('cookie_policy.section_4_list_3')}</li>
          <li>{t('cookie_policy.section_4_list_4')}</li>
          <li>{t('cookie_policy.section_4_list_5')}</li>
          <li>{t('cookie_policy.section_4_list_6')}</li>
        </ul>
      </Section>

      <Section title={t('cookie_policy.section_5_title')}>
        <SubSection title={t('cookie_policy.section_5_1_title')}>
          <p>{t('cookie_policy.section_5_1_p')}</p>
        </SubSection>

        <SubSection title={t('cookie_policy.section_5_2_title')}>
          <p>{t('cookie_policy.section_5_2_p1')}:</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>{t('cookie_policy.section_5_2_list_1')}</li>
            <li>{t('cookie_policy.section_5_2_list_2')}</li>
            <li>{t('cookie_policy.section_5_2_list_3')}</li>
            <li>{t('cookie_policy.section_5_2_list_4')}</li>
          </ul>
          <p className="mt-3">{t('cookie_policy.section_5_2_p2')}</p>
        </SubSection>

        <SubSection title={t('cookie_policy.section_5_3_title')}>
          <p>{t('cookie_policy.section_5_3_intro')}:</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>
              <strong>{t('cookie_policy.section_5_3_google')}:</strong> {t('cookie_policy.section_5_3_google_desc')}{' '}
              <span className="underline">adssettings.google.com</span>
            </li>
            <li>
              <strong>{t('cookie_policy.section_5_3_meta')}:</strong> {t('cookie_policy.section_5_3_meta_desc')}
            </li>
            <li>
              <strong>{t('cookie_policy.section_5_3_daa')}:</strong> optout.aboutads.info
            </li>
            <li>
              <strong>{t('cookie_policy.section_5_3_nai')}:</strong> optout.networkadvertising.org
            </li>
          </ul>
        </SubSection>

        <SubSection title={t('cookie_policy.section_5_4_title')}>
          <p>{t('cookie_policy.section_5_4_p')}</p>
        </SubSection>
      </Section>

      <Section title={t('cookie_policy.section_6_title')}>
        <p>
          {t('cookie_policy.section_6_p1_start')}{' '}
          <Link to={`${localePrefix}/privacy-policy`} className="underline">
            {t('cookie_policy.privacy_policy_link')}
          </Link>
          {t('cookie_policy.section_6_p1_end')}
        </p>
        <p>{t('cookie_policy.section_6_p2')}.</p>
      </Section>

      <Section title={t('cookie_policy.section_7_title')}>
        <p>{t('cookie_policy.section_7_p1')}</p>
        <p className="mt-3">{t('cookie_policy.section_7_p2')}</p>
      </Section>

      <Section title={t('cookie_policy.section_8_title')}>
        <p>{t('cookie_policy.section_8_intro')}</p>
        <ul className="list-none mt-3 space-y-1">
          <li>
            <strong>{t('cookie_policy.section_8_email')}:</strong>{' '}
            <a href="mailto:info@animorunclub.com" className="underline">
              info@animorunclub.com
            </a>
          </li>
          <li>
            <strong>{t('cookie_policy.section_8_contact_form')}:</strong>{' '}
            <Link to={`${localePrefix}/contact-us`} className="underline">
              {t('cookie_policy.section_8_contact_url')}
            </Link>
          </li>
        </ul>
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="text-xs font-semibold tracking-wide mb-4">{title}</h2>
      <div className="text-sm text-gray-700 leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4">
      <p className="font-medium mb-2">{title}</p>
      {children}
    </div>
  );
}

function CookieTable({
  cookies,
}: {
  cookies: {name: string; provider: string; purpose: string; duration: string}[];
}) {
  return (
    <div className="mt-3 overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="text-left py-2 pr-4 font-semibold tracking-wide w-32">COOKIE NAME</th>
            <th className="text-left py-2 pr-4 font-semibold tracking-wide w-32">PROVIDER</th>
            <th className="text-left py-2 pr-4 font-semibold tracking-wide">PURPOSE</th>
            <th className="text-left py-2 font-semibold tracking-wide w-24">DURATION</th>
          </tr>
        </thead>
        <tbody>
          {cookies.map((c) => (
            <tr key={c.name} className="border-b border-gray-100">
              <td className="py-2 pr-4 font-mono text-gray-800 align-top">{c.name}</td>
              <td className="py-2 pr-4 text-gray-700 align-top">{c.provider}</td>
              <td className="py-2 pr-4 text-gray-600 align-top">{c.purpose}</td>
              <td className="py-2 text-gray-700 align-top whitespace-nowrap">{c.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
