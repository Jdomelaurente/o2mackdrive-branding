import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import { SiteChrome } from "@/components/layout/SiteChrome";
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

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://o2mackdrive.com"),
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
    siteName: site.businessName,
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: site.businessName,
    description: site.description,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased`}>
      <body className="antialiased">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
