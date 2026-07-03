/** Normalized post shape used across the site, mapped from the WP REST API. */
export interface Post {
  id: number;
  slug: string;
  title: string;
  /** Sanitized HTML body */
  content: string;
  /** Plain-text excerpt (one–two lines) */
  excerpt: string;
  date: string; // ISO 8601
  modified: string; // ISO 8601
  categorySlugs: string[];
  tags: Tag[];
  author: Author;
  featuredImage: FeaturedImage | null;
  readingMinutes: number;
}

export interface FeaturedImage {
  url: string;
  width: number;
  height: number;
  alt: string;
}

export interface Author {
  id: number;
  name: string;
  slug: string;
  description: string;
  avatar: string | null;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
}

export interface PostList {
  posts: Post[];
  total: number;
  totalPages: number;
}
