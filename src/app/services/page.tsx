import { ServicesSection } from "@/features/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | O2 Mack Drive",
  description: "Explore the premium services offered by O2 Mack Drive.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesSection />
    </>
  );
}
