import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for O2MackDrive Car Trading. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <main className="-mt-20 bg-[#f7f5f2] pt-28 text-black md:-mt-28 md:pt-36">
      <Container>
        <section className="max-w-3xl py-12 sm:py-16">
          <Reveal direction="up">
            <h1 className="text-4xl font-black tracking-tight text-black sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-sm text-black/50">
              Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </Reveal>

          <Reveal direction="up" delay={100}>
            <div className="mt-10 space-y-8 text-sm leading-7 text-black/70">
<section>
                <h2 className="text-lg font-black text-black">Information We Collect</h2>
                <p className="mt-3">
                  O2MackDrive practices data minimization. We do not run analytics,
                  tracking pixels, or advertising tools on this website, and we do not
                  collect browsing profiles about you.
                </p>
                <p className="mt-3">
                  When you submit an inquiry or sell/trade form, we collect only the
                  details needed to respond and assist you: your name, contact number,
                  and the message or vehicle information you provide. An email address
                  is requested only on our contact form and is used exclusively to reply
                  to your inquiry.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-black text-black">How We Use Your Information</h2>
                <p className="mt-3">
                  We use the information you provide solely to respond to your inquiry,
                  prepare a valuation or trade-in discussion, and coordinate your request
                  with you directly. We do not send unsolicited marketing messages, and
                  we do not use your details for promotions without your separate
                  consent.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-black text-black">Storage &amp; Retention</h2>
                <p className="mt-3">
                  We keep the information you submit only as long as needed to complete
                  the transaction you requested or as required by Philippine law. Details
                  you provide are handled confidentially and are accessible only to our
                  team for the purpose of responding to you.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-black text-black">Cookies &amp; Local Storage</h2>
                <p className="mt-3">
                  We do not use third-party tracking cookies. We may store a small
                  preference in your browser&rsquo;s local storage to remember your cookie
                  choice. For details, please read our{" "}
                  <Link href="/cookie-policy" className="font-bold text-black underline underline-offset-2 hover:text-black/70">
                    Cookie Policy
                  </Link>.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-black text-black">Information Sharing</h2>
                <p className="mt-3">
                  We do not sell, trade, or otherwise transfer your personal information to outside
                  parties. This does not include trusted third parties who assist us in operating
                  our website, conducting our business, or serving you, as long as those parties
                  agree to keep this information confidential.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-black text-black">Data Security</h2>
                <p className="mt-3">
                  We implement appropriate security measures to protect your personal information.
                  However, no method of transmission over the internet or electronic storage is
                  100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-black text-black">Your Rights</h2>
                <p className="mt-3">
                  Under the Philippine Data Privacy Act of 2012, you have the right to access,
                  correct, or request deletion of your personal data. To exercise these rights,
                  please contact us using the information provided on our{" "}
                  <Link href="/contact" className="font-bold text-black underline underline-offset-2 hover:text-black/70">
                    contact page
                  </Link>.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-black text-black">Changes to This Policy</h2>
                <p className="mt-3">
                  We may update this privacy policy from time to time. Any changes will be posted
                  on this page with an updated revision date.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-black text-black">Contact Us</h2>
                <p className="mt-3">
                  If you have questions about this privacy policy, please contact us through our{" "}
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
