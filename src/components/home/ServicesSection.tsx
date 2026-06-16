import Link from "next/link";
import { services } from "@/data/services";
import { Container } from "@/components/ui/Container";

const serviceActions: Record<string, { label: string; href: string }> = {
  "Buy a Car": { label: "View inventory", href: "/cars" },
  "Sell Your Car": { label: "Send details", href: "/sell-trade" },
  "Trade Your Car": { label: "Start trade", href: "/sell-trade" },
  "Financing Assistance": { label: "Requirements", href: "/financing" },
  "Document Assistance": { label: "Get guidance", href: "/contact" },
  "Vehicle Viewing": { label: "Schedule", href: "/contact" },
};

export function ServicesSection() {
  return (
    <section className="page-section border-y border-white/10 py-14 text-white sm:py-24 lg:py-28">
      <div className="section-fade" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <Container className="relative">
        <div className="mb-8 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between sm:gap-5">
          <div>
            <p className="text-[0.66rem] font-black uppercase tracking-[0.32em] text-orange-300 sm:text-xs sm:tracking-[0.42em]">
              Garage desk
            </p>

            <h2 className="mt-3 max-w-2xl text-[2rem] font-black leading-none tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
              Pick your next move.
            </h2>
          </div>

          <p className="max-w-sm text-sm font-medium leading-6 text-slate-400">
            Buy, sell, trade, view, or prepare financing.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const action = serviceActions[service.title] ?? {
              label: "Contact us",
              href: "/contact",
            };

            return (
              <Link
                key={service.title}
                href={action.href}
                className="group relative min-h-[210px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-4 shadow-2xl shadow-black/40 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-orange-400/50 hover:bg-orange-500/10 sm:min-h-[260px] sm:rounded-[2rem] sm:p-6"
              >
                <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-orange-500/10 blur-3xl transition group-hover:bg-orange-500/20" />

                <div className="relative flex h-full flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-orange-300/30 bg-orange-500/10 text-xs font-black text-orange-300 transition group-hover:border-orange-300 group-hover:bg-orange-500 group-hover:text-white">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="text-xl text-orange-300 transition group-hover:translate-x-1">
                        &rarr;
                      </span>
                    </div>

                    <h3 className="mt-6 max-w-xs text-xl font-black leading-none tracking-[-0.05em] text-white sm:mt-8 sm:text-3xl">
                      {service.title}
                    </h3>
                  </div>

                  <div className="mt-6 sm:mt-8">
                    <p className="line-clamp-2 max-w-sm text-sm font-medium leading-6 text-slate-400">
                      {service.description}
                    </p>

                    <div className="mt-5 inline-flex rounded-full border border-white/10 bg-black/35 px-4 py-2 text-[0.65rem] font-black uppercase tracking-[0.22em] text-slate-300 transition group-hover:border-orange-400/50 group-hover:text-white">
                      {action.label}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
