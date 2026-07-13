import type { MetadataRoute } from "next";
import { formatFromCategories } from "@/lib/formats";
import { SITE_URL } from "@/lib/utils";
import { getPosts, REVALIDATE } from "@/lib/wp";

export const revalidate = 3600;

const STATIC_ROUTES: Array<{ path: string; priority: number }> = [
  { path: "", priority: 1 },
  { path: "/transmissions", priority: 0.9 },
  { path: "/deep-read", priority: 0.9 },
  { path: "/sci-fi-lens", priority: 0.9 },
  { path: "/sunday-letter", priority: 0.9 },
  { path: "/qfrontline", priority: 0.9 },
  { path: "/community", priority: 0.7 },
  { path: "/summit", priority: 0.7 },
  { path: "/hackathon", priority: 0.7 },
  { path: "/davos", priority: 0.6 },
  { path: "/about", priority: 0.6 },
  { path: "/manifesto", priority: 0.6 },
  { path: "/contact", priority: 0.5 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    changeFrequency: "daily",
    priority: route.priority,
  }));

  // Most recent 100 articles across all formats.
  const { posts } = await getPosts({ perPage: 100, revalidate: REVALIDATE.taxonomy });
  for (const post of posts) {
    const format = formatFromCategories(post.categorySlugs);
    entries.push({
      url: `${SITE_URL}/${format.slug}/${post.slug}`,
      lastModified: new Date(post.modified),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  return entries;
}
