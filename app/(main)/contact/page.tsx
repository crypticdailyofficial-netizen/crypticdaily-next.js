import type { Metadata } from "next";
import {
  Bebas_Neue,
  Syne,
  DM_Serif_Display,
  JetBrains_Mono,
} from "next/font/google";
import { ContactContent } from "./ContactContent";

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
    "Contact Cryptic Daily for editorial tips, corrections, business enquiries, media requests, and security disclosures.";

  return {
    title: "Contact",
    description,
    alternates: {
      canonical: "https://crypticdaily.com/contact",
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: "Contact | Cryptic Daily",
      description,
      url: "https://crypticdaily.com/contact",
      images: [{ url: "https://crypticdaily.com/og-default.png" }],
    },
  };
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function ContactPage() {
  const fontVars = [
    bebas.variable,
    syne.variable,
    dmSerif.variable,
    jbMono.variable,
  ].join(" ");

  return <ContactContent fontVars={fontVars} />;
}
