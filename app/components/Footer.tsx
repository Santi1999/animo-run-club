import {ChevronDown} from 'lucide-react';
import {useState} from 'react';
import {Link} from 'react-router';

export function Footer({
  onOpenCookieSettings,
}: {
  onOpenCookieSettings?: () => void;
}) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="bg-[#f8f8f8] border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="px-8 sm:px-12 lg:px-16 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-8 lg:gap-16">
          {/* Newsletter Section */}
          <div className="lg:max-w-xs w-full">
            <h3 className="text-xs font-semibold mb-4 tracking-wide">
              SUBSCRIBE TO OUR NEWSLETTER
            </h3>
            <form className="mb-6">
              <div className="flex items-center border-b border-black pb-1">
                <input
                  type="email"
                  placeholder="Insert your e-mail address *"
                  className="flex-1 bg-transparent text-sm outline-none focus:outline-none focus:ring-0 placeholder:text-gray-500"
                />
                <button type="submit" aria-label="Subscribe" className="ml-2">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="text-black"
                  >
                    <path
                      d="M4 10h12M12 6l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </button>
              </div>
            </form>
            <p className="text-xs text-gray-600 leading-relaxed mb-6">
              By clicking on &quot;Subscribe&quot;, you confirm that you have
              read and understood our{' '}
              <Link to="/privacy-policy" className="underline">
                Privacy Statement
              </Link>{' '}
              and that you want to receive the newsletter and other marketing
              communication as set out therein.
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center gap-4 pt-5">
              {/* Facebook */}
              {/* <Link
                to="/"
                aria-label="Facebook"
                className="hover:opacity-70 transition-opacity"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Link> */}
              {/* X / Twitter */}
              {/* <Link
                to="/"
                aria-label="X"
                className="hover:opacity-70 transition-opacity"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg> */}
              {/* </Link> */}
              {/* Instagram */}
              <Link
                to="/"
                aria-label="Instagram"
                className="hover:opacity-70 transition-opacity"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </Link>
              {/* YouTube */}
              {/* <Link
                to="/"
                aria-label="YouTube"
                className="hover:opacity-70 transition-opacity"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </Link> */}
              {/* Spotify */}
              <Link
                to="/"
                aria-label="Spotify"
                className="hover:opacity-70 transition-opacity"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
              </Link>
              {/* Discord */}
              {/* <Link
                to="/"
                aria-label="Discord"
                className="hover:opacity-70 transition-opacity"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </Link> */}
              {/* TikTok */}
              <Link
                to="/"
                aria-label="TikTok"
                className="hover:opacity-70 transition-opacity"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right columns group */}
          <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
            {/* Contact Us */}
            <div>
              <button
                onClick={() => toggleSection('contact')}
                className="md:cursor-default flex items-center justify-between w-full md:pointer-events-none"
              >
                <h3 className="text-xs font-semibold mb-4 tracking-wide">
                  CONTACT US
                </h3>
                <ChevronDown
                  className={`w-4 h-4 md:hidden transition-transform ${openSection === 'contact' ? 'rotate-180' : ''}`}
                />
              </button>
              <ul
                className={`space-y-2 text-sm ${openSection === 'contact' ? 'block' : 'hidden'} md:block`}
              >
                <li>
                  <Link
                    to="/contact-us"
                    className="hover:opacity-70 transition-opacity"
                  >
                    Write us on WhatsApp
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact-us"
                    className="hover:opacity-70 transition-opacity"
                  >
                    Contact Us
                  </Link>
                </li>
                {/* <li>
                <Link
                  to="/contact-us/faq"
                  className="hover:opacity-70 transition-opacity"
                >
                  FAQ
                </Link>
              </li> */}
              </ul>
            </div>

            {/* Services */}
            {/* <div>
            <button
              onClick={() => toggleSection('services')}
              className="md:cursor-default flex items-center justify-between w-full md:pointer-events-none"
            >
              <h3 className="text-xs font-semibold mb-4 tracking-wide">
                SERVICES
              </h3>
              <ChevronDown
                className={`w-4 h-4 md:hidden transition-transform ${openSection === 'services' ? 'rotate-180' : ''}`}
              />
            </button>
            <ul
              className={`space-y-2 text-sm ${openSection === 'services' ? 'block' : 'hidden'} md:block`}
            >
              <li>
                <Link to="/" className="hover:opacity-70 transition-opacity">
                  Online and in-store services
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:opacity-70 transition-opacity">
                  Track your order
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:opacity-70 transition-opacity">
                  Returns
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:opacity-70 transition-opacity">
                  Shipping and delivery
                </Link>
              </li>
            </ul>
          </div> */}

            {/* Company */}
            <div>
              <button
                onClick={() => toggleSection('company')}
                className="md:cursor-default flex items-center justify-between w-full md:pointer-events-none"
              >
                <h3 className="text-xs font-semibold mb-4 tracking-wide">
                  COMPANY
                </h3>
                <ChevronDown
                  className={`w-4 h-4 md:hidden transition-transform ${openSection === 'company' ? 'rotate-180' : ''}`}
                />
              </button>
              <ul
                className={`space-y-2 text-sm ${openSection === 'company' ? 'block' : 'hidden'} md:block`}
              >
                {/* <li>
                <Link to="/" className="hover:opacity-70 transition-opacity">
                  Fundacion Animo
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:opacity-70 transition-opacity">
                  Animo Group
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:opacity-70 transition-opacity">
                  Luna Rossa
                </Link>
              </li> */}
                <li>
                  <Link to="/" className="hover:opacity-70 transition-opacity">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact-us"
                    className="hover:opacity-70 transition-opacity"
                  >
                    Work with us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Terms */}
            <div>
              <button
                onClick={() => toggleSection('legal')}
                className="md:cursor-default flex items-center justify-between w-full md:pointer-events-none"
              >
                <h3 className="text-xs font-semibold mb-4 tracking-wide">
                  LEGAL TERMS AND CONDITIONS
                </h3>
                <ChevronDown
                  className={`w-4 h-4 md:hidden transition-transform ${openSection === 'legal' ? 'rotate-180' : ''}`}
                />
              </button>
              <ul
                className={`space-y-2 text-sm ${openSection === 'legal' ? 'block' : 'hidden'} md:block`}
              >
                <li>
                  <Link
                    to="/privacy-policy"
                    className="hover:opacity-70 transition-opacity"
                  >
                    Privacy Statement
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cookie-policy"
                    className="hover:opacity-70 transition-opacity"
                  >
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onOpenCookieSettings}
                    className="hover:opacity-70 transition-opacity text-left"
                  >
                    Cookie setting
                  </button>
                </li>
                <li>
                  <Link to="/" className="hover:opacity-70 transition-opacity">
                    Terms of sale
                  </Link>
                </li>
                <li>
                  <a
                    href="/sitemap.xml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-70 transition-opacity"
                  >
                    Sitemap
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* end right columns group */}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300">
        <div className="px-8 sm:px-12 lg:px-16 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="text-gray-600 font-medium">
              &copy;&#193;NIMO 2025 - {new Date().getFullYear()}
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-8">
              {/* <button className="flex items-center gap-2 hover:opacity-70 transition-opacity"> */}
              {/* MapPin icon */}
              {/* <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-xs font-semibold tracking-wide">
                  STORE LOCATOR
                </span>
              </button> */}
              <button className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                {/* Globe icon */}
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
                <span className="text-xs font-semibold tracking-wide">
                  SHIPPING TO: UNITED STATES/ENGLISH
                </span>
              </button>
            </div>
          </div>

          <div className="text-center mt-4 text-xs text-gray-600">
            <Link
              to="/"
              className="hover:opacity-70 transition-opacity underline"
            >
              California Consumer Privacy Act: Do not sell or share my personal
              information
            </Link>
            <br />
            <Link
              to="/"
              className="hover:opacity-70 transition-opacity underline"
            >
              Health Plan Cost Transparency Information
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
