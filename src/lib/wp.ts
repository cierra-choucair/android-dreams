import { FORMATS, type FormatSlug } from "./formats";
import { sanitizeWpHtml } from "./sanitize";
import { SAMPLE_AUTHORS, SAMPLE_POSTS, SAMPLE_TAGS } from "./sample-content";
import type {
  Author,
  Category,
  FeaturedImage,
  Post,
  PostList,
  Tag,
} from "./types";
import { readingMinutes, stripHtml, truncate } from "./utils";

/** Revalidation windows (seconds) per the publishing cadence. */
export const REVALIDATE = {
  home: 60, // homepage + latest articles: 1 minute
  archive: 300, // archive pages: 5 minutes
  article: 900, // individual articles: 15 minutes
  taxonomy: 3600, // category/tag/author metadata: 1 hour
} as const;

const WP_BASE = (process.env.NEXT_PUBLIC_WP_API_URL || "").replace(/\/$/, "");

/** True when no WordPress URL is configured and sample content is served. */
export const PREVIEW_MODE = WP_BASE === "";

// ─────────────────────────────────────────────────────────────────────────────
// Raw WP REST API shapes (only the fields we consume)
// ─────────────────────────────────────────────────────────────────────────────

interface WPRendered {
  rendered: string;
}

interface WPMedia {
  source_url?: string;
  alt_text?: string;
  media_details?: { width?: number; height?: number };
}

interface WPUser {
  id: number;
  name: string;
  slug: string;
  description?: string;
  avatar_urls?: Record<string, string>;
}

interface WPTerm {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
}

interface WPPost {
  id: number;
  slug: string;
  date: string;
  modified: string;
  title: WPRendered;
  content: WPRendered;
  excerpt: WPRendered;
  author: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    author?: WPUser[];
    "wp:featuredmedia"?: WPMedia[];
    "wp:term"?: WPTerm[][];
  };
}

interface WPCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Fetch plumbing
// ─────────────────────────────────────────────────────────────────────────────

async function wpFetch<T>(
  path: string,
  revalidate: number,
): Promise<{ data: T; totalPages: number; total: number } | null> {
  if (PREVIEW_MODE) return null;
  try {
    const res = await fetch(`${WP_BASE}/wp-json/wp/v2${path}`, {
      next: { revalidate },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as T;
    return {
      data,
      totalPages: Number(res.headers.get("X-WP-TotalPages") || 1),
      total: Number(res.headers.get("X-WP-Total") || 0),
    };
  } catch {
    // Network failure or malformed response: render an empty state rather
    // than crashing the page. ISR retries on the next revalidation window.
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Mapping
// ─────────────────────────────────────────────────────────────────────────────

function mapAuthor(user: WPUser | undefined): Author {
  if (!user) {
    return { id: 0, name: "Android Dreams", slug: "", description: "", avatar: null };
  }
  const avatars = user.avatar_urls || {};
  const avatar = avatars["96"] || avatars["48"] || avatars["24"] || null;
  return {
    id: user.id,
    name: user.name,
    slug: user.slug,
    description: user.description || "",
    avatar,
  };
}

function mapFeaturedImage(media: WPMedia | undefined): FeaturedImage | null {
  if (!media?.source_url) return null;
  return {
    url: media.source_url,
    width: media.media_details?.width || 1600,
    height: media.media_details?.height || 900,
    alt: media.alt_text || "",
  };
}

function mapPost(raw: WPPost): Post {
  const terms = raw._embedded?.["wp:term"] || [];
  const flat = terms.flat();
  const categorySlugs = flat
    .filter((t) => t.taxonomy === "category")
    .map((t) => t.slug);
  const tags: Tag[] = flat
    .filter((t) => t.taxonomy === "post_tag")
    .map((t) => ({ id: t.id, name: t.name, slug: t.slug }));
  const content = sanitizeWpHtml(raw.content?.rendered || "");
  return {
    id: raw.id,
    slug: raw.slug,
    title: stripHtml(raw.title?.rendered || "Untitled"),
    content,
    excerpt: truncate(stripHtml(raw.excerpt?.rendered || ""), 220),
    date: raw.date,
    modified: raw.modified,
    categorySlugs,
    tags,
    author: mapAuthor(raw._embedded?.author?.[0]),
    featuredImage: mapFeaturedImage(raw._embedded?.["wp:featuredmedia"]?.[0]),
    readingMinutes: readingMinutes(content),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Taxonomy lookups (slug → id), cached at the taxonomy window
// ─────────────────────────────────────────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  const res = await wpFetch<WPCategory[]>(
    `/categories?per_page=100`,
    REVALIDATE.taxonomy,
  );
  if (!res) {
    return Object.values(FORMATS).map((f, i) => ({
      id: i + 1,
      name: f.name,
      slug: f.slug,
      description: f.description,
      count: SAMPLE_POSTS.filter((p) => p.categorySlugs.includes(f.slug)).length,
    }));
  }
  return res.data.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    description: c.description,
    count: c.count,
  }));
}

async function categoryIdBySlug(slug: string): Promise<number | null> {
  const res = await wpFetch<WPCategory[]>(
    `/categories?slug=${encodeURIComponent(slug)}`,
    REVALIDATE.taxonomy,
  );
  return res?.data?.[0]?.id ?? null;
}

export async function getTagBySlug(slug: string): Promise<Tag | null> {
  if (PREVIEW_MODE) {
    return SAMPLE_TAGS.find((t) => t.slug === slug) ?? null;
  }
  const res = await wpFetch<WPTerm[]>(
    `/tags?slug=${encodeURIComponent(slug)}`,
    REVALIDATE.taxonomy,
  );
  const tag = res?.data?.[0];
  return tag ? { id: tag.id, name: tag.name, slug: tag.slug } : null;
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  if (PREVIEW_MODE) {
    return SAMPLE_AUTHORS.find((a) => a.slug === slug) ?? null;
  }
  const res = await wpFetch<WPUser[]>(
    `/users?slug=${encodeURIComponent(slug)}`,
    REVALIDATE.taxonomy,
  );
  const user = res?.data?.[0];
  return user ? mapAuthor(user) : null;
}

export async function getAuthorById(id: number): Promise<Author | null> {
  if (PREVIEW_MODE) {
    return SAMPLE_AUTHORS.find((a) => a.id === id) ?? null;
  }
  const res = await wpFetch<WPUser>(`/users/${id}`, REVALIDATE.taxonomy);
  return res ? mapAuthor(res.data) : null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Posts
// ─────────────────────────────────────────────────────────────────────────────

export interface GetPostsOptions {
  category?: string; // category slug
  tag?: string; // tag slug
  authorSlug?: string;
  search?: string;
  page?: number;
  perPage?: number;
  exclude?: number[];
  order?: "desc" | "asc"; // by date; desc (most recent) is the default
  revalidate?: number;
}

function samplePosts(opts: GetPostsOptions): PostList {
  const {
    category,
    tag,
    authorSlug,
    search,
    page = 1,
    perPage = 12,
    exclude = [],
    order = "desc",
  } = opts;
  let posts = SAMPLE_POSTS.slice();
  if (order === "asc") posts.reverse();
  if (category) posts = posts.filter((p) => p.categorySlugs.includes(category));
  if (tag) posts = posts.filter((p) => p.tags.some((t) => t.slug === tag));
  if (authorSlug) posts = posts.filter((p) => p.author.slug === authorSlug);
  if (exclude.length) posts = posts.filter((p) => !exclude.includes(p.id));
  if (search) {
    const q = search.toLowerCase();
    posts = posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        stripHtml(p.content).toLowerCase().includes(q),
    );
  }
  const total = posts.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  return {
    posts: posts.slice((page - 1) * perPage, page * perPage),
    total,
    totalPages,
  };
}

export async function getPosts(opts: GetPostsOptions = {}): Promise<PostList> {
  if (PREVIEW_MODE) return samplePosts(opts);

  const {
    category,
    tag,
    authorSlug,
    search,
    page = 1,
    perPage = 12,
    exclude = [],
    order = "desc",
    revalidate = REVALIDATE.archive,
  } = opts;

  const params = new URLSearchParams();
  params.set("_embed", "1");
  params.set("per_page", String(perPage));
  params.set("page", String(page));
  params.set("orderby", "date");
  params.set("order", order);

  if (category) {
    const id = await categoryIdBySlug(category);
    if (id === null) return { posts: [], total: 0, totalPages: 1 };
    params.set("categories", String(id));
  }
  if (tag) {
    const t = await getTagBySlug(tag);
    if (!t) return { posts: [], total: 0, totalPages: 1 };
    params.set("tags", String(t.id));
  }
  if (authorSlug) {
    const a = await getAuthorBySlug(authorSlug);
    if (!a) return { posts: [], total: 0, totalPages: 1 };
    params.set("author", String(a.id));
  }
  if (search) params.set("search", search);
  if (exclude.length) params.set("exclude", exclude.join(","));

  const res = await wpFetch<WPPost[]>(`/posts?${params}`, revalidate);
  if (!res) return { posts: [], total: 0, totalPages: 1 };
  return {
    posts: res.data.map(mapPost),
    total: res.total,
    totalPages: res.totalPages,
  };
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (PREVIEW_MODE) {
    return SAMPLE_POSTS.find((p) => p.slug === slug) ?? null;
  }
  const res = await wpFetch<WPPost[]>(
    `/posts?slug=${encodeURIComponent(slug)}&_embed=1`,
    REVALIDATE.article,
  );
  const raw = res?.data?.[0];
  return raw ? mapPost(raw) : null;
}

/** Related pieces: shared tags first, then same category, excluding self. */
export async function getRelatedPosts(post: Post, count = 3): Promise<Post[]> {
  const related: Post[] = [];
  const seen = new Set<number>([post.id]);

  if (post.tags.length > 0) {
    const byTag = await getPosts({
      tag: post.tags[0].slug,
      perPage: count + 1,
      exclude: [post.id],
      revalidate: REVALIDATE.article,
    });
    for (const p of byTag.posts) {
      if (!seen.has(p.id) && related.length < count) {
        related.push(p);
        seen.add(p.id);
      }
    }
  }

  if (related.length < count && post.categorySlugs.length > 0) {
    const byCategory = await getPosts({
      category: post.categorySlugs[0],
      perPage: count + related.length + 1,
      exclude: Array.from(seen),
      revalidate: REVALIDATE.article,
    });
    for (const p of byCategory.posts) {
      if (!seen.has(p.id) && related.length < count) {
        related.push(p);
        seen.add(p.id);
      }
    }
  }

  return related;
}

/**
 * The hero feature: the most recent post tagged "featured", falling back to
 * the most recent Deep Read, falling back to the most recent post of any kind.
 */
export async function getFeaturedPost(): Promise<Post | null> {
  const tagged = await getPosts({
    tag: "featured",
    perPage: 1,
    revalidate: REVALIDATE.home,
  });
  if (tagged.posts[0]) return tagged.posts[0];

  const deepRead = await getPosts({
    category: "deep-read" satisfies FormatSlug,
    perPage: 1,
    revalidate: REVALIDATE.home,
  });
  if (deepRead.posts[0]) return deepRead.posts[0];

  const any = await getPosts({ perPage: 1, revalidate: REVALIDATE.home });
  return any.posts[0] ?? null;
}
