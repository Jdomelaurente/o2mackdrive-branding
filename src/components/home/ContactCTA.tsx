import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function ContactCTA() {
  return (
    <section className="bg-black py-12 sm:py-16">
      <div className="section-fade" />
      <Container>
        <div className="grid gap-6 border-y border-white/10 py-8 sm:gap-8 sm:py-10 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-orange-300">
              MackDrive contact desk
            </p>
            <h2 className="mt-3 text-2xl font-black leading-tight text-white sm:text-4xl">
              Ready to inquire, sell, or trade?
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-slate-400">
              Contact O2MackDrive for available cars, viewing schedules,
              trade-in discussions, or financing requirement guidance.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/contact">Send Inquiry</Button>
            <Button href="/sell-trade" variant="secondary">
              Sell or Trade
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
