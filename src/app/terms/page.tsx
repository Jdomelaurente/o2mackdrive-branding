import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for O2MackDrive Car Trading. Read the terms governing your use of our website and services.",
};

export default function TermsPage() {
  return (
    <main className="-mt-20 bg-[#f7f5f2] pt-28 text-black md:-mt-28 md:pt-36">
      <Container>
        <section className="max-w-3xl py-12 sm:py-16">
          <Reveal direction="up">
            <h1 className="text-4xl font-black tracking-tight text-black sm:text-5xl">
              Terms of Service
            </h1>
            <p className="mt-4 text-sm text-black/50">
              Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </Reveal>

          <Reveal direction="up" delay={100}>
            <div className="mt-10 space-y-8 text-sm leading-7 text-black/70">
              <section>
                <h2 className="text-lg font-black text-black">Acceptance of Terms</h2>
                <p className="mt-3">
                  By accessing and using the O2MackDrive website, you accept and agree to be
                  bound by these Terms of Service. If you do not agree to these terms, please
                  do not use our website.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-black text-black">Website Use</h2>
                <p className="mt-3">
                  Our website is intended to provide information about our car trading services
                  and facilitate inquiries. You may browse our inventory, submit inquiry forms,
                  and contact us through the provided channels. You agree not to use this website
                  for any unlawful purpose or in any way that could damage, disable, or impair
                  the website.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-black text-black">Vehicle Information</h2>
                <p className="mt-3">
                  While we strive to provide accurate information about our vehicles, including
                  specifications, pricing, and availability, all information is subject to change
                  without notice. Vehicle images are for illustration purposes only and may not
                  represent the exact vehicle in terms of color, features, or condition. We
                  recommend verifying all details directly with our team before making a purchase
                  decision.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-black text-black">Inquiries and Communications</h2>
                <p className="mt-3">
                  When you submit an inquiry form or contact us, you agree that the information
                  provided is accurate and truthful. We will use your contact information solely
                  to respond to your inquiry and provide relevant assistance regarding our services.
                </p>
              </section>

<section>
                <h2 className="text-lg font-black text-black">Vehicle Transactions &amp; Payments</h2>
                <p className="mt-3">
                  All vehicles are sold on an &ldquo;as is, where is&rdquo; basis, subject
                  to written agreement with our team. We encourage full inspection and
                  verification before payment. Reservation deposits and completed sales
                  are governed by our{" "}
                  <Link href="/refund-policy" className="font-bold text-black underline underline-offset-2 hover:text-black/70">
                    Refund Policy
                  </Link>.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-black text-black">Intellectual Property</h2>
                <p className="mt-3">
                  All content on this website, including text, graphics, logos, images, and software,
                  is the property of O2MackDrive Car Trading and is protected by applicable
                  intellectual property laws. You may not reproduce, distribute, or create
                  derivative works without our express written permission.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-black text-black">Limitation of Liability</h2>
                <p className="mt-3">
                  O2MackDrive Car Trading shall not be held liable for any indirect, incidental,
                  special, or consequential damages arising from your use of this website or any
                  transactions conducted through or as a result of this website.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-black text-black">Governing Law</h2>
                <p className="mt-3">
                  These Terms of Service shall be governed by and construed in accordance with
                  the laws of the Republic of the Philippines. Any disputes arising from these
                  terms shall be subject to the exclusive jurisdiction of the courts in Metro
                  Manila, Philippines.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-black text-black">Changes to Terms</h2>
                <p className="mt-3">
                  We reserve the right to modify these Terms of Service at any time. Changes
                  will be effective immediately upon posting. Your continued use of the website
                  after any changes constitutes acceptance of the new terms.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-black text-black">Contact</h2>
                <p className="mt-3">
                  For questions about these Terms of Service, please contact us through our{" "}
                  <Link href="/contact" className="font-bold text-black underline underline-offset-2 hover:text-black/70">
                    contact page
                  </Link>.
                </p>
              </section>
            </div>
          </Reveal>
        </section>
      </Container>
    </main>
  );
}
