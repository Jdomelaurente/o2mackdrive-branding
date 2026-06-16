import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CarDetails } from "@/components/cars/CarDetails";
import { Container } from "@/components/ui/Container";
import { cars } from "@/data/cars";
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
  };
}

export default async function CarDetailPage({ params }: CarPageProps) {
  const { slug } = await params;
  const car = cars.find((item) => item.slug === slug);

  if (!car) {
    notFound();
  }

  return (
    <Container>
      <CarDetails car={car} />
    </Container>
  );
}
