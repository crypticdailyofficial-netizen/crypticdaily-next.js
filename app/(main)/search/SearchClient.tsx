"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GlassPremiumArticleGrid } from "@/components/article/GlassPremiumArticleGrid";
import type { Article } from "@/types/article";

const MONO_FONT =
  '"JetBrains Mono", "Fira Mono", "SFMono-Regular", ui-monospace, monospace';

const QUICK_TOPICS = [
  "Bitcoin ETF",
  "Ethereum",
  "Stablecoins",
  "Regulation",
  "Exploits",
  "Layer 2",
];

const COVERAGE_ZONES = [
  {
    label: "Markets",
    description: "Price shocks, ETF flows, macro reactions, and fast sentiment turns.",
    query: "Bitcoin market",
  },
  {
    label: "Policy",
    description: "Regulation, enforcement, court filings, and global rules.",
    query: "crypto regulation",
  },
  {
    label: "Builders",
    description: "Protocols, launches, funding rounds, tooling, and network upgrades.",
    query: "Web3 builder",
  },
  {
    label: "Security",
    description: "Scams, exploits, wallet drains, and forensic investigations.",
    query: "crypto exploit",
  },
];

const SEARCH_NOTES = [
  "Use company, token, protocol, or policy terms for tighter matches.",
  "Shorter phrases usually perform better than long natural-language questions.",
  "Coverage spans market moves, builder news, fraud files, and regulation.",
];

function SearchResults() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";
  const [input, setInput] = useState(query);
  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    setInput(query);
  }, [query]);

  useEffect(() => {
    let cancelled = false;

    async function runSearch() {
      if (!query) {
        setResults([]);
        setSearched(false);
        setLoading(false);
        return;
      }

      setLoading(true);
      setSearched(true);

      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(query)}`,
          {
            cache: "no-store",
          },
        );

        if (!response.ok) {
          throw new Error("Search request failed");
        }

        const data = (await response.json()) as { results?: Article[] };

        if (!cancelled) {
          setResults(data.results ?? []);
        }
      } catch {
        if (!cancelled) {
          setResults([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void runSearch();

    return () => {
      cancelled = true;
    };
  }, [query]);

  function runRouteSearch(nextQuery: string) {
    if (!nextQuery) {
      router.push("/search");
      return;
    }

    router.push(`/search?q=${encodeURIComponent(nextQuery)}`);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    runRouteSearch(input.trim());
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[#050505] shadow-[0_30px_90px_rgba(0,0,0,0.42)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.12),transparent_28%),radial-gradient(circle_at_82%_22%,rgba(59,130,246,0.1),transparent_20%),radial-gradient(circle_at_62%_100%,rgba(239,68,68,0.08),transparent_26%),radial-gradient(circle_at_0%_100%,rgba(245,158,11,0.08),transparent_24%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.26),transparent)]" />
        <div className="pointer-events-none absolute right-8 top-8 h-24 w-24 rounded-full border border-[#22C55E]/15" />
        

        <div className="relative grid gap-8 px-6 py-7 sm:px-8 sm:py-9 lg:grid-cols-[minmax(0,1.4fr)_300px] lg:px-10 lg:py-10">
          <div className="max-w-3xl">
            <div
              className="mb-5 inline-flex items-center gap-3 rounded-full border border-[#22C55E]/20 bg-[#07140D] px-4 py-2 text-[0.68rem] uppercase tracking-[0.28em] text-[#BBF7D0]"
              style={{ fontFamily: MONO_FONT }}
            >
              <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
              Archive Search
            </div>

            <h1 className="max-w-3xl text-4xl font-black leading-[0.95] tracking-[-0.04em] text-white sm:text-5xl lg:text-[4.2rem]">
              Search the
              <span className="block text-[#BBF7D0]">news wire</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-[#98A4B3] sm:text-lg">
              Pull fast reads on market shocks, policy moves, protocol launches,
              fraud investigations, and the builders shaping the next cycle.
            </p>

            <form onSubmit={handleSubmit} className="mt-8">
              <label htmlFor="search-query" className="sr-only">
                Search articles
              </label>

              <div className="rounded-[28px] border border-white/10 bg-[#060C15]/90 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                <div className="flex flex-col gap-3 lg:flex-row">
                  <div className="relative flex-1">
                    <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[#4B637D]">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.8}
                          d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </span>

                    <input
                      id="search-query"
                      type="search"
                      placeholder="Search Bitcoin, SEC, Coinbase, Solana, exploits..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      aria-label="Search"
                      className="h-14 w-full rounded-[22px] border border-white/8 bg-[#0A121F] pl-14 pr-5 text-[0.98rem] text-[#F9FAFB] placeholder:text-[#506175] focus:border-[#22C55E]/50 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex h-14 items-center justify-center rounded-[22px] bg-[#22C55E] px-6 text-sm font-semibold uppercase tracking-[0.16em] text-[#04110A] transition-all duration-200 hover:bg-[#4ADE80] lg:min-w-[180px]"
                    style={{ fontFamily: MONO_FONT }}
                  >
                    Scan Archive
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5 flex flex-wrap gap-2.5">
              {QUICK_TOPICS.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => runRouteSearch(topic)}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[0.72rem] uppercase tracking-[0.18em] text-[#B3BECA] transition-all duration-200 hover:border-[#22C55E]/35 hover:text-[#ECFDF5]"
                  style={{ fontFamily: MONO_FONT }}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[24px] border border-white/10 bg-[#060C15]/92 p-5">
              <p
                className="text-[0.66rem] uppercase tracking-[0.22em] text-[#6E8198]"
                style={{ fontFamily: MONO_FONT }}
              >
                Search Map
              </p>
              <div className="mt-4 space-y-3">
                {["Markets", "Regulation", "Builders", "Security"].map(
                  (item, index) => (
                    <div
                      key={item}
                      className="flex items-center justify-between border-b border-white/6 pb-3 last:border-b-0 last:pb-0"
                    >
                      <span className="text-sm font-medium text-[#E7EEF7]">
                        {item}
                      </span>
                      <span
                        className="text-[0.7rem] text-[#6E8198]"
                        style={{ fontFamily: MONO_FONT }}
                      >
                        0{index + 1}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="rounded-[24px] border border-[#22C55E]/16 bg-[linear-gradient(180deg,rgba(34,197,94,0.08),rgba(4,12,20,0.92))] p-5">
              <p
                className="text-[0.66rem] uppercase tracking-[0.22em] text-[#BBF7D0]"
                style={{ fontFamily: MONO_FONT }}
              >
                Query State
              </p>
              <p className="mt-4 text-3xl font-black tracking-[-0.05em] text-white">
                {query ? (loading ? "..." : results.length) : "24/7"}
              </p>
              <p className="mt-2 text-sm leading-6 text-[#9FB2C4]">
                {query
                  ? `Indexed matches for "${query}".`
                  : "Search tuned for fast archive pulls across the site’s core desks."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {searched && (
        <section className="mt-6 rounded-[26px] border border-white/10 bg-[#0A111B]/90 px-5 py-4 shadow-[0_18px_55px_rgba(0,0,0,0.24)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p
                className="text-[0.68rem] uppercase tracking-[0.2em] text-[#6E8198]"
                style={{ fontFamily: MONO_FONT }}
              >
                Search Result
              </p>
              <p className="mt-2 text-xl font-bold text-white sm:text-2xl">
                {loading
                  ? "Scanning the archive..."
                  : `${results.length} result${results.length === 1 ? "" : "s"} for `}
                {!loading && (
                  <span className="text-[#BBF7D0]">&quot;{query}&quot;</span>
                )}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setInput("");
                runRouteSearch("");
              }}
              className="inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-2 text-[0.72rem] uppercase tracking-[0.18em] text-[#A8B3BF] transition-colors duration-200 hover:border-white/20 hover:text-white"
              style={{ fontFamily: MONO_FONT }}
            >
              Clear Search
            </button>
          </div>
        </section>
      )}

      {!searched ? (
        <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_320px]">
          <div className="rounded-[30px] border border-white/10 bg-[#0A111B]/88 p-6 shadow-[0_22px_70px_rgba(0,0,0,0.24)] sm:p-7">
            <div className="flex items-center justify-between gap-4 border-b border-white/8 pb-5">
              <div>
                <p
                  className="text-[0.68rem] uppercase tracking-[0.22em] text-[#6E8198]"
                  style={{ fontFamily: MONO_FONT }}
                >
                  Coverage Zones
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white">
                  Start from a desk
                </h2>
              </div>
              <span
                className="rounded-full border border-white/10 px-3 py-1 text-[0.66rem] uppercase tracking-[0.18em] text-[#BBF7D0]"
                style={{ fontFamily: MONO_FONT }}
              >
                Select Query
              </span>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {COVERAGE_ZONES.map((zone) => (
                <button
                  key={zone.label}
                  type="button"
                  onClick={() => runRouteSearch(zone.query)}
                  className="group rounded-[24px] border border-white/8 bg-[#07101A] p-5 text-left transition-all duration-200 hover:border-[#22C55E]/30 hover:bg-[#091522]"
                >
                  <p
                    className="text-[0.66rem] uppercase tracking-[0.18em] text-[#6E8198] transition-colors duration-200 group-hover:text-[#BBF7D0]"
                    style={{ fontFamily: MONO_FONT }}
                  >
                    {zone.label}
                  </p>
                  <p className="mt-3 text-lg font-semibold text-white">
                    {zone.query}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#8D9AAA]">
                    {zone.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-[#060C15]/92 p-6 shadow-[0_22px_70px_rgba(0,0,0,0.24)]">
            <p
              className="text-[0.68rem] uppercase tracking-[0.22em] text-[#6E8198]"
              style={{ fontFamily: MONO_FONT }}
            >
              Search Notes
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white">
              Pull cleaner results
            </h2>

            <div className="mt-6 space-y-4">
              {SEARCH_NOTES.map((note, index) => (
                <div
                  key={note}
                  className="flex gap-4 border-b border-white/8 pb-4 last:border-b-0 last:pb-0"
                >
                  <span
                    className="pt-0.5 text-[0.7rem] text-[#BBF7D0]"
                    style={{ fontFamily: MONO_FONT }}
                  >
                    0{index + 1}
                  </span>
                  <p className="text-sm leading-6 text-[#9BA7B5]">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : searched && !loading && results.length === 0 ? (
        <section className="mt-8 rounded-[30px] border border-white/10 bg-[#0A111B]/88 px-6 py-12 text-center shadow-[0_22px_70px_rgba(0,0,0,0.24)] sm:px-8">
          <p
            className="text-[0.68rem] uppercase tracking-[0.22em] text-[#BBF7D0]"
            style={{ fontFamily: MONO_FONT }}
          >
            No Match
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white">
            Nothing surfaced for &quot;{query}&quot;
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#96A3B2]">
            Try broader terms, fewer words, or start from one of the common
            desks below.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-2.5">
            {QUICK_TOPICS.map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => runRouteSearch(topic)}
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[0.72rem] uppercase tracking-[0.18em] text-[#B3BECA] transition-all duration-200 hover:border-[#22C55E]/35 hover:text-[#ECFDF5]"
                style={{ fontFamily: MONO_FONT }}
              >
                {topic}
              </button>
            ))}
          </div>
        </section>
      ) : (
        <section className="mt-8">
          <GlassPremiumArticleGrid articles={results} loading={loading} />
        </section>
      )}
    </div>
  );
}

export function SearchClient() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-[30px] border border-white/10 bg-[#0A111B]/88 px-6 py-14 text-[#9CA3AF] shadow-[0_22px_70px_rgba(0,0,0,0.24)]">
            Loading search...
          </div>
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
