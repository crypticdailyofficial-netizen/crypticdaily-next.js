'use client';

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ArticleGrid } from "@/components/article/ArticleGrid";
import { MOCK_ARTICLES } from "@/lib/constants";
import type { Article } from "@/types/article";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<Article[]>([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (!query) return;
    const lower = query.toLowerCase();
    const filtered = MOCK_ARTICLES.filter(
      (a) =>
        a.title.toLowerCase().includes(lower) ||
        a.excerpt.toLowerCase().includes(lower) ||
        a.category.title.toLowerCase().includes(lower) ||
        a.tags?.some((t) => t.title.toLowerCase().includes(lower))
    );
    setResults(filtered);
    setSearched(true);
  }, [query]);

  return (
    <div>
      {searched && (
        <p className="text-[#9CA3AF] mb-8">
          Found <span className="text-[#F9FAFB] font-semibold">{results.length}</span> result{results.length !== 1 ? "s" : ""} for{" "}
          <span className="text-[#00D4FF] font-semibold">"{query}"</span>
        </p>
      )}
      <ArticleGrid articles={results} />
      {searched && results.length === 0 && (
        <div className="text-center py-12">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-[#9CA3AF] text-lg mb-6">No articles found for "{query}"</p>
          <p className="text-[#9CA3AF] text-sm">Try searching for: Bitcoin, Ethereum, DeFi, NFTs</p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-4xl font-bold font-heading text-[#F9FAFB] mb-8">Search</h1>
      <form onSubmit={(e) => { e.preventDefault(); setQuery(input); window.history.pushState({}, "", `/search?q=${encodeURIComponent(input)}`); }} className="mb-8">
        <div className="flex gap-3">
          <input
            type="search"
            placeholder="Search crypto news..."
            defaultValue={typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("q") ?? "" : ""}
            onChange={(e) => setInput(e.target.value)}
            aria-label="Search"
            className="flex-1 bg-[#111827] border border-[#1E2A3A] rounded-xl px-5 py-3 text-[#F9FAFB] placeholder-[#4B5563] focus:outline-none focus:border-[#00D4FF]/50 transition-all duration-200"
          />
          <button type="submit" className="px-6 py-3 bg-[#00D4FF] text-[#0A0F1E] font-semibold rounded-xl hover:bg-[#00B8E0] transition-all duration-200">
            Search
          </button>
        </div>
      </form>
      <Suspense fallback={<p className="text-[#9CA3AF]">Loading results…</p>}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
