import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { CATEGORY_COLORS } from "@/lib/constants";
import { sanityClient } from "@/lib/sanity/client";
import { mapSanityArticles, mapSanityCategories } from "@/lib/sanity/adapters";
import {
  CATEGORY_ARTICLE_COUNT_QUERY,
  CATEGORY_BY_SLUG_QUERY,
  getAllCategories,
  getArticlesByCategory,
  getLatestArticles,
} from "@/lib/sanity/queries";
import { GlassPremiumArticleGrid } from "@/components/article/GlassPremiumArticleGrid";
import HeroBanner from "./HeroBanner";
import cryptoNewswireBannerImage from "@/public/images/crypto-newswire.webp";
import web3BuilderBannerImage from "@/public/images/web3-builder.webp";
import web3FraudFilesBannerImage from "@/public/images/web3-fraud-files.webp";

export const revalidate = 120;

const ALLOWED_CATEGORIES = [
  "crypto-newswire",
  "web3-builder",
  "web3-fraud-files",
] as const;

const CATEGORY_PAGE_COPY: Record<
  (typeof ALLOWED_CATEGORIES)[number],
  {
    eyebrow: string;
    title: string;
    description: string;
    metaDescription: string;
  }
> = {
  "crypto-newswire": {
    eyebrow: "Breaking · Markets · Policy",
    title: "Crypto Newswire",
    description:
      "The fastest-moving stories in cryptocurrency — market-moving announcements, exchange developments, regulatory decisions, and on-chain events reported as they happen. Crypto Newswire is Cryptic Daily's core breaking news vertical, covering Bitcoin, Ethereum, and the broader digital asset market without hype or delay. If it moved the market or changed the conversation today, it's here.",
    metaDescription:
      "Breaking crypto news covering market events, exchange updates, regulatory decisions, and on-chain developments — reported clearly and without hype.",
  },
  "web3-builder": {
    eyebrow: "Protocols · Tools · Infrastructure",
    title: "Web3 Builder",
    description:
      "Coverage of the engineers, protocols, and projects actively building the next layer of the internet — from DeFi infrastructure and Layer 2 networks to developer tooling, DAO governance, and emerging Web3 standards. Web3 Builder goes deeper than price: we cover what is actually being shipped, who is funding it, and what it means for the open web. For developers, founders, and technically-minded readers who want to understand what is being built, not just what it is worth.",
    metaDescription:
      "Web3 Builder covers the protocols, developers, and projects building decentralised infrastructure — DeFi, Layer 2, DAOs, and the open web.",
  },
  "web3-fraud-files": {
    eyebrow: "Scams · Exploits · Investigations",
    title: "Web3 Fraud Files",
    description:
      "Investigative coverage of rug pulls, smart contract exploits, phishing campaigns, fraudulent token launches, and the individuals behind them. Web3 Fraud Files exists because the crypto space moves fast and bad actors rely on that speed — our job is to document what happened, how it worked, and what readers can do to protect themselves. Every case covered here is sourced, verified, and reported without sensationalism.",
    metaDescription:
      "Web3 Fraud Files investigates crypto scams, rug pulls, smart contract exploits, and fraud — documented, sourced, and reported clearly.",
  },
};

const CATEGORY_BANNER_IMAGES: Record<
  (typeof ALLOWED_CATEGORIES)[number],
  typeof cryptoNewswireBannerImage
> = {
  "crypto-newswire": cryptoNewswireBannerImage,
  "web3-builder": web3BuilderBannerImage,
  "web3-fraud-files": web3FraudFilesBannerImage,
};

export async function generateStaticParams() {
  const categories = mapSanityCategories(await getAllCategories());

  return categories
    .filter((category) =>
      ALLOWED_CATEGORIES.includes(
        category.slug as (typeof ALLOWED_CATEGORIES)[number],
      ),
    )
    .map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;

  if (
    !ALLOWED_CATEGORIES.includes(
      category as (typeof ALLOWED_CATEGORIES)[number],
    )
  ) {
    return {};
  }

  const [cat, articleCount] = await Promise.all([
    sanityClient.fetch(CATEGORY_BY_SLUG_QUERY, { slug: category }),
    sanityClient.fetch<number>(CATEGORY_ARTICLE_COUNT_QUERY, {
      slug: category,
    }),
  ]);

  if (!cat) return {};

  const shouldIndex = articleCount >= 3;
  const pageCopy =
    CATEGORY_PAGE_COPY[category as (typeof ALLOWED_CATEGORIES)[number]];
  const description =
    pageCopy?.metaDescription ??
    `Latest ${cat.title} news and analysis from Cryptic Daily.`;

  return {
    title: `${cat.title} News`,
    description,
    alternates: {
      canonical: `https://crypticdaily.com/categories/${cat.slug}`,
    },
    robots: {
      index: shouldIndex,
      follow: true,
    },
    openGraph: {
      title: `${cat.title} News | Cryptic Daily`,
      description,
      url: `https://crypticdaily.com/categories/${cat.slug}`,
      images: [{ url: "https://crypticdaily.com/og-default.png" }],
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const [categoriesData, articlesData, sidebarArticlesData] = await Promise.all(
    [getAllCategories(), getArticlesByCategory(category), getLatestArticles(5)],
  );

  const categories = mapSanityCategories(categoriesData);
  const cat = categories.find((item) => item.slug === category);

  if (
    !cat ||
    !ALLOWED_CATEGORIES.includes(
      category as (typeof ALLOWED_CATEGORIES)[number],
    )
  ) {
    notFound();
  }

  const color = cat.color || CATEGORY_COLORS[category] || "#00D4FF";
  const articles = mapSanityArticles(articlesData);
  const sidebarArticles = mapSanityArticles(sidebarArticlesData);
  const pageCopy =
    CATEGORY_PAGE_COPY[category as (typeof ALLOWED_CATEGORIES)[number]];
  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${cat.title} News`,
    description: cat.description || pageCopy.description,
    url: `https://crypticdaily.com/categories/${cat.slug}`,
    publisher: {
      "@type": "Organization",
      name: "Cryptic Daily",
      url: "https://crypticdaily.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageJsonLd),
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category Hero */}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          <HeroBanner
            color={color}
            eyebrow={pageCopy.eyebrow}
            title={pageCopy.title}
            description={cat.description || pageCopy.description}
            articleCount={articles.length}
            bannerImage={
              CATEGORY_BANNER_IMAGES[
                category as (typeof ALLOWED_CATEGORIES)[number]
              ]
            }
            bannerImageAlt={`${pageCopy.title} banner artwork`}
          />
          <Sidebar trendingArticles={sidebarArticles} />
        </div>
        <div>
          {articles.length > 0 ? (
            <GlassPremiumArticleGrid articles={articles} />
          ) : (
            <div className="text-center py-16">
              <p className="text-5xl mb-4">📰</p>
              <p className="text-[#9CA3AF]">
                No articles in this category yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
