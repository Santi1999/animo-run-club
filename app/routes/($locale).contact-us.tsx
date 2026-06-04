import {NavLink, Outlet} from 'react-router';
import {useLocalePrefix} from '~/lib/i18n';

export default function ContactUsLayout() {
  return (
    <div>
      <ContactSubNav />
      <Outlet />
    </div>
  );
}

function ContactSubNav() {
  const localePrefix = useLocalePrefix();
  const linkClass = ({isActive}: {isActive: boolean}) =>
    [
      'text-sm tracking-wide pb-3 border-b-2 transition-colors duration-150',
      isActive
        ? 'font-semibold border-black text-black'
        : 'font-normal border-transparent text-gray-500 hover:text-black',
    ].join(' ');

  return (
    <div className="border-b border-gray-200 bg-white">
      <nav className="px-8 sm:px-12 lg:px-16 flex gap-8 pt-4">
        <NavLink to={`${localePrefix}/contact-us`} end className={linkClass}>
          Contact Us
        </NavLink>
        <NavLink to={`${localePrefix}/contact-us/returns`} className={linkClass}>
          Returns
        </NavLink>
        <NavLink to={`${localePrefix}/contact-us/faq`} className={linkClass}>
          FAQ
        </NavLink>
      </nav>
    </div>
  );
}