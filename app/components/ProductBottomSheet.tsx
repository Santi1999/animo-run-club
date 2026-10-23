import {
  SHEET_EASING,
  SHEET_TRANSITION_MS,
  useBottomSheet,
} from '~/lib/useBottomSheet';

/**
 * Mobile bottom sheet that peeks over its (relatively positioned) parent and
 * expands on swipe-up. `header` is always visible and is the drag handle;
 * `children` only render once expanded.
 */
export function ProductBottomSheet({
  header,
  children,
}: {
  header: (expanded: boolean) => React.ReactNode;
  children: React.ReactNode;
}) {
  const {sheetRef, handleRef, expanded, mouseHandlers, sheetTransform} =
    useBottomSheet();

  return (
    <div
      ref={sheetRef}
      className={`absolute inset-x-0 bottom-0 h-full bg-white shadow-[0_-4px_24px_rgba(0,0,0,0.08)] ${
        expanded ? '' : 'rounded-t-2xl'
      }`}
      style={{
        transform: sheetTransform,
        transition: `transform ${SHEET_TRANSITION_MS}ms ${SHEET_EASING}`,
        overflowY: expanded ? 'auto' : 'hidden',
        willChange: 'transform',
      }}
    >
      <div
        ref={handleRef}
        {...mouseHandlers}
        // Collapsed: we own every vertical gesture. Expanded: let the browser
        // scroll the sheet; the hook only takes over when pulling down at top.
        style={{touchAction: expanded ? 'pan-y' : 'none'}}
        className="sticky top-0 bg-white z-10 cursor-grab active:cursor-grabbing"
      >
        <div className="flex justify-center pt-3 pb-3">
          <div className="w-9 h-[3px] rounded-full bg-black/15" />
        </div>
        <div className="px-5 pb-5">{header(expanded)}</div>
      </div>

      {expanded && <div className="px-5 pb-12">{children}</div>}
    </div>
  );
}
