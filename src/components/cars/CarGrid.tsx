import type { Car } from "@/types/car";
import { CarCard } from "@/components/cars/CarCard";
import { Reveal } from "@/components/ui/Reveal";

type CarGridProps = {
  cars: Car[];
};

export function CarGrid({ cars }: CarGridProps) {
  if (cars.length === 0) {
    return (
      <div className="border border-dashed border-slate-300 bg-slate-50 p-6 text-center sm:p-10 text-slate-800">
        <p className="text-[0.66rem] font-bold uppercase tracking-[0.22em] text-slate-500 sm:text-xs sm:tracking-[0.24em]">No matching units</p>
        <h2 className="mt-3 text-xl font-black text-slate-900 sm:text-2xl">No cars match your filters.</h2>
        <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">Adjust the search, price range, or unit status to widen the inventory list.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-2">
      {cars.map((car, index) => (
        <Reveal key={car.id} direction="up" delay={(index % 4) * 75}>
          <CarCard car={car} />
        </Reveal>
      ))}
      
      {/* "New Arrival Coming" card */}
      <Reveal direction="up" delay={(cars.length % 4) * 75} className="h-full">
        <div className="flex flex-col items-center justify-center border border-dashed border-slate-300 bg-slate-50/50 p-6 text-center aspect-[16/10] min-h-[280px] h-full">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </div>
          <h3 className="mt-4 text-xs font-black uppercase tracking-wider text-slate-900">New Arrival Coming</h3>
          <p className="mt-2 max-w-[200px] text-[11px] leading-relaxed text-slate-400">
            Our next acquisition is undergoing its 150-point audit.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
