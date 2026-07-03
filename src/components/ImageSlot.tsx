import Image from "next/image";
import type { FeaturedImage } from "@/lib/types";

/**
 * Renders a post's featured image, or a clearly-marked gradient image slot
 * when none exists (no stock photography, ever).
 */
export function ImageSlot({
  image,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  label = "IMAGE SLOT",
}: {
  image: FeaturedImage | null;
  className?: string;
  sizes?: string;
  priority?: boolean;
  label?: string;
}) {
  if (image) {
    return (
      <div className={`relative overflow-hidden border border-cream/10 ${className}`}>
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
      className={`image-slot relative flex items-center justify-center overflow-hidden border border-cream/10 ${className}`}
    >
      <div className="absolute inset-0 bg-grid" />
      <span className="relative font-mono text-[0.6rem] uppercase tracking-wide4 text-dimmer">
        {label}
      </span>
    </div>
  );
}
