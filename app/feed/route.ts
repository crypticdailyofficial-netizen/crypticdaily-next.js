import { createClient } from "next-sanity";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://crypticdaily.com";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "Cryptic Daily";
const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET;
const SANITY_TOKEN = process.env.SANITY_API_TOKEN;

const FEED_QUERY = `
  *[_type == "article" && defined(slug.current)] | order(publishedAt desc) [0...20] {
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    "category": category->title,
    "author": author->name
  }
`;

interface FeedArticle {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  category: string;
  author: string;
}

function escapeXml(str: string): string {
  return (str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function createFeedClient() {
  if (!SANITY_PROJECT_ID || !SANITY_DATASET) {
    return null;
  }

  return createClient({
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
    apiVersion: "2024-01-01",
    useCdn: true,
    perspective: "published",
    token: SANITY_TOKEN,
  });
}

export async function GET() {
  let articles: FeedArticle[] = [];
  const client = createFeedClient();

  if (client) {
    try {
      articles = await client.fetch(FEED_QUERY);
    } catch (err) {
      console.error("RSS feed: failed to fetch articles from Sanity", err);
    }
  } else {
    console.warn(
      "RSS feed: missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET",
    );
  }

  const items = articles
    .map((article) => {
      const url = `${SITE_URL}/news/${article.slug}`;
      const pubDate = article.publishedAt
        ? new Date(article.publishedAt).toUTCString()
        : new Date().toUTCString();

      return `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(article.excerpt || "")}</description>
      ${article.category ? `<category>${escapeXml(article.category)}</category>` : ""}
      ${article.author ? `<author>${escapeXml(article.author)}</author>` : ""}
    </item>`.trim();
    })
    .join("\n  ");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>Latest crypto news, market analysis, and Web3 reporting from ${escapeXml(SITE_NAME)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=600",
    },
  });
}
