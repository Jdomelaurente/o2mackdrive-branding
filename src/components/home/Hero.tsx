import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { cars } from "@/data/cars";
import { formatMileage, formatPrice } from "@/lib/format";

function getSpotlightCar() {
  const spotlight = cars.find((car) => car.spotlight);

  if (spotlight) {
    return spotlight;
  }

  const availableCars = cars.filter((car) => car.status === "Available");

  const sortedCars = [
    ...(availableCars.length > 0 ? availableCars : cars),
  ].sort(
    (firstCar, secondCar) =>
      new Date(secondCar.dateAdded).getTime() -
      new Date(firstCar.dateAdded).getTime(),
  );

  return sortedCars[0];
}

function formatCompactPrice(value: number) {
  if (value >= 1_000_000) {
    const millions = value / 1_000_000;

    return `₱${millions
      .toFixed(millions >= 10 ? 0 : 2)
      .replace(/\.?0+$/, "")}M`;
  }

  if (value >= 1_000) {
    return `₱${Math.round(value / 1_000)}K`;
  }

  return formatPrice(value);
}

export function Hero() {
  const car = getSpotlightCar();

  const title = `${car.year} ${car.brand} ${car.model}${
    car.variant ? ` ${car.variant}` : ""
  }`;

  const availableCount = cars.filter(
    (unit) => unit.status === "Available",
  ).length;

  return (
    <section className="relative -mt-20 min-h-[100svh] overflow-hidden border-b border-white/10 bg-black md:-mt-28">
      <Image
        src={car.images[0]}
        alt={title}
        fill
        sizes="100vw"
        className="-scale-x-100 object-cover object-[82%_center] brightness-[1.2] contrast-[1.05] saturate-[1.05]"
        fetchPriority="high"
        loading="eager"
        priority
      />

      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-black/5" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

      {/* Big background brand word */}
      <div className="pointer-events-none absolute left-6 top-[18%] z-[2] hidden text-[14vw] font-black uppercase leading-none tracking-[-0.09em] text-white/[0.03] lg:block">
        O2MACK
      </div>
      <Container className="relative z-10 flex min-h-[100svh] flex-col px-6 pb-6 pt-28 sm:pb-8 sm:pt-36 lg:pt-40">
        {/* Top badge row */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Badge>
              <span className="sm:hidden">Recently Pulled</span>
              <span className="hidden sm:inline">
                {car.highlightLabel ?? "Recently Pulled In"}
              </span>
            </Badge>

            <Badge status={car.status}>{car.status}</Badge>
          </div>
        </div>

        {/* Main hero content */}
        <div className="flex flex-1 items-center py-10 lg:py-12">
          <div className="max-w-[720px]">
            <p className="text-[0.65rem] font-black uppercase tracking-[0.55em] text-orange-300 sm:text-sm">
              Owner&apos;s Current Highlight
            </p>

            <h1 className="mt-5 max-w-3xl text-[3.8rem] font-black leading-[0.9] tracking-[-0.075em] text-white sm:text-7xl lg:text-[6.8rem]">
              Find your next drive.
            </h1>

            <p className="mt-7 max-w-2xl text-base font-medium leading-8 text-slate-100 sm:text-lg">
              Starting with this {title}. Direct car trading, viewing support,
              and practical guidance for buying, selling, or trading units.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={`/cars/${car.slug}`} className="px-7 py-3.5">
                View Highlight
              </Button>

              <Button
                href="/sell-trade"
                variant="secondary"
                className="px-7 py-3.5"
              >
                Sell or Trade Mine
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom search + stats */}
        <div className="grid gap-5 pb-2 lg:grid-cols-[minmax(0,560px)_1fr] lg:items-end lg:gap-12">
          <form
            action="/cars"
            className="flex w-full items-center gap-2 rounded-2xl border border-white/15 bg-white/95 p-2 shadow-2xl shadow-black/50 backdrop-blur sm:max-w-[560px]"
          >
            <label htmlFor="hero-search" className="sr-only">
              Search inventory
            </label>

            <input
              id="hero-search"
              name="search"
              placeholder="What unit are you looking for?"
              className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm font-bold text-slate-950 outline-none placeholder:text-slate-500"
            />

            <button
              type="submit"
              className="min-h-12 cursor-pointer rounded-xl bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-orange-500"
            >
              Search
            </button>
          </form>

          <div className="grid grid-cols-3 gap-3 rounded-2xl border border-white/10 bg-black/45 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl sm:min-w-[460px] lg:ml-auto lg:max-w-[610px] lg:gap-8 lg:px-6">
            <div className="min-w-0">
              <p className="text-[clamp(1.7rem,7vw,2.2rem)] font-black leading-none text-white">
                {availableCount}
              </p>
              <p className="mt-2 text-[0.58rem] font-black uppercase tracking-[0.32em] text-slate-400 sm:text-[0.68rem]">
                Available
              </p>
            </div>

            <div className="min-w-0">
              <p className="text-[clamp(1.7rem,7vw,2.2rem)] font-black leading-none text-white">
                {formatMileage(car.mileage).replace(" km", "")}
              </p>
              <p className="mt-2 text-[0.58rem] font-black uppercase tracking-[0.32em] text-slate-400 sm:text-[0.68rem]">
                Mileage
              </p>
            </div>

            <div className="min-w-0">
              <p className="truncate text-[clamp(1.55rem,6vw,2rem)] font-black leading-none text-orange-400 sm:hidden">
                {formatCompactPrice(car.price)}
              </p>

              <p className="hidden truncate text-2xl font-black leading-none text-orange-400 sm:block lg:text-[2rem]">
                {formatPrice(car.price)}
              </p>

              <p className="mt-2 text-[0.58rem] font-black uppercase tracking-[0.32em] text-slate-400 sm:text-[0.68rem]">
                Price
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
