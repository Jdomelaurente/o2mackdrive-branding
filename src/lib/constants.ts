export const PRICE_FILTERS = [
  { label: "Any price", min: undefined, max: undefined },
  { label: "Under PHP 800K", min: undefined, max: 800000 },
  { label: "PHP 800K - PHP 1.2M", min: 800000, max: 1200000 },
  { label: "PHP 1.2M - PHP 1.5M", min: 1200000, max: 1500000 },
  { label: "Above PHP 1.5M", min: 1500000, max: undefined },
] as const;
