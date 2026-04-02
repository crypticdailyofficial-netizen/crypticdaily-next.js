import type { Metadata } from "next";
import { Bebas_Neue, Syne, DM_Serif_Display, JetBrains_Mono } from "next/font/google";
import { FinancialDisclaimerContent } from "./FinancialDisclaimerContent";

const bebas   = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas", display: "swap" });
const syne    = Syne({ subsets: ["latin"], variable: "--font-syne", display: "swap" });
const dmSerif = DM_Serif_Display({ weight: "400", style: ["normal", "italic"], subsets: ["latin"], variable: "--font-dm-serif", display: "swap" });
const jbMono  = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jb-mono", display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const description =
    "Read Cryptic Daily's financial disclaimer, liability notice, and affiliate disclosure. Content is informational only, not financial advice.";

  return {
    title: "Financial Disclaimer",
    description,
    alternates: {
      canonical: "https://crypticdaily.com/disclaimer",
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: "Financial Disclaimer | Cryptic Daily",
      description,
      url: "https://crypticdaily.com/disclaimer",
      images: [{ url: "https://crypticdaily.com/og-default.png" }],
    },
  };
}

export default function FinancialDisclaimerPage() {
  const fontVars = [bebas.variable, syne.variable, dmSerif.variable, jbMono.variable].join(" ");
  return <FinancialDisclaimerContent fontVars={fontVars} />;
}
