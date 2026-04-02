'use client';

import { useEffect, useState } from "react";
import { MOCK_COINS } from "@/lib/constants";
import { formatPrice, formatPercentage } from "@/lib/utils";

export function PriceTicker() {
  const [coins, setCoins] = useState(MOCK_COINS.slice(0, 20));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Fetch live prices after mount
    const fetchPrices = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=24h",
          { next: { revalidate: 60 } }
        );
        if (res.ok) {
          const data = await res.json();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setCoins(data.map((c: any) => ({
            id: c.id,
            symbol: c.symbol.toUpperCase(),
            name: c.name,
            price: c.current_price,
            change24h: c.price_change_percentage_24h,
            marketCap: c.market_cap,
            volume: c.total_volume,
            logo: c.image,
            rank: c.market_cap_rank,
            sparkline: [],
          })));
        }
      } catch {
        // Use mock data on error
      }
    };
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  const tickerItems = [...coins, ...coins]; // Duplicate for seamless loop

  return (
    <div
      className="w-full bg-[#111827] border-b border-[#1E2A3A] overflow-hidden py-2"
      aria-label="Live crypto price ticker"
    >
      <div className="flex animate-marquee whitespace-nowrap" style={{ width: "max-content" }}>
        {tickerItems.map((coin, i) => (
          <span key={`${coin.id}-${i}`} className="inline-flex items-center gap-2 px-5 text-sm">
            <span className="font-semibold text-[#F9FAFB]">{coin.symbol}</span>
            <span className="text-[#9CA3AF]">{formatPrice(coin.price)}</span>
            <span
              className={`font-medium ${
                coin.change24h >= 0 ? "text-[#10B981]" : "text-[#EF4444]"
              }`}
            >
              {coin.change24h >= 0 ? "▲" : "▼"}{Math.abs(coin.change24h).toFixed(2)}%
            </span>
            <span className="text-[#1E2A3A]">|</span>
          </span>
        ))}
      </div>
    </div>
  );
}
