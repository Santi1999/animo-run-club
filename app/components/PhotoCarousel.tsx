import {useEffect, useRef, useState} from 'react';
import {ChevronLeft, ChevronRight} from 'lucide-react';

/**
 * Horizontal, scroll-snapped photo strip with previous/next buttons for mouse
 * users. The strip itself is a focusable region (arrow keys scroll it), so the
 * buttons stay out of the tab order: they hide at the ends, which would
 * otherwise drop keyboard focus.
 */
export function PhotoCarousel({
  labelledBy,
  children,
}: {
  labelledBy: string;
  children: React.ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  // Hidden until measured on the client, so server and client markup match
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const update = () => {
      setCanPrev(track.scrollLeft > 1);
      setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 1);
    };

    update();
    track.addEventListener('scroll', update, {passive: true});
    const observer = new ResizeObserver(update);
    observer.observe(track);
    return () => {
      track.removeEventListener('scroll', update);
      observer.disconnect();
    };
  }, []);

  // One photo (its width + the gap) per click, which lands on a snap point
  const scrollByPhoto = (direction: -1 | 1) => {
    const track = trackRef.current;
    const photo = track?.firstElementChild as HTMLElement | null;
    if (!track || !photo) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    track.scrollBy({
      left: direction * (photo.offsetWidth + gap),
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  const arrow = (direction: -1 | 1) => {
    const Icon = direction === -1 ? ChevronLeft : ChevronRight;
    return (
      <button
        type="button"
        className={`photo-carousel-button photo-carousel-button--${
          direction === -1 ? 'prev' : 'next'
        }`}
        data-visible={direction === -1 ? canPrev : canNext}
        onClick={() => scrollByPhoto(direction)}
        aria-label={direction === -1 ? 'Previous photos' : 'Next photos'}
        aria-hidden="true"
        tabIndex={-1}
      >
        <Icon className="w-5 h-5" aria-hidden="true" />
      </button>
    );
  };

  return (
    <div className="photo-carousel">
      <div
        ref={trackRef}
        className="collection-preview-track"
        role="region"
        aria-labelledby={labelledBy}
        tabIndex={0}
      >
        {children}
      </div>
      {arrow(-1)}
      {arrow(1)}
    </div>
  );
}
