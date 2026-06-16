import Image from "next/image";
import Link from "next/link";
import type { Car } from "@/types/car";
import { formatMileage, formatPrice } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

type CarCardProps = {
  car: Car;
};

export function CarCard({ car }: CarCardProps) {
  const title = `${car.year} ${car.brand} ${car.model}${car.variant ? ` ${car.variant}` : ""}`;
  const specs = [
    ["Mileage", formatMileage(car.mileage)],
    ["Trans.", car.transmission],
    ["Fuel", car.fuelType],
  ];

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-xl shadow-black/25 transition hover:border-orange-300/35">
      <Link href={`/cars/${car.slug}`} className="block" aria-label={`View details for ${title}`}>
        <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
          <Image
            src={car.images[0]}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
            loading="eager"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute left-3 top-3">
            <Badge status={car.status}>{car.status}</Badge>
          </div>
        </div>
      </Link>
      <div className="p-3.5 sm:p-4">
        <div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{car.bodyType}</p>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{car.location}</p>
          </div>
          <h3 className="mt-2 min-h-0 text-lg font-black leading-tight text-white sm:min-h-14 sm:text-xl">{title}</h3>
          <p className="mt-3 break-words text-[1.45rem] font-black leading-none text-orange-400 sm:text-2xl">{formatPrice(car.price)}</p>
        </div>

        <dl className="mt-4 grid grid-cols-3 rounded-xl border border-white/10 bg-black/45">
          {specs.map(([label, value]) => (
            <div key={label} className="min-w-0 border-r border-white/10 p-2.5 last:border-r-0 sm:p-3">
              <dt className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-500 sm:text-[10px]">{label}</dt>
              <dd className="mt-1 truncate text-xs font-semibold text-slate-200 sm:text-sm">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:gap-3">
          <Button href={`/cars/${car.slug}`} variant="secondary" className="px-4 py-2.5">
            Details
          </Button>
          <Button href={`/contact?car=${car.slug}`} className="px-4 py-2.5">
            Ask
          </Button>
        </div>
      </div>
    </article>
  );
}
