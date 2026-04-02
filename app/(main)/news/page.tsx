import type { Metadata } from "next";
import { ArticleGrid } from "@/components/article/ArticleGrid";
import { Sidebar } from "@/components/layout/Sidebar";
import { MOCK_ARTICLES } from "@/lib/constants";
import { generatePageMetadata } from "@/lib/seo";

export const revalidate = 60;

export const metadata: Metadata = generatePageMetadata(
  "Latest Crypto News",
  "Stay updated with real-time cryptocurrency news, market analysis, and blockchain insights.",
  "/news"
);

export default function NewsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold font-heading text-[#F9FAFB] mb-3">Latest Crypto News</h1>
        <p className="text-[#9CA3AF] text-lg">Stay updated with real-time cryptocurrency news and market insights</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        <div>
          <ArticleGrid articles={MOCK_ARTICLES} />
        </div>
        <Sidebar />
      </div>
    </div>
  );
}
