import {type MappedProductOptions} from '@shopify/hydrogen';
import type {ProductFragment} from 'storefrontapi.generated';
import {ProductAddToCart} from '~/components/ProductAddToCart';
import {ProductOptions} from '~/components/ProductOptions';

/** Option pickers plus the add-to-cart button. */
export function ProductForm({
  productOptions,
  selectedVariant,
}: {
  productOptions: MappedProductOptions[];
  selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
}) {
  return (
    <div>
      <ProductOptions productOptions={productOptions} />
      <ProductAddToCart selectedVariant={selectedVariant} />
    </div>
  );
}
