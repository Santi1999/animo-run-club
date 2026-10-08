import type {ProductVariantFragment} from 'storefrontapi.generated';
import {Image} from '@shopify/hydrogen';

export function ProductImage({
  image,
  loading,
  sizes = '(min-width: 64em) 50vw, 100vw',
  className = '',
}: {
  image: ProductVariantFragment['image'];
  loading?: 'eager' | 'lazy';
  sizes?: string;
  className?: string;
}) {
  return (
    <div className={`w-full aspect-[3/4] bg-neutral-100 ${className}`}>
      {image && (
        <Image
          alt={image.altText || 'Product Image'}
          className="w-full h-full object-cover rounded-none!"
          data={image}
          key={image.id}
          loading={loading}
          sizes={sizes}
        />
      )}
    </div>
  );
}
