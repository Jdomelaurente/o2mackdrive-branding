import { Hero } from "@/components/home/Hero";
import { FeaturedCars } from "@/components/home/FeaturedCars";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Philosophy } from "@/components/home/Philosophy";

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
