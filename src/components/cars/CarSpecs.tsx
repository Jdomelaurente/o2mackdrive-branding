import type { Car } from "@/types/car";
import { formatMileage } from "@/lib/format";

type CarSpecsProps = {
  car: Car;
};

export function CarSpecs({ car }: CarSpecsProps) {
  const specs = [
    ["Mileage", formatMileage(car.mileage)],
    ["Transmission", car.transmission],
    ["Fuel type", car.fuelType],
    ["Body type", car.bodyType],
    ["Color", car.color],
    ["Location", car.location],
  ];

  return (
    <dl className="overflow-hidden rounded-2xl border border-white/10 bg-black">
      {specs.map(([label, value]) => (
        <div key={label} className="grid grid-cols-1 border-b border-white/10 last:border-b-0 sm:grid-cols-[0.8fr_1fr]">
          <dt className="bg-white/[0.03] px-4 pb-1 pt-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500 sm:py-3 sm:text-[11px]">{label}</dt>
          <dd className="px-4 pb-3 pt-0 text-sm font-bold text-white sm:py-3">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
