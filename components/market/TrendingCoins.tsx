import { PriceCard } from "./PriceCard";
import { MOCK_COINS } from "@/lib/constants";
import type { Coin } from "@/types/coin";

interface TrendingCoinsProps {
  coins?: Coin[];
}

export function TrendingCoins({ coins = MOCK_COINS.slice(0, 6) }: TrendingCoinsProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3">Top Coins</h3>
      <div className="space-y-2">
        {coins.map((coin) => (
          <PriceCard key={coin.id} coin={coin} />
        ))}
      </div>
    </div>
  );
}
