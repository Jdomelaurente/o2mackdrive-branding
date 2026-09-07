import { WhyChooseUs, Philosophy, FAQSection } from "@/features/about";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | O2 Mack Drive",
  description: "Learn more about O2 Mack Drive, our philosophy, and why you should choose us.",
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
