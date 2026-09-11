export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatMileage(value: number): string {
  return `${new Intl.NumberFormat("en-PH").format(value)} km`;
}
