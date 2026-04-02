import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArticleGrid } from "@/components/article/ArticleGrid";
import { MiniChart } from "@/components/market/MiniChart";
import { MOCK_COINS, MOCK_ARTICLES } from "@/lib/constants";
import { formatPrice, formatMarketCap, formatPercentage } from "@/lib/utils";

export const revalidate = 600;

export async function generateStaticParams() {
  return MOCK_COINS.map((c) => ({ coin: c.id }));
}

export async function generateMetadata({ params }: { params: { coin: string } }): Promise<Metadata> {
  const { coin } = await params;
  const coinData = MOCK_COINS.find((c) => c.id === coin);
  if (!coinData) return {};
  return {
    title: `${coinData.name} (${coinData.symbol}) Price, News & Analysis | Cryptic Daily`,
    description: `Live ${coinData.name} (${coinData.symbol}) price: ${formatPrice(coinData.price)}. 24h change: ${formatPercentage(coinData.change24h)}. Market cap: ${formatMarketCap(coinData.marketCap)}.`,
  };
}

export default async function CoinPage({ params }: { params: { coin: string } }) {
  const { coin } = await params;
  const coinData = MOCK_COINS.find((c) => c.id === coin);
  if (!coinData) notFound();

  const isPositive = coinData.change24h >= 0;
  const relatedArticles = MOCK_ARTICLES.filter((a) =>
    a.category.slug === "bitcoin" && coin === "bitcoin" ||
    a.category.slug === "ethereum" && coin === "ethereum" ||
    a.category.slug === "markets"
  ).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Coin Header */}
      <div className="bg-[#111827] border border-[#1E2A3A] rounded-2xl p-6 md:p-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <Image src={coinData.logo} alt={coinData.name} width={72} height={72} className="rounded-full" />
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold font-heading text-[#F9FAFB]">{coinData.name}</h1>
              <span className="text-sm text-[#9CA3AF] bg-white/5 px-2 py-0.5 rounded-full">{coinData.symbol}</span>
              <span className="text-xs text-[#9CA3AF] bg-white/5 px-2 py-0.5 rounded-full">Rank #{coinData.rank}</span>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-4xl font-bold font-heading text-[#F9FAFB]">{formatPrice(coinData.price)}</span>
              <span className={`text-lg font-semibold ${isPositive ? "text-[#10B981]" : "text-[#EF4444]"}`}>
                {isPositive ? "▲" : "▼"} {Math.abs(coinData.change24h).toFixed(2)}%
              </span>
            </div>
          </div>
          <div className="w-40 h-20">
            <MiniChart data={coinData.sparkline} positive={isPositive} />
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[#1E2A3A]">
          {[
            { label: "Market Cap", value: formatMarketCap(coinData.marketCap) },
            { label: "24h Volume", value: formatMarketCap(coinData.volume) },
            { label: "Circulating Supply", value: `${(coinData.marketCap / coinData.price / 1000000).toFixed(2)}M ${coinData.symbol}` },
            { label: "Market Cap Rank", value: `#${coinData.rank}` },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/5 rounded-xl p-4">
              <p className="text-xs text-[#9CA3AF] mb-1">{stat.label}</p>
              <p className="text-base font-semibold text-[#F9FAFB]">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Related News */}
      {relatedArticles.length > 0 && (
        <div>
          <h2 className="text-xl font-bold font-heading text-[#F9FAFB] mb-6">{coinData.name} News</h2>
          <ArticleGrid articles={relatedArticles} columns={3} />
        </div>
      )}
    </div>
  );
}
