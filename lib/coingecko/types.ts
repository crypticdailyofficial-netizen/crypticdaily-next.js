export interface CoinGeckoCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  market_cap_rank: number;
  sparkline_in_7d: { price: number[] };
  circulating_supply: number;
  ath: number;
  ath_date: string;
}
