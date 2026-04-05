import { HomePageClient } from "@/components/home/HomePageClient";
import {
  dedupeArticles,
  mapSanityArticle,
  mapSanityArticles,
  mapSanityCategories,
} from "@/lib/sanity/adapters";
import {
  getAllCategories,
  getFeaturedArticle,
  getLatestArticles,
  getTotalArticleCount,
} from "@/lib/sanity/queries";

export const revalidate = 300;

export default async function Homepage() {
  const [
    featuredArticleData,
    latestArticlesData,
    categoriesData,
    totalArticleCount,
  ] =
    await Promise.all([
      getFeaturedArticle(),
      getLatestArticles(24),
      getAllCategories(),
      getTotalArticleCount(),
    ]);

  const featuredArticle = mapSanityArticle(featuredArticleData);
  const latestArticles = dedupeArticles(mapSanityArticles(latestArticlesData));
  const categories = mapSanityCategories(categoriesData);

  // Preload the hero image via the /_next/image proxy so the browser can
  // start the request before the client JS renders the Hero component.
  const heroImageSrc =
    featuredArticle?.coverImage ?? latestArticles[0]?.coverImage ?? null;
  const heroPreloadUrl = heroImageSrc
    ? `/_next/image?url=${encodeURIComponent(heroImageSrc)}&w=1080&q=75`
    : null;

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Cryptic Daily — Crypto News & Analysis",
    url: "https://crypticdaily.com",
    description: "The latest cryptocurrency news, market analysis, and Web3 insights.",
    publisher: {
      "@type": "Organization",
      name: "Cryptic Daily",
      url: "https://crypticdaily.com",
    },
  };

  return (
    <>
      {heroPreloadUrl && (
        // eslint-disable-next-line @next/next/no-head-element
        <link
          rel="preload"
          as="image"
          href={heroPreloadUrl}
          // @ts-expect-error — fetchpriority is valid HTML but missing from React types
          fetchpriority="high"
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <HomePageClient
        featuredArticle={featuredArticle}
        latestArticles={latestArticles}
        categories={categories}
        totalArticleCount={totalArticleCount}
      />
    </>
  );
}
