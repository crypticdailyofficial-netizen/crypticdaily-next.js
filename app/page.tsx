'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArticleGrid } from "@/components/article/ArticleGrid";
import { MarketTable } from "@/components/market/MarketTable";
import { Sidebar } from "@/components/layout/Sidebar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MOCK_ARTICLES, MOCK_COINS, CATEGORIES } from "@/lib/constants";
import { formatRelativeDate } from "@/lib/utils";

const TABS = ["All", "DeFi", "NFTs", "Markets", "Regulation", "Web3"];

export default function Homepage() {
  const [activeTab, setActiveTab] = useState("All");
  const [email, setEmail] = useState("");
  const [subMessage, setSubMessage] = useState("");

  const featuredArticle = MOCK_ARTICLES[0];
  const filteredArticles = activeTab === "All"
    ? MOCK_ARTICLES.slice(1)
    : MOCK_ARTICLES.slice(1).filter(a => a.category.title === activeTab || a.category.slug === activeTab.toLowerCase());
  const livePriceCoins = MOCK_COINS.slice(0, 6);

  async function handleSubscribe(e: React.FormEvent) {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breaking News Banner */}
      <div className="bg-[#00D4FF]/10 border border-[#00D4FF]/20 rounded-full px-4 py-2 mb-8 flex items-center gap-3 overflow-hidden">
        <span className="flex-shrink-0 text-xs font-bold text-[#0A0F1E] bg-[#00D4FF] px-2 py-0.5 rounded-full uppercase tracking-wider">
          Breaking
        </span>
        <div className="overflow-hidden flex-1">
          <div className="animate-marquee whitespace-nowrap" style={{ display: "inline-block", width: "max-content" }}>
            {[...MOCK_ARTICLES, ...MOCK_ARTICLES].map((a, i) => (
              <span key={i} className="text-sm text-[#F9FAFB] mr-8">
                <Link href={`/news/${a.slug}`} className="hover:text-[#00D4FF] transition-colors">{a.title}</Link>
                <span className="mx-4 text-[#1E2A3A]">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        {/* Main Content */}
        <div className="space-y-12">
          {/* Hero Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#111827] border border-[#1E2A3A] rounded-2xl overflow-hidden">
            <div className="relative aspect-video md:aspect-auto overflow-hidden">
              <Image
                src={featuredArticle.coverImage}
                alt={featuredArticle.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111827]/60 hidden md:block" />
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <Badge label={featuredArticle.category.title} category={featuredArticle.category.slug} className="mb-4 w-fit" />
              <h1 className="text-2xl md:text-3xl font-bold font-heading text-[#F9FAFB] leading-tight mb-4">
                {featuredArticle.title}
              </h1>
              <p className="text-[#9CA3AF] text-sm leading-relaxed mb-6 line-clamp-3">
                {featuredArticle.excerpt}
              </p>
              <div className="flex items-center gap-3 mb-6">
                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                  <Image src={featuredArticle.author.avatar} alt={featuredArticle.author.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#F9FAFB]">{featuredArticle.author.name}</p>
                  <p className="text-xs text-[#9CA3AF]">{formatRelativeDate(featuredArticle.publishedAt)} · {featuredArticle.readingTime} min read</p>
                </div>
              </div>
              <Link href={`/news/${featuredArticle.slug}`}>
                <Button variant="primary" size="md">READ MORE →</Button>
              </Link>
            </div>
          </section>

          {/* Live Price Bar */}
          <section>
            <h2 className="text-lg font-bold font-heading text-[#F9FAFB] mb-4">Live Prices</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {livePriceCoins.map((coin) => (
                <Link key={coin.id} href={`/coins/${coin.id}`} className="bg-[#111827] border border-[#1E2A3A] rounded-xl p-3 hover:border-[#00D4FF]/40 transition-all duration-200 group text-center">
                  <Image src={coin.logo} alt={coin.name} width={28} height={28} className="rounded-full mx-auto mb-2" />
                  <p className="text-xs font-bold text-[#F9FAFB] group-hover:text-[#00D4FF] transition-colors">{coin.symbol}</p>
                  <p className="text-xs text-[#9CA3AF] mt-0.5">${coin.price >= 1 ? coin.price.toLocaleString("en-US", { maximumFractionDigits: 2 }) : coin.price.toFixed(4)}</p>
                  <p className={`text-xs font-semibold mt-0.5 ${coin.change24h >= 0 ? "text-[#10B981]" : "text-[#EF4444]"}`}>
                    {coin.change24h >= 0 ? "▲" : "▼"}{Math.abs(coin.change24h).toFixed(2)}%
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* Category Tabs + Latest News */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold font-heading text-[#F9FAFB]">Latest News</h2>
              <Link href="/news" className="text-sm text-[#00D4FF] hover:underline font-medium">View all →</Link>
            </div>
            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-[#00D4FF] text-[#0A0F1E]"
                      : "bg-white/5 text-[#9CA3AF] hover:bg-white/10 hover:text-[#F9FAFB]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <ArticleGrid articles={filteredArticles} />
          </section>

          {/* Markets Section */}
          <section>
            <MarketTable coins={MOCK_COINS} />
          </section>

          {/* Newsletter Signup */}
          <section className="bg-gradient-to-br from-[#111827] to-[#0A0F1E] border border-[#1E2A3A] rounded-2xl p-8 text-center">
            <div className="max-w-md mx-auto">
              <p className="text-2xl mb-2">📬</p>
              <h2 className="text-2xl font-bold font-heading text-[#F9FAFB] mb-2">Stay ahead of crypto markets</h2>
              <p className="text-[#9CA3AF] text-sm mb-6">Get daily crypto news and market insights delivered to your inbox.</p>
              {subMessage ? (
                <p className="text-[#10B981] font-medium">{subMessage}</p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    aria-label="Email for newsletter"
                    className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-3 text-sm text-[#F9FAFB] placeholder-[#4B5563] focus:outline-none focus:border-[#00D4FF]/50 transition-all duration-200"
                  />
                  <Button type="submit" variant="primary" size="md">Subscribe</Button>
                </form>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <Sidebar />
      </div>
    </div>
  );
}
