import {useRef, useState} from 'react';
import type {ProductVariantFragment} from 'storefrontapi.generated';
import {ProductImage} from '~/components/ProductImage';

type GalleryImage = NonNullable<ProductVariantFragment['image']>;

/** Desktop: all product images stacked vertically. */
export function ProductGalleryStack({images}: {images: GalleryImage[]}) {
  return (
    <div>
      {images.map((image, i) => (
        <ProductImage
          key={image.id}
          image={image}
          loading={i === 0 ? 'eager' : 'lazy'}
        />
      ))}
    </div>
  );
}

/**
 * Mobile: full-bleed vertical snap gallery with dot indicators.
 * `bottomInset` keeps the indicators clear of an overlapping bottom sheet.
 */
export function ProductGalleryCarousel({
  images,
  bottomInset = '0px',
}: {
  images: GalleryImage[];
  bottomInset?: string;
}) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const onScroll = () => {
    const el = galleryRef.current;
    if (el) setActiveIndex(Math.round(el.scrollTop / el.offsetHeight));
  };

  return (
    <>
      <div
        ref={galleryRef}
        onScroll={onScroll}
        className="absolute inset-0 flex flex-col overflow-y-auto snap-y snap-mandatory scrollbar-hide"
      >
        {images.map((image, i) => (
          <div
            key={image.id}
            className="flex-shrink-0 w-full h-full snap-start bg-neutral-100"
          >
            <ProductImage
              image={image}
              loading={i === 0 ? 'eager' : 'lazy'}
              sizes="100vw"
              className="h-full aspect-auto"
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <div
          className="absolute left-3 top-0 flex flex-col justify-center items-center gap-2 z-10 pointer-events-none"
          style={{bottom: bottomInset}}
        >
          {images.map((image, i) => (
            <div
              key={image.id}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'w-[3px] h-5 bg-white'
                  : 'w-[3px] h-[3px] bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </>
  );
}
