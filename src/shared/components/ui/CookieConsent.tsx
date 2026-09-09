"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "o2mackdrive-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) setVisible(true);
  }, []);

  const handleChoice = useCallback((consented: boolean) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ consented, timestamp: Date.now() }));
    setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 flex justify-center p-4 sm:p-6"
    >
      <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-slate-950/90 backdrop-blur-xl shadow-2xl shadow-black/50 p-5 sm:p-6 animate-fade-in-up">
        <p className="text-sm text-slate-300 leading-relaxed mb-4">
          We use cookies to improve your experience on our site. By continuing to browse, you agree to our use of cookies.
          <a href="/privacy" className="underline underline-offset-2 text-orange-300 hover:text-orange-200 transition-colors ml-1">
            Privacy Policy
          </a>
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => handleChoice(true)}
            className="inline-flex min-h-10 cursor-pointer items-center justify-center rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-black/10 hover:bg-slate-100 transition focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={() => handleChoice(false)}
            className="inline-flex min-h-10 cursor-pointer items-center justify-center rounded-xl border border-slate-400/35 bg-slate-200/8 px-5 py-2.5 text-sm font-bold text-slate-100 hover:border-orange-300/60 hover:bg-orange-400/12 transition focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
