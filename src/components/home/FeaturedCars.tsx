import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cars } from "@/data/cars";
import { formatMileage, formatPrice } from "@/lib/format";

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
          {featuredArrivals.map((car, index) => {
            const title = `${car.year} ${car.brand} ${car.model}${car.variant ? ` ${car.variant}` : ""}`;
            const statusColors: Record<string, string> = {
              Available: "bg-black/90 text-white",
              Reserved: "bg-amber-600 text-white",
              Sold: "bg-slate-400 text-white",
            };

            return (
              <Reveal key={car.id} delay={index * 150} direction="up">
                <article className="flex flex-col group min-w-0">
                  <Link href={`/cars/${car.slug}`} className="block">
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-200">
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-300 flex items-center justify-center">
                        <Image
                          src={car.images[0]}
                          alt={title}
                          fill
                          sizes="(min-width: 768px) 33vw, 100vw"
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Status Badge */}
                      <div className="absolute left-3 top-3 z-10">
                        <span className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest ${statusColors[car.status]}`}>
                          {car.status}
                        </span>
                      </div>
                    </div>
                  </Link>

                  <div className="mt-4 flex flex-col">
                    {/* Body type + color row */}
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      <span>{car.bodyType}</span>
                      <span>·</span>
                      <span>{car.color}</span>
                    </div>

                    {/* Title + Price */}
                    <div className="mt-1.5 flex items-baseline justify-between gap-2">
                      <h3 className="text-base font-bold text-slate-900 transition group-hover:text-orange-500">
                        {title}
                      </h3>
                      <span className="shrink-0 text-base font-bold text-slate-900">
                        {formatPrice(car.price)}
                      </span>
                    </div>

                    {/* Mileage + Transmission */}
                    <p className="mt-1 text-xs text-slate-500">
                      {car.year} · {formatMileage(car.mileage)} · {car.transmission}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
