import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/constants";
import { sanityClient } from "@/lib/sanity/client";
import {
  ALL_ARTICLE_SLUGS_QUERY,
  ALL_AUTHOR_SLUGS_QUERY,
  ALL_CATEGORY_SLUGS_QUERY,
  ALL_TAG_SLUGS_QUERY,
  CATEGORY_ARTICLE_COUNT_QUERY,
  TAG_ARTICLE_COUNT_QUERY,
} from "@/lib/sanity/queries";

type ArticleSlugRecord = {
  slug: string;
  publishedAt?: string | null;
};

type CategorySlugRecord = {
  slug: string;
};

type AuthorSlugRecord = {
  slug: string;
};

type TagSlugRecord = {
  slug: string;
};

const sitemapClient = sanityClient.withConfig({ useCdn: false });

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/news`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/advertise`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/disclaimer`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/editorial-policy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/tags`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];

  let articles: ArticleSlugRecord[] = [];
  try {
    articles =
      (await sitemapClient.fetch<ArticleSlugRecord[]>(ALL_ARTICLE_SLUGS_QUERY)) ??
      [];
  } catch {
    articles = [];
  }

  let categories: CategorySlugRecord[] = [];
  try {
    categories =
      (await sitemapClient.fetch<CategorySlugRecord[]>(
        ALL_CATEGORY_SLUGS_QUERY,
      )) ?? [];
  } catch {
    categories = [];
  }

  let authors: AuthorSlugRecord[] = [];
  try {
    authors =
      (await sitemapClient.fetch<AuthorSlugRecord[]>(ALL_AUTHOR_SLUGS_QUERY)) ??
      [];
  } catch {
    authors = [];
  }

  let tags: TagSlugRecord[] = [];
  try {
    tags =
      (await sitemapClient.fetch<TagSlugRecord[]>(ALL_TAG_SLUGS_QUERY)) ?? [];
  } catch {
    tags = [];
  }

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/news/${article.slug}`,
    lastModified: article.publishedAt ? new Date(article.publishedAt) : now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const categoryCounts = await Promise.all(
    categories.map(async (category) => {
      try {
        const articleCount =
          (await sitemapClient.fetch<number>(CATEGORY_ARTICLE_COUNT_QUERY, {
            slug: category.slug,
          })) ?? 0;

        return { ...category, articleCount };
      } catch {
        return { ...category, articleCount: 0 };
      }
    }),
  );

  const categoryRoutes: MetadataRoute.Sitemap = categoryCounts
    .filter((category) => category.articleCount >= 3)
    .map((category) => ({
      url: `${SITE_URL}/categories/${category.slug}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.6,
    }));

  const authorRoutes: MetadataRoute.Sitemap = authors.map((author) => ({
    url: `${SITE_URL}/author/${author.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const tagCounts = await Promise.all(
    tags.map(async (tag) => {
      try {
        const articleCount =
          (await sitemapClient.fetch<number>(TAG_ARTICLE_COUNT_QUERY, {
            slug: tag.slug,
          })) ?? 0;

        return { ...tag, articleCount };
      } catch {
        return { ...tag, articleCount: 0 };
      }
    }),
  );

  const tagRoutes: MetadataRoute.Sitemap = tagCounts
    .filter((tag) => tag.articleCount > 0)
    .map((tag) => ({
      url: `${SITE_URL}/tags/${tag.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.5,
    }));

  return [
    ...staticRoutes,
    ...articleRoutes,
    ...categoryRoutes,
    ...authorRoutes,
    ...tagRoutes,
  ];
}
