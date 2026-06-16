import { BrandStrip } from "@/components/home/BrandStrip";
import { ContactCTA } from "@/components/home/ContactCTA";
import { FAQSection } from "@/components/home/FAQSection";
import { FeaturedCars } from "@/components/home/FeaturedCars";
import { FinancingCTA } from "@/components/home/FinancingCTA";
import { Hero } from "@/components/home/Hero";
import { ServicesSection } from "@/components/home/ServicesSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandStrip />
      <FeaturedCars />
      <ServicesSection />
      <FAQSection />
      <FinancingCTA />
      <WhyChooseUs />
      <ContactCTA />
    </>
  );
}
