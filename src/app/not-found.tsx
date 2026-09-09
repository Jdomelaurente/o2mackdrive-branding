import { Button, Container } from "@/shared/components/ui";

export default function NotFound() {
  return (
    <section className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white py-16 sm:py-24">
      <Container className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">404</p>
        <h1 className="mt-4 text-3xl font-black text-black sm:text-4xl">Page not found</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">The page or car listing you are looking for may no longer be available.</p>
        <div className="mt-8 flex justify-center">
          <Button href="/cars" className="!bg-black !text-white hover:!bg-slate-800">View Available Cars</Button>
        </div>
      </Container>
    </section>
  );
}
