import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function Philosophy() {
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
