import {Link} from 'react-router';
import {useTranslation} from 'react-i18next';
import type {Route} from './+types/privacy-policy._index';
import {useLocalePrefix} from '~/lib/i18n';

export const meta: Route.MetaFunction = () => {
  const {t} = useTranslation();
  return [{title: t('privacy_policy.page_title')}];
};

export default function PrivacyPolicyPage() {
  const localePrefix = useLocalePrefix();
  const {t} = useTranslation();

  return (
    <div className="px-8 sm:px-12 lg:px-16 py-12 max-w-3xl">
      <h1 className="text-2xl font-bold mb-2 tracking-wide">
        {t('privacy_policy.heading')}
      </h1>
      <p className="text-xs text-gray-500 mb-10">
        {t('privacy_policy.last_updated')}
      </p>

      <Section title={t('privacy_policy.section_1_title')}>
        <p>{t('privacy_policy.section_1_p1')}</p>
        <p>{t('privacy_policy.section_1_p2')}</p>
      </Section>

      <Section title={t('privacy_policy.section_2_title')}>
        <p>{t('privacy_policy.section_2_p1')}</p>
        <ul className="list-none mt-3 space-y-1">
          <li>
            <strong>{t('privacy_policy.section_2_email')}</strong>{' '}
            <a href="mailto:info@animorunclub.com" className="underline">
              {t('privacy_policy.section_2_email_address')}
            </a>
          </li>
          <li>
            <strong>{t('privacy_policy.section_2_contact')}</strong>{' '}
            <Link to={`${localePrefix}/contact-us`} className="underline">
              {t('privacy_policy.section_2_contact_url')}
            </Link>
          </li>
        </ul>
      </Section>

      <Section title={t('privacy_policy.section_3_title')}>
        <p>{t('privacy_policy.section_3_p1')}</p>
        <SubSection title={t('privacy_policy.section_3_subsection_1')}>
          <ul className="list-disc list-inside space-y-1">
            <li>{t('privacy_policy.section_3_list_1_1')}</li>
            <li>{t('privacy_policy.section_3_list_1_2')}</li>
            <li>{t('privacy_policy.section_3_list_1_3')}</li>
            <li>{t('privacy_policy.section_3_list_1_4')}</li>
            <li>{t('privacy_policy.section_3_list_1_5')}</li>
            <li>{t('privacy_policy.section_3_list_1_6')}</li>
          </ul>
        </SubSection>
        <SubSection title={t('privacy_policy.section_3_subsection_2')}>
          <ul className="list-disc list-inside space-y-1">
            <li>{t('privacy_policy.section_3_list_2_1')}</li>
            <li>{t('privacy_policy.section_3_list_2_2')}</li>
            <li>{t('privacy_policy.section_3_list_2_3')}</li>
            <li>{t('privacy_policy.section_3_list_2_4')}</li>
          </ul>
        </SubSection>
        <SubSection title={t('privacy_policy.section_3_subsection_3')}>
          <ul className="list-disc list-inside space-y-1">
            <li>{t('privacy_policy.section_3_list_3_1')}</li>
            <li>{t('privacy_policy.section_3_list_3_2')}</li>
            <li>{t('privacy_policy.section_3_list_3_3')}</li>
          </ul>
        </SubSection>
      </Section>

      <Section title={t('privacy_policy.section_4_title')}>
        <p>{t('privacy_policy.section_4_p1')}</p>
        <ul className="list-disc list-inside space-y-1 mt-3">
          <li>{t('privacy_policy.section_4_list_1')}</li>
          <li>{t('privacy_policy.section_4_list_2')}</li>
          <li>{t('privacy_policy.section_4_list_3')}</li>
          <li>{t('privacy_policy.section_4_list_4')}</li>
          <li>{t('privacy_policy.section_4_list_5')}</li>
          <li>{t('privacy_policy.section_4_list_6')}</li>
          <li>{t('privacy_policy.section_4_list_7')}</li>
          <li>{t('privacy_policy.section_4_list_8')}</li>
        </ul>
      </Section>

      <Section title={t('privacy_policy.section_5_title')}>
        <p>{t('privacy_policy.section_5_p1')}</p>
        <ul className="list-disc list-inside space-y-1 mt-3">
          <li>{t('privacy_policy.section_5_list_1')}</li>
          <li>{t('privacy_policy.section_5_list_2')}</li>
          <li>{t('privacy_policy.section_5_list_3')}</li>
          <li>{t('privacy_policy.section_5_list_4')}</li>
        </ul>
      </Section>

      <Section title={t('privacy_policy.section_6_title')}>
        <p>{t('privacy_policy.section_6_p1')}</p>
        <SubSection title={t('privacy_policy.section_6_subsection')}>
          <ul className="list-disc list-inside space-y-1">
            <li>{t('privacy_policy.section_6_list_1')}</li>
            <li>{t('privacy_policy.section_6_list_2')}</li>
            <li>{t('privacy_policy.section_6_list_3')}</li>
            <li>{t('privacy_policy.section_6_list_4')}</li>
          </ul>
        </SubSection>
        <p>{t('privacy_policy.section_6_p2')}</p>
      </Section>

      <Section title={t('privacy_policy.section_7_title')}>
        <p>{t('privacy_policy.section_7_p1')}</p>
        <ul className="list-disc list-inside space-y-1 mt-3">
          <li>{t('privacy_policy.section_7_list_1')}</li>
          <li>{t('privacy_policy.section_7_list_2')}</li>
          <li>{t('privacy_policy.section_7_list_3')}</li>
          <li>{t('privacy_policy.section_7_list_4')}</li>
          <li>{t('privacy_policy.section_7_list_5')}</li>
        </ul>
        <p className="mt-3">{t('privacy_policy.section_7_p2')}</p>
      </Section>

      <Section title={t('privacy_policy.section_8_title')}>
        <p>{t('privacy_policy.section_8_p1')}</p>
      </Section>

      <Section title={t('privacy_policy.section_9_title')}>
        <p>{t('privacy_policy.section_9_p1')}</p>
        <ul className="list-disc list-inside space-y-1 mt-3">
          <li>{t('privacy_policy.section_9_list_1')}</li>
          <li>{t('privacy_policy.section_9_list_2')}</li>
          <li>{t('privacy_policy.section_9_list_3')}</li>
          <li>{t('privacy_policy.section_9_list_4')}</li>
        </ul>
      </Section>

      <Section title={t('privacy_policy.section_10_title')}>
        <p>{t('privacy_policy.section_10_p1')}</p>
        <ul className="list-disc list-inside space-y-1 mt-3">
          <li>{t('privacy_policy.section_10_list_1')}</li>
          <li>{t('privacy_policy.section_10_list_2')}</li>
          <li>{t('privacy_policy.section_10_list_3')}</li>
          <li>{t('privacy_policy.section_10_list_4')}</li>
          <li>{t('privacy_policy.section_10_list_5')}</li>
          <li>{t('privacy_policy.section_10_list_6')}</li>
          <li>{t('privacy_policy.section_10_list_7')}</li>
        </ul>
        <p className="mt-3">
          {t('privacy_policy.section_10_p2')}{' '}
          <a href="mailto:info@animorunclub.com" className="underline">
            info@animorunclub.com
          </a>
          {t('privacy_policy.section_10_p2_end')}
        </p>
      </Section>

      <Section title={t('privacy_policy.section_11_title')}>
        <p>{t('privacy_policy.section_11_p1')}</p>
        <ul className="list-disc list-inside space-y-1 mt-3">
          <li>{t('privacy_policy.section_11_list_1')}</li>
          <li>{t('privacy_policy.section_11_list_2')}</li>
          <li>{t('privacy_policy.section_11_list_3')}</li>
          <li>{t('privacy_policy.section_11_list_4')}</li>
          <li>{t('privacy_policy.section_11_list_5')}</li>
          <li>{t('privacy_policy.section_11_list_6')}</li>
        </ul>
        <p className="mt-3">
          {t('privacy_policy.section_11_p2')}{' '}
          <a href="mailto:info@animorunclub.com" className="underline">
            info@animorunclub.com
          </a>{' '}
          {t('privacy_policy.section_11_p2_middle')}
        </p>
      </Section>

      <Section title={t('privacy_policy.section_12_title')}>
        <p>{t('privacy_policy.section_12_p1')}</p>
        <p>{t('privacy_policy.section_12_p2')}</p>
      </Section>

      <Section title={t('privacy_policy.section_13_title')}>
        <p>{t('privacy_policy.section_13_p1')}</p>
      </Section>

      <Section title={t('privacy_policy.section_14_title')}>
        <p>{t('privacy_policy.section_14_p1')}</p>
      </Section>

      <Section title={t('privacy_policy.section_15_title')}>
        <p>{t('privacy_policy.section_15_p1')}</p>
      </Section>

      <Section title={t('privacy_policy.section_16_title')}>
        <p>{t('privacy_policy.section_16_p1')}</p>
        <ul className="list-none mt-3 space-y-1">
          <li>
            <strong>{t('privacy_policy.section_16_email')}</strong>{' '}
            <a href="mailto:info@animorunclub.com" className="underline">
              {t('privacy_policy.section_16_email_address')}
            </a>
          </li>
          <li>
            <strong>{t('privacy_policy.section_16_contact_form')}</strong>{' '}
            <Link to={`${localePrefix}/contact-us`} className="underline">
              {t('privacy_policy.section_16_contact_url')}
            </Link>
          </li>
        </ul>
        <p className="mt-3">{t('privacy_policy.section_16_p2')}</p>
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
      <div className="text-sm text-gray-700 leading-relaxed space-y-3">
        {children}
      </div>
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
    <div className="mt-3">
      <p className="font-medium mb-2">{title}</p>
      {children}
    </div>
  );
}
