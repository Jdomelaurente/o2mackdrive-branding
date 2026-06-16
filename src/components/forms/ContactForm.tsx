"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="rounded-[1.5rem] border border-white/10 bg-black/70 p-4 shadow-2xl shadow-black/30 sm:p-6"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <p className="text-[0.65rem] font-black uppercase tracking-[0.24em] text-orange-300">
        Contact desk
      </p>
      <h2 className="mt-3 text-2xl font-black leading-none text-white">
        Send an Inquiry
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-400">
        Share your details and the team can continue the conversation directly.
      </p>
      <div className="mt-5 grid gap-4 sm:mt-6">
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-slate-200">Full name</span>
          <input required name="name" className="form-input" />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-slate-200">Contact number</span>
          <input required name="phone" type="tel" className="form-input" />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-slate-200">Email</span>
          <input name="email" type="email" className="form-input" />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-slate-200">Message</span>
          <textarea required name="message" rows={4} className="form-input resize-none" />
        </label>
      </div>
      {submitted ? <p role="status" aria-live="polite" className="mt-4 rounded-xl bg-emerald-400/10 p-4 text-sm text-emerald-200">Thank you. Your inquiry has been prepared. Please contact O2MackDrive directly to complete the inquiry.</p> : null}
      <Button type="submit" className="mt-6 w-full">
        Send Inquiry
      </Button>
    </form>
  );
}
