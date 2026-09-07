import { Hero } from "@/features/home/components/Hero";
import { FeaturedCars } from "@/features/home/components/FeaturedCars";
import { WhyChooseUs } from "@/features/about";
import { Philosophy } from "@/features/about";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCars />
      <WhyChooseUs />
      <Philosophy />
    </>
  );
}
