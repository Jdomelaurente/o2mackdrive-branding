import type { Metadata } from "next";
import { CarFilters, cars } from "@/features/inventory";
import { Container, Reveal } from "@/shared/components/ui";

export const metadata: Metadata = {
  title: "Car Inventory",
  description: "Browse quality used cars for sale in Metro Manila — SUVs, sedans, pickups, and more. Straight deals, easy trade-ins from O2MackDrive Car Trading.",
};

export default function CarsPage() {
  return (
    <section className="bg-white -mt-20 pt-28 pb-20 text-black min-h-screen md:-mt-28 md:pt-36 sm:pb-42">
      <Container>
        <Reveal direction="up">
          <div className="border-b border-slate-200 pb-8">
            <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl uppercase">
              The Collection.
            </h1>
            <div className="mt-4 border-l-2 border-slate-900 pl-4">
              <p className="text-sm text-slate-600 max-w-xl leading-relaxed">
                Investment-grade instruments of technical art. Each vehicle is verified through our 150-point architectural audit.
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal direction="up" delay={150}>
          <div className="mt-8 sm:mt-10">
            <CarFilters cars={cars} />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
