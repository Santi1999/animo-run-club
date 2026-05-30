import {Link} from 'react-router';
import type {Route} from './+types/privacy-policy._index';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Privacy Policy | Ánimo Run Club'}];
};

export default function PrivacyPolicyPage() {
  return (
    <div className="px-8 sm:px-12 lg:px-16 py-12 max-w-3xl">
      <h1 className="text-2xl font-bold mb-2 tracking-wide">PRIVACY POLICY</h1>
      <p className="text-xs text-gray-500 mb-10">
        Last updated: January 1, 2025
      </p>

      <Section title="1. INTRODUCTION">
        <p>
          Ánimo Run Club (&quot;Ánimo&quot;, &quot;we&quot;, &quot;us&quot;, or
          &quot;our&quot;) is committed to protecting your personal information
          and your right to privacy. This Privacy Policy explains how we
          collect, use, disclose, and safeguard your information when you visit
          our website, purchase our products, or interact with us in any other
          way.
        </p>
        <p>
          Please read this policy carefully. If you disagree with its terms,
          please discontinue use of our site.
        </p>
      </Section>

      <Section title="2. DATA CONTROLLER">
        <p>
          The data controller responsible for your personal information is Ánimo
          Run Club. You can reach us at:
        </p>
        <ul className="list-none mt-3 space-y-1">
          <li>
            <strong>Email:</strong>{' '}
            <a href="mailto:info@animorunclub.com" className="underline">
              info@animorunclub.com
            </a>
          </li>
          <li>
            <strong>Contact page:</strong>{' '}
            <Link to="/contact-us" className="underline">
              animorunclub.com/contact-us
            </Link>
          </li>
        </ul>
      </Section>

      <Section title="3. INFORMATION WE COLLECT">
        <p>We may collect the following categories of personal information:</p>
        <SubSection title="Information you provide directly">
          <ul className="list-disc list-inside space-y-1">
            <li>Name, email address, phone number, and postal address</li>
            <li>Account credentials (username and password)</li>
            <li>
              Billing and payment information (processed securely by our payment
              providers)
            </li>
            <li>Order history and purchase records</li>
            <li>Communications you send us, including support requests</li>
            <li>Newsletter and marketing preferences</li>
          </ul>
        </SubSection>
        <SubSection title="Information collected automatically">
          <ul className="list-disc list-inside space-y-1">
            <li>IP address, browser type, and operating system</li>
            <li>Pages visited, time spent on pages, and referring URLs</li>
            <li>Device identifiers and cookie data</li>
            <li>Geolocation data (country/region level)</li>
          </ul>
        </SubSection>
        <SubSection title="Information from third parties">
          <ul className="list-disc list-inside space-y-1">
            <li>
              Social media platforms when you connect your account or interact
              with our pages
            </li>
            <li>Analytics and advertising partners</li>
            <li>Fraud prevention and identity verification services</li>
          </ul>
        </SubSection>
      </Section>

      <Section title="4. HOW WE USE YOUR INFORMATION">
        <p>We use the information we collect for the following purposes:</p>
        <ul className="list-disc list-inside space-y-1 mt-3">
          <li>Processing and fulfilling your orders</li>
          <li>Managing your account and providing customer support</li>
          <li>
            Sending order confirmations, shipping updates, and service
            notifications
          </li>
          <li>
            Sending marketing communications and newsletters, where you have
            given consent or where permitted by law
          </li>
          <li>Personalizing your browsing and shopping experience</li>
          <li>Improving our website, products, and services</li>
          <li>Detecting and preventing fraud or unauthorized activity</li>
          <li>Complying with legal obligations</li>
        </ul>
      </Section>

      <Section title="5. LEGAL BASIS FOR PROCESSING">
        <p>
          Where applicable under data protection law (including the GDPR), we
          process your personal information on the following legal bases:
        </p>
        <ul className="list-disc list-inside space-y-1 mt-3">
          <li>
            <strong>Contract performance</strong> — to fulfill orders and manage
            your account
          </li>
          <li>
            <strong>Legitimate interests</strong> — to improve our services,
            prevent fraud, and communicate with existing customers
          </li>
          <li>
            <strong>Consent</strong> — for marketing communications and
            non-essential cookies
          </li>
          <li>
            <strong>Legal obligation</strong> — where required by applicable law
          </li>
        </ul>
      </Section>

      <Section title="6. COOKIES AND TRACKING TECHNOLOGIES">
        <p>
          We use cookies and similar tracking technologies to enhance your
          experience on our website. Cookies are small data files stored on your
          device.
        </p>
        <SubSection title="Types of cookies we use">
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Strictly necessary cookies</strong> — required for the
              website to function (e.g., shopping cart, login session)
            </li>
            <li>
              <strong>Analytics cookies</strong> — help us understand how
              visitors use our site
            </li>
            <li>
              <strong>Marketing cookies</strong> — used to deliver relevant
              advertising
            </li>
            <li>
              <strong>Preference cookies</strong> — remember your settings and
              choices
            </li>
          </ul>
        </SubSection>
        <p>
          You can manage your cookie preferences at any time through our Cookie
          Settings link in the footer.
        </p>
      </Section>

      <Section title="7. SHARING YOUR INFORMATION">
        <p>
          We do not sell your personal information. We may share it with the
          following categories of third parties:
        </p>
        <ul className="list-disc list-inside space-y-1 mt-3">
          <li>
            <strong>Service providers</strong> — shipping carriers, payment
            processors, email platforms, and IT infrastructure providers who
            process data on our behalf
          </li>
          <li>
            <strong>Analytics partners</strong> — to help us analyze website
            usage and improve our services
          </li>
          <li>
            <strong>Advertising networks</strong> — to show you relevant ads,
            where you have consented
          </li>
          <li>
            <strong>Legal authorities</strong> — when required by law or to
            protect our legal rights
          </li>
          <li>
            <strong>Business transfers</strong> — in connection with a merger,
            acquisition, or sale of assets, where your data may be transferred
            as a business asset
          </li>
        </ul>
        <p className="mt-3">
          All third-party service providers are contractually obligated to
          handle your data securely and only for the purposes we specify.
        </p>
      </Section>

      <Section title="8. INTERNATIONAL DATA TRANSFERS">
        <p>
          Your information may be transferred to and processed in countries
          other than your country of residence. Where required, we put in place
          appropriate safeguards (such as Standard Contractual Clauses) to
          ensure your data is protected in accordance with applicable law.
        </p>
      </Section>

      <Section title="9. DATA RETENTION">
        <p>
          We retain your personal information for as long as necessary to
          fulfill the purposes outlined in this policy, including for the
          purposes of satisfying any legal, accounting, or reporting
          requirements. Specifically:
        </p>
        <ul className="list-disc list-inside space-y-1 mt-3">
          <li>
            Account information is retained for the life of your account plus up
            to 5 years
          </li>
          <li>
            Order records are retained for at least 7 years for tax and legal
            purposes
          </li>
          <li>
            Marketing preferences are retained until you unsubscribe or request
            deletion
          </li>
          <li>
            Cookie data is retained according to each cookie&apos;s set expiry
            period
          </li>
        </ul>
      </Section>

      <Section title="10. YOUR RIGHTS">
        <p>
          Depending on your location, you may have the following rights
          regarding your personal information:
        </p>
        <ul className="list-disc list-inside space-y-1 mt-3">
          <li>
            <strong>Access</strong> — request a copy of the personal data we
            hold about you
          </li>
          <li>
            <strong>Correction</strong> — request that inaccurate or incomplete
            data be corrected
          </li>
          <li>
            <strong>Erasure</strong> — request deletion of your personal data
            (&quot;right to be forgotten&quot;)
          </li>
          <li>
            <strong>Restriction</strong> — request that we restrict how we
            process your data
          </li>
          <li>
            <strong>Portability</strong> — receive your data in a structured,
            machine-readable format
          </li>
          <li>
            <strong>Objection</strong> — object to processing based on
            legitimate interests or for direct marketing
          </li>
          <li>
            <strong>Withdraw consent</strong> — where processing is based on
            consent, you may withdraw it at any time
          </li>
        </ul>
        <p className="mt-3">
          To exercise any of these rights, please contact us at{' '}
          <a href="mailto:info@animorunclub.com" className="underline">
            info@animorunclub.com
          </a>
          . We will respond within the timeframe required by applicable law.
        </p>
      </Section>

      <Section title="11. CALIFORNIA PRIVACY RIGHTS (CCPA/CPRA)">
        <p>
          If you are a California resident, you have additional rights under the
          California Consumer Privacy Act (CCPA) and the California Privacy
          Rights Act (CPRA):
        </p>
        <ul className="list-disc list-inside space-y-1 mt-3">
          <li>
            The right to know what personal information we collect, use, and
            disclose
          </li>
          <li>The right to delete your personal information</li>
          <li>The right to correct inaccurate personal information</li>
          <li>
            The right to opt out of the sale or sharing of your personal
            information for cross-context behavioral advertising
          </li>
          <li>
            The right to non-discrimination for exercising your privacy rights
          </li>
          <li>The right to limit use of sensitive personal information</li>
        </ul>
        <p className="mt-3">
          To submit a CCPA request, contact us at{' '}
          <a href="mailto:info@animorunclub.com" className="underline">
            info@animorunclub.com
          </a>{' '}
          or use the &quot;Do Not Sell or Share My Personal Information&quot;
          link in our website footer.
        </p>
      </Section>

      <Section title="12. SECURITY">
        <p>
          We implement appropriate technical and organizational measures to
          protect your personal information against unauthorized access,
          alteration, disclosure, or destruction. These include encryption of
          data in transit (TLS/SSL), access controls, and regular security
          reviews.
        </p>
        <p>
          While we strive to use commercially acceptable means to protect your
          data, no method of transmission over the internet or electronic
          storage is 100% secure. We cannot guarantee absolute security.
        </p>
      </Section>

      <Section title="13. CHILDREN'S PRIVACY">
        <p>
          Our website and services are not directed to individuals under the age
          of 16. We do not knowingly collect personal information from children.
          If you believe we have inadvertently collected information from a
          minor, please contact us immediately so we can delete it.
        </p>
      </Section>

      <Section title="14. THIRD-PARTY LINKS">
        <p>
          Our website may contain links to third-party websites. We are not
          responsible for the privacy practices of those sites and encourage you
          to read their privacy policies before providing any personal
          information.
        </p>
      </Section>

      <Section title="15. CHANGES TO THIS POLICY">
        <p>
          We may update this Privacy Policy from time to time. When we do, we
          will revise the &quot;Last updated&quot; date at the top of this page.
          Where changes are material, we will provide a more prominent notice
          (such as an email notification or a banner on our website). Your
          continued use of our services after the changes take effect
          constitutes acceptance of the updated policy.
        </p>
      </Section>

      <Section title="16. CONTACT US">
        <p>
          If you have questions, concerns, or requests regarding this Privacy
          Policy or our data practices, please contact us:
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
            <Link to="/contact-us" className="underline">
              animorunclub.com/contact-us
            </Link>
          </li>
        </ul>
        <p className="mt-3">
          If you are located in the European Economic Area, you also have the
          right to lodge a complaint with your local data protection authority.
        </p>
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
