import { Container } from "@/shared/components/ui";

export default function CarDetailLoading() {
  return (
    <Container className="py-12">
      <div className="animate-pulse">
        <div className="h-4 w-32 rounded bg-black/5" />

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="aspect-[4/3] rounded-2xl bg-black/5" />

          <div className="space-y-6">
            <div>
              <div className="h-8 w-64 rounded bg-black/5" />
              <div className="mt-2 h-4 w-40 rounded bg-black/5" />
            </div>

            <div className="h-10 w-32 rounded bg-black/5" />

            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-black/5 p-3">
                  <div className="h-3 w-16 rounded bg-black/5" />
                  <div className="mt-1 h-4 w-20 rounded bg-black/5" />
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-black/5" />
              <div className="h-4 w-5/6 rounded bg-black/5" />
              <div className="h-4 w-4/6 rounded bg-black/5" />
            </div>

            <div className="flex gap-3">
              <div className="h-12 w-40 rounded bg-black/5" />
              <div className="h-12 w-32 rounded bg-black/5" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
