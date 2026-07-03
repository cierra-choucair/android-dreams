import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ArticleView } from "@/components/ArticleView";
import { formatFromCategories, isFormatSlug } from "@/lib/formats";
import { getPostBySlug, getRelatedPosts } from "@/lib/wp";
import { SITE_URL, truncate } from "@/lib/utils";

export const revalidate = 900; // individual articles: 15 minutes

interface Params {
  params: { category: string; slug: string };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  if (!isFormatSlug(params.category)) return {};
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  const format = formatFromCategories(post.categorySlugs);
  const url = `${SITE_URL}/${format.slug}/${post.slug}`;
  return {
    title: post.title,
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
      section: format.name,
      tags: post.tags.map((t) => t.name),
      ...(post.featuredImage ? { images: [{ url: post.featuredImage.url }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: truncate(post.excerpt, 160),
    },
  };
}

export default async function ArticlePage({ params }: Params) {
  if (!isFormatSlug(params.category)) notFound();

  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  // Canonicalize: if the URL's category isn't the post's format, redirect.
  const format = formatFromCategories(post.categorySlugs);
  if (format.slug !== params.category) {
    redirect(`/${format.slug}/${post.slug}`);
  }

  const related = await getRelatedPosts(post, 3);
  return <ArticleView post={post} related={related} />;
}
