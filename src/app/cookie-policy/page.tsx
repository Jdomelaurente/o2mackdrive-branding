import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Cookie and storage policy for O2MackDrive Car Trading. We do not use third-party tracking cookies or advertising trackers.",
};

export default function CookiePolicyPage() {
  return (
    <main className="-mt-20 bg-[#f7f5f2] pt-28 text-black md:-mt-28 md:pt-36">
      <Container>
        <section className="max-w-3xl py-12 sm:py-16">
          <Reveal direction="up">
            <h1 className="text-4xl font-black tracking-tight text-black sm:text-5xl">
              Cookie Policy
            </h1>
            <p className="mt-4 text-sm text-black/50">
              Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </Reveal>

          <Reveal direction="up" delay={100}>
            <div className="mt-10 space-y-8 text-sm leading-7 text-black/70">
              <section>
                <h2 className="text-lg font-black text-black">Our Approach is Simple</h2>
                <p className="mt-3">
                  O2MackDrive does not use advertising, analytics, or third-party
                  tracking cookies. We do not run marketing pixels, load embedded
                  third-party content, or share your browsing activity with data brokers.
                  When you visit our website, no advertising profile is created about you.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-black text-black">What We Store</h2>
                <p className="mt-3">
                  We may store a small preference item in your browser&rsquo;s local
                  storage to remember whether you accepted or declined our cookie notice.
                  This is a strictly functional preference stored only on your device.
                  It is not a tracking cookie, and it is not shared with anyone.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-black text-black">Forms</h2>
                <p className="mt-3">
                  When you submit an inquiry form, the details you provide (such as your
                  name and contact number) are used only to respond to your inquiry. For
                  more information, please see our{" "}
                  <Link href="/privacy" className="font-bold text-black underline underline-offset-2 hover:text-black/70">
                    Privacy Policy
                  </Link>.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-black text-black">Managing Your Preferences</h2>
                <p className="mt-3">
                  You can clear the stored preference at any time through your
                  browser settings, or by clearing your browser&rsquo;s storage. You can
                  also use your browser to control local storage for this website.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-black text-black">Changes to This Policy</h2>
                <p className="mt-3">
                  If we ever start using cookies or third-party tools, we will update this
                  policy and our cookie notice before any tracking begins.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-black text-black">Contact</h2>
                <p className="mt-3">
                  Questions about this Cookie Policy can be sent through our{" "}
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