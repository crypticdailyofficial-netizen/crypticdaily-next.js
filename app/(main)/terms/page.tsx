import type { Metadata } from "next";
import {
  Bebas_Neue,
  Syne,
  DM_Serif_Display,
  JetBrains_Mono,
} from "next/font/google";
import { TermsContent } from "./TermsContent";

/* ─── Fonts ──────────────────────────────────────────────────────────────── */
const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});
const dmSerif = DM_Serif_Display({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});
const jbMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jb-mono",
  display: "swap",
});

/* ─── Metadata ───────────────────────────────────────────────────────────── */
export async function generateMetadata(): Promise<Metadata> {
  const description =
    "Read the terms for using Cryptic Daily, including acceptable use, intellectual property, advertising, and disclaimers.";

  return {
    title: "Terms & Conditions",
    description,
    alternates: {
      canonical: "https://crypticdaily.com/terms",
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: "Terms & Conditions | Cryptic Daily",
      description,
      url: "https://crypticdaily.com/terms",
      images: [{ url: "https://crypticdaily.com/og-default.png" }],
    },
  };
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function TermsPage() {
  const fontVars = [
    bebas.variable,
    syne.variable,
    dmSerif.variable,
    jbMono.variable,
  ].join(" ");

  return <TermsContent fontVars={fontVars} />;
}
