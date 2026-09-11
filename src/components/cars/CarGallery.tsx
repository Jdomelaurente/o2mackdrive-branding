import Image from "next/image";
import type { Car } from "@/types/car";

type CarGalleryProps = {
  car: Car;
};

export function CarGallery({ car }: CarGalleryProps) {
  const [mainImage, ...otherImages] = car.images;

  return (
    <section aria-label={`${car.year} ${car.brand} ${car.model} gallery`} className="grid gap-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/40 sm:aspect-[16/10]">
        <Image
          src={mainImage}
          alt={`${car.year} ${car.brand} ${car.model} ${car.variant ?? ""}`.trim()}
          fill
          sizes="(max-width: 1024px) 100vw, 58vw"
          className="object-cover"
          fetchPriority="high"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
      </div>
      {otherImages.length > 0 ? (
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {otherImages.map((image) => (
            <div key={image} className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-slate-900">
              <Image src={image} alt={`${car.brand} ${car.model} additional view`} fill sizes="180px" className="object-cover" />
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
