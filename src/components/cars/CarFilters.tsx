"use client";

import { useMemo, useState } from "react";
import type { Car, CarStatus } from "@/types/car";
import { CarGrid } from "@/components/cars/CarGrid";
import { formatPrice } from "@/lib/format";

type CarFiltersProps = {
  cars: Car[];
  initialSearch?: string;
};

// Simple price options for clean dropdown selection matching the design
const PRICE_RANGES = [
  { label: "Any Price", min: 0, max: Infinity },
  { label: "Under ₱1,000,000", min: 0, max: 1000000 },
  { label: "₱1,000,000 - ₱1,300,000", min: 1000000, max: 1300000 },
  { label: "₱1,300,000 - ₱1,500,000", min: 1300000, max: 1500000 },
  { label: "Over ₱1,500,000", min: 1500000, max: Infinity },
];

export function CarFilters({ cars, initialSearch = "" }: CarFiltersProps) {
  // Live form states (submitted on clicking "APPLY FILTERS")
  const [formBrand, setFormBrand] = useState("");
  const [formMinYear, setFormMinYear] = useState("");
  const [formMaxYear, setFormMaxYear] = useState("");
  const [formPriceIndex, setFormPriceIndex] = useState(0);
  const [formStatuses, setFormStatuses] = useState<CarStatus[]>(["Available", "Reserved"]);

  // Active filter states (applied to current list)
  const [activeBrand, setActiveBrand] = useState("");
  const [activeMinYear, setActiveMinYear] = useState("");
  const [activeMaxYear, setActiveMaxYear] = useState("");
  const [activePriceIndex, setActivePriceIndex] = useState(0);
  const [activeStatuses, setActiveStatuses] = useState<CarStatus[]>(["Available", "Reserved"]);

  // Sorting state
  const [sortBy, setSortBy] = useState<"newest" | "price-high-low">("newest");

  const brands = useMemo(() => Array.from(new Set(cars.map((car) => car.brand))).sort(), [cars]);

  // Handle status checkbox changes
  const handleStatusChange = (status: CarStatus) => {
    setFormStatuses((prev) =>
      prev.includes(status) ? prev.filter((item) => item !== status) : [...prev, status]
    );
  };

  // Apply form state to active filter state
  const handleApplyFilters = (event: React.FormEvent) => {
    event.preventDefault();
    setActiveBrand(formBrand);
    setActiveMinYear(formMinYear);
    setActiveMaxYear(formMaxYear);
    setActivePriceIndex(formPriceIndex);
    setActiveStatuses(formStatuses);
  };

  // Filter and Sort the units
  const filteredCars = useMemo(() => {
    let result = cars.filter((car) => {
      // Brand filter
      if (activeBrand && car.brand !== activeBrand) return false;

      // Year filters
      if (activeMinYear && car.year < Number(activeMinYear)) return false;
      if (activeMaxYear && car.year > Number(activeMaxYear)) return false;

      // Price filter
      const priceFilter = PRICE_RANGES[activePriceIndex];
      if (car.price < priceFilter.min || car.price > priceFilter.max) return false;

      // Status filter (match any of the selected statuses, or if empty show none)
      if (activeStatuses.length > 0 && !activeStatuses.includes(car.status)) return false;

      return true;
    });

    // Sort results
    if (sortBy === "price-high-low") {
      result.sort((a, b) => b.price - a.price);
    } else {
      // Newest (by date added / year)
      result.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
    }

    return result;
  }, [cars, activeBrand, activeMinYear, activeMaxYear, activePriceIndex, activeStatuses, sortBy]);

  const inputClass =
    "w-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 outline-none transition focus:border-slate-400 focus:bg-white";
  const labelClass = "text-[10px] font-black uppercase tracking-wider text-slate-900";

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start text-slate-900">
      {/* Sidebar Form */}
      <form onSubmit={handleApplyFilters} className="border border-slate-200 bg-white p-5 shadow-sm">
        <div className="border-b border-slate-200 pb-4 mb-5">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-950">Refine Search</h2>
        </div>

        <div className="grid gap-5">
          {/* Make Select */}
          <label className="grid gap-2">
            <span className={labelClass}>Make</span>
            <select value={formBrand} onChange={(e) => setFormBrand(e.target.value)} className={inputClass}>
              <option value="">All Manufacturers</option>
              {brands.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          {/* Year Range Inputs */}
          <div className="grid gap-2">
            <span className={labelClass}>Year</span>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min"
                value={formMinYear}
                onChange={(e) => setFormMinYear(e.target.value)}
                className={inputClass}
              />
              <input
                type="number"
                placeholder="Max"
                value={formMaxYear}
                onChange={(e) => setFormMaxYear(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {/* Price Range Select */}
          <label className="grid gap-2">
            <span className={labelClass}>Price Range</span>
            <select value={formPriceIndex} onChange={(e) => setFormPriceIndex(Number(e.target.value))} className={inputClass}>
              {PRICE_RANGES.map((item, index) => (
                <option key={item.label} value={index}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          {/* Status Checkboxes */}
          <div className="grid gap-2.5">
            <span className={labelClass}>Status</span>
            <div className="grid gap-2">
              {(["Available", "Reserved", "Sold"] as CarStatus[]).map((statusName) => (
                <label key={statusName} className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formStatuses.includes(statusName)}
                    onChange={() => handleStatusChange(statusName)}
                    className="h-3.5 w-3.5 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                  />
                  <span>{statusName}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Apply Button */}
          <button
            type="submit"
            className="w-full bg-black text-white hover:bg-slate-900 uppercase font-black py-3 text-xs tracking-widest transition cursor-pointer"
          >
            Apply Filters
          </button>
        </div>
      </form>

      {/* Main Results Section */}
      <div className="grid gap-6">
        {/* Results Info and Sort Options */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Showing {filteredCars.length} Results
          </p>
          <div className="flex gap-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
            <button
              onClick={() => setSortBy("price-high-low")}
              className={`hover:text-black transition cursor-pointer ${sortBy === "price-high-low" ? "text-slate-950 underline underline-offset-4" : ""}`}
            >
              Price: High to Low
            </button>
            <span>/</span>
            <button
              onClick={() => setSortBy("newest")}
              className={`hover:text-black transition cursor-pointer ${sortBy === "newest" ? "text-slate-950 underline underline-offset-4" : ""}`}
            >
              Newest Arrival
            </button>
          </div>
        </div>

        {/* The Cars Grid */}
        <CarGrid cars={filteredCars} />
      </div>
    </div>
  );
}
