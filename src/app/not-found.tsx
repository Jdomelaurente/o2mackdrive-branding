import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">404</p>
        <h1 className="mt-4 text-3xl font-black text-white sm:text-4xl">Page not found</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">The page or car listing you are looking for may no longer be available.</p>
        <div className="mt-8 flex justify-center">
          <Button href="/cars">View Available Cars</Button>
        </div>
      </Container>
    </section>
  );
}
