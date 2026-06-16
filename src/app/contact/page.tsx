import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact O2MackDrive Car Trading for car inquiries, selling, trade-ins, and financing assistance.",
};

export default function ContactPage() {
  return (
    <section className="garage-surface border-b border-white/10 py-8 sm:py-20">
      <Container className="grid gap-6 sm:gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="grid gap-5 sm:gap-6">
          <SectionHeader
            eyebrow="Contact"
            title="Talk to O2MackDrive"
            description="Send an inquiry, call directly, or message on Messenger for available cars, viewing schedules, and trade-in discussions."
          />

          <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/60 shadow-2xl shadow-black/30">
            <div className="border-b border-white/10 bg-white/[0.035] px-4 py-4 sm:px-5">
              <p className="text-[0.65rem] font-black uppercase tracking-[0.24em] text-orange-300">
                Direct contact
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Best for viewing schedules, unit availability, and trade-in
                conversations.
              </p>
            </div>

            <dl className="divide-y divide-white/10">
              <ContactItem label="Phone" value={site.phone} href={`tel:${site.phone.replaceAll(" ", "")}`} />
              <ContactItem label="Email" value={site.email} href={`mailto:${site.email}`} />
              <ContactItem label="Location" value={site.location} />
            </dl>

            <div className="grid gap-2.5 border-t border-white/10 p-4 sm:grid-cols-2 sm:p-5">
              <Button href={`tel:${site.phone.replaceAll(" ", "")}`}>Call Now</Button>
              <Button href={site.messengerLink} variant="secondary" target="_blank" rel="noreferrer">
                Messenger
              </Button>
            </div>
          </div>
        </div>

        <div id="contact-form">
          <ContactForm />
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
      <dt className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-slate-500">
        {label}
      </dt>
      <dd className="mt-1 break-words text-sm font-semibold leading-6 text-slate-100 sm:text-base">
        {value}
      </dd>
    </>
  );

  if (href) {
    return (
      <div>
        <a
          href={href}
          className="block px-4 py-4 transition hover:bg-white/[0.035] sm:px-5"
        >
          {content}
        </a>
      </div>
    );
  }

  return <div className="px-4 py-4 sm:px-5">{content}</div>;
}
