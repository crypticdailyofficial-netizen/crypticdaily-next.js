import Image from "next/image";
import Link from "next/link";
import { MiniChart } from "./MiniChart";
import { formatPrice, formatMarketCap, formatPercentage } from "@/lib/utils";
import { MOCK_COINS } from "@/lib/constants";
import type { Coin } from "@/types/coin";

interface MarketTableProps {
  coins?: Coin[];
}

export function MarketTable({ coins = MOCK_COINS }: MarketTableProps) {
  return (
    <div className="bg-[#111827] border border-[#1E2A3A] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-[#1E2A3A] flex items-center justify-between">
        <h2 className="text-lg font-bold font-heading text-[#F9FAFB]">Live Market Prices</h2>
        <Link href="/coins" className="text-sm text-[#00D4FF] hover:underline font-medium">View all →</Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm" aria-label="Cryptocurrency market prices">
          <thead>
            <tr className="border-b border-[#1E2A3A] text-[#9CA3AF] text-xs uppercase tracking-wider">
              <th className="text-left py-3 px-5 font-medium">#</th>
              <th className="text-left py-3 px-2 font-medium">Name</th>
              <th className="text-right py-3 px-4 font-medium">Price</th>
              <th className="text-right py-3 px-4 font-medium">24h %</th>
              <th className="text-right py-3 px-4 font-medium hidden md:table-cell">Market Cap</th>
              <th className="text-right py-3 px-5 font-medium hidden lg:table-cell">7d Chart</th>
            </tr>
          </thead>
          <tbody>
            {coins.slice(0, 10).map((coin) => (
              <tr key={coin.id} className="border-b border-[#1E2A3A]/50 hover:bg-white/3 transition-colors duration-150">
                <td className="py-4 px-5 text-[#9CA3AF] font-medium">{coin.rank}</td>
                <td className="py-4 px-2">
                  <Link href={`/coins/${coin.id}`} className="flex items-center gap-3 group">
                    <Image src={coin.logo} alt={coin.name} width={32} height={32} className="rounded-full" />
                    <div>
                      <p className="font-semibold text-[#F9FAFB] group-hover:text-[#00D4FF] transition-colors duration-200">{coin.name}</p>
                      <p className="text-xs text-[#9CA3AF]">{coin.symbol}</p>
                    </div>
                  </Link>
                </td>
                <td className="py-4 px-4 text-right font-semibold text-[#F9FAFB]">{formatPrice(coin.price)}</td>
                <td className={`py-4 px-4 text-right font-semibold ${coin.change24h >= 0 ? "text-[#10B981]" : "text-[#EF4444]"}`}>
                  {formatPercentage(coin.change24h)}
                </td>
                <td className="py-4 px-4 text-right text-[#9CA3AF] hidden md:table-cell">{formatMarketCap(coin.marketCap)}</td>
                <td className="py-4 px-5 hidden lg:table-cell">
                  <div className="flex justify-end">
                    <MiniChart data={coin.sparkline} positive={coin.change24h >= 0} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
