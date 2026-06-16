"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function SellTradeForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="rounded-2xl border border-white/10 bg-zinc-950 p-4 shadow-2xl shadow-black/30 sm:p-6"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-orange-300">Trade desk</p>
      <h2 className="mt-3 text-2xl font-black text-white">Vehicle Details</h2>
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
          <span className="text-sm font-semibold text-slate-200">Vehicle brand/model/year</span>
          <input required name="vehicle" placeholder="Toyota Fortuner 2021" className="form-input" />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-slate-200">Mileage</span>
          <input required name="mileage" inputMode="numeric" placeholder="42,000 km" className="form-input" />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-slate-200">Asking price or trade-in goal</span>
          <input required name="goal" placeholder="Asking price or target vehicle" className="form-input" />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-slate-200">Message</span>
          <textarea required name="message" rows={5} className="form-input resize-none" />
        </label>
      </div>
      {submitted ? <p role="status" aria-live="polite" className="mt-4 rounded-xl bg-emerald-400/10 p-4 text-sm text-emerald-200">Thank you. Your inquiry has been prepared. Please contact O2MackDrive directly to complete the inquiry.</p> : null}
      <Button type="submit" className="mt-6 w-full">
        Prepare Sell/Trade Inquiry
      </Button>
    </form>
  );
}
