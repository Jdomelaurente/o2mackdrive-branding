import type { Metadata } from "next";
import { CarFilters } from "@/components/cars/CarFilters";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cars } from "@/data/cars";

export const metadata: Metadata = {
  title: "Cars for Sale",
  description: "Browse available cars for sale from O2MackDrive Car Trading.",
};

type CarsPageProps = {
  searchParams: Promise<{ search?: string | string[] }>;
};

export default async function CarsPage({ searchParams }: CarsPageProps) {
  const params = await searchParams;
  const initialSearch = Array.isArray(params.search) ? params.search[0] : params.search ?? "";

  return (
    <section className="garage-surface border-b border-white/10 py-10 sm:py-20">
      <Container>
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1fr] lg:items-end">
          <SectionHeader eyebrow="Current lot inventory" title="Cars for Sale" description="Search the available units, check status, and move straight into viewing or inquiry when a car fits." />
          <p className="max-w-xl text-sm leading-7 text-slate-400 lg:justify-self-end">
            Use the filter desk to find a practical match by brand, price, fuel, or status. Every card leads directly to details or inquiry.
          </p>
        </div>
        <div className="mt-8 sm:mt-10">
          <CarFilters cars={cars} initialSearch={initialSearch} />
        </div>
      </Container>
    </section>
  );
}
