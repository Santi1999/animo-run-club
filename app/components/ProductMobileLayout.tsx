import {ProductAccordion} from '~/components/ProductAccordion';
import {ProductAddToCart} from '~/components/ProductAddToCart';
import {ProductBottomSheet} from '~/components/ProductBottomSheet';
import {ProductBreadcrumb} from '~/components/ProductBreadcrumb';
import {ProductDescription} from '~/components/ProductDescription';
import {ProductGalleryCarousel} from '~/components/ProductGallery';
import {ProductLinks} from '~/components/ProductLinks';
import {ProductOptions} from '~/components/ProductOptions';
import {ProductPrice} from '~/components/ProductPrice';
import {ProductRecommendations} from '~/components/ProductRecommendations';
import type {ProductLayoutProps} from '~/lib/product';
import {
  SHEET_EASING,
  SHEET_PEEK_HEIGHT,
  SHEET_TRANSITION_MS,
} from '~/lib/useBottomSheet';

/** Below `lg`: full-bleed gallery with a swipe-up bottom sheet for details. */
export function ProductMobileLayout({
  product,
  selectedVariant,
  productOptions,
  images,
  accordionItems,
  recommendations,
}: ProductLayoutProps) {
  const collection = product.collections.nodes[0];

  return (
    <div
      className="lg:hidden flex flex-col"
      style={{height: 'calc(100dvh - var(--header-height))'}}
    >
      <ProductBreadcrumb
        title={product.title}
        collection={collection}
        className="flex-shrink-0 gap-1.5 px-4 py-1.5 border-b border-black/10 text-[8px] tracking-widest"
      />

      <div className="flex-1 relative overflow-hidden">
        <ProductGalleryCarousel images={images} bottomInset={SHEET_PEEK_HEIGHT} />

        <ProductBottomSheet
          header={(expanded) => (
            <>
              {collection && (
                <div className="text-[9px] tracking-[0.2em] uppercase text-black/40 mb-1.5">
                  {collection.title}
                </div>
              )}
              <h1 className="text-xl! font-semibold leading-tight! m-0! mb-1!">
                {product.title}
              </h1>
              <ProductPrice
                className="text-2xl font-semibold mb-5"
                price={selectedVariant.price}
                compareAtPrice={selectedVariant.compareAtPrice}
              />
              {/* Animated open so the header doesn't jump in height mid-snap */}
              <div
                className="grid"
                style={{
                  gridTemplateRows: expanded ? '1fr' : '0fr',
                  opacity: expanded ? 1 : 0,
                  transition: `grid-template-rows ${SHEET_TRANSITION_MS}ms ${SHEET_EASING}, opacity ${SHEET_TRANSITION_MS}ms ${SHEET_EASING}`,
                }}
              >
                <div className="overflow-hidden">
                  <ProductOptions productOptions={productOptions} />
                </div>
              </div>
              <ProductAddToCart selectedVariant={selectedVariant} />
            </>
          )}
        >
          <ProductDescription html={product.descriptionHtml} className="mb-8" />
          <ProductAccordion items={accordionItems} />
          <ProductLinks className="pt-5 mt-5 mb-10" />
          <ProductRecommendations
            recommendations={recommendations}
            layout="mobile"
          />
        </ProductBottomSheet>
      </div>
    </div>
  );
}
