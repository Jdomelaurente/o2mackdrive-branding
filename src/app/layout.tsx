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
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-black focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" className="pt-20 md:pt-28">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
