import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { ALL_FORMATS, isFormatSlug } from "@/lib/formats";

/**
 * On-demand ISR revalidation, called by WordPress whenever a post is
 * published, updated, or unpublished (see wordpress/ad-revalidate.php).
 *
 * Auth: shared secret via the `x-revalidate-secret` header or a
 * `?secret=` query param, compared against REVALIDATE_SECRET.
 *
 * Payload (all optional):
 *   { "slug": "post-slug", "categories": ["qfrontline"] }
 *
 * With a slug, the post page, its category archive, feeds, and the
 * homepage regenerate immediately. Without one, the entire site cache
 * is purged — a safe, heavier fallback.
 */
export async function POST(request: Request) {
  const secret =
    request.headers.get("x-revalidate-secret") ??
    new URL(request.url).searchParams.get("secret");

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret." }, { status: 401 });
  }

  let body: { slug?: unknown; categories?: unknown } = {};
  try {
    body = await request.json();
  } catch {
    // Empty or non-JSON body: fall through to the full purge.
  }

  const slug =
    typeof body.slug === "string" && /^[a-z0-9-]+$/i.test(body.slug)
      ? body.slug
      : null;
  const categories = Array.isArray(body.categories)
    ? body.categories.filter(
        (c): c is string => typeof c === "string" && isFormatSlug(c),
      )
    : [];

  const revalidated: string[] = [];
  const hit = (path: string) => {
    revalidatePath(path);
    revalidated.push(path);
  };

  // Expire the DATA cache first: pages re-rendered below must refetch
  // from WordPress rather than reuse cached API responses.
  revalidateTag("wp-posts");
  revalidated.push("tag:wp-posts");
  if (slug) {
    revalidateTag(`wp-post-${slug}`);
    revalidated.push(`tag:wp-post-${slug}`);
  }

  if (slug) {
    // Unknown category (e.g. the webhook omitted it): try every format —
    // revalidating a path that was never rendered is a no-op.
    const formats = categories.length > 0 ? categories : [...ALL_FORMATS];
    for (const format of formats) {
      hit(`/${format}/${slug}`);
      hit(`/${format}`);
      hit(`/${format}/rss.xml`);
    }
    // Literal URLs don't reliably purge dynamic-segment routes in Next 14;
    // invalidate the article route patterns as well. Untouched articles
    // re-render from their still-cached data, so this stays cheap.
    revalidatePath("/[category]/[slug]", "page");
    revalidated.push("route:/[category]/[slug]");
    revalidatePath("/qfrontline/[slug]", "page");
    revalidated.push("route:/qfrontline/[slug]");
    hit("/");
    hit("/rss.xml");
    hit("/sitemap.xml");
    // Belt and braces: expire every cached page. With the data cache
    // already tag-purged above this is cheap — pages that didn't change
    // re-render once from fresh fetches on their next visit.
    revalidatePath("/", "layout");
    revalidated.push("/ (entire site)");
  } else {
    // Full purge: every route regenerates on its next request.
    revalidateTag("wp-tax");
    revalidated.push("tag:wp-tax");
    revalidatePath("/", "layout");
    revalidated.push("/ (entire site)");
  }

  return NextResponse.json({ ok: true, revalidated, now: new Date().toISOString() });
}
