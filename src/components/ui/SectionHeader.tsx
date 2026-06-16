type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
};

export function SectionHeader({ eyebrow, title, description, align = "left", tone = "dark" }: SectionHeaderProps) {
  const titleClass = tone === "light" ? "text-slate-950" : "text-white";
  const descriptionClass = tone === "light" ? "text-slate-600" : "text-slate-300";
  const eyebrowClass = tone === "light" ? "text-orange-600" : "text-orange-300";

  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? <p className={`mb-3 text-xs font-black uppercase tracking-[0.22em] sm:text-sm sm:tracking-[0.18em] ${eyebrowClass}`}>{eyebrow}</p> : null}
      <h2 className={`text-[2rem] font-black leading-none tracking-[-0.04em] sm:text-4xl ${titleClass}`}>{title}</h2>
      {description ? <p className={`mt-4 text-sm leading-7 sm:text-base ${descriptionClass}`}>{description}</p> : null}
    </div>
  );
}
