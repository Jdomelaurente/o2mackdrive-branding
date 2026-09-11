import { Container } from "@/shared/components/ui";

export default function CarsLoading() {
  return (
    <Container className="py-12">
      <div className="animate-pulse">
        <div className="h-8 w-48 rounded bg-black/5" />
        <div className="mt-4 h-4 w-96 max-w-full rounded bg-black/5" />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-black/5 bg-white p-4">
              <div className="aspect-[4/3] rounded-xl bg-black/5" />
              <div className="mt-4 h-4 w-3/4 rounded bg-black/5" />
              <div className="mt-2 h-3 w-1/2 rounded bg-black/5" />
              <div className="mt-4 flex items-center justify-between">
                <div className="h-5 w-24 rounded bg-black/5" />
                <div className="h-8 w-20 rounded bg-black/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
