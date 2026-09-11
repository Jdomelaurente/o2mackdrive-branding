"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Container } from "@/shared/components/ui";

export default function CarDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[60vh] items-center justify-center py-20">
      <div className="text-center">
        <p className="text-[0.62rem] font-black uppercase tracking-[0.28em] text-orange-500">
          Car Not Found
        </p>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-black sm:text-4xl">
          Vehicle Details Unavailable
        </h1>
        <p className="mt-4 max-w-md text-sm leading-6 text-black/55">
          We couldn&apos;t load the details for this vehicle. It may no longer be
          available or there was an error loading the information.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-11 cursor-pointer items-center justify-center bg-black px-6 py-2.5 text-sm font-bold text-white transition hover:bg-zinc-800"
          >
            Try Again
          </button>
          <Link
            href="/cars"
            className="inline-flex min-h-11 items-center justify-center border border-black/15 px-6 py-2.5 text-sm font-bold text-black transition hover:border-black hover:bg-white"
          >
            Browse All Cars
          </Link>
        </div>
      </div>
    </Container>
  );
}
