import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

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

export function WhyChooseUs() {
  return (
    <section className="bg-white py-20 text-black sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
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
