import type { Metadata } from "next";
import {
  Bebas_Neue,
  Syne,
  DM_Serif_Display,
  JetBrains_Mono,
} from "next/font/google";
import { PrivacyContent } from "./PrivacyContent";

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
    "Learn what data Cryptic Daily collects, how we use it, and your rights over privacy, cookies, and data requests.";

  return {
    title: "Privacy Policy",
    description,
    alternates: {
      canonical: "https://crypticdaily.com/privacy-policy",
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: "Privacy Policy | Cryptic Daily",
      description,
      url: "https://crypticdaily.com/privacy-policy",
      images: [{ url: "https://crypticdaily.com/og-default.png" }],
    },
  };
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function PrivacyPolicyPage() {
  const fontVars = [
    bebas.variable,
    syne.variable,
    dmSerif.variable,
    jbMono.variable,
  ].join(" ");

  return <PrivacyContent fontVars={fontVars} />;
}
