"use client";

import Link from "next/link";
import { useState } from "react";
import type { NavigationLink } from "@/types/site";
import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/ui/BrandLogo";

type MobileMenuProps = {
  links: NavigationLink[];
  ctaLabel: string;
};

export function MobileMenu({ links, ctaLabel }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="shrink-0 md:hidden">
      <button
        type="button"
        className="inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-2xl border border-white/15 bg-black/75 text-white shadow-xl shadow-black/35 backdrop-blur transition hover:border-orange-300/50 hover:bg-black/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300"
        aria-label={open ? "Close mobile navigation" : "Open mobile navigation"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span className="space-y-1.5">
          <span className={`block h-0.5 w-5 bg-current transition ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-5 bg-current transition ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-5 bg-current transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </span>
      </button>

      {open ? (
        <div className="absolute right-0 top-[calc(100%+0.75rem)] w-[min(calc(100vw-1.5rem),22rem)] rounded-2xl border border-white/10 bg-black/95 p-4 shadow-2xl shadow-black/40 backdrop-blur">
          <Link
            href="/"
            className="mb-4 flex w-fit items-center"
            aria-label="O2MackDrive home"
            onClick={() => setOpen(false)}
          >
            <BrandLogo size="sm" variant="wide" className="h-8 w-36" />
          </Link>

          <nav aria-label="Mobile navigation" className="grid gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl px-4 py-3 text-sm font-bold text-slate-200 hover:bg-white/10 hover:text-white"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Button href="/contact" className="mt-4 w-full" onClick={() => setOpen(false)}>
            {ctaLabel}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
