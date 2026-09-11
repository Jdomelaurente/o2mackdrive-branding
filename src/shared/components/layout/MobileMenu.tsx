"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { NavigationLink } from "@/shared/types/site";
import { Button, BrandLogo } from "@/shared/components/ui";

type MobileMenuProps = {
  links: NavigationLink[];
  ctaLabel: string;
};

export function MobileMenu({ links, ctaLabel }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, close]);

  // Close on click outside
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, close]);

  // Focus trap
  useEffect(() => {
    if (!open || !menuRef.current) return;

    const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTab);
    firstElement?.focus();
    return () => document.removeEventListener("keydown", handleTab);
  }, [open]);

  return (
    <div className="shrink-0 md:hidden" ref={menuRef}>
      <button
        ref={buttonRef}
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
        <div className="absolute right-0 top-[calc(100%+0.75rem)] w-[min(calc(100vw-1.5rem),22rem)] rounded-2xl border border-white/10 bg-black/95 p-4 shadow-2xl shadow-black/40 backdrop-blur animate-slide-down">
          <Link
            href="/"
            className="mb-4 flex w-fit items-center"
            aria-label="O2MackDrive home"
            onClick={close}
          >
            <BrandLogo size="sm" variant="wide" className="h-8 w-36" />
          </Link>

          <nav aria-label="Mobile navigation" className="grid gap-2">
            {links.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ animationDelay: `${i * 40 + 60}ms` }}
                className="animate-fade-in-up rounded-xl px-4 py-3 text-sm font-bold text-slate-200 hover:bg-white/10 hover:text-white"
                onClick={close}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Button href="/contact" className="mt-4 w-full animate-fade-in-up delay-300 !text-slate-950" onClick={close}>
            {ctaLabel}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
