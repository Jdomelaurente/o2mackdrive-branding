type StatCardProps = {
  label: string;
  value: string;
  description?: string;
};

export function StatCard({ label, value, description }: StatCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20">
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="mt-1 text-sm font-semibold text-orange-200">{label}</p>
      {description ? <p className="mt-2 text-sm text-slate-400">{description}</p> : null}
    </div>
  );
}
