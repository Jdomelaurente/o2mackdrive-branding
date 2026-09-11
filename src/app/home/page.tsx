"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CarCard } from "@/components/cars/CarCard";
import { cars } from "@/data/cars";
import { formatPrice } from "@/lib/format";
import { site } from "@/data/site";

const sliderCars = cars.filter((car) => car.featured).slice(0, 3);

const carImages = [
  "/cars/sakyanan-1.png",
  "/cars/sakyanan-2.png",
  "/cars/sakyanan-3.png",
];

type FlipState = "idle" | "out" | "in";

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipState, setFlipState] = useState<FlipState>("idle");
  const [slideDir, setSlideDir] = useState<"left" | "right">("left");
  const touchStartX = useRef<number | null>(null);
  const mouseStartX = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const car = sliderCars[currentIndex];

  const title = `${car.year} ${car.brand} ${car.model}${
    car.variant ? ` ${car.variant}` : ""
  }`;

  // Clean up timeouts on unmount
  useEffect(() => {
    const currentTimeouts = timeoutsRef.current;
    return () => {
      currentTimeouts.forEach(clearTimeout);
    };
  }, []);

  const changeCar = useCallback((direction: "prev" | "next") => {
    if (flipState !== "idle") return;
    setSlideDir(direction === "next" ? "left" : "right");
    setFlipState("out");

    const t1 = setTimeout(() => {
      setCurrentIndex((i) => {
        if (direction === "prev") return i === 0 ? sliderCars.length - 1 : i - 1;
        return i === sliderCars.length - 1 ? 0 : i + 1;
      });
      setFlipState("in");
    }, 220);

    const t2 = setTimeout(() => setFlipState("idle"), 520);

    timeoutsRef.current.push(t1, t2);
  }, [flipState]);

  const prevImage = () => changeCar("prev");
  const nextImage = () => changeCar("next");

  // Touch / swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 40) return; // ignore tiny taps
    if (delta < 0) nextImage();
    else prevImage();
  };

  // Mouse drag handlers (desktop)
  const handleMouseDown = (e: React.MouseEvent) => {
    mouseStartX.current = e.clientX;
    setIsDragging(false);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (mouseStartX.current === null) return;
    if (Math.abs(e.clientX - mouseStartX.current) > 8) setIsDragging(true);
  };
  const handleMouseUp = (e: React.MouseEvent) => {
    if (mouseStartX.current === null) return;
    const delta = e.clientX - mouseStartX.current;
    mouseStartX.current = null;
    if (!isDragging || Math.abs(delta) < 40) return;
    setIsDragging(false);
    if (delta < 0) nextImage();
    else prevImage();
  };
  const handleMouseLeave = () => {
    mouseStartX.current = null;
    setIsDragging(false);
  };

  // Determine slide animation class — only applied during transitions, never during idle
  const carSlideClass = (() => {
    if (flipState === "out") return slideDir === "left" ? " animate-car-out-left" : " animate-car-out-right";
    if (flipState === "in")  return slideDir === "left" ? " animate-car-in-right" : " animate-car-in-left";
    return "";
  })();

  // Determine flip animation class for the spec card (matches arrow direction)
  const cardFlipClass = (() => {
    if (flipState === "out") return slideDir === "left" ? " animate-flip-out-left"  : " animate-flip-out-right";
    if (flipState === "in")  return slideDir === "left" ? " animate-flip-in-right"  : " animate-flip-in-left";
    return "";
  })();

  return (
    <section className="relative -mt-20 min-h-[80svh] overflow-hidden bg-[#111] md:-mt-28">
      {/* Background image — architectural showroom */}
      <Image
        src="/screen-4.png"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="z-[1] object-cover object-center brightness-[1.15] contrast-[1.05]"
        fetchPriority="high"
        loading="eager"
        priority
      />

      {/* Top gradient for navbar readability over the bright skylight */}
      <div className="absolute inset-x-0 top-0 z-[2] h-28 bg-gradient-to-b from-black/50 to-transparent" />

      {/* Content layer */}
      <Container className="relative z-10 flex min-h-[80svh] flex-col justify-between px-6 pb-2 pt-10 sm:pt-12 md:pt-14">
        {/* ── Top: centered headline ── */}
        <div className="shrink-0 text-center animate-fade-in-up">
          <h1 className="mx-auto mt-6 max-w-2xl text-[clamp(1.6rem,4.5vw,2.8rem)] text-black font-black italic leading-[0.95] tracking-[-0.06em] font-display [text-shadow:0_2px_8px_rgba(255,255,255,0.6)]">
            Quality Cars.
            <br />
            Smooth Deals.
          </h1>

          <p className="mx-auto mt-1.5 max-w-[400px] text-[0.75rem] font-medium leading-relaxed text-slate-300 sm:text-[0.8rem] animate-fade-in-up delay-100">
            Browse quality used cars in Metro Manila — SUVs, sedans, pickups,
            and more. Straight deals, easy trade-ins, and full document support.
            No pressure. Just your next drive.
          </p>
        </div>

        {/* ── Middle: car showcase ── */}
        <div className="relative flex h-[55vh] max-h-[55vh] shrink-0 items-end justify-center pb-2">
          {/* Car image — entrance animation only on mount, slide animations on transitions */}
          <div
            className="relative z-[2] w-full lg:max-w-[52rem] xl:max-w-[65rem] 2xl:max-w-[75rem] mb-2 animate-fade-in-scale delay-150 select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            style={{ touchAction: "pan-y", cursor: isDragging ? "grabbing" : "grab" }}
          >
            <div className={"w-full h-full" + carSlideClass}>
              <Image
                key={currentIndex}
                src={carImages[currentIndex]}
                alt={title}
                width={1000}
                height={600}
                sizes="(max-width: 768px) 95vw, (max-width: 1200px) 85vw, 1200px"
                className="mx-auto h-auto max-h-[52vh] w-full object-contain drop-shadow-[0_25px_65px_rgba(0,0,0,0.85)]"
                fetchPriority="high"
                loading="eager"
                priority
              />
            </div>
          </div>

          {/* Left Arrow button */}
          <button
            onClick={prevImage}
            className="absolute left-0 top-1/2 z-[3] flex -translate-y-1/2 items-center justify-center rounded-xl border border-white/15 bg-white/5 p-2 sm:p-3 text-white/70 backdrop-blur-md transition hover:border-orange-400/50 hover:bg-orange-500/10 hover:text-orange-400 lg:p-4"
            aria-label="Previous image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow button */}
          <button
            onClick={nextImage}
            className="absolute right-0 top-1/2 z-[3] flex -translate-y-1/2 items-center justify-center rounded-xl border border-white/15 bg-white/5 p-2 sm:p-3 text-white/70 backdrop-blur-md transition hover:border-orange-400/50 hover:bg-orange-500/10 hover:text-orange-400 lg:p-4"
            aria-label="Next image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>

          {/* Featured model spec card */}
          <div
            className="absolute bottom-0 right-14 z-[3] hidden md:block animate-fade-in-up delay-300"
            style={{ perspective: "800px" }}
          >
            <div
              className={"border border-white/10 bg-white/95 px-4 py-3.5 shadow-2xl shadow-black/40 backdrop-blur" + cardFlipClass}
              style={{ transformOrigin: "center", backfaceVisibility: "hidden", willChange: "transform, opacity" }}
            >
              <p className="text-[0.5rem] font-bold uppercase tracking-[0.25em] text-slate-500">
                Featured Model
              </p>

              <p className="mt-0.5 text-base font-black tracking-tight text-slate-950">
                {car.brand} {car.model}{car.variant ? ` ${car.variant}` : ""}
              </p>

              <p className="mt-0.5 text-[0.5rem] uppercase tracking-[0.2em] text-slate-400">
                {car.bodyType} · {car.color}
              </p>

              <div className="mt-2 border-t border-slate-200 pt-2">
                <p className="text-[0.45rem] font-bold uppercase tracking-[0.25em] text-slate-400">
                  Mileage&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Price
                </p>

                <div className="mt-0.5 flex items-baseline gap-4">
                  <span className="text-sm font-black text-slate-900">
                    {car.mileage.toLocaleString("en-PH")} km
                  </span>

                  <span className="text-sm font-black text-slate-900">
                    {formatPrice(car.price)}
                  </span>
                </div>

                <p className="mt-1 text-[0.45rem] uppercase tracking-[0.2em] text-slate-400">
                  {car.transmission} · {car.fuelType}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom: CTA buttons ── */}
        <div className="relative z-[3] flex shrink-0 flex-col items-center gap-2 pb-2 sm:flex-row sm:justify-center animate-fade-in-up delay-200">
          <Button href="/cars" className="px-6 py-2.5 text-sm">
            <span className="text-black">Browse Inventory</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-2 text-black"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Button>

          <Button
            href="/sell-trade"
            variant="ghost"
            className="px-6 py-2.5 text-sm"
          >
            Our Process
          </Button>
        </div>
      </Container>
    </section>
  );
}

function FeaturedCars() {
  const featuredArrivals = cars.filter((car) => car.featured).slice(0, 3);

  return (
    <section className="bg-[#f9f9f9] py-16 text-black sm:py-24">
      <Container>
        <Reveal direction="up">
          <div className="mb-10 flex items-end justify-between border-b border-slate-200 pb-5">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                New Arrivals
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                The latest additions to our curated warehouse.
              </p>
            </div>

            <Link
              href="/cars"
              className="text-xs font-bold uppercase tracking-wider text-slate-900 underline underline-offset-4 hover:text-orange-500"
            >
              View Full Warehouse
            </Link>
          </div>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-3">
          {featuredArrivals.map((car, index) => (
            <Reveal key={car.id} delay={index * 150} direction="up">
              <CarCard car={car} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

const features = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-6 w-6 text-slate-900"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
      </svg>
    ),
    title: "Upfront & Honest",
    description:
      "We show real prices, real status (Available, Reserved, Sold), and real specs — no hidden charges, no bait-and-switch. What you see is what you get.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-6 w-6 text-slate-900"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
        />
      </svg>
    ),
    title: "Fast, Simple Process",
    description:
      "Inquire, schedule a viewing, and close the deal — all in a few steps. No endless back-and-forth. We respect your time and keep the transaction moving.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-6 w-6 text-slate-900"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12z"
        />
      </svg>
    ),
    title: "Quality Units Only",
    description:
      "Every car in our lot is personally checked before listing — we don't add units we wouldn't drive ourselves. SUVs, sedans, and pickups that are ready to go.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-6 w-6 text-slate-900"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-6.75a1.125 1.125 0 0 0-1.125 1.125v3.375m9 0h-9M9 6a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z"
        />
      </svg>
    ),
    title: "Trade-In Friendly",
    description:
      "Got a car to swap? We handle trade-ins directly — no dealership middleman. Bring your unit, we'll assess it and apply it toward your next purchase.",
  },
];

function WhyChooseUs() {
  return (
    <section className="bg-white pt-24 pb-12 text-black sm:pt-24 sm:pb-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20 2xl:gap-28">
          {/* Left Column */}
          <Reveal direction="left">
            <div>
              <h2 className="text-4xl font-black leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                The
                <br />
                O2Mack
                <br />
                Way.
              </h2>
              <p className="mt-6 max-w-xs text-sm leading-relaxed text-slate-500">
                We run a straightforward car trading desk in Metro Manila. No pressure, no fluff — just quality units, clear prices, and smooth deals.
              </p>
            </div>
          </Reveal>

          {/* Right Column (2x2 Grid) */}
          <div className="grid gap-x-12 gap-y-12 sm:grid-cols-2">
            {features.map((feature, index) => (
              <Reveal key={index} direction="up" delay={index * 100}>
                <div className="flex flex-col items-start">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                    {feature.icon}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function Philosophy() {
  return (
    <section className="bg-black py-28 text-white text-center">
      <Container>
        <Reveal direction="scale" duration={1200}>
          <blockquote className="mx-auto max-w-4xl">
            <p className="text-3xl font-bold leading-normal tracking-tight sm:text-4xl md:text-5xl md:leading-relaxed">
              &ldquo;Quality cars. Honest prices. That&rsquo;s the whole deal.&rdquo;
            </p>
            <footer className="mt-8">
              <cite className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 not-italic sm:text-xs">
                O2MackDrive — Metro Manila Car Trading
              </cite>
            </footer>
          </blockquote>
        </Reveal>
      </Container>
    </section>
  );
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.businessName,
  description: site.description,
  url: "https://o2mackdrive.com/home",
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Metro Manila",
    addressCountry: "PH",
  },
  areaServed: {
    "@type": "City",
    name: "Metro Manila",
  },
  sameAs: [site.facebookLink],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Hero />
      <FeaturedCars />
      <WhyChooseUs />
      <Philosophy />
    </>
  );
}