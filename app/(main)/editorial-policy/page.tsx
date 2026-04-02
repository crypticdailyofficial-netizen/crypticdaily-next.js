import type { Metadata } from "next";
import {
  Bebas_Neue,
  Syne,
  DM_Serif_Display,
  JetBrains_Mono,
} from "next/font/google";
import { EditorialContent } from "./EditorialContent";

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
    "Learn how Cryptic Daily sources, verifies, and publishes crypto news, including our standards, corrections process, and independence.";

  return {
    title: "Editorial Policy",
    description,
    alternates: {
      canonical: "https://crypticdaily.com/editorial-policy",
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: "Editorial Policy | Cryptic Daily",
      description,
      url: "https://crypticdaily.com/editorial-policy",
      images: [{ url: "https://crypticdaily.com/og-default.png" }],
    },
  };
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function EditorialPolicyPage() {
  const fontVars = [
    bebas.variable,
    syne.variable,
    dmSerif.variable,
    jbMono.variable,
  ].join(" ");

  return <EditorialContent fontVars={fontVars} />;
}
