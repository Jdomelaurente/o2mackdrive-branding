"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { MobileMenu } from "@/components/layout/MobileMenu";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Inventory", href: "/cars" },
  { label: "Sell/Trade", href: "/sell-trade" },
  { label: "Services", href: "/financing" },
  { label: "About", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Pages with white backgrounds should always have the white/black navbar style
  const isLightPage = pathname === "/sell-trade" || pathname === "/financing" || pathname === "/contact" || pathname.startsWith("/cars");
  const isScrolledStyle = scrolled || isLightPage;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    // Set initial state in case page loads already scrolled
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolledStyle
          ? "bg-white/80 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <Container className="flex min-h-16 items-center justify-between gap-4 px-6 py-4 md:min-h-20 md:py-5">
        {/* Brand name */}
        <Link
          href="/"
          className="shrink-0 text-lg font-black tracking-tight transition hover:opacity-80 sm:text-xl"
          style={{ color: isScrolledStyle ? "#000000" : "#ffffff" }}
          aria-label="O2MackDrive home"
        >
          O2MackDrive
        </Link>

        {/* Center navigation */}
        <nav
          aria-label="Primary navigation"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-[13px] font-semibold transition hover:text-orange-500"
              style={{ color: isScrolledStyle ? "#000000" : "#ffffffff" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA button */}
        <Link
          href="/contact"
          className={`hidden px-6 py-2.5 text-[13px] font-bold transition md:inline-flex ${
            isScrolledStyle
              ? "bg-slate-900 text-white hover:bg-slate-700"
              : "bg-white hover:bg-slate-100"
          }`}
          style={isScrolledStyle ? {} : { color: "#000000" }}
        >
          Contact
        </Link>

        {/* Mobile menu */}
        <div className="md:hidden">
          <MobileMenu
            links={navLinks.map((l) => ({ label: l.label, href: l.href }))}
            ctaLabel="Contact"
          />
        </div>
      </Container>
    </header>
  );
}
