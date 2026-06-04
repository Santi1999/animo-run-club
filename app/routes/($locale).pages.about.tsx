import {useTranslation} from 'react-i18next';
import type {Route} from './+types/pages.about';

export const meta: Route.MetaFunction = () => {
  return [
    {title: 'About Us | Animo Run Club'},
    {
      name: 'description',
      content:
        'A safe and inclusive community celebrating movement, gratitude, and shared effort — more than miles, we build spirit and well-being.',
    },
    {property: 'og:title', content: 'Ánimo | Performance Apparel'},
    {
      property: 'og:description',
      content:
        'A safe and inclusive community celebrating movement, gratitude, and shared effort — more than miles, we build spirit and well-being.',
    },
    {
      property: 'og:image',
      content:
        'https://cdn.shopify.com/s/files/1/0670/7930/7470/files/2.png?v=1780311878',
    },
    {property: 'og:type', content: 'website'},
    {name: 'twitter:card', content: 'summary_large_image'},
    {name: 'twitter:title', content: 'Ánimo | Performance Apparel'},
    {
      name: 'twitter:description',
      content:
        'A safe and inclusive community celebrating movement, gratitude, and shared effort — more than miles, we build spirit and well-being.',
    },
    {
      name: 'twitter:image',
      content:
        'https://cdn.shopify.com/s/files/1/0670/7930/7470/files/2.png?v=1780311878',
    },
  ];
};

export default function AboutPage() {
  const {t} = useTranslation();

  return (
    <div className="px-8 sm:px-12 lg:px-16 py-12 max-w-3xl">
      {/* Mission */}
      <section className="mb-16">
        <h1 className="text-2xl font-bold mb-6">{t('about.mission_title')}</h1>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          {t('about.mission_text')}
        </p>
        <ul className="space-y-3 text-sm text-gray-800 italic">
          <li>{t('about.mission_bullet_1')}</li>
          <li>{t('about.mission_bullet_2')}</li>
          <li>{t('about.mission_bullet_3')}</li>
          <li className="font-semibold not-italic uppercase tracking-wide">
            {t('about.mission_bullet_4')}
          </li>
        </ul>
      </section>

      {/* Vision */}
      <section className="mb-16">
        <h2 className="text-xl font-bold mb-6">{t('about.vision_title')}</h2>
        <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
          <p>{t('about.vision_p1')}</p>
          <p>{t('about.vision_p2')}</p>
          <p>{t('about.vision_p3')}</p>
          <p>{t('about.vision_p4')}</p>
          <p className="text-gray-800 font-medium">
            {t('about.vision_p5')}
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="mb-16">
        <h2 className="text-xl font-bold mb-8">{t('about.values_title')}</h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-2">
              {t('about.value_gratitude_title')}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t('about.value_gratitude_text')}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-2">
              {t('about.value_inclusion_title')}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t('about.value_inclusion_text')}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-2">
              {t('about.value_community_title')}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t('about.value_community_text')}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-2">
              {t('about.value_passion_title')}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t('about.value_passion_text')}
            </p>
          </div>
        </div>
      </section>

      {/* Documenting the Process */}
      <section>
        <h2 className="text-xl font-bold mb-6">{t('about.documenting_title')}</h2>
        <ul
          className="ml-5 space-y-3 text-gray-600 text-sm leading-relaxed"
          style={{listStyle: 'disc'}}
        >
          <li>{t('about.documenting_1')}</li>
          <li>{t('about.documenting_2')}</li>
          <li>{t('about.documenting_3')}</li>
          <li>
            {t('about.documenting_4_start')}{' '}
            <span className="text-gray-800 font-medium">
              {t('about.documenting_4_end')}
            </span>
          </li>
          <li>{t('about.documenting_5')}</li>
        </ul>
      </section>
    </div>
  );
}
