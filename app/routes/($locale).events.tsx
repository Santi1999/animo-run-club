import {useTranslation} from 'react-i18next';
import {useScrollReveal} from '~/lib/useScrollReveal';
import type {Route} from './+types/events';

export const meta: Route.MetaFunction = () => {
  return [
    {title: 'Upcoming Events | Animo Run Club'},
    {
      name: 'description',
      content:
        'Weekly social runs & walks, upcoming races and special events with Ánimo Run Club.',
    },
  ];
};

const CDN_URL =
  'https://varsa-studio-content.nyc3.cdn.digitaloceanspaces.com/animo';

// Placeholder data (set `image` to a photo URL): replace with real events
// (or a CMS/metaobject query) later.
const SOCIAL_EVENTS = [
  {
    key: 'social',
    heading: 'social_heading',
    badge: 'social_badge',
    image: `${CDN_URL}/run.jpg`,
  },
] as const;

const SPECIAL_EVENTS = [
  {
    key: 'gala',
    image: `${CDN_URL}/gala.jpg`,
    href: 'https://www.eventbrite.com/e/animo-run-club-summer-gala-fundraiser-tickets-1996355341567?aff=oddtdtcreator',
  },
  {
    key: 'halloween',
    image: `${CDN_URL}/events.jpg`,
    href: 'https://www.eventbrite.com/e/animo-run-club-x-11937-fitness-present-jennys-halloween-shakeout-run-tickets-2003750473606?aff=erelpanelorg',
  },
] as const;

// Hero collage photos: back, front, side.
const HERO_IMAGES = [
  {key: 'back', src: `${CDN_URL}/animo_1.jpg`},
  {key: 'front', src: `${CDN_URL}/animo_2.jpeg`},
  {key: 'side', src: `${CDN_URL}/animo_3.jpeg`},
] as const;

function EventCard({
  heading,
  badge,
  image,
  variant,
  featured = false,
  title,
  when,
  text,
  meetingPoint,
  options,
  linkLabel,
  href,
  delay = 0,
}: {
  heading: string;
  badge: string;
  image?: string;
  variant: 'dark' | 'light' | 'special';
  featured?: boolean;
  title: string;
  when: string;
  text: string;
  meetingPoint: string;
  options: string;
  linkLabel?: string;
  href?: string;
  delay?: number;
}) {
  return (
    <article
      className={`events-card${variant === 'special' ? ' events-card-special' : ''}${featured ? ' events-card-featured' : ''}`}
      data-reveal
      style={{'--reveal-delay': `${delay}ms`} as React.CSSProperties}
    >
      <div
        className="events-card-media"
        style={image ? {backgroundImage: `url(${image})`} : undefined}
      >
        <h2 className="events-card-heading">{heading}</h2>
        <span className={`events-card-badge events-card-badge-${variant}`}>
          {badge}
        </span>
      </div>
      <div className="events-card-body">
        <h3 className="events-card-title">{title}</h3>
        <p className="events-card-when">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M3 10h18M8 3v4M16 3v4" />
          </svg>
          {when}
        </p>
        <p className="events-card-text">{text}</p>
        <div className="events-card-metas">
          <span className="events-card-meta">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
              <circle cx="12" cy="9.5" r="2.5" />
            </svg>
            {meetingPoint}
          </span>
          <span className="events-card-meta">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 17v-3l4-1 2-4 3 2 3 1c2 .5 5 1.5 5 4v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
              <path d="M9 9l1.5 1.5M12 10.5l1.5 1.5" />
            </svg>
            {options}
          </span>
        </div>
        {href && (
          <a
            className="events-card-link"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkLabel} ↗
          </a>
        )}
      </div>
    </article>
  );
}

export default function EventsPage() {
  const {t} = useTranslation();
  useScrollReveal();

  return (
    <div className="events-page">
      <section className="events-hero">
        <div className="events-hero-text">
          <h1 className="events-hero-title">{t('events.title')}</h1>
          <p>{t('events.intro')}</p>
          <strong>{t('events.club_name')}</strong>
          <a className="events-hero-cta" href="#events-grid">
            {t('events.cta')}
          </a>
        </div>
        <div className="events-hero-collage" aria-hidden="true">
          {HERO_IMAGES.map(({key, src}, i) => (
            <div
              key={key}
              className={`events-hero-photo events-hero-photo-${i + 1}`}
              style={src ? {backgroundImage: `url(${src})`} : undefined}
            />
          ))}
        </div>
      </section>

      <section className="events-grid events-grid-single" id="events-grid">
        {SOCIAL_EVENTS.map((e, i) => (
          <EventCard
            key={e.key}
            delay={i * 120}
            heading={t(`events.${e.heading}`)}
            badge={t(`events.${e.badge}`)}
            image={e.image}
            variant={i % 2 === 0 ? 'dark' : 'light'}
            featured
            title={t('events.event_title')}
            when={t('events.when')}
            text={t('events.event_text')}
            meetingPoint={t('events.meeting_point')}
            options={t('events.options')}
          />
        ))}
      </section>

      <h2 className="events-title events-title-secondary" data-reveal>
        {t('events.special_title')}
      </h2>

      <section className="events-grid events-grid-special">
        {SPECIAL_EVENTS.map((e, i) => (
          <EventCard
            key={e.key}
            delay={i * 120}
            heading={t('events.special_heading')}
            badge={t(`events.special.${e.key}.badge`)}
            image={e.image}
            href={e.href}
            variant="special"
            title={t(`events.special.${e.key}.title`)}
            when={t(`events.special.${e.key}.when`)}
            text={t(`events.special.${e.key}.text`)}
            meetingPoint={t(`events.special.${e.key}.place`)}
            options={t(`events.special.${e.key}.options`)}
            linkLabel={t(`events.special.${e.key}.link`)}
          />
        ))}
      </section>

      <section className="events-intro">
        <div className="events-slogan" data-reveal>
          <svg
            className="events-slogan-topo"
            viewBox="0 0 200 120"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <path d="M-10 90C30 70 60 100 100 70S170 40 215 55" />
            <path d="M-10 75C30 55 60 85 100 55S170 25 215 40" />
            <path d="M-10 60C30 40 60 70 100 40S170 10 215 25" />
            <path d="M-10 105C30 85 60 115 100 85S170 55 215 70" />
            <path d="M-10 120C30 100 60 130 100 100S170 70 215 85" />
          </svg>
          <svg
            className="events-slogan-icon"
            width="44"
            height="44"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="31" cy="8" r="3.6" fill="currentColor" stroke="none" />
            <path d="M27 14l-5 12" />
            <path d="M26.5 16l-8 2.5-3.5-4" />
            <path d="M26.5 16l6.5 5 5-3" />
            <path d="M22 26l8 4-2 10" />
            <path d="M22 26l-6 8-9-1" />
            <path d="M3 17h6M1 22h6M4 27h5" strokeWidth="1.8" />
          </svg>
          <p className="events-slogan-line">{t('events.slogan_line_1')}</p>
          <p className="events-slogan-line">{t('events.slogan_line_2')}</p>
          <p className="events-slogan-cta">{t('events.slogan_cta')}</p>
        </div>
      </section>
    </div>
  );
}
