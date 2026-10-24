import {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';

/**
 * How much of the sheet stays visible while collapsed: exactly its header
 * (the drag handle), so the header's last element (the add-to-bag button)
 * sits flush with the bottom and nothing below it can peek out. The hook
 * measures the header and writes it to `--sheet-peek` on the sheet's
 * container, where the gallery reads it too; the fallback (the usual header
 * height) only covers the first paint.
 */
export const SHEET_PEEK = 'var(--sheet-peek, 12.25rem)';

/**
 * Snap animation: a fast start that carries the finger's momentum, then a long
 * deceleration so the sheet glides into place (the iOS sheet curve).
 */
export const SHEET_TRANSITION_MS = 500;
export const SHEET_EASING = 'cubic-bezier(0.32,0.72,0,1)';
export const SHEET_TRANSITION = `transform ${SHEET_TRANSITION_MS}ms ${SHEET_EASING}, border-radius ${SHEET_TRANSITION_MS}ms ${SHEET_EASING}`;

/** Minimum drag distance (px) that counts as a swipe. */
const DRAG_THRESHOLD = 60;

/** Release speed (px/ms) that counts as a flick regardless of distance. */
const FLICK_VELOCITY = 0.4;

/** A finger that rests this long (ms) before lifting isn't flicking. */
const FLICK_STALE_MS = 100;

/** Diminishing pull past the collapsed position, so the sheet gives instead of stopping dead. */
function rubberband(overshoot: number) {
  return 80 * (1 - 1 / (overshoot / 160 + 1));
}

function sheetTransform(expanded: boolean) {
  return expanded ? 'translateY(0)' : `translateY(calc(100% - ${SHEET_PEEK}))`;
}

// Measure before paint on the client; plain effect on the server (no warning)
const useIsomorphicLayoutEffect =
  typeof document === 'undefined' ? useEffect : useLayoutEffect;

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
  // Whether the sheet's body is laid out. It stays mounted but is hidden while
  // collapsed: clipped overflow inside the transformed sheet otherwise gets its
  // own scroll layer on iOS, which can swallow swipes meant for the gallery.
  const [contentShown, setContentShown] = useState(false);

  const drag = useRef({
    active: false,
    // 'pending': expanded sheet, waiting for the first move to pick a direction
    mode: 'sheet' as 'pending' | 'sheet' | 'scroll',
    startY: 0,
    startOffset: 0,
    offset: 0,
    lastY: 0,
    lastT: 0,
    velocity: 0,
    raf: 0,
    // Pending "hide the body once collapsed" timer
    hideTimer: 0 as ReturnType<typeof setTimeout> | 0,
    // Last measured collapsed header height (px); 0 until first measured
    peek: 0,
  });

  const setExpanded = useCallback((value: boolean) => {
    expandedRef.current = value;
    setExpandedState(value);
  }, []);

  /**
   * Sync `--sheet-peek` with the header's height. Only while collapsed and at
   * rest: expanded, the header also shows the options, and mid-gesture or
   * mid-snap it may still be resizing.
   */
  const syncPeek = useCallback(() => {
    const sheet = sheetRef.current;
    const handle = handleRef.current;
    const container = sheet?.parentElement;
    const d = drag.current;
    if (!sheet || !handle || !container) return;
    if (expandedRef.current || d.active || d.hideTimer) return;
    const peek = handle.offsetHeight;
    if (peek === d.peek) return;
    const firstMeasure = d.peek === 0;
    d.peek = peek;
    // Jump straight to the first measurement rather than gliding from the
    // fallback; later changes (fonts loading, rotation) glide as usual.
    if (firstMeasure) sheet.style.transition = 'none';
    container.style.setProperty('--sheet-peek', `${peek}px`);
    if (firstMeasure) {
      void sheet.offsetHeight;
      sheet.style.transition = SHEET_TRANSITION;
    }
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
    d.mode = expandedRef.current ? 'pending' : 'sheet';
    sheet.style.transition = 'none';
    // Lay the body out now, before any snap animation starts, and cancel a
    // hide still pending from the last collapse: grabbing the sheet again
    // within that window would otherwise blank the body mid-gesture.
    clearTimeout(d.hideTimer);
    d.hideTimer = 0;
    setContentShown(true);
  }, []);

  /** Returns true when the move was consumed as a sheet drag. */
  const moveDrag = useCallback(
    (y: number) => {
      const sheet = sheetRef.current;
      const d = drag.current;
      if (!d.active || !sheet || d.mode === 'scroll') return false;

      const delta = y - d.startY;
      if (d.mode === 'pending') {
        // Expanded: pulling the header down closes the sheet no matter how far
        // the details are scrolled; pushing it up scrolls them natively. This
        // must be decided on the first move, while the browser can still be
        // stopped from starting its own scroll.
        if (delta === 0) return false;
        d.mode = delta > 0 ? 'sheet' : 'scroll';
        if (d.mode === 'scroll') return false;
      }

      const now = performance.now();
      const dt = now - d.lastT;
      if (dt > 0) {
        // Low-pass filter so a single jittery sample doesn't decide a flick.
        d.velocity = 0.8 * ((y - d.lastY) / dt) + 0.2 * d.velocity;
      }
      d.lastY = y;
      d.lastT = now;

      const collapsedOffset =
        sheet.offsetHeight - (d.peek || handleRef.current?.offsetHeight || 0);
      const offset = Math.max(0, d.startOffset + delta);
      applyOffset(
        offset > collapsedOffset
          ? collapsedOffset + rubberband(offset - collapsedOffset)
          : offset,
      );
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
    if (d.mode !== 'sheet') {
      // A tap or a native scroll: the sheet never moved
      if (sheet) sheet.style.transition = SHEET_TRANSITION;
      return;
    }
    const moved = d.offset - d.startOffset;
    if (performance.now() - d.lastT > FLICK_STALE_MS) d.velocity = 0;

    let next = expandedRef.current;
    if (next) {
      if (moved > DRAG_THRESHOLD || d.velocity > FLICK_VELOCITY) next = false;
    } else if (-moved > DRAG_THRESHOLD || d.velocity < -FLICK_VELOCITY) {
      next = true;
    }

    if (sheet) {
      // Start the snap from the exact current position, then hand control back
      // to the CSS transition. The transition is restored explicitly: React
      // won't rewrite an inline style whose value it thinks is unchanged, so
      // clearing it here would leave every later snap un-animated.
      sheet.style.transform = `translate3d(0, ${d.offset}px, 0)`;
      void sheet.offsetHeight;
      sheet.style.transition = SHEET_TRANSITION;
      sheet.style.transform = sheetTransform(next);
      if (!next) {
        // Once it's tucked away, rewind the details so it reopens at the top
        d.hideTimer = setTimeout(() => {
          d.hideTimer = 0;
          if (expandedRef.current || d.active) return;
          sheet.scrollTop = 0;
          setContentShown(false);
          // The header may have changed while expanded (e.g. a new variant)
          syncPeek();
        }, SHEET_TRANSITION_MS);
      }
    }
    setExpanded(next);
  }, [setExpanded, syncPeek]);

  useEffect(() => () => clearTimeout(drag.current.hideTimer), []);

  useIsomorphicLayoutEffect(() => {
    const handle = handleRef.current;
    if (!handle) return;
    syncPeek();
    const observer = new ResizeObserver(syncPeek);
    observer.observe(handle);
    return () => observer.disconnect();
  }, [syncPeek]);

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
    contentShown,
    mouseHandlers,
    sheetTransform: sheetTransform(expanded),
  };
}
