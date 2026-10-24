import {useEffect, useRef, useState} from 'react';
import type {ProductVariantFragment} from 'storefrontapi.generated';
import {ProductImage} from '~/components/ProductImage';

type GalleryImage = NonNullable<ProductVariantFragment['image']>;

/**
 * Desktop: all product images stacked vertically at their own aspect ratio,
 * so tall full-body shots aren't cropped. Each image is capped so its height
 * fits the viewport below the header, the breadcrumb (3rem) and the column's
 * vertical padding (5rem), otherwise wide screens push it below the fold.
 */
export function ProductGalleryStack({images}: {images: GalleryImage[]}) {
  return (
    <div className="flex flex-col gap-10 py-10">
      {images.map((image, i) => {
        const ratio =
          image.width && image.height ? image.width / image.height : 3 / 4;
        return (
          <ProductImage
            key={image.id}
            image={image}
            loading={i === 0 ? 'eager' : 'lazy'}
            className="mx-auto"
            style={{
              aspectRatio: ratio,
              maxWidth: `calc((100vh - var(--header-height) - 8rem) * ${ratio})`,
            }}
          />
        );
      })}
    </div>
  );
}

/**
 * Mobile: full-height vertical snap gallery with dot indicators.
 * `bottomInset` is the height of the bottom sheet overlapping the gallery:
 * each image is fitted, uncropped, into the space above it, and the
 * indicators are centred in that space too.
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

  // The page around the gallery never moves, so a swipe past the first or
  // last image is cancelled rather than handed on to the page, which iOS
  // would rubber-band (overscroll-behavior alone doesn't stop it there).
  useEffect(() => {
    const el = galleryRef.current;
    if (!el) return;
    let startY = 0;
    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      // Leave pinch-zoom alone, and native scrolling once it has started
      if (e.touches.length !== 1 || !e.cancelable) return;
      const dy = e.touches[0].clientY - startY;
      const atTop = el.scrollTop <= 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
      if ((dy > 0 && atTop) || (dy < 0 && atBottom)) e.preventDefault();
    };
    el.addEventListener('touchstart', onTouchStart, {passive: true});
    el.addEventListener('touchmove', onTouchMove, {passive: false});
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  return (
    <>
      <div
        ref={galleryRef}
        onScroll={onScroll}
        className="absolute inset-0 flex flex-col overflow-y-auto overscroll-y-contain snap-y snap-mandatory scrollbar-hide"
      >
        {images.map((image, i) => (
          <div
            key={image.id}
            className="flex-shrink-0 w-full h-full snap-start bg-white pt-2"
            style={{paddingBottom: `calc(${bottomInset} + 0.5rem)`}}
          >
            <ProductImage
              image={image}
              loading={i === 0 ? 'eager' : 'lazy'}
              sizes="100vw"
              className="h-full aspect-auto"
              fit="contain"
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
