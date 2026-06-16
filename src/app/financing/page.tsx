import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { financing } from "@/data/financing";

export const metadata: Metadata = {
  title: "Financing Assistance",
  description: "Learn how O2MackDrive Car Trading can assist with financing requirements and application guidance.",
};

export default function FinancingPage() {
  return (
    <section className="py-10 sm:py-20">
      <Container>
        <SectionHeader eyebrow="Financing" title={financing.headline} description={financing.explanation} />
        <div className="mt-8 grid gap-5 sm:mt-10 sm:gap-8 lg:grid-cols-2">
          <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 sm:rounded-[2rem] sm:p-6">
            <h2 className="text-xl font-bold text-white sm:text-2xl">Requirement checklist</h2>
            <ul className="mt-5 grid gap-3 sm:mt-6">
              {financing.requirements.map((item) => (
                <li key={item} className="rounded-2xl bg-white/5 px-4 py-3 text-slate-200">
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 sm:rounded-[2rem] sm:p-6">
            <h2 className="text-xl font-bold text-white sm:text-2xl">Financing process</h2>
            <ol className="mt-5 grid gap-3 sm:mt-6">
              {financing.steps.map((item, index) => (
                <li key={item} className="rounded-2xl bg-white/5 px-4 py-3 text-slate-200">
                  <span className="mr-2 font-bold text-orange-300">{index + 1}.</span>
                  {item}
                </li>
              ))}
            </ol>
          </section>
        </div>
        <div className="mt-8 rounded-[1.5rem] border border-orange-300/20 bg-orange-500/10 p-4 sm:mt-10 sm:rounded-[2rem] sm:p-6">
          <p className="text-base font-semibold leading-7 text-orange-50 sm:text-lg sm:leading-8">{financing.disclaimer}</p>
          <p className="mt-3 text-sm text-orange-100/80">Approval is subject to bank evaluation.</p>
          <Button href="/contact" className="mt-6">
            Contact O2MackDrive
          </Button>
        </div>
      </Container>
    </section>
  );
}
