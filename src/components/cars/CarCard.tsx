import Image from "next/image";
import Link from "next/link";
import type { Car } from "@/types/car";
import { formatMileage, formatPrice } from "@/lib/format";

type CarCardProps = {
  car: Car;
};

export function CarCard({ car }: CarCardProps) {
  const title = `${car.brand} ${car.model}${car.variant ? ` ${car.variant}` : ""}`;
  const specs = [
    ["Mileage", formatMileage(car.mileage)],
    ["Transmission", car.transmission],
    ["Fuel", car.fuelType],
  ];

  // Map status color to match the clean mockup (black/slate styling)
  const statusColorMap = {
    Available: "bg-slate-900 text-white",
    Reserved: "bg-amber-600 text-white",
    Sold: "bg-slate-400 text-white",
  };

  return (
    <article className="overflow-hidden border border-slate-200 bg-white transition hover:shadow-lg min-w-0">
      <Link href={`/cars/${car.slug}`} className="block" aria-label={`View details for ${title}`}>
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <Image
            src={car.images[0]}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-500 hover:scale-105"
            loading="eager"
          />
          <div className="absolute left-3 top-3">
            <span className={`inline-block px-2.5 py-1 text-[9px] font-black uppercase tracking-wider ${statusColorMap[car.status]}`}>
              {car.status}
            </span>
          </div>
        </div>
      </Link>
      <div className="p-4 sm:p-5">
        <div className="flex items-baseline justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{car.year} {car.brand}</p>
            <h3 className="mt-1 text-base font-black text-slate-900 uppercase tracking-tight">{car.model} {car.variant}</h3>
          </div>
          <p className="text-lg font-black text-slate-900">{formatPrice(car.price)}</p>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {specs.map(([label, value]) => (
            <div key={label} className="min-w-0">
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
              <p className="mt-1 truncate text-xs font-black text-slate-800 uppercase">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
