import type { Metadata } from "next";
import { InquiryForm } from "@/components/InquiryForm";

export const metadata: Metadata = {
  title: "Contact — Press, Partnerships, Pitches",
  description:
    "Reach the Android Dreams newsroom: press inquiries, partnership conversations, and story pitches from the frontier.",
  alternates: { canonical: "/contact" },
};

const CHANNELS = [
  {
    title: "Press",
    body: "Interview requests, media inquiries, and anything concerning coverage published on Android Dreams.",
  },
  {
    title: "Partnerships",
    body: "Sponsorship of the newsletter or QFrontline, Summit founding partnerships, and studio collaborations.",
  },
  {
    title: "Pitches",
    body: "Working on something at the frontier we should know about? We read every pitch. Specific beats spectacular.",
  },
];

export default function ContactPage() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] glow-orange-tl" />
      <div className="relative mx-auto max-w-5xl px-4 pb-24 pt-20 sm:px-6">
        <header>
          <p className="eyebrow text-orange">Contact</p>
          <h1 className="mt-5 font-display text-6xl tracking-wide text-cream sm:text-7xl">
            Talk to the newsroom.
          </h1>
          <p className="mt-5 max-w-2xl text-xl italic leading-relaxed text-dim">
            Press, partnerships, pitches — one door, read by humans.
          </p>
        </header>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-5">
            {CHANNELS.map((c) => (
              <div key={c.title} className="border border-cream/10 bg-cream/[0.02] p-6">
                <h2 className="font-display text-2xl tracking-wide text-cream">{c.title}</h2>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-dim">{c.body}</p>
              </div>
            ))}
            <p className="pt-2 font-serif font-semibold text-[0.72rem] uppercase tracking-wide2 text-cream/65">
              We respond to everything that isn't spam. Give us a few days.
            </p>
          </div>

          <div>
            <InquiryForm
              form="contact"
              messageLabel="Your message"
              submitLabel="Send it"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
