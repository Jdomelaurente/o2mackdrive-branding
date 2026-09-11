import type { MetadataRoute } from "next";
import { cars } from "@/data/cars";

const baseUrl = "https://o2mackdrive.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: `${baseUrl}/home`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${baseUrl}/cars`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/sell-trade`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/financing`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/refund-policy`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/cookie-policy`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  const carPages = cars.map((car) => ({
    url: `${baseUrl}/cars/${car.slug}`,
    lastModified: new Date(car.dateAdded),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...carPages];
}
