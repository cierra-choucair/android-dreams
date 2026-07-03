import Link from "next/link";
import { NewsletterForm } from "./NewsletterForm";

/** Full-width Sunday Letter band with the magenta radial glow. */
export function NewsletterCTA() {
  return (
    <section aria-labelledby="newsletter-cta" className="relative overflow-hidden border-y border-cream/10">
      <div className="pointer-events-none absolute inset-0 glow-magenta-center" />
      <div className="pointer-events-none absolute inset-0 bg-grid" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2">
        <div>
          <h2
            id="newsletter-cta"
            className="font-display text-5xl leading-none tracking-wide text-cream sm:text-6xl"
          >
            Get the Sunday Letter.
          </h2>
          <p className="mt-4 max-w-md text-lg italic leading-relaxed text-dim">
            One idea, held up to the light — every Sunday, direct to your
            inbox. The newsletter of Android Dreams.
          </p>
        </div>
        <div className="lg:pl-10">
          <NewsletterForm accent="orange" publication="ad" />
          <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-wide2 text-dimmer">
            Free ·{" "}
            <Link href="/sunday-letter" className="underline decoration-dimmer underline-offset-2 hover:text-cream">
              Read past letters
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
