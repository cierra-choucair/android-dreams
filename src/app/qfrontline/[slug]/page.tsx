import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleView } from "@/components/ArticleView";
import { getPostBySlug, getRelatedPosts } from "@/lib/wp";
import { SITE_URL, truncate } from "@/lib/utils";

export const revalidate = 900;

interface Params {
  params: { slug: string };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  const url = `${SITE_URL}/qfrontline/${post.slug}`;
  return {
    title: `${post.title} · QFrontline`,
    description: truncate(post.excerpt, 160),
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: truncate(post.excerpt, 160),
      url,
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: [post.author.name],
      section: "QFrontline",
      tags: post.tags.map((t) => t.name),
      ...(post.featuredImage ? { images: [{ url: post.featuredImage.url }] } : {}),
    },
  };
}

export default async function QFrontlineArticlePage({ params }: Params) {
  const post = await getPostBySlug(params.slug);
  if (!post || !post.categorySlugs.includes("qfrontline")) notFound();

  const related = await getRelatedPosts(post, 3);
  return <ArticleView post={post} related={related} />;
}
