import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Pagination } from "@/components/Pagination";
import { FORMATS } from "@/lib/formats";
import { getPosts, REVALIDATE } from "@/lib/wp";

export const revalidate = 300;

const meta = FORMATS["sunday-letter"];

export const metadata: Metadata = {
  title: "The Sunday Letter — The Android Dreams Newsletter",
  description:
    "The founder's weekly letter is the Android Dreams newsletter. One idea, held up to the light, every Sunday — free, direct to your inbox.",
  alternates: {
    canonical: "/sunday-letter",
    types: {
      "application/rss+xml": [
        { url: "/sunday-letter/rss.xml", title: "The Sunday Letter · Android Dreams" },
      ],
    },
  },
};

export default async function SundayLetterPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Math.max(1, Number.parseInt(searchParams.page ?? "1", 10) || 1);
  const { posts, totalPages } = await getPosts({
    category: "sunday-letter",
    page,
    perPage: 10,
    revalidate: REVALIDATE.archive,
  });

  return (
    <div className="relative">
      {/* ─────────── The newsletter, and its front door ─────────── */}
      <section className="relative overflow-hidden border-b border-cream/10">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute inset-0 glow-gold-center" />
        <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <p className="eyebrow text-gold">{meta.cadence} · The Newsletter</p>
          <h1 className="mt-5 font-display text-6xl font-bold tracking-wide text-cream sm:text-7xl">
            The Sunday Letter
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-xl italic leading-relaxed text-dim">
            The founder&apos;s weekly letter — one idea, held up to the light,
            every Sunday. This is the Android Dreams newsletter: what you read
            here is what arrives in your inbox.
          </p>
          <div className="mx-auto mt-10 max-w-xl text-left">
            <NewsletterForm accent="gold" publication="ad" />
            <p className="mt-1 text-center font-mono text-[0.6rem] uppercase tracking-wide2 text-dimmer">
              Free · Every Sunday · Unsubscribe anytime
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────── Past letters ─────────────────────── */}
      <section aria-labelledby="past-letters" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 id="past-letters" className="eyebrow text-gold">
          Read past letters
        </h2>
        <div className="pt-8">
          {posts.length === 0 ? (
            <p className="font-mono text-xs uppercase tracking-wide2 text-dimmer">
              The first letter arrives this Sunday.
            </p>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {posts.map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          )}
          <Pagination page={page} totalPages={totalPages} basePath="/sunday-letter" />
        </div>
      </section>
    </div>
  );
}
