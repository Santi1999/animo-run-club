import {useCallback, useRef, useState} from 'react';

/** How much of the sheet stays visible while collapsed. */
export const SHEET_PEEK_HEIGHT = '28vh';

/** Minimum drag distance (px) that counts as a swipe. */
const DRAG_THRESHOLD = 60;

function sheetTransform(expanded: boolean) {
  return expanded ? 'translateY(0)' : `translateY(calc(100% - ${SHEET_PEEK_HEIGHT}))`;
}

/**
 * Drag-to-expand behaviour for a bottom sheet. Supports touch and mouse.
 * Spread `dragHandlers` on the sheet's header zone and attach `sheetRef` to
 * the scrolling sheet element.
 */
export function useBottomSheet() {
  const sheetRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef(0);
  const isDragging = useRef(false);
  const expandedRef = useRef(false);
  const [expanded, setExpandedState] = useState(false);

  const setExpanded = useCallback((value: boolean) => {
    expandedRef.current = value;
    setExpandedState(value);
  }, []);

  const beginDrag = useCallback((startY: number) => {
    dragStartY.current = startY;
    isDragging.current = true;
    if (sheetRef.current) sheetRef.current.style.transition = 'none';
  }, []);

  const moveDrag = useCallback((currentY: number) => {
    const sheet = sheetRef.current;
    if (!isDragging.current || !sheet) return;
    const delta = currentY - dragStartY.current;
    if (expandedRef.current) {
      if (delta > 0 && sheet.scrollTop === 0) {
        sheet.style.transform = `translateY(${delta}px)`;
      }
    } else if (delta < 0) {
      sheet.style.transform = `translateY(calc(100% - ${SHEET_PEEK_HEIGHT} + ${delta}px))`;
    }
  }, []);

  const endDrag = useCallback(
    (endY: number) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      const sheet = sheetRef.current;
      const delta = dragStartY.current - endY;

      let next = expandedRef.current;
      if (delta > DRAG_THRESHOLD) {
        next = true;
      } else if (delta < -DRAG_THRESHOLD && (!sheet || sheet.scrollTop === 0)) {
        next = false;
      }

      if (sheet) {
        // Snap back to the resting position for the resulting state, then
        // hand control back to the CSS transition.
        sheet.style.transition = '';
        sheet.style.transform = sheetTransform(next);
      }
      setExpanded(next);
    },
    [setExpanded],
  );

  const dragHandlers = {
    onTouchStart: (e: React.TouchEvent) => beginDrag(e.touches[0].clientY),
    onTouchMove: (e: React.TouchEvent) => moveDrag(e.touches[0].clientY),
    onTouchEnd: (e: React.TouchEvent) => endDrag(e.changedTouches[0].clientY),
    // Move/up are tracked on the document so the drag survives leaving the element
    onMouseDown: (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest('button, a, input, select')) return;
      e.preventDefault();
      beginDrag(e.clientY);
      document.body.style.userSelect = 'none';

      const handleMouseMove = (ev: MouseEvent) => moveDrag(ev.clientY);
      const handleMouseUp = (ev: MouseEvent) => {
        endDrag(ev.clientY);
        document.body.style.userSelect = '';
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
  };

  return {sheetRef, expanded, dragHandlers, sheetTransform: sheetTransform(expanded)};
}
