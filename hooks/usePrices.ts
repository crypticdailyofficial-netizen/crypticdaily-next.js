'use client';

import { useState, useEffect, useCallback } from "react";
import { MOCK_COINS } from "@/lib/constants";
import type { Coin } from "@/types/coin";

export function usePrices(refreshInterval = 60000) {
  const [coins, setCoins] = useState<Coin[]>(MOCK_COINS);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchPrices = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=24h"
      );
      if (res.ok) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any[] = await res.json();
        setCoins(data.map((c) => ({
          id: c.id,
          symbol: c.symbol.toUpperCase(),
          name: c.name,
          price: c.current_price,
          change24h: c.price_change_percentage_24h ?? 0,
          marketCap: c.market_cap,
          volume: c.total_volume,
          logo: c.image,
          rank: c.market_cap_rank,
          sparkline: c.sparkline_in_7d?.price ?? [],
        })));
        setLastUpdated(new Date());
      }
    } catch {
      // Fall back to mock data on error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchPrices, refreshInterval]);

  return { coins, loading, lastUpdated, refetch: fetchPrices };
}
