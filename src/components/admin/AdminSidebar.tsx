"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const groups = [
  {
    label: "Manage",
    items: [
      {
        href: "/admin/dashboard",
        label: "Overview",
        match: (p: string) => p === "/admin" || p === "/admin/dashboard",
      },
      { href: "/admin/cars", label: "Inventory", match: (p: string) => p.startsWith("/admin/cars") },
      { href: "/admin/inquiries", label: "Inquiries", match: (p: string) => p.startsWith("/admin/inquiries") },
    ],
  },
  {
    label: "Site",
    items: [
      { href: "/admin/content", label: "Content", match: (p: string) => p.startsWith("/admin/content") },
    ],
  },
];

function NavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`block px-4 py-2.5 text-[11px] font-black uppercase tracking-[0.22em] transition ${
        active
          ? "bg-white !text-black"
          : "text-white/60 hover:bg-white/5 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
  };

  const nav = (
    <nav className="grid gap-8">
      {groups.map((group) => (
        <div key={group.label}>
          <p className="px-4 text-[9px] font-black uppercase tracking-[0.3em] text-white/30">
            {group.label}
          </p>
          <div className="mt-2 grid gap-1">
            {group.items.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                active={item.match(pathname)}
              />
            ))}
          </div>
        </div>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col justify-between bg-black px-4 py-8 text-white lg:flex">
        <div>
          <div className="px-4">
            <p className="text-lg font-black tracking-tight">O2MackDrive</p>
            <p className="mt-1 text-[9px] font-black uppercase tracking-[0.32em] text-orange-400">
              Admin Desk
            </p>
          </div>
          <div className="mt-10">{nav}</div>
        </div>
        <div className="grid gap-1 px-2">
          <Link
            href="/home"
            className="px-2 py-2 text-[10px] font-bold uppercase tracking-widest text-white/40 transition hover:text-white"
          >
            Back to site
          </Link>
          <Link
            href="/admin/login"
            onClick={logout}
            className="px-2 py-2 text-[10px] font-bold uppercase tracking-widest text-white/40 transition hover:text-white"
          >
            Log out
          </Link>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 border-b border-black/10 bg-black px-4 py-3 text-white lg:hidden">
        <div className="flex items-center justify-between">
          <p className="text-sm font-black tracking-tight">
            O2MackDrive
            <span className="ml-2 text-[8px] font-black uppercase tracking-[0.3em] text-orange-400">
              Admin
            </span>
          </p>
          <Link
            href="/home"
            className="text-[9px] font-black uppercase tracking-widest text-white/50"
          >
            View site
          </Link>
          <Link
            href="/admin/login"
            onClick={logout}
            className="text-[9px] font-black uppercase tracking-widest text-white/50"
          >
            Log out
          </Link>
        </div>
        <div className="scrollbar-none -mx-4 mt-3 flex gap-1 overflow-x-auto px-4">
          {groups
            .flatMap((g) => g.items)
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.18em] transition ${
                  item.match(pathname)
                    ? "bg-white !text-black"
                    : "bg-white/10 text-white/70"
                }`}
              >
                {item.label}
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}