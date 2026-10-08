import {Suspense, useRef} from 'react';
import {Await, Link} from 'react-router';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {Image, Money} from '@shopify/hydrogen';
import {useTranslation} from 'react-i18next';
import type {RelatedProductFragment} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';

type Layout = 'desktop' | 'mobile';

const CARD_STYLES: Record<
  Layout,
  {card: string; image: string; tag: string; name: string; price: string}
> = {
  desktop: {
    card: 'flex-shrink-0 group w-[calc((100%_-_36px)/3.5)]',
    image: 'mb-3',
    tag: 'text-[10px] mb-1 px-3',
    name: 'text-sm mb-1 px-3',
    price: 'text-sm px-3',
  },
  mobile: {
    card: 'flex-shrink-0 w-40 group',
    image: 'mb-2',
    tag: 'text-[9px] mb-0.5 px-1',
    name: 'text-xs mb-0.5 px-1',
    price: 'text-xs px-1',
  },
};

function RelatedProductCard({
  product,
  layout,
}: {
  product: RelatedProductFragment;
  layout: Layout;
}) {
  const styles = CARD_STYLES[layout];
  const variantUrl = useVariantUrl(product.handle);

  return (
    <Link to={variantUrl} prefetch="intent" className={styles.card}>
      <div
        className={`w-full aspect-[3/4] bg-neutral-100 overflow-hidden ${styles.image}`}
      >
        {product.featuredImage && (
          <Image
            alt={product.featuredImage.altText || product.title}
            className="w-full h-full object-cover rounded-none! group-hover:scale-105 transition-transform duration-500"
            data={product.featuredImage}
            sizes="(min-width: 64em) 28vw, 160px"
          />
        )}
      </div>
      {product.productType && (
        <div
          className={`tracking-widest uppercase text-black/40 ${styles.tag}`}
        >
          {product.productType}
        </div>
      )}
      <div className={`font-medium leading-snug ${styles.name}`}>
        {product.title}
      </div>
      <div className={`text-black/60 ${styles.price}`}>
        <Money data={product.priceRange.minVariantPrice} />
      </div>
    </Link>
  );
}

function Carousel({
  products,
  layout,
}: {
  products: RelatedProductFragment[];
  layout: Layout;
}) {
  const {t} = useTranslation();
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: -1 | 1) => {
    const el = trackRef.current;
    if (el) {
      el.scrollBy({
        left: direction * (el.offsetWidth / 3.5 + 12),
        behavior: 'smooth',
      });
    }
  };

  const arrow = (direction: -1 | 1) => (
    <button
      type="button"
      onClick={() => scrollByCard(direction)}
      className={`absolute ${direction === -1 ? 'left-2' : 'right-2'} top-0 z-10 flex items-center justify-center bottom-[64px] group`}
      aria-label={t(
        direction === -1 ? 'product.scroll_left' : 'product.scroll_right',
      )}
    >
      <span className="w-8 h-8 border border-black/25 bg-white flex items-center justify-center group-hover:bg-black group-hover:text-white group-hover:border-black transition-all">
        {direction === -1 ? (
          <ChevronLeft className="w-3.5 h-3.5" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5" />
        )}
      </span>
    </button>
  );

  return (
    <div className="relative">
      {layout === 'desktop' && arrow(-1)}
      {layout === 'desktop' && arrow(1)}
      <div
        ref={trackRef}
        className={`flex overflow-x-auto scrollbar-hide ${
          layout === 'desktop' ? 'gap-3' : 'gap-3 pl-5 pb-2'
        }`}
      >
        {products.map((product) => (
          <RelatedProductCard
            key={product.id}
            product={product}
            layout={layout}
          />
        ))}
      </div>
    </div>
  );
}

/** "You may also like" carousel, streamed in from the deferred loader data. */
export function ProductRecommendations({
  recommendations,
  layout,
}: {
  recommendations: Promise<{
    productRecommendations?: RelatedProductFragment[] | null;
  } | null>;
  layout: Layout;
}) {
  const {t} = useTranslation();

  return (
    <Suspense fallback={null}>
      <Await resolve={recommendations}>
        {(response) => {
          const products = response?.productRecommendations;
          if (!products?.length) return null;

          return (
            <section
              className={
                layout === 'desktop'
                  ? 'border-t border-black/10 py-14'
                  : 'border-t border-black/10 pt-10 -mx-5'
              }
            >
              <h2
                className={`text-xs! tracking-[0.25em] uppercase font-semibold m-0! ${
                  layout === 'desktop' ? 'px-10 mb-8!' : 'px-5 mb-6!'
                }`}
              >
                {t('product.you_may_also_like')}
              </h2>
              <Carousel products={products} layout={layout} />
            </section>
          );
        }}
      </Await>
    </Suspense>
  );
}
