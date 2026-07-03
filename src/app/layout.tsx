import type { Metadata } from "next";
import { JetBrains_Mono, Outfit } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SITE_URL } from "@/lib/utils";
import "./globals.css";

// Brand v1.0 "cinema direction": Outfit for everything visual,
// JetBrains Mono for credits and metadata.
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Android Dreams — Imagine the Future",
    template: "%s · Android Dreams",
  },
  description:
    "A digital magazine at the intersection of rigorous journalism and visionary storytelling. Quantum technology, artificial intelligence, and the deep science building our sci-fi future.",
  openGraph: {
    type: "website",
    siteName: "Android Dreams",
    title: "Android Dreams — Imagine the Future",
    description:
      "Quantum technology, artificial intelligence, and the deep science building our sci-fi future.",
    url: SITE_URL,
    images: [{ url: "/brand/ad-mark.jpg", width: 2351, height: 2351 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Android Dreams — Imagine the Future",
    description:
      "Quantum technology, artificial intelligence, and the deep science building our sci-fi future.",
  },
  alternates: {
    types: {
      "application/rss+xml": [
        { url: "/rss.xml", title: "Android Dreams — All Articles" },
      ],
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${jetbrains.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-orange focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-wide2 focus:text-ink"
        >
          Skip to content
        </a>
        <SiteHeader />
        {/* Offset for the fixed single-line header */}
        <main id="main" className="pt-16">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
