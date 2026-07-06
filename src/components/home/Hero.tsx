"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cars } from "@/data/cars";
import { formatPrice } from "@/lib/format";

const sliderCars = cars.filter((car) => car.featured).slice(0, 3);

const carImages = [
  "/cars/sakyanan-1.png",
  "/cars/sakyanan-2.png",
  "/cars/sakyanan-3.png",
];

type FlipState = "idle" | "out" | "in";

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipState, setFlipState] = useState<FlipState>("idle");
  const [slideDir, setSlideDir] = useState<"left" | "right">("left");
  const car = sliderCars[currentIndex];

  const title = `${car.year} ${car.brand} ${car.model}${
    car.variant ? ` ${car.variant}` : ""
  }`;

  const changeCar = (direction: "prev" | "next") => {
    if (flipState !== "idle") return;
    setSlideDir(direction === "next" ? "left" : "right");
    setFlipState("out");
    setTimeout(() => {
      setCurrentIndex((i) => {
        if (direction === "prev") return i === 0 ? sliderCars.length - 1 : i - 1;
        return i === sliderCars.length - 1 ? 0 : i + 1;
      });
      setFlipState("in");
    }, 150);
    setTimeout(() => setFlipState("idle"), 300);
  };

  const prevImage = () => changeCar("prev");
  const nextImage = () => changeCar("next");

  return (
    <section className="relative -mt-20 h-[100svh] overflow-hidden bg-[#111] md:-mt-28">
      {/* Background image — architectural showroom */}
      <Image
        src="/hero-bg.png"
        alt="Showroom background"
        fill
        sizes="100vw"
        className="z-[1] object-cover object-center brightness-[1.5] contrast-[1.1]"
        fetchPriority="high"
        loading="eager"
        priority
      />

      {/* Top gradient for navbar readability over the bright skylight */}
      <div className="absolute inset-x-0 top-0 z-[2] h-28 bg-gradient-to-b from-black/50 to-transparent" />

      {/* Content layer — uses h-full to fill the section exactly */}
      <Container className="relative z-10 flex h-[100svh] flex-col justify-between px-6 pb-5 pt-0 md:pt-27">
        {/* ── Top: centered headline ── */}
        <div className="shrink-0 text-center">
          <h1 className="mx-auto max-w-3xl text-[clamp(2rem,6vw,3.8rem)] text-black font-black italic leading-[0.92] tracking-[-0.06em] text-black font-display [text-shadow:0_2px_8px_rgba(255,255,255,0.6)]">
            Quality Cars.
            <br />
            Smooth Deals.
          </h1>

          <p className="mx-auto mt-3 max-w-md text-xs font-medium leading-relaxed text-slate-300 sm:text-sm">
            Browse quality used cars in Metro Manila — SUVs, sedans, pickups,
            and more. Straight deals, easy trade-ins, and full document support.
            No pressure. Just your next drive.
          </p>
        </div>

        {/* ── Middle: car showcase (takes remaining space) ── */}
        <div className="relative flex min-h-0 flex-1 items-end justify-center pb-8">
          {/* Big watermark text behind the car */}
          <div
            className="pointer-events-none absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 select-none text-[20vw] font-black leading-none tracking-[-0.08em] text-white/[0.05]"
            aria-hidden="true"
          >
            O2MD
          </div>

          {/* Car image — scaled up significantly to look huge and sit on the floor */}
          <div
            className={
              "relative z-[2] w-full max-w-4xl lg:max-w-[35rem] -mb-5" +
              (flipState === "out"
                ? slideDir === "left"
                  ? " animate-car-out-left"
                  : " animate-car-out-right"
                : "") +
              (flipState === "in"
                ? slideDir === "left"
                  ? " animate-car-in-right"
                  : " animate-car-in-left"
                : "")
            }
          >
            <Image
              src={carImages[currentIndex]}
              alt={title}
              width={1000}
              height={600}
              sizes="(max-width: 768px) 95vw, (max-width: 1200px) 85vw, 1200px"
              className="mx-auto h-auto max-h-[58vh] w-full object-contain drop-shadow-[0_25px_65px_rgba(0,0,0,0.85)]"
              fetchPriority="high"
              loading="eager"
              priority
            />
          </div>

          {/* Left Arrow button */}
          <button
            onClick={prevImage}
            className="absolute left-0 top-12 z-[3] hidden -translate-y-1/2 items-center justify-center rounded-xl border border-white/15 bg-white/5 p-3 text-white/70 backdrop-blur-md transition hover:border-orange-400/50 hover:bg-orange-500/10 hover:text-orange-400 lg:flex"
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
            className="absolute right-0 top-12 z-[3] hidden -translate-y-1/2 items-center justify-center rounded-xl border border-white/15 bg-white/5 p-3 text-white/70 backdrop-blur-md transition hover:border-orange-400/50 hover:bg-orange-500/10 hover:text-orange-400 lg:flex"
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
            className={
              `absolute bottom-8 right-0 z-[3] hidden border border-white/10 bg-white/95 px-6 py-5 shadow-2xl shadow-black/40 backdrop-blur lg:block` +
              (flipState === "out" ? " animate-flip-out" : "") +
              (flipState === "in" ? " animate-flip-in" : "")
            }
            style={{ perspective: "1000px", transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
          >
            <p className="text-[0.55rem] font-bold uppercase tracking-[0.25em] text-slate-500">
              Featured Model
            </p>

            <p className="mt-1 text-xl font-black tracking-tight text-slate-950">
              {car.brand} {car.model}{car.variant ? ` ${car.variant}` : ""}
            </p>

            <p className="mt-0.5 text-[0.55rem] uppercase tracking-[0.2em] text-slate-400">
              {car.bodyType} · {car.color}
            </p>

            <div className="mt-2.5 border-t border-slate-200 pt-2.5">
              <p className="text-[0.5rem] font-bold uppercase tracking-[0.25em] text-slate-400">
                Mileage&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Price
              </p>

              <div className="mt-1 flex items-baseline gap-6">
                <span className="text-base font-black text-slate-900">
                  {car.mileage.toLocaleString("en-PH")} km
                </span>

                <span className="text-base font-black text-slate-900">
                  {formatPrice(car.price)}
                </span>
              </div>

              <p className="mt-1.5 text-[0.5rem] uppercase tracking-[0.2em] text-slate-400">
                {car.transmission} · {car.fuelType}
              </p>
            </div>
          </div>
        </div>

        {/* ── Bottom: CTA buttons ── */}
        <div className="relative z-[3] flex shrink-0 flex-col items-center gap-2.5 sm:flex-row sm:justify-center">
          <Button href="/cars" className="px-7 py-3">
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
            className="px-7 py-3"
          >
            Our Process
          </Button>
        </div>
      </Container>
    </section>
  );
}
