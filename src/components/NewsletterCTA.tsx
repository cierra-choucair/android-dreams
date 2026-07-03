import { NewsletterForm } from "./NewsletterForm";

/** Full-width newsletter band with the magenta radial glow. */
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
            Get the daily dispatch.
          </h2>
          <p className="mt-4 max-w-md text-lg italic leading-relaxed text-dim">
            Transmissions, the Deep Read, and the Sunday Letter — direct to
            your inbox.
          </p>
        </div>
        <div className="lg:pl-10">
          <NewsletterForm accent="orange" />
        </div>
      </div>
    </section>
  );
}
