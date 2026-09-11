import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import { Container } from "@/components/ui/Container";
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
  title: "Page not found",
  description:
    "The page or car listing you are looking for may no longer be available.",
};

export default function GlobalNotFound() {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased`}
    >
      <body className="bg-white text-black">
        <section className="flex min-h-screen items-center justify-center bg-white py-16 sm:py-24">
          <Container className="text-center">
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">404</p>
            <h1 className="mt-4 text-3xl font-black text-black sm:text-4xl">Page not found</h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
              The page or car listing you are looking for may no longer be available.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/home"
                className="inline-flex min-h-11 items-center justify-center bg-black px-6 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800"
              >
                Back to Home
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center justify-center bg-black px-6 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800"
              >
                Contact Us
              </Link>
            </div>
          </Container>
        </section>
      </body>
    </html>
  );
}