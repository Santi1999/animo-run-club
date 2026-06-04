import {Link} from 'react-router';
import type {Route} from './+types/cookie-policy._index';
import {useLocalePrefix} from '~/lib/i18n';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Cookie Policy | Ánimo Run Club'}];
};

export default function CookiePolicyPage() {
  const localePrefix = useLocalePrefix();
  return (
    <div className="px-8 sm:px-12 lg:px-16 py-12 max-w-3xl">
      <h1 className="text-2xl font-bold mb-2 tracking-wide">COOKIE POLICY</h1>
      <p className="text-xs text-gray-500 mb-10">Last updated: January 1, 2025</p>

      <Section title="1. INTRODUCTION">
        <p>
          Ánimo Run Club (&quot;Ánimo&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;)
          uses cookies and similar tracking technologies when you visit our website. This Cookie
          Policy explains what cookies are, what types we use, why we use them, and how you can
          control them.
        </p>
        <p>
          This policy should be read alongside our{' '}
          <Link to={`${localePrefix}/privacy-policy`} className="underline">
            Privacy Policy
          </Link>
          , which provides broader information about how we collect and process your personal data.
        </p>
      </Section>

      <Section title="2. WHAT ARE COOKIES?">
        <p>
          Cookies are small text files placed on your device (computer, tablet, or mobile phone)
          when you visit a website. They allow the website to recognize your device, remember your
          preferences, and improve your experience over time.
        </p>
        <p>
          Similar technologies include web beacons (tiny transparent images embedded in pages or
          emails), pixels, local storage, and session storage. Throughout this policy, we refer to
          all these technologies collectively as &quot;cookies.&quot;
        </p>
        <p>Cookies can be:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>
            <strong>Session cookies</strong> — temporary cookies that expire when you close your
            browser
          </li>
          <li>
            <strong>Persistent cookies</strong> — cookies that remain on your device for a set
            period or until you delete them
          </li>
          <li>
            <strong>First-party cookies</strong> — set directly by Ánimo Run Club
          </li>
          <li>
            <strong>Third-party cookies</strong> — set by external services we use (e.g., analytics
            or advertising providers)
          </li>
        </ul>
      </Section>

      <Section title="3. CATEGORIES OF COOKIES WE USE">
        <SubSection title="3.1 Strictly Necessary Cookies">
          <p>
            These cookies are essential for the website to function and cannot be switched off. They
            are typically set in response to actions you take, such as logging in, adding items to
            your cart, or filling in forms. Without these cookies, our website cannot operate
            correctly.
          </p>
          <CookieTable
            cookies={[
              {
                name: '_session_id',
                provider: 'animorunclub.com',
                purpose: 'Maintains your session state across page requests',
                duration: 'Session',
              },
              {
                name: 'cart',
                provider: 'animorunclub.com',
                purpose: 'Stores the contents of your shopping cart',
                duration: '2 weeks',
              },
              {
                name: '_secure_session_id',
                provider: 'animorunclub.com',
                purpose:
                  'Maintains a secure session token for authenticated users',
                duration: 'Session',
              },
              {
                name: 'secure_customer_sig',
                provider: 'animorunclub.com',
                purpose: 'Authenticates logged-in customers',
                duration: '20 years',
              },
              {
                name: 'storefront_digest',
                provider: 'animorunclub.com',
                purpose:
                  'Identifies whether the visitor has access to a password-protected storefront',
                duration: 'Persistent',
              },
            ]}
          />
        </SubSection>

        <SubSection title="3.2 Analytics and Performance Cookies">
          <p>
            These cookies collect information about how visitors use our website, such as which pages
            are visited most often and whether visitors encounter error messages. The data is
            aggregated and anonymous. We use this information to improve how the website works.
          </p>
          <CookieTable
            cookies={[
              {
                name: '_ga',
                provider: 'Google Analytics',
                purpose:
                  'Distinguishes unique users by assigning a randomly generated number',
                duration: '2 years',
              },
              {
                name: '_ga_*',
                provider: 'Google Analytics',
                purpose: 'Stores and counts page views for a specific property',
                duration: '2 years',
              },
              {
                name: '_gid',
                provider: 'Google Analytics',
                purpose: 'Distinguishes users; expires after 24 hours',
                duration: '24 hours',
              },
              {
                name: '_gat',
                provider: 'Google Analytics',
                purpose: 'Throttles the request rate to Google Analytics',
                duration: '1 minute',
              },
            ]}
          />
        </SubSection>

        <SubSection title="3.3 Functional and Preference Cookies">
          <p>
            These cookies allow our website to remember choices you make (such as your language,
            country, or currency) and provide enhanced, personalized features. They may be set by us
            or by third-party providers whose services we have added to our pages.
          </p>
          <CookieTable
            cookies={[
              {
                name: 'localization',
                provider: 'animorunclub.com',
                purpose: 'Stores your selected country and language preference',
                duration: '1 year',
              },
              {
                name: 'currency',
                provider: 'animorunclub.com',
                purpose: 'Stores your selected currency preference',
                duration: '1 year',
              },
              {
                name: 'recently_viewed_products',
                provider: 'animorunclub.com',
                purpose:
                  'Stores the products you have viewed for &quot;Recently Viewed&quot; features',
                duration: '2 weeks',
              },
            ]}
          />
        </SubSection>

        <SubSection title="3.4 Marketing and Targeting Cookies">
          <p>
            These cookies are set by us and our advertising partners to build a profile of your
            interests and show you relevant ads on other websites. They track your visits across
            sites and recognize your device. Disabling them will not stop you from seeing
            advertisements, but the ads you see may be less relevant to you.
          </p>
          <CookieTable
            cookies={[
              {
                name: '_fbp',
                provider: 'Meta (Facebook)',
                purpose:
                  'Used by Meta to deliver, measure, and improve the relevance of advertisements',
                duration: '3 months',
              },
              {
                name: '_fbc',
                provider: 'Meta (Facebook)',
                purpose: 'Stores the last ad click attribution data from Facebook',
                duration: '2 years',
              },
              {
                name: 'IDE',
                provider: 'Google (DoubleClick)',
                purpose:
                  'Used to show Google ads based on your browsing on sites using Google services',
                duration: '13 months',
              },
              {
                name: '_tt_enable_cookie / _ttp',
                provider: 'TikTok',
                purpose:
                  'Measures the effectiveness of ads and enables ad retargeting on TikTok',
                duration: '13 months',
              },
            ]}
          />
          <p className="mt-3">
            These cookies require your prior consent. You can change your preferences at any time
            using our Cookie Settings tool.
          </p>
        </SubSection>

        <SubSection title="3.5 Social Media Cookies">
          <p>
            Our website includes features from social media platforms (such as Instagram, TikTok,
            and Spotify). These platforms may set cookies to enable you to share content or
            interact with their features. We do not control these cookies — please refer to each
            platform&apos;s own privacy and cookie policy.
          </p>
        </SubSection>
      </Section>

      <Section title="4. HOW WE USE COOKIE DATA">
        <p>The data collected via cookies may be used to:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>Ensure the website operates correctly and securely</li>
          <li>Remember your preferences and settings across visits</li>
          <li>Understand how you interact with our website so we can improve it</li>
          <li>Measure the effectiveness of our marketing campaigns</li>
          <li>Show you personalized content and relevant advertisements</li>
          <li>Prevent fraudulent activity</li>
        </ul>
      </Section>

      <Section title="5. YOUR CHOICES AND HOW TO MANAGE COOKIES">
        <SubSection title="5.1 Cookie Settings Tool">
          <p>
            When you first visit our website, you will see a cookie consent banner. You can accept
            all cookies, reject non-essential cookies, or customize your preferences by category.
            You can update your choices at any time by clicking the &quot;Cookie Settings&quot; link
            in our website footer.
          </p>
        </SubSection>

        <SubSection title="5.2 Browser Settings">
          <p>
            Most web browsers allow you to control cookies through their settings. You can typically
            find these options under &quot;Privacy&quot; or &quot;Security&quot; in your browser
            preferences. Common actions include:
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Viewing cookies currently stored on your device</li>
            <li>Blocking all or specific cookies</li>
            <li>Deleting cookies at any time</li>
            <li>Setting your browser to alert you when a cookie is placed</li>
          </ul>
          <p className="mt-3">
            Note that blocking certain cookies may affect the functionality of our website,
            including your ability to add items to your cart or log in to your account.
          </p>
        </SubSection>

        <SubSection title="5.3 Opt-Out Tools from Third Parties">
          <p>You can opt out of interest-based advertising through these resources:</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>
              <strong>Google:</strong> Manage your ad preferences at{' '}
              <span className="underline">adssettings.google.com</span>
            </li>
            <li>
              <strong>Meta (Facebook/Instagram):</strong> Manage your ad preferences in your
              Facebook account settings
            </li>
            <li>
              <strong>Digital Advertising Alliance (DAA):</strong> optout.aboutads.info
            </li>
            <li>
              <strong>Network Advertising Initiative (NAI):</strong> optout.networkadvertising.org
            </li>
          </ul>
        </SubSection>

        <SubSection title="5.4 Do Not Track">
          <p>
            Some browsers have a &quot;Do Not Track&quot; (DNT) feature that signals to websites
            that you do not want your browsing activity tracked. Currently, there is no universally
            accepted standard for responding to DNT signals, and we do not currently respond to
            them. You can use our Cookie Settings tool to exercise specific choices.
          </p>
        </SubSection>
      </Section>

      <Section title="6. COOKIES AND PERSONAL DATA">
        <p>
          Some cookies we use may be associated with personal data (for example, if you are logged
          in to your Ánimo account). In those cases, the processing of that personal data is
          governed by our{' '}
          <Link to={`${localePrefix}/privacy-policy`} className="underline">
            Privacy Policy
          </Link>
          .
        </p>
        <p>
          Anonymous or aggregated cookie data that cannot identify you is not considered personal
          data and is used only for analytical and operational purposes.
        </p>
      </Section>

      <Section title="7. UPDATES TO THIS POLICY">
        <p>
          We may update this Cookie Policy from time to time to reflect changes in the cookies we
          use, new legal requirements, or improvements to our website. When we make material
          changes, we will update the &quot;Last updated&quot; date at the top of this page and, if
          necessary, display a new consent banner.
        </p>
        <p>We encourage you to review this policy periodically to stay informed.</p>
      </Section>

      <Section title="8. CONTACT US">
        <p>
          If you have any questions about our use of cookies or this Cookie Policy, please contact
          us:
        </p>
        <ul className="list-none mt-3 space-y-1">
          <li>
            <strong>Email:</strong>{' '}
            <a href="mailto:info@animorunclub.com" className="underline">
              info@animorunclub.com
            </a>
          </li>
          <li>
            <strong>Contact form:</strong>{' '}
            <Link to={`${localePrefix}/contact-us`} className="underline">
              animorunclub.com/contact-us
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
              <td
                className="py-2 pr-4 text-gray-600 align-top"
                dangerouslySetInnerHTML={{__html: c.purpose}}
              />
              <td className="py-2 text-gray-700 align-top whitespace-nowrap">{c.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
