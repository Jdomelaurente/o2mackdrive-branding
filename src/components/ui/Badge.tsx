import type { CarStatus } from "@/types/car";

type BadgeProps = {
  children: React.ReactNode;
  status?: CarStatus;
  className?: string;
};

const statusClasses: Record<CarStatus, string> = {
  Available: "border-emerald-400/30 bg-emerald-400/15 text-emerald-200",
  Reserved: "border-amber-400/30 bg-amber-400/15 text-amber-200",
  Sold: "border-zinc-400/30 bg-zinc-400/15 text-zinc-200",
};

export function Badge({ children, status, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex w-fit items-center rounded-md border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] sm:text-[11px] sm:tracking-[0.16em] ${
        status ? statusClasses[status] : "border-slate-300/25 bg-slate-200/10 text-slate-100"
      } ${className}`}
    >
      {children}
    </span>
  );
}
