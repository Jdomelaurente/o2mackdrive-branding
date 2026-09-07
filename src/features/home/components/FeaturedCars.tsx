import Link from "next/link";
import { Container, Reveal } from "@/shared/components/ui";
import { cars, CarCard } from "@/features/inventory";

// Pull the first 3 featured cars from real data
const featuredArrivals = cars
  .filter((car) => car.featured)
  .slice(0, 3);

export function FeaturedCars() {
  return (
    <section className="bg-[#f9f9f9] py-16 text-black sm:py-24">
      <Container>
        <Reveal direction="up">
          <div className="mb-10 flex items-end justify-between border-b border-slate-200 pb-5">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                New Arrivals
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                The latest additions to our curated warehouse.
              </p>
            </div>

            <Link
              href="/cars"
              className="text-xs font-bold uppercase tracking-wider text-slate-900 underline underline-offset-4 hover:text-orange-500"
            >
              View Full Warehouse
            </Link>
          </div>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-3">
          {featuredArrivals.map((car, index) => (
            <Reveal key={car.id} delay={index * 150} direction="up">
              <CarCard car={car} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
