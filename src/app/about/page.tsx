import { WhyChooseUs, Philosophy, FAQSection } from "@/features/about";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about O2MackDrive, our philosophy, and why you should choose us.",
};

export default function AboutPage() {
  return (
    <>
      <WhyChooseUs />
      <Philosophy />
      <FAQSection />
    </>
  );
}
