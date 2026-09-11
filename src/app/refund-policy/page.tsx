import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Refund and cancellation policy for O2MackDrive Car Trading. Read about deposits, reservations, and vehicle sale transactions.",
};

export default function RefundPolicyPage() {
  return (
    <main className="-mt-20 bg-[#f7f5f2] pt-28 text-black md:-mt-28 md:pt-36">
      <Container>
        <section className="max-w-3xl py-12 sm:py-16">
          <Reveal direction="up">
            <h1 className="text-4xl font-black tracking-tight text-black sm:text-5xl">
              Refund Policy
            </h1>
            <p className="mt-4 text-sm text-black/50">
              Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </Reveal>

          <Reveal direction="up" delay={100}>
            <div className="mt-10 space-y-8 text-sm leading-7 text-black/70">
              <section>
                <h2 className="text-lg font-black text-black">Inspect Before You Pay</h2>
                <p className="mt-3">
                  Used vehicles are sold on an &ldquo;as is, where is&rdquo; basis. We
                  strongly encourage you to view the unit in person, ask questions,
                  and verify all details before making any payment. Final pricing,
                  availability, and terms are confirmed in writing before a sale is
                  completed.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-black text-black">Reservations &amp; Deposits</h2>
                <p className="mt-3">
                  A reservation deposit holds a unit for an agreed period. Deposits are
                  refundable if the sale does not proceed for reasons attributable to
                  O2MackDrive, or if a refund is agreed in writing before the sale
                  documents are signed. Deposits applied to a completed purchase are
                  credited to the total price.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-black text-black">Completed Sales</h2>
                <p className="mt-3">
                  Once a sale agreement is signed and the vehicle is delivered, the
                  transaction is final. We do not offer automatic returns for change of
                  mind after delivery. Because every pre-owned vehicle is different, all
                  condition disclosures are reviewed with you before you commit.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-black text-black">Defects &amp; Misrepresentation</h2>
                <p className="mt-3">
                  If a vehicle is delivered with a mechanical or documentation defect
                  that we failed to disclose, or if information we provided was
                  inaccurate in a material way, contact us promptly. Remedies available
                  under Philippine law — including the Consumer Act of the Philippines
                  (Republic Act No. 7394) — remain available to you, and we will work
                  with you to resolve the matter fairly and in good faith.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-black text-black">How to Request a Refund or Resolution</h2>
                <p className="mt-3">
                  Contact us within seven (7) days of the relevant event with your name,
                  transaction details, and a clear description of the issue. We will
                  respond within a reasonable period and agree the next steps with you
                  in writing.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-black text-black">Contact</h2>
                <p className="mt-3">
                  For refund or policy questions, reach us through our{" "}
                  <Link href="/contact" className="font-bold text-black underline underline-offset-2 hover:text-black/70">
                    contact page
                  </Link>{" "}
                  or by phone during operating hours.
                </p>
              </section>
            </div>
          </Reveal>
        </section>
      </Container>
    </main>
  );
}