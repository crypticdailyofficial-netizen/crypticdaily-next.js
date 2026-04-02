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
export const metadata: Metadata = {
  title: "Contact | Cryptic Daily",
  description:
    "Get in touch with the Cryptic Daily team — editorial tips, corrections, business enquiries, media requests, and security disclosures.",
  openGraph: {
    title: "Contact | Cryptic Daily",
    description:
      "Reach the Cryptic Daily newsroom for tips, partnerships, media enquiries, and security disclosures.",
    url: "https://crypticdaily.com/contact",
    siteName: "Cryptic Daily",
    type: "website",
  },
};

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
