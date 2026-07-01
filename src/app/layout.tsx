import type { Metadata } from "next";
import { Geist, Geist_Mono, Hanken_Grotesk } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { site } from "@/data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
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
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/logo-new.png", type: "image/png" },
    ],
    shortcut: "/favicon.svg",
    apple: "/logo-new.png",
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
    <html lang="en" data-scroll-behavior="smooth" className={`${geistSans.variable} ${geistMono.variable} ${hankenGrotesk.variable} antialiased`}>
      <body>
        <Navbar />
        <main className="pt-20 md:pt-28">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
