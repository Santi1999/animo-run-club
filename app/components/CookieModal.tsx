import {useEffect, useState} from 'react';

type CookiePreferences = {
  preference: boolean;
  statistics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = 'animo_cookie_preferences';

const DEFAULT_PREFS: CookiePreferences = {
  preference: true,
  statistics: true,
  marketing: true,
};

function loadPrefs(): CookiePreferences {
  if (typeof window === 'undefined') return DEFAULT_PREFS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as CookiePreferences;
  } catch {}
  return DEFAULT_PREFS;
}

function savePrefs(prefs: CookiePreferences) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {}
}

interface CookieModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CookieModal({isOpen, onClose}: CookieModalProps) {
  const [prefs, setPrefs] = useState<CookiePreferences>(DEFAULT_PREFS);

  useEffect(() => {
    if (isOpen) setPrefs(loadPrefs());
  }, [isOpen]);

  if (!isOpen) return null;

  const toggle = (key: keyof CookiePreferences, value: boolean) => {
    setPrefs((p) => ({...p, [key]: value}));
  };

  const handleSave = () => {
    savePrefs(prefs);
    onClose();
  };

  const handleRejectAll = () => {
    const all: CookiePreferences = {preference: false, statistics: false, marketing: false};
    setPrefs(all);
    savePrefs(all);
    onClose();
  };

  const handleAcceptAll = () => {
    const all: CookiePreferences = {preference: true, statistics: true, marketing: true};
    setPrefs(all);
    savePrefs(all);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative bg-white w-full sm:max-w-lg mx-auto sm:mx-4 max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4">
          <h2
            id="cookie-modal-title"
            className="text-base font-semibold tracking-wide"
          >
            Cookie setting
          </h2>
          <button
            onClick={onClose}
            aria-label="Close cookie settings"
            className="ml-4 flex-shrink-0 text-black hover:opacity-60 transition-opacity"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M1 1l14 14M15 1L1 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="px-6 pb-6 space-y-5">
          {/* Strictly necessary */}
          <div>
            <p className="text-sm font-semibold mb-2">
              Strictly necessary cookies (always active)
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              Technical cookies are cookies that are strictly necessary for the
              website to function or to allow you to take advantage of the
              requested services and content. You can set your browser to block
              or alert you about these cookies, but some parts of the site will
              not then work.
            </p>
          </div>

          <hr className="border-gray-200" />

          {/* Preferences heading */}
          <p className="text-sm font-semibold leading-snug">
            Set your preferences using the check box provided
          </p>

          {/* Preference cookies */}
          <CookieRow
            label="Preference cookies"
            value={prefs.preference}
            onChange={(v) => toggle('preference', v)}
          >
            Functionality cookies enable the website to provide enhanced
            functionality and personalisation according to the criteria that you
            have selected (for example, the language or products selected for
            purchase). If you do not allow these cookies then some or all of
            these services may not function properly.
          </CookieRow>

          <hr className="border-gray-200" />

          {/* Statistics cookies */}
          <CookieRow
            label="Statistics cookies"
            value={prefs.statistics}
            onChange={(v) => toggle('statistics', v)}
          >
            Analytical cookies are used to measure and analyse our website
            audience (visitor volume, pages viewed, average browsing time, etc.).
            All information these cookies collect is aggregated and therefore
            anonymous. By accepting these cookies, you are helping us to improve
            the performance of our website.
          </CookieRow>

          <hr className="border-gray-200" />

          {/* Marketing cookies */}
          <CookieRow
            label="Marketing cookies"
            value={prefs.marketing}
            onChange={(v) => toggle('marketing', v)}
          >
            These cookies are aimed at creating profiles relating to the user
            and are used to show you promotional messages that are in line with
            the preferences you have displayed while navigating on the network.
            They do not store directly personal information, but are based on
            uniquely identifying your browser and internet device. If you do not
            allow these cookies, you will experience less targeted advertising as
            you browse the Internet.
          </CookieRow>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-3 border-t border-gray-200">
          <button
            onClick={handleSave}
            className="py-4 text-xs font-semibold tracking-wide bg-black text-white hover:bg-gray-800 transition-colors"
          >
            SAVE PREFERENCES
          </button>
          <button
            onClick={handleRejectAll}
            className="py-4 text-xs font-semibold tracking-wide border-x border-gray-200 bg-white text-black hover:bg-gray-100 transition-colors"
          >
            REJECT ALL
          </button>
          <button
            onClick={handleAcceptAll}
            className="py-4 text-xs font-semibold tracking-wide bg-black text-white hover:bg-gray-800 transition-colors"
          >
            ACCEPT ALL
          </button>
        </div>
      </div>
    </div>
  );
}

function CookieRow({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold">{label}</span>
        <div className="flex items-center gap-1 flex-shrink-0 ml-4">
          {/* Accept button */}
          <button
            onClick={() => onChange(true)}
            aria-label={`Accept ${label}`}
            aria-pressed={value}
            className={`w-8 h-7 flex items-center justify-center border text-xs font-bold transition-colors ${
              value
                ? 'border-black bg-white text-black'
                : 'border-gray-300 bg-white text-gray-300'
            }`}
          >
            &#10003;
          </button>
          {/* Reject button */}
          <button
            onClick={() => onChange(false)}
            aria-label={`Reject ${label}`}
            aria-pressed={!value}
            className={`w-8 h-7 flex items-center justify-center border text-xs font-bold transition-colors ${
              !value
                ? 'border-black bg-white text-black'
                : 'border-gray-300 bg-white text-gray-300'
            }`}
          >
            &#10007;
          </button>
        </div>
      </div>
      <p className="text-xs text-gray-600 leading-relaxed">{children}</p>
    </div>
  );
}
