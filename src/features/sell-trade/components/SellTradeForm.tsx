"use client";

import { useState } from "react";

export function SellTradeForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  // Form input states
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [mileage, setMileage] = useState("");

  const [price, setPrice] = useState("");
  const [notes, setNotes] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (step === 1 && (!year || !make || !model || !mileage)) return;
    if (step === 2 && !price) return;
    setStep(step + 1);
  };

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitted(true);
  };

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
        <h3 className="mt-4 text-sm font-black uppercase tracking-wider text-slate-900">Inquiry Prepared</h3>
        <p className="mt-2 text-xs leading-relaxed text-slate-500 max-w-sm mx-auto">
          Thank you, {name}. Your sell/trade inquiry has been prepared. Please reach out to O2MackDrive directly to complete the valuation discussion.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-slate-200 bg-white p-6 shadow-sm text-slate-900">
      {/* Step Indicators */}
      <div className="flex gap-2 mb-6">
        <div className={`h-[3px] flex-1 transition-all ${step >= 1 ? "bg-black" : "bg-slate-200"}`} />
        <div className={`h-[3px] flex-1 transition-all ${step >= 2 ? "bg-black" : "bg-slate-200"}`} />
        <div className={`h-[3px] flex-1 transition-all ${step >= 3 ? "bg-black" : "bg-slate-200"}`} />
      </div>

      {step === 1 && (
        <div className="grid gap-5">
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-950">01. Vehicle Identity</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="grid gap-2">
              <span className={labelClass}>Year</span>
              <input
                required
                type="number"
                placeholder="YYYY"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className={inputClass}
              />
            </label>
            <label className="grid gap-2">
              <span className={labelClass}>Make</span>
              <input
                required
                placeholder="e.g. Toyota"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                className={inputClass}
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="grid gap-2">
              <span className={labelClass}>Model</span>
              <input
                required
                placeholder="e.g. Fortuner"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className={inputClass}
              />
            </label>
            <label className="grid gap-2">
              <span className={labelClass}>Mileage</span>
              <input
                required
                placeholder="Current Odometer"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                className={inputClass}
              />
            </label>
          </div>

          <button
            onClick={handleNext}
            className="w-fit bg-black text-white hover:bg-slate-900 uppercase font-black py-3 px-6 text-[10px] tracking-widest transition cursor-pointer mt-2"
          >
            Next Phase
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-5">
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-950">02. Valuation & Goals</h2>
          </div>

          <label className="grid gap-2">
            <span className={labelClass}>Asking Price / Target Trade-in</span>
            <input
              required
              placeholder="e.g. ₱1,200,000 or trade for Hilux"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={inputClass}
            />
          </label>

          <label className="grid gap-2">
            <span className={labelClass}>Vehicle Notes / Condition</span>
            <textarea
              placeholder="Brief description of the vehicle condition or details..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className={`${inputClass} resize-none`}
            />
          </label>

          <div className="flex gap-3 mt-2">
            <button
              onClick={handleBack}
              className="border border-slate-200 text-slate-700 hover:bg-slate-50 uppercase font-bold py-3 px-6 text-[10px] tracking-widest transition cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="bg-black text-white hover:bg-slate-900 uppercase font-black py-3 px-6 text-[10px] tracking-widest transition cursor-pointer"
            >
              Next Phase
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="grid gap-5">
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-950">03. Contact Details</h2>
          </div>

          <label className="grid gap-2">
            <span className={labelClass}>Full Name</span>
            <input
              required
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
          </label>

          <label className="grid gap-2">
            <span className={labelClass}>Contact Number</span>
            <input
              required
              type="tel"
              placeholder="0917XXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
            />
          </label>

          <div className="flex gap-3 mt-2">
            <button
              onClick={handleBack}
              className="border border-slate-200 text-slate-700 hover:bg-slate-50 uppercase font-bold py-3 px-6 text-[10px] tracking-widest transition cursor-pointer"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-black text-white hover:bg-slate-900 uppercase font-black py-3 px-6 text-[10px] tracking-widest transition cursor-pointer"
            >
              Submit Inquiry
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
