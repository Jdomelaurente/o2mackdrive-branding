import type { Car } from "@/types/car";
import { CarCard } from "@/components/cars/CarCard";

type CarGridProps = {
  cars: Car[];
};

export function CarGrid({ cars }: CarGridProps) {
  if (cars.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6 text-center shadow-xl shadow-black/30 sm:p-10">
        <p className="text-[0.66rem] font-bold uppercase tracking-[0.22em] text-orange-300 sm:text-xs sm:tracking-[0.24em]">No matching units</p>
        <h2 className="mt-3 text-xl font-black text-white sm:text-2xl">No cars match your filters.</h2>
        <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">Adjust the search, price range, or unit status to widen the inventory list.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:gap-5 md:grid-cols-2 2xl:grid-cols-3">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}
