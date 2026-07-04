import { AD_NEWSLETTER_ARCHIVE_URL, AD_SUBSCRIBE_URL } from "@/lib/links";

/** Full-width Sunday Letter band — subscribe on beehiiv. */
export function NewsletterCTA() {
  return (
    <section aria-labelledby="newsletter-cta" className="relative overflow-hidden border-y border-cream/10">
      <div className="pointer-events-none absolute inset-0 glow-magenta-center" />
      <div className="pointer-events-none absolute inset-0 bg-cyber" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2">
        <div>
          <h2
            id="newsletter-cta"
            className="font-display text-5xl font-bold leading-none tracking-wide text-cream sm:text-6xl"
          >
            Get the Sunday Letter.
          </h2>
          <p className="mt-4 max-w-md text-lg italic leading-relaxed text-dim">
            One idea, held up to the light — every Sunday, direct to your
            inbox. The newsletter of Android Dreams.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-5 lg:justify-end lg:pl-10">
          <a
            href={AD_SUBSCRIBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="floaty rounded-lg bg-orange px-8 py-4 font-serif text-sm font-semibold uppercase tracking-wide2 text-ink hover:bg-orange/85"
          >
            Subscribe — free
          </a>
          <a
            href={AD_NEWSLETTER_ARCHIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-serif text-[0.78rem] font-semibold uppercase tracking-wide2 text-cream/80 transition-colors hover:text-orange"
          >
            Read past letters →
          </a>
        </div>
      </div>
    </section>
  );
}
