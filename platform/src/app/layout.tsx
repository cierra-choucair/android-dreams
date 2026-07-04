import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Universum Labs — Knowledge Graph",
    template: "%s · Universum Labs",
  },
  description:
    "A problem-first map of frontier science. Explore how problems, patterns, tools, and evidence connect — and where structure suggests directions not yet taken.",
};

const NAV = [
  { href: "/problems", label: "Problems" },
  { href: "/patterns", label: "Patterns" },
  { href: "/tools", label: "Tools" },
  { href: "/papers", label: "Resources" },
  { href: "/gaps", label: "Opportunities" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <header className="sticky top-0 z-30 border-b border-line bg-void/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center gap-6 px-5 py-3">
            <Link href="/" className="group flex items-center gap-2.5">
              <Logo />
              <span className="flex flex-col leading-none">
                <span className="text-sm font-semibold tracking-tight text-ink">
                  Universum Labs
                </span>
                <span className="text-[0.68rem] uppercase tracking-[0.16em] text-ink-faint">
                  Knowledge Graph
                </span>
              </span>
            </Link>
            <nav className="ml-auto hidden items-center gap-1 sm:flex">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="rounded-lg px-3 py-1.5 text-sm text-ink-dim transition-colors hover:bg-surface hover:text-ink"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-5 py-8">{children}</main>

        <footer className="mt-16 border-t border-line">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
            <p>
              Universum Labs · discovery infrastructure for frontier science.
              MVP seed dataset — open-core preview.
            </p>
            <p>
              Structure over search. Problems over papers. Evidence always
              visible.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

function Logo() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className="text-brand transition-transform group-hover:rotate-45"
    >
      <circle cx="16" cy="16" r="13" stroke="currentColor" strokeOpacity="0.35" />
      <circle cx="16" cy="16" r="2.4" fill="currentColor" />
      <circle cx="16" cy="3" r="2" fill="currentColor" />
      <circle cx="27.3" cy="22.5" r="2" fill="currentColor" />
      <circle cx="4.7" cy="22.5" r="2" fill="currentColor" />
      <path
        d="M16 16 16 3M16 16 27.3 22.5M16 16 4.7 22.5"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="1"
      />
    </svg>
  );
}
