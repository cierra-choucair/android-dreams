import { buildRssFeed, RSS_HEADERS } from "@/lib/rss";
import { getPosts, REVALIDATE } from "@/lib/wp";

export const revalidate = 300;

export async function GET() {
  const { posts } = await getPosts({ perPage: 30, revalidate: REVALIDATE.archive });
  const xml = buildRssFeed({
    title: "Android Dreams",
    description:
      "Quantum technology, artificial intelligence, and the deep science building our sci-fi future. Imagine the future.",
    feedPath: "/rss.xml",
    posts,
  });
  return new Response(xml, { headers: RSS_HEADERS });
}
