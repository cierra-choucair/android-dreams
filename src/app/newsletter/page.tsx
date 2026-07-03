import type { Metadata } from "next";
import { NewsletterForm } from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Newsletter — The Daily Dispatch",
  description:
    "Transmissions, the Deep Read, and the Sunday Letter — direct to your inbox. The Android Dreams newsletter, delivered from the frontier.",
  alternates: { canonical: "/newsletter" },
};

const CADENCE = [
  {
    day: "MON–FRI",
    title: "Transmissions",
    accent: "text-orange",
    border: "border-orange/40",
    body: "The daily dispatch. What happened at the frontier, why it matters, and what it says about the world being built — in five minutes, before your first meeting.",
  },
  {
    day: "WEEKLY",
    title: "The Deep Read",
    accent: "text-cyan",
    border: "border-cyan/40",
    body: "When a Deep Read publishes, you hear about it first — with the reporting notes and context that don't fit in the piece.",
  },
  {
    day: "SUNDAYS",
    title: "The Sunday Letter",
    accent: "text-gold",
    border: "border-gold/40",
    body: "The founder's letter. One idea, held up to the light, written to be read slowly. The week's closing argument for hope as a discipline.",
  },
];

const TESTIMONIAL_SLOTS = [1, 2, 3];

export default function NewsletterPage() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] glow-magenta-center" />
      <div className="pointer-events-none absolute inset-0 bg-grid" />

      <div className="relative mx-auto max-w-5xl px-4 pb-24 pt-20 sm:px-6">
        {/* Pitch */}
        <header className="text-center">
          <p className="eyebrow text-orange">The Newsletter</p>
          <h1 className="mt-6 font-display text-6xl leading-[0.95] tracking-wide text-cream sm:text-7xl">
            Get the daily dispatch.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl italic leading-relaxed text-dim">
            Transmissions, the Deep Read, and the Sunday Letter — direct to
            your inbox. Rigorous journalism from the frontier of quantum, AI,
            and the deep science building our sci-fi future.
          </p>
        </header>

        {/* Capture */}
        <div className="mx-auto mt-12 max-w-xl">
          <NewsletterForm accent="orange" />
          <p className="mt-2 text-center font-mono text-[0.6rem] uppercase tracking-wide2 text-dimmer">
            Free. No fear-driven content. Unsubscribe anytime.
          </p>
        </div>

        {/* Cadence */}
        <section aria-labelledby="cadence" className="mt-24">
          <h2 id="cadence" className="eyebrow text-center text-magenta">
            What arrives, and when
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {CADENCE.map((item) => (
              <div key={item.title} className={`border ${item.border} bg-cream/[0.02] p-7`}>
                <p className={`font-mono text-xs tracking-wide2 ${item.accent}`}>{item.day}</p>
                <h3 className="mt-3 font-display text-3xl tracking-wide text-cream">
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-dim">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials — placeholders for future quotes */}
        <section aria-labelledby="readers" className="mt-24">
          <h2 id="readers" className="eyebrow text-center text-gold">
            What readers say
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {TESTIMONIAL_SLOTS.map((slot) => (
              <figure
                key={slot}
                className="flex min-h-[11rem] flex-col justify-between border border-cream/10 bg-cream/[0.02] p-7"
              >
                <blockquote>
                  <p className="italic leading-relaxed text-dimmer">
                    “Reader testimonial slot — a future quote from someone at
                    the frontier lives here.”
                  </p>
                </blockquote>
                <figcaption className="mt-6 font-mono text-[0.6rem] uppercase tracking-wide2 text-dimmer">
                  Name · Role, Organization
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
