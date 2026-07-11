import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact O2MackDrive Car Trading for car inquiries, selling, trade-ins, and financing assistance in Metro Manila.",
};

export default function ContactPage() {
  return (
    <section className="bg-white -mt-20 pt-32 md:-mt-28 md:pt-40 pb-16 text-slate-900 min-h-screen">
      <Container>
        {/* Header */}
        <Reveal direction="up">
          <div className="border-b border-slate-200 pb-8 mb-12">
            <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl uppercase">
              Get in Touch.
            </h1>
            <div className="mt-4 border-l-2 border-slate-900 pl-4">
              <p className="text-sm text-slate-600 max-w-xl leading-relaxed">
                Send an inquiry, call directly, or message on Messenger for available cars, viewing schedules, and trade-in discussions.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          {/* Left: Direct Contact Info */}
          <div className="grid gap-8">
            {/* Contact Card */}
            <Reveal direction="left" delay={150}>
              <div className="border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 px-5 py-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Direct Contact</p>
                  <p className="mt-1.5 text-xs text-slate-500">
                    Best for viewing schedules, unit availability, and trade-in conversations.
                  </p>
                </div>

                <div className="divide-y divide-slate-100">
                  <ContactItem label="Phone" value={site.phone} href={`tel:${site.phone.replaceAll(" ", "")}`} />
                  <ContactItem label="Email" value={site.email} href={`mailto:${site.email}`} />
                  <ContactItem label="Location" value={site.location} />
                </div>

                <div className="grid grid-cols-2 gap-2.5 border-t border-slate-200 p-4">
                  <Link
                    href={`tel:${site.phone.replaceAll(" ", "")}`}
                    className="bg-black px-4 py-2.5 text-center text-[10px] font-black uppercase tracking-widest text-white transition hover:bg-slate-900"
                    style={{ color: "#ffffff" }}
                  >
                    Call Now
                  </Link>
                  <Link
                    href={site.messengerLink}
                    target="_blank"
                    rel="noreferrer"
                    className="border border-slate-200 px-4 py-2.5 text-center text-[10px] font-black uppercase tracking-widest text-slate-900 transition hover:bg-slate-50"
                  >
                    Messenger
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Hours / Note */}
            <Reveal direction="left" delay={250}>
              <div className="border border-dashed border-slate-200 bg-slate-50/50 p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Operating Hours</p>
                <p className="mt-2 text-sm font-bold text-slate-900">Monday – Saturday</p>
                <p className="mt-0.5 text-xs text-slate-500">9:00 AM – 6:00 PM</p>
                <p className="mt-3 text-xs leading-relaxed text-slate-500">
                  Viewings and discussions can also be arranged outside regular hours via Messenger.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right: Contact Form */}
          <Reveal direction="right" delay={200}>
            <div id="contact-form">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function ContactItem({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <dt className="text-[10px] font-black uppercase tracking-wider text-slate-400">
        {label}
      </dt>
      <dd className="mt-1 break-words text-sm font-semibold leading-6 text-slate-900">
        {value}
      </dd>
    </>
  );

  if (href) {
    return (
      <div>
        <a
          href={href}
          className="block px-5 py-4 transition hover:bg-slate-50"
        >
          {content}
        </a>
      </div>
    );
  }

  return <div className="px-5 py-4">{content}</div>;
}
