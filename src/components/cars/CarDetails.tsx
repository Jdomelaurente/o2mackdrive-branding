import Link from "next/link";
import type { Car } from "@/types/car";
import { financing } from "@/data/financing";
import { site } from "@/data/site";
import { formatPrice } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CarGallery } from "@/components/cars/CarGallery";
import { CarSpecs } from "@/components/cars/CarSpecs";
import { InquiryForm } from "@/components/forms/InquiryForm";

type CarDetailsProps = {
  car: Car;
};

export function CarDetails({ car }: CarDetailsProps) {
  const title = `${car.year} ${car.brand} ${car.model}${car.variant ? ` ${car.variant}` : ""}`;

  return (
    <article className="py-8 sm:py-14">
      <Link href="/cars" className="text-sm font-bold uppercase tracking-[0.18em] text-orange-300 hover:text-orange-200">
        Back to Cars
      </Link>

      <div className="mt-6 grid gap-6 sm:mt-8 sm:gap-8 lg:grid-cols-[minmax(0,1.25fr)_420px] lg:items-start">
        <div className="grid gap-6 sm:gap-8">
          <CarGallery car={car} />

          <section className="rounded-2xl border border-white/10 bg-zinc-950 p-4 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Unit description</p>
            <h2 className="mt-3 text-2xl font-black text-white">About this unit</h2>
            <p className="mt-4 leading-7 text-slate-300">{car.description}</p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-zinc-950 p-4 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Included details</p>
            <h2 className="mt-3 text-2xl font-black text-white">Features</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {car.features.map((feature) => (
                <li key={feature} className="border-b border-white/10 pb-3 text-sm font-semibold text-slate-200">
                  {feature}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24">
          <div className="rounded-2xl border border-white/10 bg-black p-4 shadow-2xl shadow-black/50 sm:p-5">
            <div className="flex items-center justify-between gap-4">
              <Badge status={car.status}>{car.status}</Badge>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{car.location}</span>
            </div>

            <h1 className="metal-text mt-5 text-2xl font-black uppercase tracking-wide text-white sm:text-4xl">{title}</h1>
            <p className="mt-4 break-words text-3xl font-black leading-none text-orange-400 sm:text-4xl">{formatPrice(car.price)}</p>

            <div className="mt-6">
              <CarSpecs car={car} />
            </div>

            <div className="mt-6 grid gap-3">
              <Button href={`/contact?car=${car.slug}`}>Check Availability</Button>
              <Button href={site.messengerLink} variant="secondary" target="_blank" rel="noreferrer">
                Ask on Messenger
              </Button>
              <Button href="/financing" variant="ghost">
                Financing Assistance
              </Button>
            </div>

            <p className="mt-5 border-l-2 border-orange-400/70 pl-4 text-sm leading-6 text-slate-400">{financing.disclaimer}</p>
          </div>
        </aside>
      </div>

      <div className="mt-8 grid gap-6 sm:mt-10 sm:gap-8 lg:grid-cols-[1fr_420px]">
        <section className="rounded-2xl border border-white/10 bg-zinc-950 p-4 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Technical sheet</p>
          <h2 className="mt-3 text-2xl font-black text-white">Vehicle specs</h2>
          <div className="mt-5">
            <CarSpecs car={car} />
          </div>
        </section>
        <InquiryForm carTitle={title} />
      </div>
    </article>
  );
}
