import {MapPin, Globe, ChevronDown} from 'lucide-react';
import {useState} from 'react';
import {Link} from 'react-router';

export function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="bg-[#f8f8f8] border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Newsletter Section */}
          <div className="lg:col-span-1">
            <h3 className="text-xs font-semibold mb-4 tracking-wide">
              SUBSCRIBE TO OUR NEWSLETTER
            </h3>
            <form className="mb-6">
              <div className="flex items-center border-b border-black pb-1">
                <input
                  type="email"
                  placeholder="Insert your email address *"
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-500"
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
            <p className="text-xs text-gray-600 mb-6">
              By clicking on &quot;Subscribe&quot;, you confirm that you have
              read and understood our{' '}
              <Link to="/" className="underline">
                Privacy Statement
              </Link>{' '}
              and that you want to receive the newsletter and other marketing
              communication as set out therein.
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center gap-4">
              {/* <Link
                to="/"
                aria-label="Facebook"
                className="hover:opacity-70 transition-opacity"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                to="/"
                aria-label="Twitter"
                className="hover:opacity-70 transition-opacity"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                to="/"
                aria-label="Instagram"
                className="hover:opacity-70 transition-opacity"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                to="/"
                aria-label="YouTube"
                className="hover:opacity-70 transition-opacity"
              >
                <Youtube className="w-5 h-5" />
              </Link>
              <Link
                to="/"
                aria-label="Spotify"
                className="hover:opacity-70 transition-opacity"
              >
                <Music2 className="w-5 h-5" />
              </Link>
              <Link
                to="/"
                aria-label="Discord"
                className="hover:opacity-70 transition-opacity"
              >
                <Disc className="w-5 h-5" />
              </Link> */}
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

          {/* Do You Need Help */}
          <div>
            <button
              onClick={() => toggleSection('help')}
              className="md:cursor-default flex items-center justify-between w-full md:pointer-events-none"
            >
              <h3 className="text-xs font-semibold mb-4 tracking-wide">
                DO YOU NEED HELP?
              </h3>
              <ChevronDown
                className={`w-4 h-4 md:hidden transition-transform ${openSection === 'help' ? 'rotate-180' : ''}`}
              />
            </button>
            <ul
              className={`space-y-2 text-sm ${openSection === 'help' ? 'block' : 'hidden'} md:block`}
            >
              <li>
                <Link to="/" className="hover:opacity-70 transition-opacity">
                  Call us 1.877.997.7232
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:opacity-70 transition-opacity">
                  Write us on WhatsApp
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:opacity-70 transition-opacity">
                  Contacts
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:opacity-70 transition-opacity">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:opacity-70 transition-opacity">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Exclusive Services */}
          <div>
            <button
              onClick={() => toggleSection('services')}
              className="md:cursor-default flex items-center justify-between w-full md:pointer-events-none"
            >
              <h3 className="text-xs font-semibold mb-4 tracking-wide">
                EXCLUSIVE SERVICES
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
                  Animo Services
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
            </ul>
          </div>

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
              <li>
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
                  Sustainability
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:opacity-70 transition-opacity">
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
                <Link to="/" className="hover:opacity-70 transition-opacity">
                  Legal Notice
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:opacity-70 transition-opacity">
                  Privacy Statement
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:opacity-70 transition-opacity">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:opacity-70 transition-opacity">
                  Cookie setting
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:opacity-70 transition-opacity">
                  Terms of sale
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
              <button className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                <MapPin className="w-4 h-4" />
                <span className="text-xs">STORE LOCATOR</span>
              </button>

              <button className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                <Globe className="w-4 h-4" />
                <span className="text-xs">
                  SHIPPING TO: UNITED STATES/ENGLISH
                </span>
              </button>
            </div>
            <div className="text-gray-600">
              &copy; ANIMO {new Date().getFullYear()} |
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
