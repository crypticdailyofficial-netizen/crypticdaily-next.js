export interface Article {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  category: { slug: string; title: string; color: string };
  author: { name: string; slug: string; avatar: string; bio?: string; twitter?: string; role?: string };
  publishedAt: string;
  readingTime?: number;
  tags?: { title: string; slug: string }[];
  featured?: boolean;
  views?: number;
  body?: string;
  seoTitle?: string;
  seoDescription?: string;
}
