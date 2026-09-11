import { Hero } from "@/features/home/components/Hero";
import { FeaturedCars } from "@/features/home/components/FeaturedCars";
import { WhyChooseUs } from "@/features/about";
import { Philosophy } from "@/features/about";
import { site } from "@/shared/data/site";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.businessName,
  description: site.description,
  url: "https://o2mackdrive.com",
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Metro Manila",
    addressCountry: "PH",
  },
  areaServed: {
    "@type": "City",
    name: "Metro Manila",
  },
  sameAs: [site.facebookLink],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Hero />
      <FeaturedCars />
      <WhyChooseUs />
      <Philosophy />
    </>
  );
}
