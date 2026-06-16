import { financing } from "@/data/financing";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function FinancingCTA() {
  return (
    <section className="page-section py-14 sm:py-20">
      <div className="section-fade" />
      <Container>
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_50%_20%,rgba(249,115,22,0.16),transparent_24rem),linear-gradient(135deg,#07141d,#0d1a28)] p-4 text-center shadow-2xl shadow-black/50 sm:p-8">
          <div className="absolute left-1/2 top-5 h-1 w-36 -translate-x-1/2 rounded-full bg-slate-100/70 shadow-[0_0_60px_rgba(226,232,240,0.45)] sm:top-8 sm:w-64" />
          <div className="relative mx-auto max-w-3xl py-8 sm:py-10">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-orange-300">
              Financing counter
            </p>
            <h2 className="mt-4 text-2xl font-black leading-tight text-white sm:text-4xl">
              {financing.headline}
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
              {financing.disclaimer}
            </p>
            <div className="mt-8">
              <Button href="/financing">Learn About Financing</Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
