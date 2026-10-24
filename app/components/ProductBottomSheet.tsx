import {SHEET_TRANSITION, useBottomSheet} from '~/lib/useBottomSheet';

/**
 * Mobile bottom sheet that peeks over its (relatively positioned) parent and
 * expands on swipe-up. `header` is always visible and is the drag handle.
 * `children` stay mounted so expanding doesn't mount a large subtree
 * mid-animation, but are hidden while collapsed (see `contentShown`).
 * `footer` renders full-bleed after the children.
 */
export function ProductBottomSheet({
  header,
  children,
  footer,
}: {
  header: (expanded: boolean) => React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const {
    sheetRef,
    handleRef,
    expanded,
    contentShown,
    mouseHandlers,
    sheetTransform,
  } = useBottomSheet();

  return (
    <div
      ref={sheetRef}
      className="absolute inset-x-0 bottom-0 h-full bg-white shadow-[0_-4px_24px_rgba(0,0,0,0.08)]"
      style={{
        transform: sheetTransform,
        transition: SHEET_TRANSITION,
        borderTopLeftRadius: expanded ? 0 : 16,
        borderTopRightRadius: expanded ? 0 : 16,
        overflowY: expanded ? 'auto' : 'hidden',
        // Reaching the end of the details mustn't scroll the page behind,
        // which would carry the header (the only way to close) off screen
        overscrollBehaviorY: expanded ? 'contain' : undefined,
        willChange: 'transform',
      }}
    >
      <div
        ref={handleRef}
        {...mouseHandlers}
        // Collapsed: we own every vertical gesture. Expanded: the browser may
        // scroll the sheet, but the hook claims any downward pull on the
        // header (cancelling that scroll) so it always closes the sheet.
        style={{touchAction: expanded ? 'pan-y' : 'none'}}
        className="sticky top-0 bg-white z-10 cursor-grab active:cursor-grabbing"
      >
        <div className="flex justify-center pt-3 pb-3">
          <div className="w-9 h-[3px] rounded-full bg-black/15" />
        </div>
        <div className="px-5 pb-5">{header(expanded)}</div>
      </div>

      <div hidden={!contentShown && !expanded}>
        <div className="px-5 pb-12">{children}</div>
        {footer}
      </div>
    </div>
  );
}
