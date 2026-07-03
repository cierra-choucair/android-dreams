import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Join the Quantum Readiness Community",
  description: "Membership enrollment for the Quantum Readiness Community.",
  robots: { index: false },
};

export default function CommunityJoinPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid" />
      <div className="pointer-events-none absolute inset-0 glow-magenta-center" />
      <div className="relative mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
        <p className="eyebrow text-magenta">Enrollment</p>
        <h1 className="mt-6 font-display text-5xl tracking-wide text-cream sm:text-6xl">
          Doors open shortly.
        </h1>
        <p className="mt-6 max-w-xl text-lg italic leading-relaxed text-dim">
          Payment and enrollment are being wired up now. Leave your email on
          the newsletter and you'll be first through the door when membership
          opens.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/newsletter"
            className="bg-magenta px-6 py-3 font-mono text-xs uppercase tracking-wide2 text-ink transition-colors hover:bg-magenta/85"
          >
            Get notified
          </Link>
          <Link
            href="/community"
            className="border border-cream/25 px-6 py-3 font-mono text-xs uppercase tracking-wide2 text-cream transition-colors hover:border-magenta hover:text-magenta"
          >
            ← Back to Community
          </Link>
        </div>
      </div>
    </div>
  );
}
