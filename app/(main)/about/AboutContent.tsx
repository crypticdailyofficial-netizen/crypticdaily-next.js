"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface Props {
  fontVars: string;
  articleCount: number;
  categoryCount: number;
}

interface AboutStat {
  index: string;
  raw: number;
  display: string;
  suffix: string;
  label: string;
}

/* ─── Data ───────────────────────────────────────────────────────────────── */
const VALUES = [
  {
    num: "01",
    icon: "⚡",
    title: "Speed Without Compromise",
    desc: "Markets move in milliseconds. Our coverage follows the story, not the clock, so breaking crypto news arrives verified, contextualized, and ready to act on.",
  },
  {
    num: "02",
    icon: "📊",
    title: "Data-Driven Journalism",
    desc: "Every article is backed by on-chain data, official sources, and real-time market feeds. No speculation dressed up as analysis — just clear, evidence-based reporting you can verify yourself.",
  },
  {
    num: "03",
    icon: "🔍",
    title: "Radical Transparency",
    desc: "We disclose conflicts of interest, correct errors publicly, and never accept payment for editorial coverage. Our editorial independence is non-negotiable — in a space full of shills, that's rare.",
  },
];

const TIMELINE = [
  {
    year: "News",
    text: "Breaking crypto and blockchain news, sourced from on-chain data and official announcements.",
  },
  {
    year: "Analysis",
    text: "In-depth coverage of DeFi protocols, regulation, and market structure — without the hype.",
  },
  {
    year: "Fraud",
    text: "Investigative reporting on scams, exploits, and bad actors in the Web3 space.",
  },
];

/* ─── Custom hook: IntersectionObserver reveal ───────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, visible };
}

/* ─── Section wrapper with reveal ───────────────────────────────────────── */
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

/* ─── Section Tag ────────────────────────────────────────────────────────── */
function SectionTag({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="w-6 h-px bg-[#00D4FF]" />
      <span className="text-[0.68rem] uppercase tracking-[0.25em] text-[#00D4FF] [font-family:var(--font-jb-mono)]">
        {label}
      </span>
    </div>
  );
}

/* ─── Animated counter ───────────────────────────────────────────────────── */
function AnimatedStat({ raw, display, suffix, label, index }: AboutStat) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("0");
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);
          const duration = 1800;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(ease * raw);
            if (raw >= 1000) {
              setValue((current / 1000).toFixed(1) + "K");
            } else {
              setValue(String(current));
            }
            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              setValue(display);
            }
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [raw, display, triggered]);

  return (
    <div
      ref={ref}
      className="relative group px-0 py-8 border-r border-[#1C2535] last:border-r-0
                 [&:not(:first-child)]:pl-12 pr-12 first:pr-12"
    >
      <span className="absolute top-8 right-3 text-[0.6rem] tracking-[0.1em] text-[#1C2535] [font-family:var(--font-jb-mono)]">
        {index}
      </span>
      <div className="leading-none tracking-tight text-[#E8E4D9] transition-colors duration-300 group-hover:text-[#00D4FF] [font-family:var(--font-bebas)] [font-size:clamp(56px,7vw,110px)]">
        {value}
        <span className="align-super text-[#00D4FF] text-[0.45em]">
          {suffix}
        </span>
      </div>
      <div className="mt-2 text-[0.7rem] uppercase tracking-[0.18em] text-[#6B7280] [font-family:var(--font-jb-mono)]">
        {label}
      </div>
    </div>
  );
}

/* ─── Terminal card ──────────────────────────────────────────────────────── */
function Terminal() {
  return (
    <div className="relative overflow-hidden border border-[#1C2535] bg-[#0D1118] animate-border-pulse">
      {/* title bar */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-[#0D1118] border-b border-[#1C2535]" />
      <div className="absolute top-[10px] left-[14px] flex gap-[6px] z-10">
        <span className="w-[10px] h-[10px] rounded-full bg-[#EF4444]" />
        <span className="w-[10px] h-[10px] rounded-full bg-[#FFE600]" />
        <span className="w-[10px] h-[10px] rounded-full bg-[#10B981]" />
      </div>
      <span className="absolute top-2 left-1/2 z-10 -translate-x-1/2 text-[0.65rem] tracking-[0.1em] text-[#6B7280] [font-family:var(--font-jb-mono)]">
        mission.ts
      </span>

      {/* body */}
      <div className="mt-6 p-7 text-[0.8rem] leading-[1.9] [font-family:var(--font-jb-mono)]">
        <p className="text-[#6B7280]">{"// Cryptic Daily — Core Principles"}</p>
        <p>&nbsp;</p>
        <p>
          <span className="text-[#7C3AED]">const</span>{" "}
          <span className="text-[#00D4FF]">mission</span>{" "}
          <span className="text-[#E8E4D9]">= {"{"}</span>
        </p>
        {[
          ["speed", '"real-time"', "green"],
          ["accuracy", '"verified"', "green"],
          ["bias", '"zero"', "yellow"],
          ["editorial", '"independent"', "green"],
          ["paywalls", '"none"', "yellow"],
        ].map(([k, v, color]) => (
          <p key={k} className="pl-4">
            <span className="text-[#6B7280]">{k}</span>
            <span className="text-[#E8E4D9]">: </span>
            <span
              className={
                color === "green" ? "text-[#10B981]" : "text-[#FFE600]"
              }
            >
              {v}
            </span>
            <span className="text-[#E8E4D9]">,</span>
          </p>
        ))}
        <p className="text-[#E8E4D9]">{"}"}</p>
        <p>&nbsp;</p>
        <p>
          <span className="text-[#7C3AED]">export default</span>{" "}
          <span className="text-[#00D4FF]">mission</span>
          <span className="text-[#E8E4D9]">;</span>
          <span className="ml-0.5 inline-block h-[1.1em] w-2 animate-dot-blink bg-[#00D4FF] align-middle" />
        </p>
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
export function AboutContent({ fontVars, articleCount, categoryCount }: Props) {
  const stats = [
    {
      index: "01",
      raw: articleCount,
      display: articleCount.toLocaleString(),
      suffix: "+",
      label: "Articles Published",
    },
    {
      index: "02",
      raw: categoryCount,
      display: categoryCount.toLocaleString(),
      suffix: "",
      label: "Content Categories",
    },
  ] as const;

  return (
    <>
      <main
        className={`relative overflow-x-clip bg-[#06080F] text-[#E8E4D9] [font-family:var(--font-syne)] cursor-crosshair before:pointer-events-none before:absolute before:inset-0 before:z-0 before:opacity-35 before:[content:''] before:[background-image:url("data:image/svg+xml,%3Csvg_viewBox='0_0_256_256'_xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter_id='n'%3E%3CfeTurbulence_type='fractalNoise'_baseFrequency='0.9'_numOctaves='4'_stitchTiles='stitch'/%3E%3C/filter%3E%3Crect_width='100%25'_height='100%25'_filter='url(%23n)'_opacity='0.04'/%3E%3C/svg%3E")] after:pointer-events-none after:absolute after:inset-0 after:z-0 after:[content:''] after:[background:repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,212,255,0.015)_2px,rgba(0,212,255,0.015)_4px)] ${fontVars}`}
      >
        {/* ══════════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════════ */}
        <section className="relative flex min-h-screen flex-col justify-end overflow-hidden px-6 pb-20 pt-32 md:px-12 before:absolute before:inset-0 before:z-0 before:[content:''] before:[background-image:radial-gradient(circle,rgba(0,212,255,0.12)_1px,transparent_1px)] before:[background-size:40px_40px]">
          {/* Ghost bg text */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap leading-none tracking-tight text-transparent [font-family:var(--font-bebas)] [font-size:clamp(120px,22vw,340px)] [-webkit-text-stroke:1px_rgba(0,212,255,0.08)]"
            aria-hidden
          >
            ABOUT US
          </div>

          {/* Vertical accent line */}
          <div
            className="pointer-events-none absolute right-[20%] top-0 z-0 h-full w-px [background:linear-gradient(to_bottom,transparent,rgba(0,212,255,0.15)_30%,rgba(0,212,255,0.15)_70%,transparent)]"
            aria-hidden
          />

          {/* Content */}
          <div className="relative z-10 max-w-4xl animate-fade-up">
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-6">
              <span className="h-2 w-2 rounded-full bg-[#00D4FF] animate-dot-blink" />
              <span className="text-[0.72rem] uppercase tracking-[0.25em] text-[#00D4FF] [font-family:var(--font-jb-mono)]">
                CRYPTICDAILY.COM &nbsp;·&nbsp; INDEPENDENT CRYPTO JOURNALISM
              </span>
            </div>

            {/* Headline */}
            <h1 className="mb-8 leading-[0.9] tracking-tight text-[#E8E4D9] [font-family:var(--font-bebas)] [font-size:clamp(64px,10vw,140px)]">
              The Newsroom
              <br />
              Built for the
              <br />
              <span className="text-[#00D4FF]">On-Chain</span>{" "}
              <span className="text-[#FFE600] italic [font-family:var(--font-dm-serif)] text-[0.85em]">
                Era.
              </span>
            </h1>

            {/* Sub */}
            <p
              className="text-[rgba(232,228,217,0.65)] text-[1.05rem] leading-[1.75]
                         border-l-2 border-[#00D4FF] pl-5 mb-12 max-w-lg"
            >
              Cryptic Daily is an independent crypto news platform covering
              markets, DeFi, regulation, and Web3 — with a focus on original
              reporting and on-chain transparency.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 items-center">
              <Link
                href="/news"
                className="text-[0.8rem] font-bold tracking-[0.12em] uppercase
                           bg-[#00D4FF] text-[#06080F] px-8 py-[0.85rem]
                           hover:bg-[#FFE600] hover:translate-x-1
                           transition-all duration-200 [font-family:var(--font-syne)] [clip-path:polygon(0_0,calc(100%_-_12px)_0,100%_12px,100%_100%,0_100%)]"
              >
                Read the Latest →
              </Link>
              <Link
                href="/contact"
                className="border border-[#1C2535] px-8 py-[0.85rem] text-[0.75rem] uppercase tracking-[0.12em] text-[#6B7280] transition-all duration-200 hover:border-[#00D4FF] hover:text-[#00D4FF] [font-family:var(--font-jb-mono)]"
              >
                Contact Us
              </Link>
            </div>
          </div>

        </section>

        {/* ══════════════════════════════════════════════════════
            STATS
        ══════════════════════════════════════════════════════ */}
        <RevealSection className="px-6 md:px-12 py-20">
          <div className="flex items-center gap-4 mb-16">
            <span className="text-[0.68rem] uppercase tracking-[0.25em] text-[#00D4FF] [font-family:var(--font-jb-mono)]">
              By the numbers
            </span>
            <span className="flex-1 h-px bg-gradient-to-r from-[#1C2535] to-transparent" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            {stats.map((s) => (
              <AnimatedStat key={s.index} {...s} />
            ))}
          </div>
        </RevealSection>

        {/* ══════════════════════════════════════════════════════
            MISSION
        ══════════════════════════════════════════════════════ */}
        <RevealSection className="border-t border-[#1C2535]">
          <div className="px-6 md:px-12 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
            {/* Left */}
            <div>
              <SectionTag label="Mission" />
              <h2 className="mb-8 leading-[0.95] tracking-tight text-[#E8E4D9] [font-family:var(--font-bebas)] [font-size:clamp(52px,7vw,96px)]">
                Democratizing
                <br />
                Crypto
                <br />
                <em className="not-italic text-[#FFE600] italic [font-family:var(--font-dm-serif)] text-[0.9em]">
                  Intelligence.
                </em>
              </h2>
              <p className="mb-6 text-[1.2rem] leading-[1.8] text-[rgba(232,228,217,0.75)] [font-family:var(--font-dm-serif)]">
                The crypto markets move across a labyrinth of chains,
                protocols, and narratives. Making sense of it is impossible —
                until now.
              </p>
              <p className="text-[#6B7280] text-[0.9rem] leading-[1.75]">
                Our mission is to cover the crypto space honestly — reporting on
                markets, protocols, regulation, and fraud without paid
                placement, sponsored editorial, or price speculation dressed up
                as analysis.
              </p>
            </div>
            {/* Right: terminal */}
            <Terminal />
          </div>
        </RevealSection>

        {/* ══════════════════════════════════════════════════════
            VALUES
        ══════════════════════════════════════════════════════ */}
        <RevealSection className="bg-[#0D1118] border-t border-b border-[#1C2535]">
          <div className="px-6 md:px-12 py-20">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-4">
              <h2 className="leading-none tracking-tight text-[#E8E4D9] [font-family:var(--font-bebas)] [font-size:clamp(42px,6vw,80px)]">
                Core
                <br />
                Values
              </h2>
              <div className="text-right">
                <p className="mb-1 text-[0.7rem] tracking-[0.1em] text-[#6B7280] [font-family:var(--font-jb-mono)]">
                  03 PRINCIPLES
                </p>
                <p className="text-[0.65rem] text-[#6B7280] [font-family:var(--font-jb-mono)]">
                  That define us
                </p>
              </div>
            </div>

            <ul className="list-none">
              {VALUES.map((v) => (
                <li
                  key={v.num}
                  className="group grid cursor-pointer grid-cols-[60px_1fr] items-start gap-6 border-t border-[#1C2535] py-10 transition-all duration-200 hover:bg-[rgba(0,212,255,0.03)] md:grid-cols-[80px_1fr_1fr] md:gap-8"
                >
                  <div className="pt-1 leading-none text-[#1C2535] transition-colors duration-300 group-hover:text-[#00D4FF] [font-family:var(--font-bebas)] [font-size:clamp(48px,5vw,72px)]">
                    {v.num}
                  </div>
                  <div>
                    <div className="text-[1.5rem] mb-3">{v.icon}</div>
                    <div className="mb-3 pt-1 text-[1.2rem] font-bold text-[#E8E4D9] [font-family:var(--font-syne)]">
                      {v.title}
                    </div>
                  </div>
                  <div className="text-[#6B7280] text-[0.9rem] leading-[1.7] col-span-2 md:col-span-1">
                    {v.desc}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </RevealSection>

        {/* ══════════════════════════════════════════════════════
            TIMELINE
        ══════════════════════════════════════════════════════ */}
        <RevealSection className="border-b border-[#1C2535] overflow-hidden">
          <div className="px-6 md:px-12 py-20">
            <div className="mb-16">
              <SectionTag label="Our Focus" />
              <h2 className="leading-none tracking-tight text-[#E8E4D9] [font-family:var(--font-bebas)] [font-size:clamp(42px,5vw,72px)]">
                What We Cover.
              </h2>
            </div>

            {/* Horizontally scrollable track */}
            <div className="flex overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {TIMELINE.map((t, i) => (
                <div
                  key={t.year}
                  className={`group flex-none w-[260px] cursor-pointer py-8 pr-10
                              transition-all duration-200 hover:bg-[rgba(0,212,255,0.03)]
                              ${i < TIMELINE.length - 1 ? "border-r border-[#1C2535]" : ""}`}
                >
                  <div className="mb-4 h-2 w-2 rounded-full border border-[#00D4FF] bg-[#06080F] transition-colors duration-200 group-hover:bg-[#00D4FF]" />
                  <div className="mb-3 leading-none text-[#6B7280] transition-colors duration-300 group-hover:text-[#00D4FF] [font-family:var(--font-bebas)] text-[3.5rem]">
                    {t.year}
                  </div>
                  <p className="text-[#6B7280] text-[0.85rem] leading-[1.65] max-w-[220px]">
                    {t.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

        {/* ══════════════════════════════════════════════════════
            TEAM
        ══════════════════════════════════════════════════════ */}
        <RevealSection className="border-b border-[#1C2535]">
          <div className="px-6 md:px-12 py-20">
            <div className="mb-16">
              <SectionTag label="People" />
              <h2 className="mb-4 leading-none tracking-tight text-[#E8E4D9] [font-family:var(--font-bebas)] [font-size:clamp(42px,6vw,80px)]">
                Meet the Team.
              </h2>
              <p className="text-[#6B7280] text-[0.9rem] max-w-[480px]">
                A lean crew of crypto veterans, former finance journalists, and
                data scientists. Obsessed with getting the story right the first
                time.
              </p>
            </div>

            {/* Grid: 1px gap, bg = border color creates "gap as border" effect */}
            <div className="border border-[#1C2535] bg-[#06080F] p-7 md:p-10">
              <p className="text-[#6B7280] text-[0.9rem] leading-[1.75] max-w-3xl">
                Cryptic Daily is built by a small independent team of crypto
                enthusiasts, journalists, and developers. We do not list
                individual team members publicly at this stage. If you want to
                get in touch, use the contact page.
              </p>
            </div>
          </div>
        </RevealSection>

        {/* ══════════════════════════════════════════════════════
            CTA
        ══════════════════════════════════════════════════════ */}
        <RevealSection className="relative overflow-hidden text-center">
          {/* Radial glow */}
          <div
            className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_at_50%_100%,rgba(0,212,255,0.07)_0%,transparent_70%)]"
            aria-hidden
          />
          {/* Ghost bg text */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap leading-none text-transparent [font-family:var(--font-bebas)] [font-size:clamp(80px,14vw,200px)] tracking-[-0.01em] [-webkit-text-stroke:1px_rgba(255,230,0,0.06)]"
            aria-hidden
          >
            CRYPTIC DAILY
          </div>

          <div className="relative z-10 px-6 md:px-12 py-28">
            <h2 className="mb-6 leading-[0.95] tracking-tight text-[#E8E4D9] [font-family:var(--font-bebas)] [font-size:clamp(52px,8vw,120px)]">
              Stay Ahead
              <br />
              of the <span className="text-[#00D4FF]">Markets.</span>
            </h2>
            <p className="mb-12 text-[1.25rem] italic text-[rgba(232,228,217,0.55)] [font-family:var(--font-dm-serif)]">
              Independent crypto coverage. No sponsored editorial. No hype.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/news"
                className="bg-[#00D4FF] px-8 py-[0.85rem] text-[0.8rem] font-bold uppercase tracking-[0.12em] text-[#06080F] transition-all duration-200 hover:translate-x-1 hover:bg-[#FFE600] [font-family:var(--font-syne)] [clip-path:polygon(0_0,calc(100%_-_12px)_0,100%_12px,100%_100%,0_100%)]"
              >
                Read Latest News →
              </Link>
              <Link
                href="/contact"
                className="border border-[#1C2535] px-8 py-[0.85rem] text-[0.75rem] uppercase tracking-[0.12em] text-[#6B7280] transition-all duration-200 hover:border-[#00D4FF] hover:text-[#00D4FF] [font-family:var(--font-jb-mono)]"
              >
                Contact the Team
              </Link>
            </div>
          </div>
        </RevealSection>
      </main>
    </>
  );
}
