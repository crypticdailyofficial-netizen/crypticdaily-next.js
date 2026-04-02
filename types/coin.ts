export interface Coin {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume: number;
  logo: string;
  rank: number;
  sparkline: number[];
}
