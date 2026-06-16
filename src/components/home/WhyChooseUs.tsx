import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { cars } from "@/data/cars";

const reasons = [
  {
    label: "Clear details",
    value: "01",
  },
  {
    label: "Direct inquiry",
    value: "02",
  },
  {
    label: "Trade support",
    value: "03",
  },
  {
    label: "Viewing help",
    value: "04",
  },
];

const highlights = [
  "Real inventory",
  "Upfront specs",
  "Bank-assisted options",
  "Simple next steps",
];

export function WhyChooseUs() {
  const heroCar = cars.find((car) => car.spotlight) ?? cars[0];

  return (
    <section className="page-section border-y border-white/10 py-14 text-white sm:py-24 lg:py-28">
      <div className="section-fade" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <Container className="relative">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className="flex flex-col justify-between rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-4 shadow-2xl shadow-black/50 backdrop-blur-xl sm:rounded-[2rem] sm:p-8 lg:p-10">
            <div>
              <p className="text-[0.66rem] font-black uppercase tracking-[0.32em] text-orange-300 sm:text-xs sm:tracking-[0.42em]">
                Why MackDrive
              </p>

              <h2 className="mt-4 max-w-xl text-[2rem] font-black leading-none tracking-[-0.07em] text-white sm:text-5xl lg:text-6xl">
                Built for straight deals.
              </h2>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-2.5 sm:mt-10 sm:gap-3">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/40 px-3 py-3 sm:px-4 sm:py-4"
                >
                  <div className="mb-3 h-1 w-8 rounded-full bg-orange-400" />
                  <p className="text-sm font-black text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="group relative min-h-[360px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950 shadow-2xl shadow-black/50 sm:min-h-[460px] sm:rounded-[2rem] lg:min-h-[560px]">
            <Image
              src={heroCar.images[0]}
              alt={`${heroCar.brand} ${heroCar.model}`}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent" />

            <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/45 px-4 py-2 text-[0.65rem] font-black uppercase tracking-[0.24em] text-orange-300 backdrop-blur-md">
              Current highlight
            </div>

            <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
              <div className="rounded-[1.25rem] border border-white/10 bg-slate-950/65 p-4 backdrop-blur-xl sm:rounded-[1.5rem] sm:p-6">
                <p className="text-xs font-black uppercase tracking-[0.28em] text-slate-400">
                  Featured unit
                </p>

                <h3 className="mt-2 text-2xl font-black leading-none tracking-[-0.06em] text-white sm:text-4xl">
                  {heroCar.year} {heroCar.brand} {heroCar.model}
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <div
              key={reason.label}
              className="group rounded-[1.25rem] border border-white/10 bg-white/[0.035] p-4 shadow-xl shadow-black/30 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-orange-400/50 hover:bg-orange-500/10 sm:rounded-[1.5rem] sm:p-5"
            >
              <p className="text-xs font-black uppercase tracking-[0.28em] text-orange-300">
                {reason.value}
              </p>

              <p className="mt-6 text-lg font-black tracking-[-0.04em] text-white sm:mt-8 sm:text-xl">
                {reason.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
