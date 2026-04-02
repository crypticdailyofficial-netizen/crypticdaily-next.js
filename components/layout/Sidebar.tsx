import Link from "next/link";
import Image from "next/image";
import { TRENDING_ARTICLES, MOCK_COINS } from "@/lib/constants";
import { formatRelativeDate, formatPrice, formatPercentage } from "@/lib/utils";

export function Sidebar() {
  const gainers = MOCK_COINS.filter((c) => c.change24h > 0).sort((a, b) => b.change24h - a.change24h).slice(0, 3);
  const losers = MOCK_COINS.filter((c) => c.change24h < 0).sort((a, b) => a.change24h - b.change24h).slice(0, 3);

  return (
    <aside className="space-y-6">
      {/* Trending Articles */}
      <div className="bg-[#111827] border border-[#1E2A3A] rounded-xl p-5">
        <h2 className="text-[#F9FAFB] font-semibold font-heading text-base mb-4 flex items-center gap-2">
          <span className="text-[#EF4444]">🔥</span> Trending
        </h2>
        <div className="space-y-4">
          {TRENDING_ARTICLES.map((article, i) => (
            <Link key={article.id} href={`/news/${article.slug}`} className="flex gap-3 group">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-[#9CA3AF] group-hover:bg-[#00D4FF]/20 group-hover:text-[#00D4FF] transition-all duration-200">
                {i + 1}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-[#F9FAFB] group-hover:text-[#00D4FF] transition-colors duration-200 line-clamp-2 leading-5">
                  {article.title}
                </p>
                <p className="text-xs text-[#9CA3AF] mt-1">{formatRelativeDate(article.publishedAt)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Fear & Greed Index */}
      <div className="bg-[#111827] border border-[#1E2A3A] rounded-xl p-5">
        <h2 className="text-[#F9FAFB] font-semibold font-heading text-base mb-4">Fear & Greed Index</h2>
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border-4 border-[#10B981] mb-3">
            <div>
              <p className="text-3xl font-bold text-[#10B981]">72</p>
              <p className="text-xs text-[#9CA3AF]">Greed</p>
            </div>
          </div>
          <p className="text-xs text-[#9CA3AF]">Updated daily from alternative.me</p>
        </div>
      </div>

      {/* Top Gainers */}
      <div className="bg-[#111827] border border-[#1E2A3A] rounded-xl p-5">
        <h2 className="text-[#F9FAFB] font-semibold font-heading text-base mb-4 flex items-center gap-2">
          <span className="text-[#10B981]">▲</span> Top Gainers
        </h2>
        <div className="space-y-3">
          {gainers.map((coin) => (
            <Link key={coin.id} href={`/coins/${coin.id}`} className="flex items-center justify-between group">
              <div className="flex items-center gap-2">
                <Image src={coin.logo} alt={coin.name} width={24} height={24} className="rounded-full" />
                <span className="text-sm font-medium text-[#F9FAFB] group-hover:text-[#00D4FF] transition-colors duration-200">{coin.symbol}</span>
              </div>
              <span className="text-sm font-semibold text-[#10B981]">+{coin.change24h.toFixed(2)}%</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Top Losers */}
      <div className="bg-[#111827] border border-[#1E2A3A] rounded-xl p-5">
        <h2 className="text-[#F9FAFB] font-semibold font-heading text-base mb-4 flex items-center gap-2">
          <span className="text-[#EF4444]">▼</span> Top Losers
        </h2>
        <div className="space-y-3">
          {losers.map((coin) => (
            <Link key={coin.id} href={`/coins/${coin.id}`} className="flex items-center justify-between group">
              <div className="flex items-center gap-2">
                <Image src={coin.logo} alt={coin.name} width={24} height={24} className="rounded-full" />
                <span className="text-sm font-medium text-[#F9FAFB] group-hover:text-[#00D4FF] transition-colors duration-200">{coin.symbol}</span>
              </div>
              <span className="text-sm font-semibold text-[#EF4444]">{coin.change24h.toFixed(2)}%</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Bitcoin Dominance */}
      <div className="bg-[#111827] border border-[#1E2A3A] rounded-xl p-5">
        <h2 className="text-[#F9FAFB] font-semibold font-heading text-base mb-3">BTC Dominance</h2>
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold text-[#F7931A]">54.2%</span>
          <span className="text-sm text-[#10B981]">+0.3%</span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full rounded-full bg-[#F7931A]" style={{ width: "54.2%" }} />
        </div>
        <p className="text-xs text-[#9CA3AF] mt-2">of total crypto market cap</p>
      </div>
    </aside>
  );
}
