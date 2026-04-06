"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import AnimatedHero from "@/components/home/AnimatedHero";
import { Hero } from "@/components/home/Hero";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import type { CategorySummary } from "@/lib/sanity/adapters";
import type { Article } from "@/types/article";
const Community = dynamic(() => import("../community/Community"), {
  loading: () => (
    <div className="h-[240px] rounded-2xl border border-white/10 bg-white/[0.03]" />
  ),
});
const GlassPremiumArticleGrid = dynamic(
  () =>
    import("@/components/article/GlassPremiumArticleGrid").then(
      (mod) => mod.GlassPremiumArticleGrid,
    ),
  {
    loading: () => (
      <div className="border-white/10 p-4 md:p-6">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={`home-grid-skeleton-${index}`}
              className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl"
            >
              <Skeleton className="h-56 w-full rounded-[26px]" />
              <div className="space-y-4 p-4 pt-5">
                <div className="flex items-center justify-between gap-3">
                  <Skeleton className="h-7 w-24 rounded-full" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-4/5" />
                <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
);

interface HomePageClientProps {
  featuredArticle: Article | null;
  latestArticles: Article[];
  categories: CategorySummary[];
  totalArticleCount: number;
}

export function HomePageClient({
  featuredArticle,
  latestArticles,
  categories,
  totalArticleCount,
}: HomePageClientProps) {
  const heroArticleRaw = featuredArticle ?? latestArticles[0] ?? null;
  const heroArticle = heroArticleRaw
    ? {
        ...heroArticleRaw,
        coverImage: null,
        coverImageBlurDataURL: null,
      }
    : null;
  const [activeTab, setActiveTab] = useState("all");

  const [email, setEmail] = useState("");
  const [subMessage, setSubMessage] = useState("");

  const articlesWithoutHero = heroArticle
    ? latestArticles.filter((article) => article.slug !== heroArticle.slug)
    : latestArticles;
  const filteredArticles =
    activeTab === "all"
      ? articlesWithoutHero
      : articlesWithoutHero.filter(
          (article) => article.category.slug === activeTab,
        );
  const marqueeArticles = heroArticle
    ? [heroArticle, ...articlesWithoutHero]
    : latestArticles;
  const tabs = useMemo(
    () => [{ slug: "all", title: "All" }, ...categories],
    [categories],
  );
  const activeStoryCount = useMemo(() => {
    if (activeTab === "all") {
      return totalArticleCount;
    }

    return (
      categories.find((category) => category.slug === activeTab)?.articleCount ??
      filteredArticles.length
    );
  }, [activeTab, categories, filteredArticles.length, totalArticleCount]);
  const activeLabel = useMemo(() => {
    return tabs.find((tab) => tab.slug === activeTab)?.title ?? "All";
  }, [activeTab, tabs]);
  const activeDeskHref =
    activeTab === "all" ? "/news" : `/categories/${activeTab}`;

  async function handleSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email) return;

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setSubMessage(data.message || "Subscribed!");
      setEmail("");
    } catch {
      setSubMessage("Something went wrong. Try again.");
    }
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full max-w-7xl px-4 pb-10 pt-4 sm:px-6 lg:px-8 lg:pt-5">
        <div className="relative mb-10 overflow-hidden rounded-[28px] border border-[#3A1A1A] bg-[#110707] shadow-[0_18px_60px_rgba(0,0,0,0.24)]">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(239,68,68,0.1),transparent_16%,transparent_84%,rgba(239,68,68,0.1))]" />
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-[linear-gradient(90deg,#0D0A07,rgba(13,10,7,0))]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-[linear-gradient(270deg,#0D0A07,rgba(13,10,7,0))]" />

          <div className="relative flex items-center gap-4 px-4 py-3 sm:px-5">
            <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#EF4444]/20 bg-[#1A0C0C] px-3 py-1.5 text-[0.64rem] font-semibold uppercase tracking-[0.22em] text-[#FCA5A5]">
              <span className="h-2 w-2 rounded-full bg-[#EF4444] shadow-[0_0_10px_rgba(239,68,68,0.6)]" />
              Breaking
            </span>

            <div className="relative flex-1 overflow-hidden">
              <div
                className="animate-marquee whitespace-nowrap"
                style={{
                  display: "inline-block",
                  width: "max-content",
                  animationDuration: "85s",
                }}
              >
                {[...marqueeArticles, ...marqueeArticles].map((article, i) => (
                  <span
                    key={`${article.slug}-${i}`}
                    className="mr-8 inline-flex items-center text-[13px]"
                  >
                    <Link
                      href={`/news/${article.slug}`}
                      className="text-[#A69292] transition-colors duration-200 hover:text-[#FEE2E2]"
                    >
                      {article.title}
                    </Link>
                    <span className="mx-4 text-[#6B3030]">•</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="pb-10 min-h-72.5">
          <AnimatedHero />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
          <div className="space-y-14">
            <Hero article={heroArticle} />

            <Community />
          </div>

          <Sidebar trendingArticles={marqueeArticles.slice(0, 5)} />
        </div>
        <section>
          <div className="max-w-7xl overflow-hidden py-12">
            <div className="relative overflow-hidden rounded-[36px] border border-[#33281B] bg-[#0B0907] text-white shadow-[0_28px_90px_rgba(0,0,0,0.36)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(245,158,11,0.18),transparent_24%),radial-gradient(circle_at_88%_14%,rgba(255,255,255,0.06),transparent_16%),linear-gradient(135deg,rgba(16,12,8,0.98)_0%,rgba(11,9,7,0.98)_44%,rgba(8,7,6,1)_100%)]" />
              <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(135,102,53,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(135,102,53,0.12)_1px,transparent_1px)] [background-size:72px_72px]" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,241,211,0.4),transparent)]" />
              <div className="pointer-events-none absolute left-0 top-0 h-20 w-20 border-l border-t border-[#F59E0B]/35" />
              <div className="pointer-events-none absolute bottom-0 right-0 h-24 w-24 border-b border-r border-[#F59E0B]/28" />

              <div className="relative z-10 p-6 sm:p-8 lg:p-10">
                <div className="grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_320px] lg:items-start">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full border border-[#F59E0B]/18 bg-[#1A130C]/88 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[#FCD34D]">
                        <span className="h-2 w-2 rounded-full bg-[#F59E0B]" />
                        Editorial Feed
                      </span>
                      <span className="text-[0.66rem] font-medium uppercase tracking-[0.26em] text-[#8A7660]">
                        Continuous desk rotation
                      </span>
                    </div>

                    <h2 className="mt-6 max-w-4xl text-4xl font-black leading-[0.9] tracking-[-0.06em] text-[#F6F1E8] sm:text-5xl lg:text-[4rem]">
                      Latest News
                    </h2>

                    <div className="mt-5 h-[2px] max-w-3xl bg-[linear-gradient(90deg,rgba(245,158,11,0.95)_0%,rgba(255,255,255,0.18)_42%,transparent_100%)]" />

                    <p className="mt-5 max-w-2xl text-sm leading-7 text-[#BCA890] sm:text-[15px]">
                      Real-time alerts, market briefs, and curated
                      opportunities from across the ecosystem.
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <div className="inline-flex items-center gap-2 rounded-full border border-[#F59E0B]/15 bg-[#1A130C]/72 px-3 py-2 text-xs font-medium text-[#EFD8B1]">
                        <span className="h-2 w-2 rounded-full bg-[#F59E0B] shadow-[0_0_12px_rgba(245,158,11,0.55)]" />
                        Active: {activeLabel}
                      </div>
                      <div className="inline-flex items-center gap-3 rounded-full border border-white/8 bg-white/[0.03] px-3 py-2 text-xs text-[#9F8F7D]">
                        <span className="text-[#F6F1E8]">
                          {String(activeStoryCount).padStart(2, "0")}
                        </span>
                        stories available
                      </div>
                    </div>
                  </div>

                  <aside className="rounded-[28px] border border-[#3C2E1E] bg-[linear-gradient(180deg,rgba(34,25,16,0.92)_0%,rgba(15,12,9,0.96)_100%)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                    <div className="flex items-center justify-between gap-3 border-b border-white/8 pb-4">
                      <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[#8A7660]">
                        Feed Monitor
                      </p>
                      <span className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-[#FCD34D]">
                        Live
                      </span>
                    </div>

                    <div className="mt-5 space-y-4">
                      <div className="flex items-end justify-between gap-4 border-b border-white/6 pb-4">
                        <div>
                          <p className="text-[0.64rem] uppercase tracking-[0.18em] text-[#9E8E7A]">
                            Current Desk
                          </p>
                          <p className="mt-2 text-lg font-semibold text-[#F6F1E8]">
                            {activeLabel}
                          </p>
                        </div>
                        <span className="text-3xl font-black tracking-[-0.08em] text-[#F59E0B]">
                          {String(activeStoryCount).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[0.64rem] uppercase tracking-[0.18em] text-[#9E8E7A]">
                            Coverage Mode
                          </p>
                          <p className="mt-2 text-sm leading-6 text-[#BCA890]">
                            Fast desk switching without leaving the main news
                            rail.
                          </p>
                        </div>
                      </div>
                    </div>
                  </aside>
                </div>

                <div className="hidden sm:block mt-7 rounded-[28px] border border-white/8 bg-[#0F0D0B]/86 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[#8A7660]">
                      Switch Desk
                    </p>
                    <span className="text-[0.66rem] uppercase tracking-[0.22em] text-[#D6B77A]">
                      {tabs.length} tabs
                    </span>
                  </div>

                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {tabs.map((tab) => (
                      <button
                        key={tab.slug}
                        onClick={() => {
                          setActiveTab(tab.slug);
                        }}
                        className={`mr-4 flex h-12 shrink-0 items-center justify-center rounded-md px-4 text-sm font-bold transition-all duration-100 sm:px-6 ${
                          activeTab === tab.slug
                            ? "bg-[#F0EDE8] text-black [box-shadow:5px_5px_rgb(0_212_255)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(0_212_255)]"
                            : "bg-[#121212] border border-white/40 text-white [box-shadow:5px_5px_rgb(82_82_82)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(82_82_82)]"
                        }`}
                      >
                        {tab.title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <>
            <GlassPremiumArticleGrid articles={filteredArticles} />

            <div className="mt-8 flex justify-center">
              <Link
                href={activeDeskHref}
                className="group inline-flex items-center gap-3 rounded-full border border-[#F59E0B]/18 bg-[linear-gradient(180deg,rgba(26,19,12,0.94),rgba(12,10,8,0.98))] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#F6F1E8] shadow-[0_18px_40px_rgba(0,0,0,0.24)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#F59E0B]/32 hover:text-[#FCD34D]"
              >
                <span>Load More Articles</span>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#D6B77A] transition-all duration-200 group-hover:border-[#F59E0B]/25 group-hover:bg-[#F59E0B]/10 group-hover:text-[#FCD34D]">
                  ↗
                </span>
              </Link>
            </div>
          </>
        </section>

        <section
          className="relative rounded-2xl p-10 text-center overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0C0C1A 0%, #0A0A16 100%)",
            border: "1px solid rgba(0,212,255,0.12)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,212,255,0.07) 0%, transparent 70%)",
            }}
          />

          <div className="relative max-w-md mx-auto">
            <div
              className="w-12 h-12 rounded-2xl mx-auto mb-5 flex items-center justify-center text-xl"
              style={{
                background: "rgba(0,212,255,0.1)",
                border: "1px solid rgba(0,212,255,0.2)",
              }}
            >
              📬
            </div>
            <h2
              className="text-2xl font-bold font-heading mb-2"
              style={{ color: "#F0EDE8" }}
            >
              Stay ahead of crypto markets
            </h2>
            <p className="text-sm mb-8" style={{ color: "#8B95A1" }}>
              Get daily crypto news and market insights delivered to your inbox.
            </p>
            {subMessage ? (
              <p className="font-medium" style={{ color: "#10B981" }}>
                {subMessage}
              </p>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address for newsletter
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Enter your email"
                  required
                  aria-label="Email for newsletter"
                  className="flex-1 rounded-full px-5 py-3 text-base outline-none transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#F0EDE8",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(0,212,255,0.4)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255,255,255,0.1)";
                  }}
                />
                <Button type="submit" variant="primary" size="md">
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
