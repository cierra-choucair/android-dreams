import type { Metadata } from "next";
import Link from "next/link";
import { InquiryForm } from "@/components/InquiryForm";

export const metadata: Metadata = {
  title: "Request an Invite — Quantum Readiness Community",
  description:
    "Request an invite to the Quantum Readiness Community — the developer-first community layer of QFrontline.",
  robots: { index: false },
};

const STANDARD = [
  "Technical curiosity",
  "Source-based discussion",
  "No spam, no false expertise",
  "A willingness to learn openly",
];

export default function CommunityJoinPage() {
  const discordUrl = process.env.NEXT_PUBLIC_QRC_DISCORD_URL;

  return (
    <div className="bg-white text-qf-void">
      <section className="relative overflow-hidden bg-qf-void">
        <div className="pointer-events-none absolute inset-0 glow-signal-tl" />
        <div className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <p className="font-qf-mono text-[0.65rem] uppercase tracking-[0.3em] text-qf-dust">
            Quantum Readiness Community
          </p>
          <h1 className="mt-5 font-qf-sans text-5xl font-bold tracking-tight text-qf-ink">
            Request an invite.
          </h1>
          <p className="mt-5 max-w-xl font-qf-sans text-lg font-light leading-relaxed text-qf-ink/85">
            Membership is free. The bar is the standard, not the price:
          </p>
          <ul className="mt-5 space-y-2">
            {STANDARD.map((item) => (
              <li key={item} className="flex gap-3 font-qf-mono text-[0.8rem] text-qf-ink/80">
                <span aria-hidden className="text-qf-signal">&gt;</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div aria-hidden className="h-[3px] w-full bg-qf-signal" />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        {discordUrl ? (
          <div className="mb-12 border border-qf-void/15 bg-qf-void/[0.025] p-6">
            <p className="font-qf-mono text-xs uppercase tracking-[0.2em] text-qf-void/60">
              The fast lane
            </p>
            <p className="mt-3 font-qf-sans font-light text-qf-void/85">
              The Discord is open — onboarding questions route you by level
              and interest when you arrive.
            </p>
            <a
              href={discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block bg-qf-signal px-6 py-3 font-qf-mono text-xs uppercase tracking-[0.2em] text-qf-void transition-colors hover:bg-qf-ink"
            >
              Join the Discord →
            </a>
          </div>
        ) : (
          <p className="mb-10 font-qf-mono text-[0.75rem] uppercase tracking-[0.2em] text-qf-void/60">
            <span aria-hidden className="text-qf-signal">&gt; </span>
            Onboarding opens in waves — tell us who you are and you&apos;ll be
            in the next one.
          </p>
        )}

        <div className="qrc-form">
          <InquiryForm
            form="qrc"
            messageLabel="What are you building, learning, or securing?"
            submitLabel="Request an invite"
          />
        </div>

        <p className="mt-12 border-t border-qf-void/10 pt-8 text-center font-qf-mono text-[0.65rem] uppercase tracking-[0.3em] text-qf-void/50">
          <Link href="/community" className="transition-colors hover:text-qf-signal-deep">
            ← Back to the community
          </Link>
        </p>
      </section>
    </div>
  );
}
