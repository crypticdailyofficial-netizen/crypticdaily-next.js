import { urlFor } from "./image";
import { calculateReadingTime } from "@/lib/utils";
import type { Article } from "@/types/article";

interface SanityImageSource {
  asset?: { _ref?: string | null } | null;
  url?: string | null;
  alt?: string | null;
  lqip?: string | null;
}

interface SanityAuthor {
  name?: string | null;
  slug?: string | null;
  role?: string | null;
  credentials?: string | null;
  bio?: string | null;
  twitter?: string | null;
  avatar?: SanityImageSource | null;
}

interface SanityCategory {
  title?: string | null;
  slug?: string | null;
  color?: string | null;
  description?: string | null;
  articleCount?: number | null;
}

interface SanityTag {
  title?: string | null;
  slug?: string | null;
  description?: string | null;
  articleCount?: number | null;
}

interface SanitySource {
  label?: string | null;
  url?: string | null;
}

export interface SanityArticleRecord {
  _id?: string;
  _updatedAt?: string | null;
  title?: string | null;
  slug?: string | null;
  excerpt?: string | null;
  bodyText?: string | null;
  publishedAt?: string | null;
  featured?: boolean | null;
  readingTime?: number | null;
  coverImage?: SanityImageSource | null;
  category?: SanityCategory | null;
  author?: SanityAuthor | null;
  tags?: SanityTag[] | null;
  body?: unknown[] | string | null;
  sources?: SanitySource[] | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
}

export interface SanityCategoryRecord {
  title?: string | null;
  slug?: string | null;
  color?: string | null;
  description?: string | null;
  articleCount?: number | null;
}

export interface CategorySummary {
  title: string;
  slug: string;
  color: string;
  description: string;
  articleCount: number;
}

export interface AuthorSummary {
  name: string;
  slug: string;
  role: string;
  credentials: string;
  bio: string;
  twitter?: string;
  avatar?: string | null;
}

function resolveImageUrl(
  image: SanityImageSource | null | undefined,
  options?: { width?: number; height?: number },
) {
  if (image?.asset?._ref) {
    let builder = urlFor(image as Parameters<typeof urlFor>[0]);

    if (options?.width) {
      builder = builder.width(options.width);
    }

    if (options?.height) {
      builder = builder.height(options.height);
    }

    return builder.url();
  }

  return image?.url ?? null;
}

function portableTextToPlainText(value: unknown[] | string | null | undefined) {
  if (typeof value === "string") {
    return value;
  }

  if (!Array.isArray(value)) {
    return "";
  }

  return value
    .flatMap((block) => {
      if (!block || typeof block !== "object") {
        return [];
      }

      const typedBlock = block as {
        children?: Array<{ text?: string | null }>;
      };

      if (!Array.isArray(typedBlock.children)) {
        return [];
      }

      return typedBlock.children.flatMap((child) =>
        typeof child?.text === "string" ? [child.text] : [],
      );
    })
    .join(" ");
}

function mapSanityTag(tag: SanityTag) {
  if (!tag.title || !tag.slug) {
    return null;
  }

  return {
    title: tag.title,
    slug: tag.slug,
  };
}

export function mapSanityAuthor(author: SanityAuthor | null | undefined) {
  if (!author?.name || !author.slug) {
    return null;
  }

  return {
    name: author.name,
    slug: author.slug,
    role: author.role ?? "",
    credentials: author.credentials ?? "",
    bio: author.bio ?? "",
    twitter: author.twitter ?? undefined,
    avatar: resolveImageUrl(author.avatar, {
      width: 240,
      height: 240,
    }),
  };
}

export function mapSanityAuthors(authors: SanityAuthor[] | null | undefined) {
  return (authors ?? []).flatMap((author) => {
    const mappedAuthor = mapSanityAuthor(author);

    return mappedAuthor ? [mappedAuthor] : [];
  });
}

export function mapSanityCategory(
  category: SanityCategoryRecord | null | undefined,
) {
  if (!category?.title || !category.slug) {
    return null;
  }

  return {
    title: category.title,
    slug: category.slug,
    color: category.color ?? "#00D4FF",
    description: category.description ?? "",
    articleCount:
      typeof category.articleCount === "number" ? category.articleCount : 0,
  };
}

export function mapSanityCategories(
  categories: SanityCategoryRecord[] | null | undefined,
) {
  return (categories ?? []).flatMap((category) => {
    const mappedCategory = mapSanityCategory(category);

    return mappedCategory ? [mappedCategory] : [];
  });
}

export function mapSanityArticle(
  article: SanityArticleRecord | null | undefined,
): Article | null {
  if (!article?.title || !article.slug) {
    return null;
  }

  const bodyText = portableTextToPlainText(article.body);
  const excerpt = article.excerpt ?? "";
  const readingTimeText = `${excerpt} ${(article.bodyText ?? bodyText).trim()}`.trim();

  return {
    id: article._id ?? article.slug,
    title: article.title,
    slug: article.slug,
    excerpt,
    coverImage: resolveImageUrl(article.coverImage, { width: 1600 }),
    coverImageAlt: article.coverImage?.alt ?? article.title,
    coverImageBlurDataURL: article.coverImage?.lqip ?? null,
    category: {
      slug: article.category?.slug ?? "uncategorized",
      title: article.category?.title ?? "Uncategorized",
      color: article.category?.color ?? "#00D4FF",
    },
    author: {
      name: article.author?.name ?? "Cryptic Daily",
      slug: article.author?.slug ?? "",
      avatar: resolveImageUrl(article.author?.avatar, {
        width: 120,
        height: 120,
      }),
      bio: article.author?.bio ?? undefined,
      twitter: article.author?.twitter ?? undefined,
      role: article.author?.role ?? undefined,
    },
    publishedAt: article.publishedAt ?? new Date(0).toISOString(),
    updatedAt: article._updatedAt ?? undefined,
    readingTime:
      typeof article.readingTime === "number"
        ? Math.max(1, article.readingTime)
        : calculateReadingTime(readingTimeText || article.title),
    tags: (article.tags ?? []).flatMap((tag) => {
      const mappedTag = mapSanityTag(tag);

      return mappedTag ? [mappedTag] : [];
    }),
    sources: (article.sources ?? []).flatMap((source) => {
      if (!source?.label || !source.url) {
        return [];
      }

      return [{ label: source.label, url: source.url }];
    }),
    featured: Boolean(article.featured),
    body: article.body ?? undefined,
    seoTitle: article.seoTitle ?? undefined,
    seoDescription: article.seoDescription ?? undefined,
  };
}

export function mapSanityArticles(
  articles: SanityArticleRecord[] | null | undefined,
) {
  return (articles ?? []).flatMap((article) => {
    const mappedArticle = mapSanityArticle(article);

    return mappedArticle ? [mappedArticle] : [];
  });
}

export function dedupeArticles(articles: Article[]) {
  const seen = new Set<string>();

  return articles.filter((article) => {
    if (seen.has(article.slug)) {
      return false;
    }

    seen.add(article.slug);
    return true;
  });
}
