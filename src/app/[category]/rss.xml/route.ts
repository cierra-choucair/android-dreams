import { FORMATS, isFormatSlug } from "@/lib/formats";
import { buildRssFeed, RSS_HEADERS } from "@/lib/rss";
import { getPosts, REVALIDATE } from "@/lib/wp";

export const revalidate = 300;

export async function GET(
  _request: Request,
  { params }: { params: { category: string } },
) {
  if (!isFormatSlug(params.category)) {
    return new Response("Not found", { status: 404 });
  }
  const format = FORMATS[params.category];
  const { posts } = await getPosts({
    category: format.slug,
    perPage: 30,
    revalidate: REVALIDATE.archive,
  });
  const xml = buildRssFeed({
    title: `${format.name} · Android Dreams`,
    description: format.description,
    feedPath: `/${format.slug}/rss.xml`,
    posts,
  });
  return new Response(xml, { headers: RSS_HEADERS });
}
