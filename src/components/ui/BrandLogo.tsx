import Image from "next/image";

type BrandLogoProps = {
  size?: "sm" | "md" | "lg";
  variant?: "mark" | "wide";
  className?: string;
};

const sizes = {
  sm: {
    mark: "h-12 w-52",
    wide: "h-12 w-52",
    sizes: "208px",
  },
  md: {
    mark: "h-16 w-80",
    wide: "h-16 w-80",
    sizes: "320px",
  },
  lg: {
    mark: "h-20 w-96",
    wide: "h-20 w-96",
    sizes: "384px",
  },
};

export function BrandLogo({
  size = "md",
  variant = "wide",
  className = "",
}: BrandLogoProps) {
  const config = sizes[size];
  const box = variant === "mark" ? config.mark : config.wide;

  return (
    <span
      className={`relative inline-block max-w-full shrink-0 ${box} ${className}`}
    >
      <Image
        src="/logo-wide.png"
        alt="O2MackDrive logo"
        fill
        sizes={config.sizes}
        className="object-contain object-left"
      />
    </span>
  );
}
