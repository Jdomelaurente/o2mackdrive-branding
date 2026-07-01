import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { faqs } from "@/data/faqs";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "O2MackDrive services: financing assistance, document support, vehicle viewing, and trade-in guidance for Metro Manila car buyers.",
};

const processCards = [
  {
    number: "01",
    title: "Unit Selection",
    description:
      "Browse the lot, compare available vehicles, and choose the unit that fits your budget and driving needs.",
    href: "/cars",
    label: "View inventory",
  },
  {
    number: "02",
    title: "Viewing & Verification",
    description:
      "Schedule a visit, inspect the unit, review core details, and ask direct questions before deciding.",
    href: "/contact",
    label: "Schedule viewing",
    dark: true,
  },
  {
    number: "03",
    title: "Sell or Trade",
    description:
      "Send your car details for a practical valuation discussion or trade-in assessment toward another unit.",
    href: "/sell-trade",
    label: "Submit details",
  },
  {
    number: "04",
    title: "Financing Guidance",
    description:
      "Prepare requirements, understand the financing flow, and coordinate next steps with lender evaluation.",
    href: "/financing",
    label: "See checklist",
    muted: true,
  },
];

const serviceStats = [
  { label: "Focus", value: "Buy, sell, trade" },
  { label: "Support", value: "Documents" },
  { label: "Area", value: "Metro Manila" },
];

export default function FinancingPage() {
  const featuredFaqs = faqs.slice(0, 3);

  return (
    <main className="-mt-20 bg-[#f7f5f2] pt-28 text-black md:-mt-28 md:pt-36">
      <Container>
        <section className="grid gap-8 border-b border-black/10 pb-10 lg:grid-cols-[1fr_19rem] lg:items-start">
          <div>
            <p className="text-[0.62rem] font-black uppercase tracking-[0.28em] text-black/45">
              Services desk
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-black leading-[0.95] tracking-tight text-black sm:text-6xl lg:text-7xl">
              Engineering Trust.
            </h1>
            <p className="mt-5 max-w-2xl text-sm font-medium leading-6 text-black/55">
              O2MackDrive is the desk that keeps the deal moving: curated cars,
              clear viewing, document guidance, financing support, and practical
              sell-or-trade conversations.
            </p>
          </div>

          <div className="grid gap-3">
            <Link
              href="/cars"
              className="bg-black px-5 py-3 text-center text-[0.62rem] font-black uppercase tracking-[0.22em] text-white transition hover:bg-zinc-800"
              style={{ color: "#ffffff" }}
            >
              View the cars
            </Link>
            <Link
              href="/contact"
              className="border border-black/30 px-5 py-3 text-center text-[0.62rem] font-black uppercase tracking-[0.22em] text-black transition hover:border-black hover:bg-white"
            >
              Request guidance
            </Link>
          </div>
        </section>

        <div className="relative mt-8 aspect-[16/6.8] min-h-[15rem] overflow-hidden bg-zinc-200">
          <Image
            src="/hero-bg.png"
            alt="Vehicle in the O2MackDrive showroom"
            fill
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="object-cover object-center contrast-110 saturate-75"
            priority
          />
        </div>

        <section className="py-12 sm:py-16">
          <p className="text-[0.58rem] font-black uppercase tracking-[0.28em] text-black/35">
            Match your move
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-black sm:text-4xl">
            Our Process
          </h2>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1.55fr_0.9fr]">
            {processCards.slice(0, 2).map((service) => (
              <ServiceCard key={service.number} service={service} featured />
            ))}
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-[0.9fr_1fr_0.78fr]">
            {processCards.slice(2).map((service) => (
              <ServiceCard key={service.number} service={service} />
            ))}

            <aside className="bg-[#eceae7] p-6">
              <p className="text-[0.6rem] font-black uppercase tracking-[0.24em] text-black/35">
                Profile
              </p>
              <dl className="mt-5 grid gap-4">
                {serviceStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center justify-between border-b border-black/10 pb-3 text-xs"
                  >
                    <dt className="font-bold text-black/45">{stat.label}</dt>
                    <dd className="font-black text-black">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </section>
      </Container>

      <section className="bg-[#111] py-12 text-white sm:py-16">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            <blockquote className="text-lg font-black leading-snug tracking-tight sm:text-2xl">
              &ldquo;The acquisition of my SUV was handled with what I can only
              describe as surgical precision.&rdquo;
              <footer className="mt-5 text-[0.6rem] font-black uppercase tracking-[0.25em] text-white/45">
                Buyer feedback
              </footer>
            </blockquote>
            <blockquote className="text-lg font-black leading-snug tracking-tight sm:text-2xl">
              &ldquo;Transparency is rare in this market. O2MackDrive made each step
              explicit before I committed.&rdquo;
              <footer className="mt-5 text-[0.6rem] font-black uppercase tracking-[0.25em] text-white/45">
                Trade-in customer
              </footer>
            </blockquote>
          </div>
        </Container>
      </section>

      <Container>
        <section className="grid gap-8 border-b border-black/10 py-12 sm:py-16 lg:grid-cols-[18rem_1fr]">
          <h2 className="text-2xl font-black tracking-tight text-black">
            Common Inquiries
          </h2>
          <div className="border-t border-black/10">
            {featuredFaqs.map((faq) => (
              <details key={faq.question} className="group border-b border-black/10 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-sm font-black text-black marker:hidden">
                  {faq.question}
                  <span className="text-lg font-medium text-black/45 transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-black/55">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="py-10 sm:py-14">
          <div className="bg-[#eceae7] px-6 py-10 text-center sm:px-10 sm:py-14">
            <h2 className="text-2xl font-black tracking-tight text-black sm:text-3xl">
              Ready to begin your acquisition?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-black/55">
              Contact our specialists today to discuss your vehicle requirements
              or start with the financing checklist.
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-flex bg-black px-7 py-3 text-[0.62rem] font-black uppercase tracking-[0.22em] text-white transition hover:bg-zinc-800"
              style={{ color: "#ffffff" }}
            >
              Inquire Now
            </Link>
          </div>
        </section>

        <section className="grid gap-8 border-t border-black/10 py-8 text-xs text-black/45 sm:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-tight text-black">
              O2MackDrive
            </p>
            <p className="mt-3 max-w-xs leading-5">{site.description}</p>
          </div>
          <div>
            <p className="font-black uppercase tracking-[0.22em]">Discover</p>
            <div className="mt-3 grid gap-2">
              <Link href="/cars" className="hover:text-black">
                Inventory
              </Link>
              <Link href="/sell-trade" className="hover:text-black">
                Sell or Trade
              </Link>
              <Link href="/contact" className="hover:text-black">
                Contact
              </Link>
            </div>
          </div>
          <div>
            <p className="font-black uppercase tracking-[0.22em]">Contact</p>
            <p className="mt-3 leading-5">{site.location}</p>
            <p className="mt-2 leading-5">{site.phone}</p>
          </div>
        </section>
      </Container>
    </main>
  );
}

type ServiceCardProps = {
  service: (typeof processCards)[number];
  featured?: boolean;
};

function ServiceCard({ service, featured = false }: ServiceCardProps) {
  const tone = service.dark
    ? "bg-black text-white"
    : service.muted
      ? "bg-[#eceae7] text-black"
      : "border border-black/10 bg-[#fbfaf8] text-black";

  return (
    <article className={`${tone} p-6 sm:p-8 ${featured ? "min-h-64" : "min-h-56"}`}>
      <div className="flex h-full flex-col justify-between gap-8">
        <div>
          <div
            className={`flex h-8 w-8 items-center justify-center border text-[0.62rem] font-black ${
              service.dark ? "border-white/25" : "border-black/15"
            }`}
          >
            {service.number}
          </div>
          <h3 className="mt-5 text-lg font-black tracking-tight">{service.title}</h3>
          <p
            className={`mt-3 max-w-md text-sm leading-6 ${
              service.dark ? "text-white/60" : "text-black/55"
            }`}
          >
            {service.description}
          </p>
        </div>

        <Link
          href={service.href}
          className={`inline-flex w-fit border-t pt-3 text-[0.58rem] font-black uppercase tracking-[0.22em] transition ${
            service.dark
              ? "border-white/15 text-white hover:text-white/70"
              : "border-black/10 text-black hover:text-black/55"
          }`}
        >
          {service.label}
        </Link>
      </div>
    </article>
  );
}
