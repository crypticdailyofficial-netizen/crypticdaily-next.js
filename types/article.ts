export interface Article {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string | null;
  coverImageAlt?: string;
  coverImageBlurDataURL?: string | null;
  category: { slug: string; title: string; color: string };
  author: {
    name: string;
    slug: string;
    avatar?: string | null;
    bio?: string;
    twitter?: string;
    role?: string;
  };
  publishedAt: string;
  updatedAt?: string;
  readingTime?: number;
  tags?: { title: string; slug: string }[];
  sources?: { label: string; url: string }[];
  featured?: boolean;
  views?: number;
  body?: string | unknown[];
  seoTitle?: string;
  seoDescription?: string;
}
