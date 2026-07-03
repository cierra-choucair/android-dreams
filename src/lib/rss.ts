import { formatFromCategories } from "./formats";
import type { Post } from "./types";
import { SITE_URL } from "./utils";

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function buildRssFeed({
  title,
  description,
  feedPath,
  posts,
}: {
  title: string;
  description: string;
  feedPath: string;
  posts: Post[];
}): string {
  const items = posts
    .map((post) => {
      const format = formatFromCategories(post.categorySlugs);
      const url = `${SITE_URL}/${format.slug}/${post.slug}`;
      return `    <item>
      <title>${xmlEscape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <dc:creator>${xmlEscape(post.author.name)}</dc:creator>
      <category>${xmlEscape(format.name)}</category>
      <description>${xmlEscape(post.excerpt)}</description>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(title)}</title>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}${feedPath}" rel="self" type="application/rss+xml"/>
    <description>${xmlEscape(description)}</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;
}

export const RSS_HEADERS = {
  "Content-Type": "application/rss+xml; charset=utf-8",
  "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
};
