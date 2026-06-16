import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <BrandLogo
            size="lg"
            variant="wide"
            className="h-12 w-56 sm:h-16 sm:w-72 lg:h-20 lg:w-96"
          />
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">{site.description}</p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">Explore</p>
          <div className="mt-4 grid gap-3">
            {site.navigation.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-slate-400 hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <address className="not-italic">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">Contact</p>
          <div className="mt-4 grid gap-3 text-sm text-slate-400">
            <a href={`tel:${site.phone.replaceAll(" ", "")}`} className="hover:text-white">
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="hover:text-white">
              {site.email}
            </a>
            <span>{site.location}</span>
          </div>
        </address>
      </Container>
      <Container className="border-t border-white/10 py-5 text-sm text-slate-500">
        &copy; 2026 O2MackDrive Car Trading. All rights reserved.
      </Container>
    </footer>
  );
}
