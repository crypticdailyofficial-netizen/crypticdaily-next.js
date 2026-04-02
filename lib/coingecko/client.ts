import { MOCK_COINS } from "../constants";
import type { CoinGeckoCoin } from "./types";

const BASE_URL = "https://api.coingecko.com/api/v3";

async function fetchCoinGecko<T>(endpoint: string): Promise<T | null> {
  const apiKey = process.env.COINGECKO_API_KEY;
  const headers: HeadersInit = apiKey
    ? { "x-cg-demo-api-key": apiKey }
    : {};

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers,
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function getTopCoins(limit = 20): Promise<CoinGeckoCoin[]> {
  const data = await fetchCoinGecko<CoinGeckoCoin[]>(
    `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true&price_change_percentage=24h`
  );
  if (data) return data;
  // Fallback to mock data
  return MOCK_COINS.slice(0, limit).map((c) => ({
    id: c.id,
    symbol: c.symbol.toUpperCase(),
    name: c.name,
    image: c.logo,
    current_price: c.price,
    price_change_percentage_24h: c.change24h,
    market_cap: c.marketCap,
    total_volume: c.volume,
    market_cap_rank: c.rank,
    sparkline_in_7d: { price: c.sparkline },
    circulating_supply: 0,
    ath: 0,
    ath_date: "",
  }));
}

export async function getCoinDetail(coinId: string): Promise<CoinGeckoCoin | null> {
  const list = await getTopCoins(50);
  const found = list.find((c) => c.id === coinId);
  if (found) return found;
  const mockCoin = MOCK_COINS.find((c) => c.id === coinId);
  if (!mockCoin) return null;
  return {
    id: mockCoin.id,
    symbol: mockCoin.symbol.toUpperCase(),
    name: mockCoin.name,
    image: mockCoin.logo,
    current_price: mockCoin.price,
    price_change_percentage_24h: mockCoin.change24h,
    market_cap: mockCoin.marketCap,
    total_volume: mockCoin.volume,
    market_cap_rank: mockCoin.rank,
    sparkline_in_7d: { price: mockCoin.sparkline },
    circulating_supply: 0,
    ath: 0,
    ath_date: "",
  };
}

export async function getSimplePrices(ids: string[]): Promise<Record<string, { usd: number; usd_24h_change: number }>> {
  const data = await fetchCoinGecko<Record<string, { usd: number; usd_24h_change: number }>>(
    `/simple/price?ids=${ids.join(",")}&vs_currencies=usd&include_24hr_change=true`
  );
  if (data) return data;
  // Fallback
  const result: Record<string, { usd: number; usd_24h_change: number }> = {};
  MOCK_COINS.forEach((c) => {
    if (ids.includes(c.id)) {
      result[c.id] = { usd: c.price, usd_24h_change: c.change24h };
    }
  });
  return result;
}
