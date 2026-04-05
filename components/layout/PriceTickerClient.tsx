"use client";

import dynamic from "next/dynamic";

const PriceTicker = dynamic(
  () =>
    import("@/components/layout/PriceTicker").then((m) => ({
      default: m.PriceTicker,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="h-11 w-full border-y border-white/8 bg-[#050505]" />
    ),
  },
);

export function PriceTickerClient() {
  return <PriceTicker />;
}
