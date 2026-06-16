import Link from "next/link";
import { cars } from "@/data/cars";
import { Container } from "@/components/ui/Container";

export function BrandStrip() {
  const brands = Array.from(new Set(cars.map((car) => car.brand)));
  const bodyTypes = Array.from(new Set(cars.map((car) => car.bodyType)));

  return (
    <section className="page-section border-y border-white/10 py-14 sm:py-24">
      <div className="section-fade" />

      <Container className="relative">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[0.66rem] font-black uppercase tracking-[0.32em] text-orange-300 sm:text-xs sm:tracking-[0.42em]">
              Browse
            </p>

            <h2 className="mt-3 text-[2rem] font-black leading-none tracking-[-0.06em] text-white sm:text-5xl">
              Pick your lane.
            </h2>
          </div>

          <p className="max-w-sm text-sm font-medium leading-6 text-slate-400">
            Filter by maker or body style.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {brands.map((brand, index) => (
              <Link
                key={brand}
                href={`/cars?brand=${encodeURIComponent(brand)}`}
                className="group relative min-h-28 overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-4 shadow-2xl shadow-black/40 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-orange-400/50 hover:bg-orange-500/10 sm:min-h-40 sm:rounded-[1.75rem] sm:p-6"
              >
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-orange-500/10 blur-2xl transition group-hover:bg-orange-500/20" />

                <p className="text-[0.65rem] font-black uppercase tracking-[0.28em] text-slate-500">
                  0{index + 1}
                </p>

                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                  <p className="text-xl font-black uppercase tracking-[-0.04em] text-white transition group-hover:text-orange-300 sm:text-2xl">
                    {brand}
                  </p>

                  <div className="mt-3 h-1 w-10 rounded-full bg-orange-400 transition group-hover:w-20 sm:mt-4" />
                </div>
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 lg:max-w-48">
            {bodyTypes.map((bodyType) => (
              <Link
                key={bodyType}
                href={`/cars?bodyType=${encodeURIComponent(bodyType)}`}
                className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2.5 text-[0.62rem] font-black uppercase tracking-[0.18em] text-slate-300 transition hover:border-orange-400/60 hover:bg-orange-500/10 hover:text-white sm:px-5 sm:py-3 sm:text-[0.68rem] sm:tracking-[0.22em]"
              >
                {bodyType}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
