export type CarStatus = "Available" | "Reserved" | "Sold";

export type Transmission = "Automatic" | "Manual";

export type FuelType = "Gasoline" | "Diesel" | "Hybrid" | "Electric";

export type Car = {
  id: string;
  slug: string;
  brand: string;
  model: string;
  variant?: string;
  year: number;
  price: number;
  mileage: number;
  transmission: Transmission;
  fuelType: FuelType;
  bodyType: string;
  color: string;
  status: CarStatus;
  location: string;
  images: string[];
  featured: boolean;
  spotlight?: boolean;
  highlightLabel?: string;
  description: string;
  features: string[];
  dateAdded: string;
};
