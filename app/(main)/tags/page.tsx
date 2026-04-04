import type { Metadata } from "next";
import Link from "next/link";
import { mapSanityTagSummaries } from "@/lib/sanity/adapters";
import { getAllTags } from "@/lib/sanity/queries";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Tags",
  description:
    "Browse article tags across Cryptic Daily using the tag slugs stored in Sanity.",
  alternates: {
    canonical: "https://crypticdaily.com/tags",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Tags | Cryptic Daily",
    description:
      "Browse article tags across Cryptic Daily using the tag slugs stored in Sanity.",
    url: "https://crypticdaily.com/tags",
    images: [{ url: "https://crypticdaily.com/og-default.png" }],
  },
};

export default async function TagsPage() {
  const tags = mapSanityTagSummaries(await getAllTags())
    .filter((tag) => tag.articleCount > 0)
    .sort(
      (left, right) =>
        right.articleCount - left.articleCount ||
        left.title.localeCompare(right.title),
    );

  const totalArticles = tags.reduce((sum, tag) => sum + tag.articleCount, 0);
  const featuredTag = tags[0] ?? null;
  const accentThemes = [
    {
      ring: "group-hover:border-cyan-300/35",
      glow: "from-cyan-400/18 via-transparent to-sky-300/12",
      label: "text-cyan-200/80",
      meter: "from-cyan-300 via-sky-300 to-blue-300",
    },
    {
      ring: "group-hover:border-amber-300/35",
      glow: "from-amber-300/20 via-transparent to-orange-300/12",
      label: "text-amber-100/80",
      meter: "from-amber-200 via-orange-300 to-rose-300",
    },
    {
      ring: "group-hover:border-emerald-300/35",
      glow: "from-emerald-300/18 via-transparent to-teal-300/12",
      label: "text-emerald-100/80",
      meter: "from-emerald-200 via-teal-300 to-cyan-300",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(135deg,rgba(10,14,24,0.98),rgba(8,6,18,0.98)_44%,rgba(16,11,22,0.98))] px-6 py-8 shadow-[0_30px_90px_rgba(0,0,0,0.36)] sm:px-8 lg:px-10 lg:py-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(34,211,238,0.18),transparent_24%),radial-gradient(circle_at_86%_16%,rgba(251,191,36,0.14),transparent_20%),linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.03)_48%,transparent_62%)]" />
        <div className="pointer-events-none absolute inset-y-0 right-[8%] hidden w-px bg-gradient-to-b from-transparent via-white/14 to-transparent lg:block" />
        <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_320px] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-cyan-300/80">
              Topic Index
            </p>
            <h1 className="mt-4 max-w-2xl text-4xl font-black leading-none tracking-[-0.06em] text-white sm:text-5xl lg:text-[3.6rem]">
              Every active tag, staged like a live newsroom ledger.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              These topic archives are pulled from Sanity and sorted by live
              article volume, so the busiest coverage areas surface first
              instead of hiding behind a flat alphabetical list.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-4 backdrop-blur-sm">
                <p className="text-[0.68rem] uppercase tracking-[0.24em] text-slate-400">
                  Active Tags
                </p>
                <p className="mt-3 text-3xl font-black tracking-[-0.05em] text-white">
                  {tags.length}
                </p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-4 backdrop-blur-sm">
                <p className="text-[0.68rem] uppercase tracking-[0.24em] text-slate-400">
                  Filed Stories
                </p>
                <p className="mt-3 text-3xl font-black tracking-[-0.05em] text-white">
                  {totalArticles}
                </p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-4 backdrop-blur-sm">
                <p className="text-[0.68rem] uppercase tracking-[0.24em] text-slate-400">
                  Leading Tag
                </p>
                <p className="mt-3 truncate text-xl font-bold tracking-[-0.04em] text-white">
                  {featuredTag?.title ?? "None yet"}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.24)] backdrop-blur-md">
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-cyan-200/70">
              Most Active Archive
            </p>
            {featuredTag ? (
              <>
                <h2 className="mt-3 text-2xl font-black tracking-[-0.05em] text-white">
                  {featuredTag.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {featuredTag.description ||
                    "The busiest tag in the current Sanity archive."}
                </p>
                <div className="mt-5 flex items-center justify-between rounded-[20px] border border-white/10 bg-black/20 px-4 py-3">
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.22em] text-slate-500">
                      Slug
                    </p>
                    <p className="mt-1 text-sm font-medium text-cyan-100">
                      #{featuredTag.slug}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[0.68rem] uppercase tracking-[0.22em] text-slate-500">
                      Coverage
                    </p>
                    <p className="mt-1 text-2xl font-black tracking-[-0.05em] text-white">
                      {featuredTag.articleCount}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <p className="mt-3 text-sm text-slate-300">
                No published tags are available yet.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
              Active Archives
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.05em] text-white sm:text-3xl">
              Open a topic and read every related story.
            </h2>
          </div>
          <p className="hidden max-w-sm text-right text-sm leading-6 text-slate-400 lg:block">
            Tag cards are ordered by article volume and linked directly to the
            slug-driven archive pages from Sanity.
          </p>
        </div>

        {tags.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {tags.map((tag, index) => {
              const theme = accentThemes[index % accentThemes.length];
              const maxArticles = featuredTag?.articleCount || 1;
              const coverageWidth = Math.max(
                12,
                Math.round((tag.articleCount / maxArticles) * 100),
              );

              return (
              <Link
                key={tag.slug}
                href={`/tags/${tag.slug}`}
                className={`group relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,17,27,0.96),rgba(4,6,10,0.98))] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.24)] transition-all duration-300 hover:-translate-y-1 ${theme.ring}`}
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${theme.glow} opacity-80 transition-opacity duration-300 group-hover:opacity-100`}
                />
                <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p
                      className={`text-[0.72rem] font-medium uppercase tracking-[0.22em] ${theme.label}`}
                    >
                      #{tag.slug}
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white transition-colors duration-200 group-hover:text-white/90">
                      {tag.title}
                    </h2>
                  </div>
                  <span className="inline-flex shrink-0 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-slate-200">
                    {tag.articleCount}{" "}
                    {tag.articleCount === 1 ? "article" : "articles"}
                  </span>
                </div>

                <p className="relative z-10 mt-5 min-h-[84px] text-sm leading-7 text-slate-300">
                  {tag.description ||
                    "Open the tag archive for all matching stories."}
                </p>

                <div className="relative z-10 mt-6">
                  <div className="flex items-center justify-between text-[0.68rem] uppercase tracking-[0.22em] text-slate-500">
                    <span>Coverage Signal</span>
                    <span>Rank {(index + 1).toString().padStart(2, "0")}</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/8">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${theme.meter}`}
                      style={{ width: `${coverageWidth}%` }}
                    />
                  </div>
                </div>

                <div className="relative z-10 mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-sm">
                  <span className="text-slate-400">Open archive</span>
                  <span className="font-medium text-white transition-transform duration-200 group-hover:translate-x-1">
                    View tag →
                  </span>
                </div>
              </Link>
              );
            })}
          </div>
        ) : (
          <div className="rounded-[24px] border border-white/10 bg-[#0A111B]/90 px-6 py-12 text-center shadow-[0_18px_55px_rgba(0,0,0,0.24)]">
            <p className="text-5xl">#</p>
            <p className="mt-4 text-slate-300">
              No published tags with linked articles are available yet.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
