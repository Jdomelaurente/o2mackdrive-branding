import Link from "next/link";
import type { ReactNode } from "react";

export const inputClass =
  "w-full border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white";
export const labelClass = "text-[10px] font-black uppercase tracking-wider text-slate-900";
export const selectClass = inputClass;
export const btnPrimary =
  "inline-flex items-center justify-center gap-2 bg-black px-6 py-3 text-[10px] font-black uppercase tracking-widest text-white transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer";
export const btnOutline =
  "inline-flex items-center justify-center gap-2 border border-slate-200 bg-white px-6 py-3 text-[10px] font-bold uppercase tracking-widest !text-black transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer";
export const btnDanger =
  "inline-flex items-center justify-center gap-2 border border-red-200 bg-white px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer";

export function Label({ children }: { children: ReactNode }) {
  return <span className={labelClass}>{children}</span>;
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="grid gap-2">
      <Label>{label}</Label>
      {children}
      {hint ? <span className="text-[10px] text-slate-400">{hint}</span> : null}
    </label>
  );
}

export function Panel({
  title,
  eyebrow,
  action,
  children,
  className = "",
}: {
  title?: string;
  eyebrow?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`border border-slate-200 bg-white shadow-sm ${className}`}>
      {title || eyebrow || action ? (
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4">
          <div>
            {eyebrow ? (
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2 className="mt-0.5 text-sm font-black uppercase tracking-widest text-slate-950">
                {title}
              </h2>
            ) : null}
          </div>
          {action}
        </div>
      ) : null}
      <div className="p-5">{children}</div>
    </section>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="border-b border-slate-200 pb-8">
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
        {eyebrow}
      </p>
      <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
        {title}
      </h1>
      {description ? (
        <div className="mt-4 border-l-2 border-slate-900 pl-4">
          <p className="max-w-xl text-sm leading-relaxed text-slate-600">{description}</p>
        </div>
      ) : null}
    </div>
  );
}

export function StatCard({
  label,
  value,
  sub,
  strong = false,
}: {
  label: string;
  value: string | number;
  sub?: string;
  strong?: boolean;
}) {
  return (
    <div
      className={`border p-5 shadow-sm ${
        strong ? "border-slate-900 bg-black text-white" : "border-slate-200 bg-white text-slate-950"
      }`}
    >
      <p
        className={`text-[10px] font-black uppercase tracking-widest ${
          strong ? "text-white/50" : "text-slate-400"
        }`}
      >
        {label}
      </p>
      <p className="mt-2 text-3xl font-black tracking-tight">{value}</p>
      {sub ? (
        <p className={`mt-1 text-[11px] font-semibold ${strong ? "text-white/60" : "text-slate-500"}`}>
          {sub}
        </p>
      ) : null}
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const tone: Record<string, string> = {
    Available: "bg-slate-900 text-white",
    Reserved: "bg-amber-600 text-white",
    Sold: "bg-slate-400 text-white",
    New: "bg-slate-900 text-white",
    Reviewed: "bg-amber-600 text-white",
    Replied: "bg-slate-800 text-white",
    Closed: "bg-slate-200 text-slate-500",
  };
  const fallback = "bg-slate-100 text-slate-600";
  return (
    <span
      className={`inline-block whitespace-nowrap px-2.5 py-1 text-[9px] font-black uppercase tracking-wider ${
        tone[status] ?? fallback
      }`}
    >
      {status}
    </span>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="border border-dashed border-slate-200 bg-slate-50/60 px-5 py-12 text-center">
      <p className="text-xs font-semibold text-slate-500">{message}</p>
    </div>
  );
}

export function BackLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-500 transition hover:text-slate-950"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
      </svg>
      {children}
    </Link>
  );
}

export function formatPrice(value: number) {
  return "₱" + value.toLocaleString("en-PH");
}

export function formatDate(value: string | Date | null | undefined) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateTime(value: string | Date | null | undefined) {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}