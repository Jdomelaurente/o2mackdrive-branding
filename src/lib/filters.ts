import type { Car, CarStatus, FuelType, Transmission } from "@/types/car";

export type CarFilterState = {
  search?: string;
  brand?: string;
  transmission?: Transmission | "";
  fuelType?: FuelType | "";
  status?: CarStatus | "";
  minPrice?: number;
  maxPrice?: number;
};

export function filterByBrand(cars: Car[], brand: string): Car[] {
  if (!brand) return cars;
  return cars.filter((car) => car.brand === brand);
}

export function filterByTransmission(cars: Car[], transmission: Transmission | ""): Car[] {
  if (!transmission) return cars;
  return cars.filter((car) => car.transmission === transmission);
}

export function filterByFuelType(cars: Car[], fuelType: FuelType | ""): Car[] {
  if (!fuelType) return cars;
  return cars.filter((car) => car.fuelType === fuelType);
}

export function filterByStatus(cars: Car[], status: CarStatus | ""): Car[] {
  if (!status) return cars;
  return cars.filter((car) => car.status === status);
}

export function filterByPriceRange(cars: Car[], minPrice?: number, maxPrice?: number): Car[] {
  return cars.filter((car) => {
    const aboveMin = minPrice ? car.price >= minPrice : true;
    const belowMax = maxPrice ? car.price <= maxPrice : true;
    return aboveMin && belowMax;
  });
}

export function searchCars(cars: Car[], query: string): Car[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return cars;

  return cars.filter((car) => {
    const searchable = [car.brand, car.model, car.variant ?? "", String(car.year)].join(" ").toLowerCase();
    return searchable.includes(normalizedQuery);
  });
}

export function applyCarFilters(cars: Car[], filters: CarFilterState): Car[] {
  return filterByPriceRange(
    filterByStatus(
      filterByFuelType(
        filterByTransmission(filterByBrand(searchCars(cars, filters.search ?? ""), filters.brand ?? ""), filters.transmission ?? ""),
        filters.fuelType ?? "",
      ),
      filters.status ?? "",
    ),
    filters.minPrice,
    filters.maxPrice,
  );
}
