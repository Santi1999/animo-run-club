import {useTranslation} from 'react-i18next';
import type {ProductFragment} from 'storefrontapi.generated';
import {AddToCartButton} from '~/components/AddToCartButton';
import {useAside} from '~/components/Aside';

export function ProductAddToCart({
  selectedVariant,
  className = '',
}: {
  selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
  className?: string;
}) {
  const {t} = useTranslation();
  const {open} = useAside();

  return (
    <AddToCartButton
      className={`w-full py-4 bg-black text-white text-xs tracking-[0.2em] uppercase font-medium hover:bg-black/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
      disabled={!selectedVariant || !selectedVariant.availableForSale}
      onClick={() => {
        open('cart');
      }}
      lines={
        selectedVariant
          ? [
              {
                merchandiseId: selectedVariant.id,
                quantity: 1,
                selectedVariant,
              },
            ]
          : []
      }
    >
      {selectedVariant?.availableForSale
        ? t('product.add_to_bag')
        : t('product.sold_out')}
    </AddToCartButton>
  );
}
