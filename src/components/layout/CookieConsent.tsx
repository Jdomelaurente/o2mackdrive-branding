"use client";

import { useCallback, useSyncExternalStore } from "react";
import Link from "next/link";

const STORAGE_KEY = "o2mackdrive-cookie-consent";
const STORAGE_EVENT = "o2mackdrive:storage";

const subscribe = (onChange: () => void) => {
  window.addEventListener("storage", onChange);
  window.addEventListener(STORAGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(STORAGE_EVENT, onChange);
  };
};

const getSnapshot = () => {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

// Server and first hydration render see "undefined" (not decided yet) and render
// nothing, so the banner never flashes before the real snapshot is read.
const getServerSnapshot = () => undefined as string | null | undefined;

export function CookieConsent() {
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const visible = stored === null;

  const handleChoice = useCallback((consented: boolean) => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ consented, timestamp: Date.now() })
      );
    } catch {
      // Storage unavailable (e.g. private mode) — dismiss the banner anyway.
    }
    // Re-read the snapshot on this tab (the "storage" event only fires cross-tab).
    window.dispatchEvent(new Event(STORAGE_EVENT));
  }, []);

  if (stored === undefined) return null;
  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie and storage notice"
      aria-describedby="cookie-consent-text"
      className="fixed inset-x-0 bottom-0 z-50 flex justify-center p-4 sm:p-6"
    >
      <div className="w-full max-w-2xl border border-white/10 bg-black/95 p-5 shadow-2xl shadow-black/50 backdrop-blur-xl sm:p-6">
        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-orange-300">
          Your privacy
        </p>

        <p id="cookie-consent-text" className="mt-3 text-sm leading-relaxed text-slate-300">
          We do not use tracking or advertising cookies. We only store a small
          preference on your device to remember this choice. Read our{" "}
          <Link href="/cookie-policy" className="font-bold text-orange-300 underline underline-offset-4 decoration-orange-300 transition-colors hover:text-orange-200">
            Cookie Policy
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="font-bold text-orange-300 underline underline-offset-4 decoration-orange-300 transition-colors hover:text-orange-200">
            Privacy Policy
          </Link>
          .
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => handleChoice(true)}
            className="inline-flex min-h-11 cursor-pointer items-center justify-center bg-white px-6 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 focus:ring-offset-black"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={() => handleChoice(false)}
            className="inline-flex min-h-11 cursor-pointer items-center justify-center border border-white/20 px-6 py-2.5 text-sm font-bold text-slate-100 transition hover:border-orange-300/60 hover:bg-orange-400/10 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 focus:ring-offset-black"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}