import type {CSSProperties} from 'react';
import type {ProductVariantFragment} from 'storefrontapi.generated';
import {Image} from '@shopify/hydrogen';

export function ProductImage({
  image,
  loading,
  sizes = '(min-width: 64em) 50vw, 100vw',
  className = '',
  style,
  fit = 'cover',
}: {
  image: ProductVariantFragment['image'];
  loading?: 'eager' | 'lazy';
  sizes?: string;
  className?: string;
  style?: CSSProperties;
  /** `contain` shows the whole image, letterboxed on the parent's background. */
  fit?: 'cover' | 'contain';
}) {
  return (
    <div
      className={`w-full aspect-[3/4] ${fit === 'cover' ? 'bg-neutral-100' : ''} ${className}`}
      style={style}
    >
      {image && (
        <Image
          alt={image.altText || 'Product Image'}
          className={`w-full h-full ${fit === 'cover' ? 'object-cover' : 'object-contain'} rounded-none!`}
          data={image}
          key={image.id}
          loading={loading}
          sizes={sizes}
        />
      )}
    </div>
  );
}
