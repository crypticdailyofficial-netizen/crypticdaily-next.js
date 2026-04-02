import type { Metadata } from "next";
import { GlassPremiumArticleGrid } from "@/components/article/GlassPremiumArticleGrid";
import { Sidebar } from "@/components/layout/Sidebar";
import EditorialHeroBanner from "@/components/layout/EditorialHeroBanner";
import { mapSanityArticles } from "@/lib/sanity/adapters";
import { getAllArticles, getLatestArticles } from "@/lib/sanity/queries";
import newsBannerImage from "@/public/images/news.webp";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Latest Crypto News",
  description:
    "Stay updated with real-time cryptocurrency news, market analysis, and blockchain insights.",
  alternates: {
    canonical: "https://crypticdaily.com/news",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Latest Crypto News | Cryptic Daily",
    description:
      "Stay updated with real-time cryptocurrency news, market analysis, and blockchain insights.",
    url: "https://crypticdaily.com/news",
    images: [{ url: "https://crypticdaily.com/og-default.png" }],
  },
};

export default async function NewsPage() {
  const [articlesData, sidebarArticlesData] = await Promise.all([
    getAllArticles(0, 12),
    getLatestArticles(5),
  ]);

  const articles = mapSanityArticles(articlesData);
  const sidebarArticles = mapSanityArticles(sidebarArticlesData);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        <EditorialHeroBanner
          color="#F59E0B"
          eyebrow="Breaking · Markets · Analysis"
          title="Latest Crypto News"
          description="Stay updated with real-time cryptocurrency news and market insights."
          articleCount={articles.length}
          bannerImage={newsBannerImage}
          bannerImageAlt="Latest Crypto News banner artwork"
        />
        <Sidebar trendingArticles={sidebarArticles} />
      </div>
      <div>
        <GlassPremiumArticleGrid articles={articles} />
      </div>
    </div>
  );
}
