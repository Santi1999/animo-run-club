import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

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

  const {t} = useTranslation();

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
            {t('cookie_modal.title')}
          </h2>
          <button
            onClick={onClose}
            aria-label={t('cookie_modal.close')}
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
              {t('cookie_modal.strictly_necessary_title')}
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              {t('cookie_modal.strictly_necessary_desc')}
            </p>
          </div>

          <hr className="border-gray-200" />

          {/* Preferences heading */}
          <p className="text-sm font-semibold leading-snug">
            {t('cookie_modal.preferences_heading')}
          </p>

          {/* Preference cookies */}
          <CookieRow
            label={t('cookie_modal.preference_cookies')}
            value={prefs.preference}
            onChange={(v) => toggle('preference', v)}
          >
            {t('cookie_modal.preference_cookies_desc')}
          </CookieRow>

          <hr className="border-gray-200" />

          {/* Statistics cookies */}
          <CookieRow
            label={t('cookie_modal.statistics_cookies')}
            value={prefs.statistics}
            onChange={(v) => toggle('statistics', v)}
          >
            {t('cookie_modal.statistics_cookies_desc')}
          </CookieRow>

          <hr className="border-gray-200" />

          {/* Marketing cookies */}
          <CookieRow
            label={t('cookie_modal.marketing_cookies')}
            value={prefs.marketing}
            onChange={(v) => toggle('marketing', v)}
          >
            {t('cookie_modal.marketing_cookies_desc')}
          </CookieRow>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-3 border-t border-gray-200">
          <button
            onClick={handleSave}
            className="py-4 text-xs font-semibold tracking-wide bg-black text-white hover:bg-gray-800 transition-colors"
          >
            {t('cookie_modal.save_preferences')}
          </button>
          <button
            onClick={handleRejectAll}
            className="py-4 text-xs font-semibold tracking-wide border-x border-gray-200 bg-white text-black hover:bg-gray-100 transition-colors"
          >
            {t('cookie_modal.reject_all')}
          </button>
          <button
            onClick={handleAcceptAll}
            className="py-4 text-xs font-semibold tracking-wide bg-black text-white hover:bg-gray-800 transition-colors"
          >
            {t('cookie_modal.accept_all')}
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
