import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-white py-16 sm:py-24">
      <Container className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">404</p>
        <h1 className="mt-4 text-3xl font-black text-black sm:text-4xl">Page not found</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
          The page or car listing you are looking for may no longer be available.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/home"
            className="inline-flex min-h-11 items-center justify-center bg-black px-6 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            Back to Home
          </Link>
          <Link
            href="/cars"
            className="inline-flex min-h-11 items-center justify-center bg-black px-6 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            View Available Cars
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center justify-center bg-black px-6 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            Contact Us
          </Link>
        </div>
      </Container>
    </section>
  );
}
