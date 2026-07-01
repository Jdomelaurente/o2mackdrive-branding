import Link from "next/link";
import type { Car } from "@/types/car";
import { financing } from "@/data/financing";
import { site } from "@/data/site";
import { formatPrice } from "@/lib/format";
import { CarGallery } from "@/components/cars/CarGallery";
import { CarSpecs } from "@/components/cars/CarSpecs";
import { InquiryForm } from "@/components/forms/InquiryForm";

type CarDetailsProps = {
  car: Car;
};

export function CarDetails({ car }: CarDetailsProps) {
  const title = `${car.year} ${car.brand} ${car.model}${car.variant ? ` ${car.variant}` : ""}`;

  const statusColors: Record<string, string> = {
    Available: "bg-black text-white",
    Reserved: "bg-amber-600 text-white",
    Sold: "bg-slate-400 text-white",
  };

  return (
    <article className="-mt-20 pt-32 md:-mt-28 md:pt-40 pb-16 text-slate-900">
      <Link href="/cars" className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition">
        ← Back to Inventory
      </Link>

      <div className="mt-6 grid gap-6 sm:mt-8 sm:gap-8 lg:grid-cols-[minmax(0,1.25fr)_420px] lg:items-start">
        <div className="grid gap-6 sm:gap-8">
          <CarGallery car={car} />

          <section className="border border-slate-200 bg-white p-5 sm:p-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Unit Description</p>
            <h2 className="mt-2 text-xl font-black text-slate-950">About This Unit</h2>
            <p className="mt-3 leading-7 text-slate-600">{car.description}</p>
          </section>

          <section className="border border-slate-200 bg-white p-5 sm:p-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Included Details</p>
            <h2 className="mt-2 text-xl font-black text-slate-950">Features</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {car.features.map((feature) => (
                <li key={feature} className="border-b border-slate-100 pb-3 text-sm font-semibold text-slate-700">
                  {feature}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24">
          <div className="border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <span className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-widest ${statusColors[car.status]}`}>
                {car.status}
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{car.location}</span>
            </div>

            <h1 className="mt-4 text-2xl font-black uppercase tracking-tight text-slate-950 sm:text-3xl">{title}</h1>
            <p className="mt-3 text-2xl font-black leading-none text-slate-900 sm:text-3xl">{formatPrice(car.price)}</p>

            <div className="mt-5">
              <CarSpecs car={car} />
            </div>

            <div className="mt-6 grid gap-2.5">
              <Link
                href={`/contact?car=${car.slug}`}
                className="bg-black px-4 py-3 text-center text-[10px] font-black uppercase tracking-widest text-white transition hover:bg-slate-900"
              >
                Check Availability
              </Link>
              <Link
                href={site.messengerLink}
                target="_blank"
                rel="noreferrer"
                className="border border-slate-200 px-4 py-3 text-center text-[10px] font-black uppercase tracking-widest text-slate-900 transition hover:bg-slate-50"
              >
                Ask on Messenger
              </Link>
              <Link
                href="/financing"
                className="px-4 py-3 text-center text-[10px] font-black uppercase tracking-widest text-slate-400 transition hover:text-slate-900"
              >
                Financing Assistance
              </Link>
            </div>

            <p className="mt-5 border-l-2 border-slate-300 pl-4 text-xs leading-6 text-slate-500">{financing.disclaimer}</p>
          </div>
        </aside>
      </div>

      <div className="mt-8 grid gap-6 sm:mt-10 sm:gap-8 lg:grid-cols-[1fr_420px]">
        <section className="border border-slate-200 bg-white p-5 sm:p-6">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Technical Sheet</p>
          <h2 className="mt-2 text-xl font-black text-slate-950">Vehicle Specs</h2>
          <div className="mt-4">
            <CarSpecs car={car} />
          </div>
        </section>
        <InquiryForm carTitle={title} />
      </div>
    </article>
  );
}
