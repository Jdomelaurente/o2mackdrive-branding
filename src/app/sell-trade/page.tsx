import type { Metadata } from "next";
import { SellTradeForm } from "@/components/forms/SellTradeForm";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Sell or Trade Your Car",
  description: "Send vehicle details to O2MackDrive Car Trading for selling or trade-in inquiry assistance.",
};

const steps = [
  "Submit your vehicle brand, model, year, mileage, and target price or trade-in goal.",
  "O2MackDrive reviews the details and discusses practical next steps with you.",
  "Schedule a viewing or evaluation and prepare the relevant documents.",
];

export default function SellTradePage() {
  return (
    <section className="py-10 sm:py-20">
      <Container className="grid gap-8 sm:gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeader eyebrow="Sell / Trade" title="Sell or trade your car with clearer steps" description="Share your vehicle details and let O2MackDrive guide you through the next conversation for selling or trading." />
          <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4">
            {steps.map((step, index) => (
              <div key={step} className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4 sm:rounded-[1.5rem] sm:p-5">
                <p className="text-sm font-semibold text-orange-300">Step {index + 1}</p>
                <p className="mt-2 leading-7 text-slate-300">{step}</p>
              </div>
            ))}
          </div>
        </div>
        <SellTradeForm />
      </Container>
    </section>
  );
}
