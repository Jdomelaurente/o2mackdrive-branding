import Link from "next/link";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Container } from "@/components/ui/Container";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Navbar() {
  return (
    <header className="fixed right-3 top-3 z-50 md:inset-x-0 md:top-4 md:px-4">
      <Container className="relative ml-auto flex w-fit max-w-none items-center justify-end rounded-2xl border border-transparent bg-transparent p-0 shadow-none md:mx-auto md:min-h-20 md:w-full md:max-w-7xl md:justify-between md:gap-6 md:border-white/10 md:bg-black/[0.82] md:px-5 md:py-3 md:shadow-2xl md:shadow-black/40 md:backdrop-blur-xl">
        <Link
          href="/"
          className="group hidden min-w-0 flex-1 items-center md:flex md:flex-none"
          aria-label="O2MackDrive home"
        >
          <BrandLogo
            size="md"
            variant="wide"
            className="h-16 w-80 transition duration-300 group-hover:opacity-80"
          />
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.045] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl md:flex"
        >
          {site.navigation.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-slate-300 transition-all duration-200 hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 md:flex">
          <Button
            href="/contact"
            className="px-5 py-2.5 text-sm shadow-lg shadow-black/30 transition-transform duration-200 hover:-translate-y-0.5"
          >
            {site.primaryCtaLabel}
          </Button>
        </div>

        <div className="md:hidden">
          <MobileMenu links={site.navigation} ctaLabel={site.primaryCtaLabel} />
        </div>
      </Container>
    </header>
  );
}
