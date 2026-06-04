import {useCallback, useEffect, useRef, useState} from 'react';
import {useFetcher} from 'react-router';

const COOKIE_NAME = 'popup_drop_seen';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 365 days

/**
 * Call this from any route loader to check whether the popup
 * has already been dismissed. Returns `{ showDropPopup: boolean }`.
 */
export function getDropPopupState(request: Request) {
  const cookie = request.headers.get('Cookie') ?? '';
  const seen = cookie
    .split(';')
    .some((c) => c.trim().startsWith(`${COOKIE_NAME}=1`));
  return {showDropPopup: !seen};
}

function setSeenCookie() {
  document.cookie = `${COOKIE_NAME}=1; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Lax`;
}

export function DropAnnouncementPopup({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const newsletter = useFetcher<{success?: boolean; error?: string}>();
  const subscribed = newsletter.data?.success;
  const [emailValid, setEmailValid] = useState(false);

  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const dismiss = useCallback(() => {
    setSeenCookie();
    onClose();
  }, [onClose]);

  // Focus trap + ESC key
  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement as HTMLElement;
    dialogRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        dismiss();
        return;
      }

      if (e.key !== 'Tab') return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [open, dismiss]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={dismiss}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Modal */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drop-popup-heading"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-[90vw] max-w-md overflow-hidden bg-neutral-200 outline-none"
      >
        <img
          src="https://cdn.shopify.com/s/files/1/0670/7930/7470/files/ANIMO_HYDRANGEA_ALCHEMY_SS26_COLLECTION_9.png?v=1780199047"
          alt="Upcoming drop preview"
          className="aspect-4/3 w-full object-cover -mt-1"
        />

        {/* Content */}
        <div className="px-8 py-8 text-center">
          <h2
            id="drop-popup-heading"
            className="text-xl font-bold tracking-wide uppercase mb-2"
          >
            Something big is dropping soon
          </h2>
          <p className="text-sm text-gray-600 mb-6 pb-5">
            {/* Edit this line when the date / product name is confirmed */}
            Stay tuned — details coming soon.
          </p>

          {subscribed ? (
            <p className="text-sm font-medium">
              Thanks for subscribing! We&apos;ll keep you posted.
            </p>
          ) : (
            <newsletter.Form
              method="post"
              action="/newsletter/subscribe"
              onSubmit={() => setSeenCookie()}
            >
              <div className="flex items-center border-b border-black pb-1">
                <input
                  type="email"
                  name="email"
                  required
                  pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                  title="Please enter a valid email address"
                  placeholder="Insert your e-mail address *"
                  onChange={(e) => setEmailValid(EMAIL_PATTERN.test(e.target.value))}
                  className="drop-popup-email-input flex-1 bg-transparent text-sm placeholder:text-gray-500"
                />
                <button
                  type="submit"
                  disabled={newsletter.state === 'submitting'}
                  className={`ml-2 text-xs font-semibold tracking-widest uppercase px-4 py-2 transition-colors disabled:opacity-50 ${
                    emailValid
                      ? 'bg-black text-white'
                      : 'bg-transparent text-gray-400'
                  }`}
                >
                  Notify Me
                </button>
              </div>
              {newsletter.data?.error && (
                <p className="text-sm text-red-600 mt-2">
                  {newsletter.data.error}
                </p>
              )}
            </newsletter.Form>
          )}
        </div>

        {/* Dismiss button */}
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute top-3 right-3 p-1 text-neutral-600 hover:text-black transition-colors"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M5 5l10 10M15 5L5 15" />
          </svg>
        </button>
      </div>
    </div>
  );
}
