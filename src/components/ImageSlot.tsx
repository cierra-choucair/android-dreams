import Image from "next/image";
import type { FeaturedImage } from "@/lib/types";

/**
 * Renders a post's featured image, or a clearly-marked gradient image slot
 * when none exists (no stock photography, ever).
 *
 * `bare` drops the radius/border for use inside cards that clip their own
 * corners — the image runs edge-to-edge under the card radius.
 */
export function ImageSlot({
  image,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  label = "IMAGE SLOT",
  bare = false,
}: {
  image: FeaturedImage | null;
  className?: string;
  sizes?: string;
  priority?: boolean;
  label?: string;
  bare?: boolean;
}) {
  const chrome = bare ? "" : "rounded-lg border border-cream/10";
  if (image) {
    return (
      <div className={`relative overflow-hidden ${chrome} ${className}`}>
        <Image
          src={image.url}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }
  return (
    <div
      aria-hidden
      className={`image-slot relative flex items-center justify-center overflow-hidden ${chrome} ${className}`}
    >
      <div className="absolute inset-0 bg-cyber" />
      <span className="relative font-serif text-[0.68rem] font-semibold uppercase tracking-wide4 text-cream/50">
        {label}
      </span>
    </div>
  );
}
