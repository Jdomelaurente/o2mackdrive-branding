import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import { Footer, Navbar } from "@/shared/components/layout";
import { CookieConsent } from "@/shared/components/ui";
import { site } from "@/shared/data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: site.businessName,
    template: `%s | ${site.businessName}`,
  },
  description: site.description,
  keywords: ["O2MackDrive", "car trading Philippines", "used cars Philippines", "buy sell trade cars"],
  icons: {
    icon: "/favicon-64.png",
    shortcut: "/favicon-64.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: site.businessName,
    description: site.description,
    type: "website",
    locale: "en_PH",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased`}>
      <body>
        <Navbar />
        <main className="pt-20 md:pt-28">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
