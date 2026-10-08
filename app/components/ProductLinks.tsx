import {Link} from 'react-router';
import {useTranslation} from 'react-i18next';
import {useLocalePrefix} from '~/lib/i18n';

/** Secondary links shown under the purchase actions. */
export function ProductLinks({className = ''}: {className?: string}) {
  const {t} = useTranslation();
  const localePrefix = useLocalePrefix();

  return (
    <div className={`space-y-3 border-t border-black/10 ${className}`}>
      <Link
        to={`${localePrefix}/contact-us/returns`}
        className="flex items-center justify-between text-[11px] tracking-widest uppercase text-black/50 hover:text-black transition-colors group"
      >
        <span>{t('product.shipping_returns')}</span>
        <span className="group-hover:translate-x-0.5 transition-transform">
          →
        </span>
      </Link>
    </div>
  );
}
