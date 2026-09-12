"use client";

import { useState } from "react";
import Link from "next/link";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

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
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setSending(true);
        setError("");
        try {
          const res = await fetch("/api/inquiries/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: formData.get("name"),
              phone: formData.get("phone"),
              email: formData.get("email"),
              message: formData.get("message"),
            }),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error ?? "Submission failed");
          setSubmitted(true);
        } catch {
          setError("Could not send your inquiry. Please try again or contact us directly.");
        } finally {
          setSending(false);
        }
      }}
    >
      <div className="border-b border-slate-200 pb-4 mb-5">
        <h2 className="text-xs font-black uppercase tracking-widest text-slate-950">Send an Inquiry</h2>
        <p className="mt-1.5 text-xs text-slate-500">
          Share your details and the team will continue the conversation directly.
        </p>
      </div>

      {error ? (
        <div className="mb-4 border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-xs font-bold text-red-700">{error}</p>
        </div>
      ) : null}

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

      <label className="mt-6 flex items-start gap-3">
        <input
          required
          type="checkbox"
          className="mt-0.5 h-4 w-4 shrink-0 accent-black"
        />
        <span className="text-[11px] leading-relaxed text-slate-500">
          I consent to O2MackDrive using the details above to respond to my inquiry,
          as described in the{" "}
          <Link href="/privacy" className="font-bold text-slate-700 underline underline-offset-2 hover:text-black">
            Privacy Policy
          </Link>.
        </span>
      </label>

      <button
        type="submit"
        disabled={sending}
        className="mt-4 w-full bg-black text-white hover:bg-slate-900 uppercase font-black py-3 text-xs tracking-widest transition cursor-pointer disabled:opacity-50"
      >
        {sending ? "Sending…" : "Send Inquiry"}
      </button>
    </form>
  );
}
