import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

const steps = [
  "Browse available units or send your vehicle details.",
  "Talk with O2MackDrive for viewing, trade, or financing guidance.",
  "Review documents and complete the transaction steps clearly.",
];

export function HowItWorks() {
  return (
    <section className="page-section py-14 sm:py-20">
      <div className="section-fade" />
      <Container>
        <SectionHeader eyebrow="Process" title="How it works" description="Simple steps designed to keep buyers, sellers, and trade-in customers informed." />
        <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 sm:rounded-[1.75rem] sm:p-6">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-orange-500 text-base font-black text-white sm:h-12 sm:w-12 sm:text-lg">{index + 1}</span>
              <p className="mt-4 text-base font-semibold leading-7 text-white sm:mt-6 sm:text-lg">{step}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
