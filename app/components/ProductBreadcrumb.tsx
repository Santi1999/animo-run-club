import {Link} from 'react-router';
import {useTranslation} from 'react-i18next';
import {useLocalePrefix} from '~/lib/i18n';

export function ProductBreadcrumb({
  title,
  collection,
  className = '',
}: {
  title: string;
  collection?: {title: string; handle: string} | null;
  className?: string;
}) {
  const {t} = useTranslation();
  const localePrefix = useLocalePrefix();

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center uppercase text-black/40 ${className}`}
    >
      <Link
        to={`${localePrefix}/`}
        className="hover:text-black transition-colors"
      >
        {t('product.breadcrumb_home')}
      </Link>
      <span>/</span>
      {collection ? (
        <Link
          to={`${localePrefix}/collections/${collection.handle}`}
          className="hover:text-black transition-colors"
        >
          {collection.title}
        </Link>
      ) : (
        <Link
          to={`${localePrefix}/collections`}
          className="hover:text-black transition-colors"
        >
          {t('product.breadcrumb_collections')}
        </Link>
      )}
      <span>/</span>
      <span className="text-black truncate">{title}</span>
    </nav>
  );
}
