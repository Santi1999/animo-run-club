import {useCallback, useEffect, useRef, useState} from 'react';

/** How much of the sheet stays visible while collapsed. */
export const SHEET_PEEK_HEIGHT = '28vh';

/** Snap animation: gentle ease-out so the sheet settles instead of snapping. */
export const SHEET_TRANSITION_MS = 600;
export const SHEET_EASING = 'cubic-bezier(0.25,0.8,0.25,1)';

/** Minimum drag distance (px) that counts as a swipe. */
const DRAG_THRESHOLD = 60;

/** Release speed (px/ms) that counts as a flick regardless of distance. */
const FLICK_VELOCITY = 0.5;

function sheetTransform(expanded: boolean) {
  return expanded ? 'translateY(0)' : `translateY(calc(100% - ${SHEET_PEEK_HEIGHT}))`;
}

/**
 * Drag-to-expand behaviour for a bottom sheet. Supports touch and mouse.
 * Attach `handleRef` to the sheet's header zone (the drag handle) and
 * `sheetRef` to the scrolling sheet element.
 *
 * Touch listeners are attached natively (non-passive) so a drag we handle can
 * cancel the browser's own scrolling, while any other gesture on the header
 * (e.g. scrolling the expanded sheet) is left to the browser.
 */
export function useBottomSheet() {
  const sheetRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const expandedRef = useRef(false);
  const [expanded, setExpandedState] = useState(false);

  const drag = useRef({
    active: false,
    startY: 0,
    startOffset: 0,
    offset: 0,
    lastY: 0,
    lastT: 0,
    velocity: 0,
    raf: 0,
  });

  const setExpanded = useCallback((value: boolean) => {
    expandedRef.current = value;
    setExpandedState(value);
  }, []);

  const applyOffset = useCallback((offset: number) => {
    const d = drag.current;
    d.offset = offset;
    if (d.raf) return;
    d.raf = requestAnimationFrame(() => {
      d.raf = 0;
      if (sheetRef.current) {
        sheetRef.current.style.transform = `translate3d(0, ${d.offset}px, 0)`;
      }
    });
  }, []);

  const beginDrag = useCallback((y: number) => {
    const sheet = sheetRef.current;
    const d = drag.current;
    if (!sheet) return;
    const parentTop = sheet.offsetParent?.getBoundingClientRect().top ?? 0;
    d.startOffset = sheet.getBoundingClientRect().top - parentTop;
    d.offset = d.startOffset;
    d.startY = y;
    d.lastY = y;
    d.lastT = performance.now();
    d.velocity = 0;
    d.active = true;
    sheet.style.transition = 'none';
  }, []);

  /** Returns true when the move was consumed as a sheet drag. */
  const moveDrag = useCallback(
    (y: number) => {
      const sheet = sheetRef.current;
      const d = drag.current;
      if (!d.active || !sheet) return false;

      const now = performance.now();
      const dt = now - d.lastT;
      if (dt > 0) {
        // Low-pass filter so a single jittery sample doesn't decide a flick.
        d.velocity = 0.8 * ((y - d.lastY) / dt) + 0.2 * d.velocity;
      }
      d.lastY = y;
      d.lastT = now;

      if (expandedRef.current && sheet.scrollTop > 0) {
        // Content is scrolling natively; restart the drag from here so the
        // sheet doesn't jump if the user reaches the top mid-gesture.
        d.startY = y;
        d.startOffset = 0;
        return false;
      }

      const delta = y - d.startY;
      if (expandedRef.current && delta <= 0) {
        applyOffset(0);
        return false;
      }
      applyOffset(Math.min(Math.max(0, d.startOffset + delta), sheet.offsetHeight));
      return true;
    },
    [applyOffset],
  );

  const endDrag = useCallback(() => {
    const d = drag.current;
    if (!d.active) return;
    d.active = false;
    if (d.raf) {
      cancelAnimationFrame(d.raf);
      d.raf = 0;
    }
    const sheet = sheetRef.current;
    const moved = d.offset - d.startOffset;

    let next = expandedRef.current;
    if (next) {
      if (moved > DRAG_THRESHOLD || d.velocity > FLICK_VELOCITY) next = false;
    } else if (-moved > DRAG_THRESHOLD || d.velocity < -FLICK_VELOCITY) {
      next = true;
    }

    if (sheet) {
      // Start the snap from the exact current position, then hand control back
      // to the CSS transition.
      sheet.style.transform = `translate3d(0, ${d.offset}px, 0)`;
      void sheet.offsetHeight;
      sheet.style.transition = '';
      sheet.style.transform = sheetTransform(next);
    }
    setExpanded(next);
  }, [setExpanded]);

  useEffect(() => {
    const handle = handleRef.current;
    if (!handle) return;

    const onTouchStart = (e: TouchEvent) => beginDrag(e.touches[0].clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (moveDrag(e.touches[0].clientY) && e.cancelable) e.preventDefault();
    };
    const onTouchEnd = () => endDrag();

    handle.addEventListener('touchstart', onTouchStart, {passive: true});
    handle.addEventListener('touchmove', onTouchMove, {passive: false});
    handle.addEventListener('touchend', onTouchEnd);
    handle.addEventListener('touchcancel', onTouchEnd);
    return () => {
      handle.removeEventListener('touchstart', onTouchStart);
      handle.removeEventListener('touchmove', onTouchMove);
      handle.removeEventListener('touchend', onTouchEnd);
      handle.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [beginDrag, moveDrag, endDrag]);

  const mouseHandlers = {
    // Move/up are tracked on the document so the drag survives leaving the element
    onMouseDown: (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest('button, a, input, select')) return;
      e.preventDefault();
      beginDrag(e.clientY);
      document.body.style.userSelect = 'none';

      const handleMouseMove = (ev: MouseEvent) => moveDrag(ev.clientY);
      const handleMouseUp = () => {
        endDrag();
        document.body.style.userSelect = '';
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
  };

  return {
    sheetRef,
    handleRef,
    expanded,
    mouseHandlers,
    sheetTransform: sheetTransform(expanded),
  };
}
