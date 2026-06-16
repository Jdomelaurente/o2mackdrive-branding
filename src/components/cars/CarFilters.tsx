"use client";

import { useMemo, useState } from "react";
import type { Car, CarStatus, FuelType, Transmission } from "@/types/car";
import { applyCarFilters } from "@/lib/filters";
import { PRICE_FILTERS } from "@/lib/constants";
import { CarGrid } from "@/components/cars/CarGrid";

type CarFiltersProps = {
  cars: Car[];
  initialSearch?: string;
};

export function CarFilters({ cars, initialSearch = "" }: CarFiltersProps) {
  const [search, setSearch] = useState(initialSearch);
  const [brand, setBrand] = useState("");
  const [transmission, setTransmission] = useState<Transmission | "">("");
  const [fuelType, setFuelType] = useState<FuelType | "">("");
  const [status, setStatus] = useState<CarStatus | "">("");
  const [priceIndex, setPriceIndex] = useState(0);

  const brands = useMemo(() => Array.from(new Set(cars.map((car) => car.brand))).sort(), [cars]);
  const availableCount = cars.filter((car) => car.status === "Available").length;
  const reservedCount = cars.filter((car) => car.status === "Reserved").length;
  const newestCar = [...cars].sort((firstCar, secondCar) => new Date(secondCar.dateAdded).getTime() - new Date(firstCar.dateAdded).getTime())[0];
  const priceFilter = PRICE_FILTERS[priceIndex];
  const filteredCars = applyCarFilters(cars, {
    search,
    brand,
    transmission,
    fuelType,
    status,
    minPrice: priceFilter.min,
    maxPrice: priceFilter.max,
  });

  function resetFilters() {
    setSearch("");
    setBrand("");
    setTransmission("");
    setFuelType("");
    setStatus("");
    setPriceIndex(0);
  }

  const inputClass =
    "min-h-11 rounded-xl border border-white/10 bg-black px-3 py-2.5 text-sm font-semibold text-white outline-none transition placeholder:text-slate-600 focus:border-orange-300/60 focus:ring-2 focus:ring-orange-300/40 sm:px-4 sm:py-3";
  const labelClass = "text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500 sm:text-[11px]";
  const summaryItems = [
    ["Total Units", cars.length],
    ["Available", availableCount],
    ["Reserved", reservedCount],
    ["Newest", newestCar ? `${newestCar.year} ${newestCar.model}` : "N/A"],
  ];

  return (
    <div className="grid gap-8">
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
        {summaryItems.map(([label, value]) => (
          <div key={label} className="min-w-0 rounded-xl border border-white/10 bg-black/70 p-3 shadow-lg shadow-black/20 sm:p-4">
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500 sm:text-[11px]">{label}</p>
            <p className="mt-2 truncate text-xl font-black text-white sm:text-2xl">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start">
        <form className="rounded-2xl border border-white/10 bg-zinc-950 p-4 shadow-2xl shadow-black/30 sm:p-5 lg:sticky lg:top-24" onSubmit={(event) => event.preventDefault()}>
          <div className="mb-4 flex items-start justify-between gap-3 border-b border-white/10 pb-4 sm:mb-5 sm:gap-4 sm:pb-5">
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-orange-300 sm:text-xs sm:tracking-[0.24em]">Filter desk</p>
              <p className="mt-1 text-sm text-slate-400">Narrow the lot by unit details.</p>
            </div>
            <button type="button" onClick={resetFilters} className="cursor-pointer rounded-lg border border-white/15 px-3 py-2 text-xs font-bold text-white transition hover:border-orange-300/50 hover:bg-white/10">
              Reset
            </button>
          </div>

          <div className="grid gap-4">
          <label className="grid gap-2">
            <span className={labelClass}>Search</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search Fortuner, Civic, 2021..."
              className={inputClass}
            />
          </label>
          <label className="grid gap-2">
            <span className={labelClass}>Brand</span>
            <select value={brand} onChange={(event) => setBrand(event.target.value)} className={inputClass}>
              <option value="">All brands</option>
              {brands.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2">
            <span className={labelClass}>Transmission</span>
            <select value={transmission} onChange={(event) => setTransmission(event.target.value as Transmission | "")} className={inputClass}>
              <option value="">Any</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </label>
          <label className="grid gap-2">
            <span className={labelClass}>Fuel</span>
            <select value={fuelType} onChange={(event) => setFuelType(event.target.value as FuelType | "")} className={inputClass}>
              <option value="">Any</option>
              <option value="Gasoline">Gasoline</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric</option>
            </select>
          </label>
          <label className="grid gap-2">
            <span className={labelClass}>Status</span>
            <select value={status} onChange={(event) => setStatus(event.target.value as CarStatus | "")} className={inputClass}>
              <option value="">Any</option>
              <option value="Available">Available</option>
              <option value="Reserved">Reserved</option>
              <option value="Sold">Sold</option>
            </select>
          </label>
          <label className="grid gap-2">
            <span className={labelClass}>Price range</span>
            <select value={priceIndex} onChange={(event) => setPriceIndex(Number(event.target.value))} className={inputClass}>
              {PRICE_FILTERS.map((item, index) => (
                <option key={item.label} value={index}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          </div>
        </form>

        <div className="grid gap-5">
          <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/55 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-500 sm:text-xs sm:tracking-[0.22em]">Search results</p>
              <p className="mt-1 text-base font-black text-white sm:text-lg">
                Showing {filteredCars.length} of {cars.length} units
              </p>
            </div>
            {search ? <p className="max-w-full truncate rounded-lg bg-white/5 px-3 py-2 text-sm font-bold text-slate-300">Search: {search}</p> : null}
          </div>
          <CarGrid cars={filteredCars} />
        </div>
      </div>
    </div>
  );
}
