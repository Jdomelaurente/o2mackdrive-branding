"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSidebar } from "./SidebarContext";

const groups = [
  {
    label: "Manage",
    items: [
      {
        href: "/admin/dashboard",
        label: "Overview",
        match: (p: string) => p === "/admin" || p === "/admin/dashboard",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>,
      },
      { 
        href: "/admin/cars", 
        label: "Inventory", 
        match: (p: string) => p.startsWith("/admin/cars"),
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>,
      },
      { 
        href: "/admin/inquiries", 
        label: "Inquiries", 
        match: (p: string) => p.startsWith("/admin/inquiries"),
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
      },
    ],
  },
  {
    label: "Site",
    items: [
      { 
        href: "/admin/content", 
        label: "Content", 
        match: (p: string) => p.startsWith("/admin/content"),
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>,
      },
    ],
  },
];

function NavLink({
  href,
  label,
  icon,
  active,
  isCollapsed,
}: {
  href: string;
  label: string;
  icon?: React.ReactNode;
  active: boolean;
  isCollapsed?: boolean;
}) {
  return (
    <Link
      href={href}
      title={isCollapsed ? label : undefined}
      className={`flex items-center gap-3 py-2.5 text-[11px] font-black uppercase tracking-[0.22em] transition ${
        active
          ? "bg-white !text-black"
          : "text-white/60 hover:bg-white/5 hover:text-white"
      } ${isCollapsed ? "justify-center px-0 tracking-normal" : "px-4"}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
}

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  
  // Mobile doesn't use context right now since it doesn't collapse, but we handle missing context gracefully
  let isCollapsed = false;
  let toggleCollapse = () => {};
  try {
    const sidebarContext = useSidebar();
    isCollapsed = sidebarContext.isCollapsed;
    toggleCollapse = sidebarContext.toggleCollapse;
  } catch {
    // Expected in mobile view if not wrapped, but we wrapped the whole layout so it's fine.
  }

  const logout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
  };

  const nav = (
    <nav className="grid gap-8">
      {groups.map((group) => (
        <div key={group.label}>
          {!isCollapsed && (
            <p className="px-4 text-[9px] font-black uppercase tracking-[0.3em] text-white/30">
              {group.label}
            </p>
          )}
          <div className={`mt-2 grid gap-1 ${isCollapsed ? "px-2" : ""}`}>
            {group.items.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={item.match(pathname)}
                isCollapsed={isCollapsed}
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
      <aside className={`fixed inset-y-0 left-0 z-40 hidden flex-col justify-between bg-black py-8 text-white lg:flex transition-all duration-300 ${
        isCollapsed ? "w-20 px-2" : "w-60 px-4"
      }`}>
        <div>
          <div className={`px-4 flex items-center ${isCollapsed ? "justify-center" : "justify-between"}`}>
            {!isCollapsed ? (
              <div>
                <p className="text-lg font-black tracking-tight">O2MackDrive</p>
                <p className="mt-1 text-[9px] font-black uppercase tracking-[0.32em] text-orange-400">
                  Admin Desk
                </p>
              </div>
            ) : (
              <div className="text-lg font-black text-orange-400">O2</div>
            )}
            
            {!isCollapsed && (
              <button onClick={toggleCollapse} className="text-white/40 hover:text-white transition">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </button>
            )}
          </div>

          {isCollapsed && (
            <div className="mt-6 flex justify-center">
              <button onClick={toggleCollapse} className="text-white/40 hover:text-white transition">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>
          )}
          
          <div className="mt-10">{nav}</div>
        </div>
        <div className="grid gap-1 px-2">
          <Link
            href="/admin/login"
            onClick={logout}
            className={`flex items-center gap-3 py-2.5 text-[10px] font-bold uppercase text-white/40 transition hover:text-white ${
              isCollapsed ? "justify-center tracking-normal" : "px-4 tracking-widest"
            }`}
            title={isCollapsed ? "Log out" : undefined}
          >
            <span className="shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
            </span>
            {!isCollapsed && <span>Log out</span>}
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