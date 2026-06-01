import {useEffect, useState} from 'react';

const STORAGE_KEY = 'animo_cookie_preferences';

interface CookieBannerProps {
  onOpenSettings: () => void;
  /** Pass changing value (e.g. modal open state) to re-check localStorage */
  recheckTrigger?: boolean;
}

export function CookieBanner({onOpenSettings, recheckTrigger}: CookieBannerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
      else setVisible(false);
    } catch {
      setVisible(true);
    }
  }, [recheckTrigger]);

  if (!visible) return null;

  const accept = () => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({preference: true, statistics: true, marketing: true}),
      );
    } catch {}
    setVisible(false);
  };

  const reject = () => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          preference: false,
          statistics: false,
          marketing: false,
        }),
      );
    } catch {}
    setVisible(false);
  };

  const openSettings = () => {
    setVisible(false);
    onOpenSettings();
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed flex-1">
          We use cookies to improve your experience, analyse traffic, and show
          personalised content. You can accept all cookies, reject non-essential
          ones, or{' '}
          <button
            type="button"
            onClick={openSettings}
            className="underline hover:opacity-70 transition-opacity"
          >
            customise your preferences
          </button>
          . Read our{' '}
          <a
            href="/cookie-policy"
            className="underline hover:opacity-70 transition-opacity"
          >
            Cookie Policy
          </a>{' '}
          for more details.
        </p>

        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
          <button
            onClick={reject}
            className="flex-1 sm:flex-none px-5 py-2.5 text-xs font-semibold tracking-wide border border-black text-black bg-white hover:bg-gray-100 transition-colors"
          >
            REJECT ALL
          </button>
          <button
            onClick={accept}
            className="flex-1 sm:flex-none px-5 py-2.5 text-xs font-semibold tracking-wide bg-black text-white hover:bg-gray-800 transition-colors"
          >
            ACCEPT ALL
          </button>
        </div>
      </div>
    </div>
  );
}
