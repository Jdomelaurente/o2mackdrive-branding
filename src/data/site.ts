import type { SiteInfo } from "@/types/site";

export const site: SiteInfo = {
  businessName: "O2MackDrive Car Trading",
  tagline: "Quality Cars. Smooth Deals. Easy Trade-Ins.",
  description:
    "A Philippine car trading business helping customers buy, sell, and trade quality vehicles with clear guidance and direct support.",
  phone: "+63 917 000 0000",
  messengerLink: "https://m.me/o2mackdrive",
  facebookLink: "https://facebook.com/o2mackdrive",
  email: "inquiries@o2mackdrive.example",
  location: "Metro Manila, Philippines",
  navigation: [
    { label: "Home", href: "/" },
    { label: "Cars", href: "/cars" },
    { label: "Sell/Trade", href: "/sell-trade" },
    { label: "Financing", href: "/financing" },
    { label: "Contact", href: "/contact" },
  ],
  primaryCtaLabel: "Inquire Now",
};
