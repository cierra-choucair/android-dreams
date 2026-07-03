import type { Metadata } from "next";
import { Bebas_Neue, Crimson_Pro, Space_Mono } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SITE_URL } from "@/lib/utils";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const crimson = Crimson_Pro({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-crimson",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-space-mono",
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
    <html lang="en" className={`${bebas.variable} ${crimson.variable} ${spaceMono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-orange focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-wide2 focus:text-ink"
        >
          Skip to content
        </a>
        <SiteHeader />
        {/* Offset for the fixed header (studio bar + nav) */}
        <main id="main" className="pt-[6.25rem]">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
