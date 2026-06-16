import Image from "next/image";
import { cars } from "@/data/cars";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { formatPrice } from "@/lib/format";

function formatMileage(mileage: number) {
  return `${mileage.toLocaleString()} km`;
}

export function FeaturedCars() {
  const featuredCars = cars.slice(0, 3);

  const getTitle = (car: (typeof cars)[number]) =>
    `${car.year} ${car.brand} ${car.model}${car.variant ? ` ${car.variant}` : ""}`;

  const getFuel = (car: (typeof cars)[number]) =>
    (car as { fuel?: string; fuelType?: string }).fuel ??
    (car as { fuelType?: string }).fuelType ??
    "N/A";

  return (
    <section className="page-section py-14 sm:py-24 lg:py-28">
      <div className="section-fade" />

      <Container className="relative">
        <div className="mb-8 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between sm:gap-5">
          <div>
            <p className="eyebrow">Fresh units</p>

            <h2 className="section-title mt-3 max-w-2xl text-[2rem] sm:text-5xl lg:text-6xl">
              Recently pulled in.
            </h2>
          </div>

          <Button href="/cars" variant="secondary" className="w-fit px-6 py-3">
            View All
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredCars.map((car) => {
            const title = getTitle(car);

            return (
              <article
                key={car.slug}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-2 shadow-2xl shadow-black/50 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-orange-400/50 hover:bg-white/[0.055]"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                  <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-orange-300/80 to-transparent" />
                  <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-orange-500/10 blur-3xl" />
                </div>

                <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-950">
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <Image
                      src={car.images[0]}
                      alt={title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-transparent" />

                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                      <Badge status={car.status}>{car.status}</Badge>

                      <span className="rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[0.6rem] font-black uppercase tracking-[0.2em] text-white backdrop-blur-md">
                        {car.bodyType}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                      <p className="text-[0.65rem] font-black uppercase tracking-[0.26em] text-orange-300">
                        {car.year}
                      </p>

                      <p className="rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[0.6rem] font-black uppercase tracking-[0.18em] text-slate-300 backdrop-blur-md">
                        {car.location}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5">
                    <h3 className="min-h-0 text-xl font-black leading-none tracking-[-0.055em] text-white sm:min-h-[3.5rem] sm:text-2xl">
                      {title}
                    </h3>

                    <p className="mt-4 break-words text-2xl font-black leading-none tracking-[-0.05em] text-orange-400 sm:text-3xl">
                      {formatPrice(car.price)}
                    </p>

                    <div className="mt-5 grid grid-cols-3 gap-2">
                      <Spec label="KM" value={formatMileage(car.mileage)} />
                      <Spec label="Trans" value={car.transmission} />
                      <Spec label="Fuel" value={getFuel(car)} />
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <Button
                        href={`/cars/${car.slug}`}
                        variant="secondary"
                        className="py-3"
                      >
                        Details
                      </Button>

                      <Button
                        href={`/contact?car=${car.slug}`}
                        className="py-3"
                      >
                        Ask
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-2xl border border-white/10 bg-black/45 px-3 py-3 backdrop-blur-md">
      <p className="text-[0.52rem] font-black uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>

      <p className="mt-1 truncate text-xs font-bold text-white">{value}</p>
    </div>
  );
}
