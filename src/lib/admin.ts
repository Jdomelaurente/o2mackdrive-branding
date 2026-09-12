import type { QueryResultRow } from "pg";
import type { Car, CarStatus } from "@/types/car";

export const INQUIRY_STATUSES = ["New", "Reviewed", "Replied", "Closed"] as const;
export const CAR_STATUSES: CarStatus[] = ["Available", "Reserved", "Sold"];

export function mapCarRow(row: QueryResultRow): Car {
  return {
    id: row.id,
    slug: row.slug,
    brand: row.brand,
    model: row.model,
    variant: row.variant ?? undefined,
    year: row.year,
    price: Number(row.price),
    mileage: row.mileage,
    transmission: row.transmission,
    fuelType: row.fuel_type,
    bodyType: row.body_type,
    color: row.color,
    status: row.status,
    location: row.location,
    images: row.images ?? [],
    featured: row.featured,
    spotlight: row.spotlight ?? false,
    highlightLabel: row.highlight_label ?? undefined,
    description: row.description,
    features: row.features ?? [],
    dateAdded: toIsoDate(row.date_added),
  };
}

export function toIsoDate(value: string | Date | null | undefined): string {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toISOString().slice(0, 10);
}

export function slugifyCar(input: {
  year: number | string;
  brand: string;
  model: string;
  variant?: string;
}): string {
  const parts = [String(input.year), input.brand, input.model, input.variant]
    .filter((p): p is string => Boolean(p && p.trim().length > 0))
    .map((p) =>
      p
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, ""),
    );
  return parts.join("-");
}

export function isCarStatus(value: unknown): value is CarStatus {
  return typeof value === "string" && (CAR_STATUSES as string[]).includes(value);
}

export function isInquiryStatus(value: unknown): value is (typeof INQUIRY_STATUSES)[number] {
  return typeof value === "string" && (INQUIRY_STATUSES as readonly string[]).includes(value);
}