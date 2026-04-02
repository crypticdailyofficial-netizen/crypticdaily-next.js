"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface Props {
  fontVars: string;
}

/* ─── Table of contents ──────────────────────────────────────────────────── */
const TOC = [
  { num: "01", slug: "about", label: "About Cryptic Daily" },
  { num: "02", slug: "disclaimer", label: "Financial Disclaimer" },
  { num: "03", slug: "accuracy", label: "Accuracy of Information" },
  { num: "04", slug: "ip", label: "Intellectual Property" },
  { num: "05", slug: "use", label: "Acceptable Use" },
  { num: "06", slug: "third-party", label: "Third-Party Services & Links" },
  { num: "07", slug: "advertising", label: "Advertising" },
  { num: "08", slug: "newsletter", label: "Newsletter" },
  { num: "09", slug: "liability", label: "Limitation of Liability" },
  { num: "10", slug: "privacy", label: "Privacy" },
  { num: "11", slug: "changes", label: "Changes to These Terms" },
  { num: "12", slug: "law", label: "Governing Law" },
  { num: "13", slug: "contact", label: "Contact" },
];

/* ─── Section data ───────────────────────────────────────────────────────── */
const SECTIONS = [
  {
    num: "01",
    slug: "about",
    title: "About Cryptic Daily",
    accent: "#00D4FF",
    tag: "PUBLISHER",
    content: (
      <>
        <P>
          Cryptic Daily ("we", "us", "our") is an independent digital media
          publication covering cryptocurrency markets, blockchain technology,
          decentralised finance (DeFi), Web3, NFTs, and related topics. The
          website is available at{" "}
          <A href="https://crypticdaily.com">crypticdaily.com</A>.
        </P>
        <P>
          We are an editorial publisher. We are not a financial services firm,
          broker, exchange, investment adviser, or regulated entity of any kind.
        </P>
      </>
    ),
  },
  {
    num: "02",
    slug: "disclaimer",
    title: "Financial Disclaimer",
    accent: "#EF4444",
    tag: "⚠ IMPORTANT",
    highlight: true,
    content: (
      <>
        <P>
          Nothing on Cryptic Daily constitutes financial, investment, legal, or
          tax advice. All content — including news articles, market data, price
          information, analysis, opinion pieces, and any other material
          published on this site — is provided for{" "}
          <strong>informational and educational purposes only</strong>.
        </P>
        <P>
          Cryptocurrency markets are highly volatile and speculative. The value
          of any digital asset can fall to zero. Past performance does not
          indicate or guarantee future results. Any decisions you make regarding
          the purchase, sale, or holding of any cryptocurrency or digital asset
          are made entirely at your own risk.
        </P>
        <Ul
          items={[
            "Conduct your own independent research before making any financial decisions.",
            "Consult a qualified and regulated financial adviser who understands your personal circumstances.",
            "Never invest more than you can afford to lose.",
          ]}
          label="We strongly recommend that you:"
        />
        <P>
          Cryptic Daily, its editors, authors, and contributors accept no
          liability whatsoever for any financial loss, damage, or harm arising
          from any reliance placed on content published on this site.
        </P>
      </>
    ),
  },
  {
    num: "03",
    slug: "accuracy",
    title: "Accuracy of Information",
    accent: "#FFE600",
    tag: "EDITORIAL",
    content: (
      <>
        <P>
          We make reasonable efforts to ensure that all content published on
          Cryptic Daily is accurate at the time of publication. However, the
          cryptocurrency and blockchain space moves quickly, and information can
          become outdated rapidly.
        </P>
        <P>
          Cryptocurrency price data displayed on this site is sourced from
          third-party providers (including CoinGecko) and may be delayed,
          approximate, or subject to discrepancies. Do not rely on prices
          displayed here for trading decisions.
        </P>
        <P>
          We do not guarantee the completeness, accuracy, reliability, or
          timeliness of any content on this site. Where errors are identified,
          we will make reasonable efforts to correct them in a timely manner. If
          you believe a factual error exists in any article, please contact us
          at{" "}
          <A href="mailto:editorial@crypticdaily.com">
            editorial@crypticdaily.com
          </A>
          .
        </P>
      </>
    ),
  },
  {
    num: "04",
    slug: "ip",
    title: "Intellectual Property",
    accent: "#7C3AED",
    tag: "COPYRIGHT",
    content: (
      <>
        <P>
          All content published on Cryptic Daily — including but not limited to
          articles, headlines, excerpts, images, graphics, logos, and layout —
          is the intellectual property of Cryptic Daily or its respective
          content contributors, and is protected by applicable copyright and
          intellectual property laws.
        </P>
        <Ul
          label="You may:"
          color="green"
          items={[
            "Read, share links to, and quote brief excerpts from our articles for personal, non-commercial purposes, provided you clearly attribute Cryptic Daily and include a link to the original article.",
          ]}
        />
        <Ul
          label="You may not:"
          color="red"
          items={[
            "Copy, reproduce, republish, or redistribute full articles or substantial portions of content without prior written permission.",
            "Scrape, crawl, or systematically extract content from this site for any commercial purpose.",
            "Use our content to train machine learning models or AI systems without our explicit written consent.",
            "Remove or alter any copyright notices or attributions.",
          ]}
        />
        <P>
          For licensing, syndication, or reprint enquiries, please contact{" "}
          <A href="mailto:hello@crypticdaily.com">hello@crypticdaily.com</A>.
        </P>
      </>
    ),
  },
  {
    num: "05",
    slug: "use",
    title: "Acceptable Use",
    accent: "#00D4FF",
    tag: "CONDUCT",
    content: (
      <>
        <P>By using Cryptic Daily, you agree not to:</P>
        <Ul
          color="red"
          items={[
            "Use the site in any way that violates applicable local, national, or international laws or regulations.",
            "Attempt to interfere with, disrupt, or gain unauthorised access to any part of the site or its infrastructure.",
            "Use automated tools (bots, scrapers, crawlers) to access or extract content in a way that places unreasonable load on our servers.",
            "Attempt to circumvent any security or access-control measures.",
            "Use the site to spread misinformation, conduct fraud, or engage in any form of market manipulation.",
          ]}
        />
        <P>
          We reserve the right to restrict or terminate access to the site for
          any user who violates these terms or who we believe is acting in bad
          faith.
        </P>
      </>
    ),
  },
  {
    num: "06",
    slug: "third-party",
    title: "Third-Party Services & Links",
    accent: "#10B981",
    tag: "VENDORS",
    content: (
      <>
        <P>Cryptic Daily uses a number of third-party services to operate:</P>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-5">
          {[
            [
              "Sanity.io",
              "Headless CMS — editorial content storage & delivery",
            ],
            ["CoinGecko API", "Live and historical cryptocurrency market data"],
            ["Supabase", "Newsletter subscriptions & anonymous view counts"],
            ["Vercel", "Hosting and content delivery platform"],
            ["Google Analytics", "Anonymised site usage statistics"],
            ["Google AdSense", "Third-party advertisement serving"],
          ].map(([name, desc]) => (
            <div
              key={name}
              className="border border-[#1C2535] bg-[#0D1118] px-4 py-3"
            >
              <p
                className="text-[#00D4FF] text-[0.7rem] tracking-[0.12em] uppercase mb-1"
                style={{ fontFamily: "var(--font-jb-mono)" }}
              >
                {name}
              </p>
              <p className="text-[#6B7280] text-[0.82rem] leading-[1.55]">
                {desc}
              </p>
            </div>
          ))}
        </div>
        <P>
          Our site may also contain links to external websites operated by third
          parties. These links are provided for convenience and information
          only. We have no control over the content, privacy practices, or
          availability of third-party sites, and linking to them does not
          constitute an endorsement by Cryptic Daily.
        </P>
        <P>
          Any interaction you have with a third-party service — including any
          financial transaction — is solely between you and that third party.
          Cryptic Daily accepts no liability for such interactions.
        </P>
      </>
    ),
  },
  {
    num: "07",
    slug: "advertising",
    title: "Advertising",
    accent: "#FFE600",
    tag: "ADS",
    content: (
      <>
        <P>
          Cryptic Daily displays advertisements served by Google AdSense and
          potentially other advertising networks. These advertisements are
          clearly distinct from editorial content.
        </P>
        <P>
          Our editorial coverage is not influenced by advertisers. We do not
          accept payment to publish, promote, or positively cover any
          cryptocurrency project, token, exchange, or product unless it is
          clearly labelled as sponsored content.{" "}
          <strong>We currently do not publish sponsored content.</strong>
        </P>
        <P>
          Third-party advertisers may use cookies and similar tracking
          technologies to serve ads relevant to your interests. Please see our
          Privacy Policy for more information on how advertising cookies are
          used and how to opt out.
        </P>
        <P>
          Cryptic Daily is not responsible for the content, accuracy, or claims
          made in any advertisement displayed on this site. An advertisement
          appearing on this site does not constitute our endorsement of the
          advertised product or service.
        </P>
      </>
    ),
  },
  {
    num: "08",
    slug: "newsletter",
    title: "Newsletter",
    accent: "#7C3AED",
    tag: "EMAIL",
    content: (
      <>
        <P>
          We offer an email newsletter to keep you informed of our latest
          content. By subscribing, you agree to receive periodic emails from
          Cryptic Daily containing news, articles, and market updates.
        </P>
        <P>
          We will not share, sell, or transfer your email address to any third
          party for their own marketing purposes. You can unsubscribe at any
          time by clicking the unsubscribe link in any newsletter email, or by
          contacting us at{" "}
          <A href="mailto:hello@crypticdaily.com">hello@crypticdaily.com</A>.
        </P>
        <P>
          Newsletter subscriptions are stored using Supabase. Please refer to
          our Privacy Policy for full details on how we handle your personal
          data.
        </P>
      </>
    ),
  },
  {
    num: "09",
    slug: "liability",
    title: "Limitation of Liability",
    accent: "#EF4444",
    tag: "LEGAL",
    content: (
      <>
        <P>
          To the fullest extent permitted by applicable law, Cryptic Daily and
          its owners, editors, authors, contributors, and operators shall not be
          liable for:
        </P>
        <Ul
          color="red"
          items={[
            "Any direct, indirect, incidental, consequential, or punitive loss or damage arising from your use of, or reliance on, any content published on this site.",
            "Any financial loss arising from decisions made on the basis of information published here.",
            "Any loss of data, profits, goodwill, or business opportunity.",
            "Any interruption, suspension, or termination of access to the site.",
            "Any errors, inaccuracies, or omissions in content, including market data.",
          ]}
        />
        <P>
          This site is provided on an "as is" and "as available" basis without
          warranties of any kind, express or implied, including but not limited
          to warranties of merchantability, fitness for a particular purpose, or
          non-infringement.
        </P>
      </>
    ),
  },
  {
    num: "10",
    slug: "privacy",
    title: "Privacy",
    accent: "#00D4FF",
    tag: "DATA",
    content: (
      <>
        <P>
          Your use of Cryptic Daily is also governed by our Privacy Policy,
          which is incorporated into these Terms and Conditions by reference.
          The Privacy Policy explains what data we collect, how we use it, and
          your rights in relation to it.
        </P>
      </>
    ),
  },
  {
    num: "11",
    slug: "changes",
    title: "Changes to These Terms",
    accent: "#FFE600",
    tag: "UPDATES",
    content: (
      <>
        <P>
          We may update these Terms and Conditions from time to time to reflect
          changes in our services, technology, or applicable law. When we make
          material changes, we will update the "last updated" date at the top of
          this page.
        </P>
        <P>
          Your continued use of Cryptic Daily following any changes constitutes
          your acceptance of the revised terms. We encourage you to review this
          page periodically.
        </P>
      </>
    ),
  },
  {
    num: "12",
    slug: "law",
    title: "Governing Law",
    accent: "#7C3AED",
    tag: "JURISDICTION",
    content: (
      <>
        <P>
          These Terms and Conditions are governed by and construed in accordance
          with applicable law. Any disputes arising in connection with these
          terms shall be subject to the exclusive jurisdiction of the courts of
          the applicable territory.
        </P>
        <P>
          If you are accessing the site from the European Union, your statutory
          rights under EU consumer protection law remain unaffected by these
          terms.
        </P>
      </>
    ),
  },
  {
    num: "13",
    slug: "contact",
    title: "Contact",
    accent: "#10B981",
    tag: "GET IN TOUCH",
    content: (
      <>
        <P>
          If you have any questions about these Terms and Conditions, or wish to
          report a concern, please contact us:
        </P>
        <div className="mt-5 space-y-2">
          {[
            ["General enquiries", "hello@crypticdaily.com"],
            ["Editorial corrections", "editorial@crypticdaily.com"],
          ].map(([label, email]) => (
            <div
              key={email}
              className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6
                         border border-[#1C2535] bg-[#0D1118] px-5 py-3
                         hover:border-[#00D4FF] group transition-all duration-200"
            >
              <span
                className="text-[#6B7280] text-[0.68rem] tracking-[0.18em] uppercase w-48 flex-shrink-0"
                style={{ fontFamily: "var(--font-jb-mono)" }}
              >
                {label}
              </span>
              <a
                href={`mailto:${email}`}
                className="text-[#00D4FF] text-[0.82rem] tracking-[0.05em]
                           group-hover:text-[#FFE600] transition-colors duration-200"
                style={{ fontFamily: "var(--font-jb-mono)" }}
              >
                {email}
              </a>
            </div>
          ))}
        </div>
      </>
    ),
  },
];

/* ─── Small prose helpers ────────────────────────────────────────────────── */
function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[#9CA3AF] text-[0.93rem] leading-[1.85] mb-4 last:mb-0">
      {children}
    </p>
  );
}

function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-[#00D4FF] hover:text-[#FFE600] transition-colors duration-200 underline underline-offset-2"
    >
      {children}
    </a>
  );
}

function Ul({
  items,
  label,
  color = "muted",
}: {
  items: string[];
  label?: string;
  color?: "green" | "red" | "muted";
}) {
  const dotColor =
    color === "green"
      ? "bg-[#10B981]"
      : color === "red"
        ? "bg-[#EF4444]"
        : "bg-[#1C2535]";

  return (
    <div className="my-4">
      {label && (
        <p
          className="text-[#6B7280] text-[0.75rem] tracking-[0.12em] uppercase mb-3"
          style={{ fontFamily: "var(--font-jb-mono)" }}
        >
          {label}
        </p>
      )}
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 items-start">
            <span
              className={`flex-shrink-0 w-1.5 h-1.5 rounded-full mt-[0.45rem] ${dotColor}`}
            />
            <span className="text-[#9CA3AF] text-[0.93rem] leading-[1.8]">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Reveal hook ────────────────────────────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.06 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

function RevealSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, visible } = useReveal();
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </section>
  );
}

/* ─── SectionTag ─────────────────────────────────────────────────────────── */
function SectionTag({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="w-6 h-px bg-[#00D4FF]" />
      <span
        className="text-[#00D4FF] text-[0.68rem] tracking-[0.25em] uppercase"
        style={{ fontFamily: "var(--font-jb-mono)" }}
      >
        {label}
      </span>
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────────────────────────── */
export function TermsContent({ fontVars }: Props) {
  const [navHidden, setNavHidden] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const lastY = useRef(0);

  /* nav hide on scroll-down */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setNavHidden(y > lastY.current && y > 100);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* track active section via IntersectionObserver */
  useEffect(() => {
    const headings = document.querySelectorAll("[data-section-id]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActiveSection(
              (e.target as HTMLElement).dataset.sectionId ?? null,
            );
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    headings.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, []);

  const scrollTo = (slug: string) => {
    const el = document.getElementById(`section-${slug}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #06080F; }
        ::-webkit-scrollbar-thumb { background: #00D4FF; border-radius: 0; }

        .terms-root { cursor: crosshair; }

        /* grain */
        .terms-root::before {
          content: '';
          position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 9999; opacity: 0.35;
        }
        /* scanlines */
        .terms-root::after {
          content: '';
          position: fixed; inset: 0;
          background: repeating-linear-gradient(
            0deg, transparent, transparent 2px,
            rgba(0,212,255,0.015) 2px, rgba(0,212,255,0.015) 4px
          );
          pointer-events: none; z-index: 9998;
        }

        /* hero dot grid */
        .hero-dot-grid::before {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(0,212,255,0.1) 1px, transparent 1px);
          background-size: 40px 40px;
          z-index: 0;
        }

        /* section row hover */
        .terms-section-row::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 2px;
          background: var(--section-accent);
          transform: scaleY(0);
          transform-origin: top;
          transition: transform 0.35s ease;
        }
        .terms-section-row:hover::before { transform: scaleY(1); }
        .terms-section-row:hover .section-num { color: var(--section-accent) !important; }

        /* toc active item */
        .toc-item.active {
          color: #00D4FF !important;
          border-left-color: #00D4FF !important;
        }

        /* highlight box (financial disclaimer) */
        .highlight-box {
          border-left: 2px solid #EF4444;
          background: rgba(239,68,68,0.04);
          padding: 1.25rem 1.5rem;
          margin-bottom: 1rem;
          margin-top: 1rem;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes dotBlink {
          0%,100% { opacity: 1; }
          50%     { opacity: 0; }
        }
        @keyframes floatY {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-8px); }
        }
      
      `}</style>

      <main
        className={`terms-root relative bg-[#06080F] text-[#E8E4D9] overflow-x-clip ${fontVars}`}
        style={{ fontFamily: "var(--font-syne)" }}
      >
        {/* ── HERO ── */}
        <section
          className="hero-dot-grid relative min-h-[70vh] flex flex-col
                     justify-end px-6 md:px-12 pb-20 pt-36 overflow-hidden"
        >
          {/* ghost bg text */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                       whitespace-nowrap select-none pointer-events-none z-0 text-transparent leading-none"
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(90px, 16vw, 280px)",
              WebkitTextStroke: "1px rgba(0,212,255,0.06)",
              letterSpacing: "-0.02em",
            }}
            aria-hidden
          >
            TERMS
          </div>

          {/* vertical line */}
          <div
            className="absolute top-0 right-[30%] w-px h-full pointer-events-none z-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(124,58,237,0.15) 40%, rgba(0,212,255,0.12) 70%, transparent)",
            }}
            aria-hidden
          />

          <div
            className="relative z-10 max-w-4xl"
            style={{ animation: "fadeUp 1s ease both" }}
          >
            {/* eyebrow */}
            <div className="flex items-center gap-4 mb-6">
              <span
                className="w-2 h-2 rounded-full bg-[#00D4FF]"
                style={{ animation: "dotBlink 1.2s ease infinite" }}
              />
              <span
                className="text-[#00D4FF] text-[0.72rem] tracking-[0.25em] uppercase"
                style={{ fontFamily: "var(--font-jb-mono)" }}
              >
                EFFECTIVE: 1 APR 2025 &nbsp;·&nbsp; UPDATED: MARCH 2026
                &nbsp;·&nbsp; CRYPTICDAILY.COM
              </span>
            </div>

            {/* headline */}
            <h1
              className="text-[#E8E4D9] leading-[0.9] tracking-tight mb-6"
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(60px, 9.5vw, 136px)",
              }}
            >
              Terms &amp;
              <br />
              <span className="text-[#00D4FF]">Conditions</span>
              <br />
              <em
                style={{
                  fontFamily: "var(--font-dm-serif)",
                  fontStyle: "italic",
                  color: "#FFE600",
                  fontSize: "0.78em",
                }}
              >
                crypticdaily.com
              </em>
            </h1>

            <div className="w-full h-px bg-[#1C2535] mb-6" />

            <p
              className="text-[rgba(232,228,217,0.5)] text-[0.9rem] leading-[1.7]
                         border-l-2 border-[#1C2535] pl-4 max-w-xl"
            >
              Please read these Terms and Conditions carefully before using
              Cryptic Daily. By accessing or using this website, you agree to be
              bound by these terms.
            </p>
          </div>

        </section>

        {/* ── TWO-COLUMN LAYOUT: TOC sidebar + content ── */}
        <div
          className="max-w-[1400px] mx-auto px-6 md:px-12 py-16
                        flex flex-col lg:flex-row gap-12 lg:gap-20"
        >
          {/* ── STICKY TOC SIDEBAR ── */}
          <aside className="lg:w-[280px] flex-shrink-0">
            <div className="lg:sticky lg:top-28">
              <SectionTag label="Contents" />
              <nav className="space-y-0">
                {TOC.map((item) => (
                  <button
                    key={item.slug}
                    onClick={() => scrollTo(item.slug)}
                    className={`toc-item w-full text-left flex items-center gap-3
                                border-l-2 pl-3 py-2.5
                                transition-all duration-200 cursor-pointer
                                ${
                                  activeSection === item.slug
                                    ? "active border-[#00D4FF] text-[#00D4FF]"
                                    : "border-[#1C2535] text-[#6B7280] hover:text-[#E8E4D9] hover:border-[#1C2535]"
                                }`}
                  >
                    <span
                      className="text-[0.58rem] tracking-[0.12em] flex-shrink-0 w-6"
                      style={{ fontFamily: "var(--font-jb-mono)" }}
                    >
                      {item.num}
                    </span>
                    <span
                      className="text-[0.78rem] leading-[1.4]"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      {item.label}
                    </span>
                  </button>
                ))}
              </nav>

              {/* meta info */}
              <div className="mt-8 pt-6 border-t border-[#1C2535] space-y-2">
                {[
                  ["Effective", "1 Apr 2025"],
                  ["Updated", "March 2026"],
                  ["Applies to", "crypticdaily.com"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span
                      className="text-[#6B7280] text-[0.65rem] tracking-[0.1em] uppercase"
                      style={{ fontFamily: "var(--font-jb-mono)" }}
                    >
                      {k}
                    </span>
                    <span
                      className="text-[#E8E4D9] text-[0.65rem] tracking-[0.05em]"
                      style={{ fontFamily: "var(--font-jb-mono)" }}
                    >
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* ── MAIN CONTENT ── */}
          <main className="flex-1 min-w-0 space-y-0">
            {SECTIONS.map((section) => (
              <RevealSection key={section.slug}>
                <div
                  id={`section-${section.slug}`}
                  data-section-id={section.slug}
                  className={`terms-section-row relative pl-5 py-12
                              border-t border-[#1C2535] scroll-mt-28
                              transition-all duration-200
                              ${section.highlight ? "highlight-section" : ""}`}
                  style={
                    {
                      "--section-accent": section.accent,
                    } as React.CSSProperties
                  }
                >
                  {/* top row: num + tag */}
                  <div className="flex items-center gap-4 mb-5">
                    <span
                      className="section-num text-[#1C2535] leading-none transition-colors duration-300"
                      style={{
                        fontFamily: "var(--font-bebas)",
                        fontSize: "clamp(36px, 4vw, 56px)",
                      }}
                    >
                      {section.num}
                    </span>
                    <span
                      className="border border-[#1C2535] text-[#6B7280]
                                 text-[0.6rem] tracking-[0.18em] uppercase px-2 py-0.5"
                      style={{
                        fontFamily: "var(--font-jb-mono)",
                        borderColor: section.accent + "44",
                        color: section.accent,
                      }}
                    >
                      {section.tag}
                    </span>
                  </div>

                  {/* section heading */}
                  <h2
                    className="text-[#E8E4D9] leading-tight tracking-tight mb-6"
                    style={{
                      fontFamily: "var(--font-bebas)",
                      fontSize: "clamp(30px, 4vw, 52px)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {section.title}
                  </h2>

                  {/* optional disclaimer highlight wrapper */}
                  {section.highlight ? (
                    <div className="highlight-box">{section.content}</div>
                  ) : (
                    section.content
                  )}
                </div>
              </RevealSection>
            ))}

            {/* Bottom spacer */}
          </main>
        </div>

        {/* ── FOOTER STRIP ── */}
      </main>
    </>
  );
}
