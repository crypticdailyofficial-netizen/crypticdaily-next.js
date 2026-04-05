import { NextResponse } from "next/server";

const COINGECKO_IDS = [
  "bitcoin",
  "ethereum",
  "binancecoin",
  "solana",
  "cardano",
  "ripple",
  "dogecoin",
  "polkadot",
  "chainlink",
  "avalanche-2",
];

const UPSTREAM_URL = `https://api.coingecko.com/api/v3/simple/price?ids=${COINGECKO_IDS.join(",")}&vs_currencies=usd&include_24hr_change=true`;

export const revalidate = 60;

export async function GET() {
  try {
    const res = await fetch(UPSTREAM_URL, {
      next: { revalidate: 60 },
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "upstream error" },
        { status: res.status },
      );
    }

    const data = await res.json();

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    });
  } catch {
    return NextResponse.json({ error: "failed to fetch prices" }, { status: 500 });
  }
}
