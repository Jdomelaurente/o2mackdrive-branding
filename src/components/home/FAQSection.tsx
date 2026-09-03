"use client";

import { useState } from "react";
import { faqs } from "@/data/faqs";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative border-t border-white/10 bg-black py-14 text-white sm:py-24 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(249,115,22,0.12),transparent_28%),linear-gradient(to_bottom,rgba(0,0,0,1),rgba(2,6,23,0.96))]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start 2xl:grid-cols-[0.7fr_1.3fr]">
          <Reveal direction="left">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-[0.66rem] font-black uppercase tracking-[0.32em] text-orange-300 sm:text-xs sm:tracking-[0.42em]">
                FAQ
              </p>

              <h2 className="mt-3 max-w-xl text-[2rem] font-black leading-none tracking-[-0.06em] text-white sm:text-5xl lg:text-6xl">
                Before you view.
              </h2>

              <p className="mt-5 max-w-sm text-sm font-medium leading-6 text-slate-400">
                Quick answers for buying, viewing, trading, and financing
                assistance.
              </p>
            </div>
          </Reveal>

          <Reveal direction="up" delay={100}>
            <div className="grid gap-3">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                const buttonId = `faq-button-${index}`;
                const panelId = `faq-panel-${index}`;

                return (
                  <article
                    key={faq.question}
                    className={`group overflow-hidden rounded-[1.5rem] border shadow-xl shadow-black/30 backdrop-blur-xl transition duration-300 ${
                      isOpen
                        ? "border-orange-400/45 bg-white/[0.055]"
                        : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.045]"
                    }`}
                  >
                    <h3>
                      <button
                        id={buttonId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpenIndex(isOpen ? -1 : index)}
                        className="flex w-full cursor-pointer items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                      >
                        <span className="flex items-center gap-4">
                          <span
                            className={`hidden text-xs font-black uppercase tracking-[0.22em] sm:inline ${
                              isOpen ? "text-orange-300" : "text-slate-600"
                            }`}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <span className="text-base font-black leading-snug tracking-[-0.02em] text-white sm:text-lg">
                            {faq.question}
                          </span>
                        </span>

                        <span
                          aria-hidden="true"
                          className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border text-xl leading-none transition duration-200 ${
                            isOpen
                              ? "border-orange-400 bg-orange-500 text-white rotate-45"
                              : "border-white/10 bg-black/45 text-slate-300 group-hover:border-orange-400/40 group-hover:text-orange-300"
                          }`}
                        >
                          +
                        </span>
                      </button>
                    </h3>

                    {isOpen ? (
                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        className="animate-accordion-open px-5 pb-6 sm:px-6"
                      >
                        <div className="border-t border-white/10 pt-5 sm:ml-12">
                          <p className="max-w-3xl text-sm font-medium leading-7 text-slate-300 sm:text-base">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
