import { ServicesSection } from "@/features/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services",
  description: "Explore the premium services offered by O2MackDrive.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesSection />
    </>
  );
}
