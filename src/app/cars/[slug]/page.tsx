import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CarDetails } from "@/components/cars/CarDetails";
import { cars } from "@/data/cars";
import { Container } from "@/components/ui/Container";
import { formatPrice } from "@/lib/format";

type CarPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return cars.map((car) => ({
    slug: car.slug,
  }));
}

export async function generateMetadata({ params }: CarPageProps): Promise<Metadata> {
  const { slug } = await params;
  const car = cars.find((item) => item.slug === slug);

  if (!car) {
    return {
      title: "Car Not Found",
    };
  }

  const title = `${car.year} ${car.brand} ${car.model}${car.variant ? ` ${car.variant}` : ""}`;

  return {
    title,
    description: `${title} for ${formatPrice(car.price)}. View mileage, specs, features, and inquiry options from O2MackDrive Car Trading.`,
    openGraph: {
      title,
      description: `${title} for ${formatPrice(car.price)}. View mileage, specs, features, and inquiry options from O2MackDrive Car Trading.`,
      images: [car.images[0]],
    },
  };
}

export default async function CarDetailPage({ params }: CarPageProps) {
  const { slug } = await params;
  const car = cars.find((item) => item.slug === slug);

  if (!car) {
    notFound();
  }

  const title = `${car.year} ${car.brand} ${car.model}${car.variant ? ` ${car.variant}` : ""}`;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: title,
    description: car.description,
    image: car.images,
    brand: {
      "@type": "Brand",
      name: car.brand,
    },
    offers: {
      "@type": "Offer",
      price: car.price,
      priceCurrency: "PHP",
      availability: car.status === "Available" ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
      itemCondition: "https://schema.org/UsedCondition",
    },
    vehicleSpecification: {
      "@type": "Vehicle",
      mileageFromOdometer: {
        "@type": "QuantitativeValue",
        value: car.mileage,
        unitCode: "KMT",
      },
      vehicleTransmission: car.transmission,
      fuelType: car.fuelType,
      bodyType: car.bodyType,
      modelDate: car.year,
      color: car.color,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Container>
        <CarDetails car={car} />
      </Container>
    </>
  );
}
