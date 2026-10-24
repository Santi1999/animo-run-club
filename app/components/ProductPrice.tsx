import {Money} from '@shopify/hydrogen';
import type {MoneyV2} from '@shopify/hydrogen/storefront-api-types';

export function ProductPrice({
  price,
  compareAtPrice,
  className = '',
}: {
  price?: MoneyV2;
  compareAtPrice?: MoneyV2 | null;
  className?: string;
}) {
  return (
    <div aria-label="Price" className={className} role="group">
      {compareAtPrice ? (
        <div className="flex items-baseline gap-2">
          {price ? <Money data={price} /> : null}
          <s className="text-black/40 text-[0.7em]">
            <Money data={compareAtPrice} />
          </s>
        </div>
      ) : price ? (
        <Money data={price} />
      ) : (
        <span>&nbsp;</span>
      )}
    </div>
  );
}
