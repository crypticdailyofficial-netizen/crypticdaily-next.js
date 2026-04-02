import { SITE_URL, MOCK_ARTICLES, CATEGORIES } from "@/lib/constants";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "hourly" as const, priority: 1.0 },
    { url: `${SITE_URL}/news`, lastModified: new Date(), changeFrequency: "hourly" as const, priority: 0.9 },
    { url: `${SITE_URL}/coins`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  const articlePages = MOCK_ARTICLES.map((article) => ({
    url: `${SITE_URL}/news/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categoryPages = CATEGORIES.map((cat) => ({
    url: `${SITE_URL}/categories/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  const coinSlugs = ["bitcoin", "ethereum", "binancecoin", "solana", "cardano", "ripple", "dogecoin", "polkadot", "avalanche-2", "chainlink"];
  const coinPages = coinSlugs.map((id) => ({
    url: `${SITE_URL}/coins/${id}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...articlePages, ...categoryPages, ...coinPages];
}
