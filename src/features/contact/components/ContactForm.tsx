"use client";

import { useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const inputClass =
    "w-full border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-800 outline-none transition focus:border-slate-400 focus:bg-white placeholder:text-slate-400";
  const labelClass = "text-[10px] font-black uppercase tracking-wider text-slate-900";

  if (submitted) {
    return (
      <div className="border border-slate-200 bg-white p-6 shadow-sm text-center py-12">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-900">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h3 className="mt-4 text-sm font-black uppercase tracking-wider text-slate-900">Inquiry Sent</h3>
        <p className="mt-2 text-xs leading-relaxed text-slate-500 max-w-sm mx-auto">
          Thank you. Your inquiry has been prepared. Please contact O2MackDrive directly to continue the conversation.
        </p>
      </div>
    );
  }

  return (
    <form
      className="border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="border-b border-slate-200 pb-4 mb-5">
        <h2 className="text-xs font-black uppercase tracking-widest text-slate-950">Send an Inquiry</h2>
        <p className="mt-1.5 text-xs text-slate-500">
          Share your details and the team will continue the conversation directly.
        </p>
      </div>

      <div className="grid gap-4">
        <label className="grid gap-2">
          <span className={labelClass}>Full Name</span>
          <input required name="name" placeholder="Your Name" className={inputClass} />
        </label>
        <label className="grid gap-2">
          <span className={labelClass}>Contact Number</span>
          <input required name="phone" type="tel" placeholder="0917XXXXXXX" className={inputClass} />
        </label>
        <label className="grid gap-2">
          <span className={labelClass}>Email</span>
          <input name="email" type="email" placeholder="you@email.com" className={inputClass} />
        </label>
        <label className="grid gap-2">
          <span className={labelClass}>Message</span>
          <textarea required name="message" rows={4} placeholder="Tell us what you're looking for..." className={`${inputClass} resize-none`} />
        </label>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-black text-white hover:bg-slate-900 uppercase font-black py-3 text-xs tracking-widest transition cursor-pointer"
      >
        Send Inquiry
      </button>
    </form>
  );
}
