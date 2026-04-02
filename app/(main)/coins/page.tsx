import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MarketTable } from "@/components/market/MarketTable";
import { MOCK_COINS } from "@/lib/constants";
import { formatPrice, formatMarketCap, formatPercentage } from "@/lib/utils";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata(
  "Cryptocurrency Prices",
  "Live cryptocurrency prices, market caps, and 24h changes for Bitcoin, Ethereum, and top altcoins.",
  "/coins"
);

export default function CoinsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold font-heading text-[#F9FAFB] mb-3">Cryptocurrency Prices</h1>
        <p className="text-[#9CA3AF] text-lg">Live prices, market caps, and trading volumes for top cryptocurrencies</p>
      </div>
      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Market Cap", value: "$2.48T", change: "+1.2%" },
          { label: "24h Volume", value: "$89.3B", change: "+3.4%" },
          { label: "BTC Dominance", value: "54.2%", change: "+0.3%" },
          { label: "Active Cryptos", value: "12,847", change: "" },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#111827] border border-[#1E2A3A] rounded-xl p-4">
            <p className="text-xs text-[#9CA3AF] mb-1">{stat.label}</p>
            <p className="text-xl font-bold font-heading text-[#F9FAFB]">{stat.value}</p>
            {stat.change && <p className="text-sm text-[#10B981]">{stat.change}</p>}
          </div>
        ))}
      </div>
      <MarketTable coins={MOCK_COINS} />
    </div>
  );
}
