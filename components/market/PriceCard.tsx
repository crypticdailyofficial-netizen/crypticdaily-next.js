import Image from "next/image";
import Link from "next/link";
import { formatPrice, formatPercentage } from "@/lib/utils";
import type { Coin } from "@/types/coin";

interface PriceCardProps {
  coin: Coin;
}

export function PriceCard({ coin }: PriceCardProps) {
  const isPositive = coin.change24h >= 0;
  return (
    <Link
      href={`/coins/${coin.id}`}
      className="flex items-center gap-3 bg-[#111827] border border-[#1E2A3A] rounded-xl p-4 hover:border-[#00D4FF]/40 hover:shadow-[0_0_12px_rgba(0,212,255,0.1)] transition-all duration-200 group"
    >
      <Image src={coin.logo} alt={coin.name} width={36} height={36} className="rounded-full" />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[#F9FAFB] text-sm group-hover:text-[#00D4FF] transition-colors duration-200">{coin.symbol}</p>
        <p className="text-xs text-[#9CA3AF] truncate">{coin.name}</p>
      </div>
      <div className="text-right">
        <p className="font-semibold text-[#F9FAFB] text-sm">{formatPrice(coin.price)}</p>
        <p className={`text-xs font-medium ${isPositive ? "text-[#10B981]" : "text-[#EF4444]"}`}>
          {isPositive ? "▲" : "▼"} {Math.abs(coin.change24h).toFixed(2)}%
        </p>
      </div>
    </Link>
  );
}
