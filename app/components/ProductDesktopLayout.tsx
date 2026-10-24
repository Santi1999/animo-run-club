import {useTranslation} from 'react-i18next';
import {ProductAccordion} from '~/components/ProductAccordion';
import {ProductBreadcrumb} from '~/components/ProductBreadcrumb';
import {ProductDescription} from '~/components/ProductDescription';
import {ProductForm} from '~/components/ProductForm';
import {ProductGalleryStack} from '~/components/ProductGallery';
import {ProductLinks} from '~/components/ProductLinks';
import {ProductPrice} from '~/components/ProductPrice';
import {ProductRecommendations} from '~/components/ProductRecommendations';
import type {ProductLayoutProps} from '~/lib/product';

const SIDEBAR = 'self-start border-black/10 px-8 pt-10 pb-16';
// The purchase panel stays in view; the info column scrolls with the page
const STICKY =
  'sticky top-[var(--header-height)] h-[calc(100vh-var(--header-height))] overflow-y-auto scrollbar-hide';

/**
 * `lg` and up: info column | stacked images | sticky purchase panel.
 * The side columns are divs on purpose: the global `aside` rule in app.css
 * styles the cart/search drawers.
 */
export function ProductDesktopLayout({
  product,
  selectedVariant,
  productOptions,
  images,
  accordionItems,
  recommendations,
}: ProductLayoutProps) {
  const {t} = useTranslation();
  const collection = product.collections.nodes[0];

  return (
    <div className="hidden lg:block">
      <div className="px-10 py-3 border-b border-black/10">
        <ProductBreadcrumb
          title={product.title}
          collection={collection}
          className="gap-2 text-[11px] tracking-widest"
        />
      </div>

      <div className="grid grid-cols-[300px_1fr_320px]">
        <div className={`${SIDEBAR} border-r`}>
          <div className="text-[10px] tracking-[0.2em] uppercase text-black/40 mb-3">
            {t('product.brand')}
          </div>
          <h1 className="text-2xl! font-semibold leading-tight! m-0! mb-1!">
            {product.title}
          </h1>
          {collection && (
            <div className="text-sm text-black/50 tracking-widest uppercase mb-6">
              {collection.title}
            </div>
          )}
          <ProductDescription html={product.descriptionHtml} className="mb-10" />
          <ProductAccordion items={accordionItems} alwaysOpen />
        </div>

        <ProductGalleryStack images={images} />

        <div className={`${SIDEBAR} ${STICKY} border-l`}>
          <div className="mb-8">
            <ProductPrice
              className="text-2xl font-semibold tracking-tight"
              price={selectedVariant.price}
              compareAtPrice={selectedVariant.compareAtPrice}
            />
            <div className="text-xs text-black/40 mt-1">
              {t('product.tax_note')}
            </div>
          </div>

          <ProductForm
            productOptions={productOptions}
            selectedVariant={selectedVariant}
          />

          <ProductLinks className="pt-6 mt-8" />

          {selectedVariant.sku && (
            <div className="mt-8 text-[10px] text-black/25 tracking-widest uppercase">
              {t('product.ref', {sku: selectedVariant.sku})}
            </div>
          )}
        </div>
      </div>

      <ProductRecommendations
        recommendations={recommendations}
        layout="desktop"
      />
    </div>
  );
}
