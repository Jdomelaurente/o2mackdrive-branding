import type { Metadata } from "next";
import Image from "next/image";
import { SellTradeForm } from "@/components/forms/SellTradeForm";
import { Container } from "@/components/ui/Container";
import { CarImageUpload } from "@/components/forms/CarImageUpload";

export const metadata: Metadata = {
  title: "Sell or Trade Your Car",
  description: "Send vehicle details to O2MackDrive Car Trading for a straightforward valuation or trade-in assessment.",
};

const benefits = [
  {
    title: "Honest Valuation",
    description: "Upfront appraisal based on actual Metro Manila market data. We look at real sales, not theoretical book value.",
  },
  {
    title: "Direct Deals",
    description: "Clear offers with zero pressure, no hidden dealer fees, and no middleman markup. Just a clean deal.",
  },
  {
    title: "Frictionless Support",
    description: "We handle all the paperwork, bank payouts, and documentation helper tasks directly so you don't have to.",
  },
];

export default function SellTradePage() {
  return (
    <section className="bg-white -mt-20 pt-32 md:-mt-28 md:pt-40 pb-16 text-slate-900 min-h-screen">
      <Container>
        {/* Header Block */}
        <div className="border-b border-slate-200 pb-8 mb-10">
          <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl uppercase">
            Sell / Trade Your Drive.
          </h1>
          <div className="mt-4 border-l-2 border-slate-900 pl-4">
            <p className="text-sm text-slate-600 max-w-xl leading-relaxed">
              We make selling or trading your vehicle straightforward. Provide your vehicle details for an upfront, honest valuation.
            </p>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] items-start">
          {/* Left Column: Benefits */}
          <div className="grid gap-6">
            {benefits.map((benefit, index) => (
              <div key={benefit.title} className="flex gap-4 items-start">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-black text-slate-900">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-slate-900">{benefit.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-500 max-w-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Multi-step Form */}
          <div className="relative">
            <SellTradeForm />
          </div>
        </div>

        {/* Upload your car image */}
        <div className="mt-12">
          <CarImageUpload />
        </div>
      </Container>
    </section>
  );
}
