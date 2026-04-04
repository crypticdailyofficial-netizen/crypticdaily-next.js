import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GlassPremiumArticleGrid } from "@/components/article/GlassPremiumArticleGrid";
import { Sidebar } from "@/components/layout/Sidebar";
import {
  mapSanityArticles,
  mapSanityTagSummaries,
  mapSanityTagSummary,
} from "@/lib/sanity/adapters";
import {
  getAllTags,
  getArticlesByTag,
  getLatestArticles,
  getTagBySlug,
} from "@/lib/sanity/queries";

export const revalidate = 300;

type TagPageParams = {
  slug: string;
};

export async function generateStaticParams() {
  const tags = mapSanityTagSummaries(await getAllTags()).filter(
    (tag) => tag.articleCount > 0,
  );

  return tags.map((tag) => ({ slug: tag.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<TagPageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tag = mapSanityTagSummary(await getTagBySlug(slug));

  if (!tag) {
    return {};
  }

  const description =
    tag.description ||
    `Browse every Cryptic Daily article filed under the ${tag.title} tag.`;

  return {
    title: `${tag.title} Tag`,
    description,
    alternates: {
      canonical: `https://crypticdaily.com/tags/${tag.slug}`,
    },
    robots: {
      index: tag.articleCount > 0,
      follow: true,
    },
    openGraph: {
      title: `${tag.title} Tag | Cryptic Daily`,
      description,
      url: `https://crypticdaily.com/tags/${tag.slug}`,
      images: [{ url: "https://crypticdaily.com/og-default.png" }],
    },
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<TagPageParams>;
}) {
  const { slug } = await params;

  const [tagData, articlesData, sidebarArticlesData] = await Promise.all([
    getTagBySlug(slug),
    getArticlesByTag(slug),
    getLatestArticles(5),
  ]);

  const tag = mapSanityTagSummary(tagData);

  if (!tag) {
    notFound();
  }

  const articles = mapSanityArticles(articlesData);
  const sidebarArticles = mapSanityArticles(sidebarArticlesData);
  const latestArticle = articles[0] ?? null;
  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${tag.title} Tag`,
    description:
      tag.description ||
      `Browse every Cryptic Daily article filed under the ${tag.title} tag.`,
    url: `https://crypticdaily.com/tags/${tag.slug}`,
    publisher: {
      "@type": "Organization",
      name: "Cryptic Daily",
      url: "https://crypticdaily.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageJsonLd),
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <section className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(135deg,rgba(20,9,24,0.98),rgba(9,6,16,0.98)_44%,rgba(16,11,22,0.98))] px-6 py-8 shadow-[0_30px_90px_rgba(0,0,0,0.36)] sm:px-8 lg:px-10 lg:py-10">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(217,70,239,0.18),transparent_24%),radial-gradient(circle_at_86%_16%,rgba(251,191,36,0.14),transparent_20%),linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.03)_48%,transparent_62%)]" />
              <div className="pointer-events-none absolute inset-y-0 right-[8%] hidden w-px bg-gradient-to-b from-transparent via-white/14 to-transparent lg:block" />

              <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_280px] lg:items-end">
                <div className="max-w-3xl">
                  <Link
                    href="/tags"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-fuchsia-200/85 transition-colors hover:border-fuchsia-300/30 hover:text-white"
                  >
                    <span className="text-white/55">←</span>
                    All Tags
                  </Link>

                  <p className="mt-6 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-fuchsia-200/80">
                    Tag Archive
                  </p>
                  <h1 className="mt-4 max-w-3xl text-4xl font-black leading-none tracking-[-0.06em] text-white sm:text-5xl lg:text-[3.65rem]">
                    {tag.title}
                  </h1>
                  <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                    {tag.description ||
                      `Every article currently filed under the ${tag.title} topic.`}
                  </p>

                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-4 backdrop-blur-sm">
                      <p className="text-[0.68rem] uppercase tracking-[0.24em] text-slate-400">
                        Archive Size
                      </p>
                      <p className="mt-3 text-3xl font-black tracking-[-0.05em] text-white">
                        {tag.articleCount}
                      </p>
                    </div>
                    <div className="rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-4 backdrop-blur-sm">
                      <p className="text-[0.68rem] uppercase tracking-[0.24em] text-slate-400">
                        Canonical Slug
                      </p>
                      <p className="mt-3 truncate text-sm font-semibold text-fuchsia-100">
                        #{tag.slug}
                      </p>
                    </div>
                    <div className="rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-4 backdrop-blur-sm">
                      <p className="text-[0.68rem] uppercase tracking-[0.24em] text-slate-400">
                        Archive State
                      </p>
                      <p className="mt-3 text-xl font-bold tracking-[-0.04em] text-white">
                        {tag.articleCount > 0 ? "Active" : "Quiet"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.24)] backdrop-blur-md">
                  <p className="text-[0.68rem] uppercase tracking-[0.24em] text-amber-100/75">
                    Latest Filing
                  </p>
                  {latestArticle ? (
                    <>
                      <h2 className="mt-3 text-2xl font-black tracking-[-0.05em] text-white">
                        {latestArticle.title}
                      </h2>
                      <p className="mt-3 text-sm leading-6 text-slate-300">
                        {latestArticle.excerpt ||
                          "Newest published story currently linked to this archive."}
                      </p>
                      <div className="mt-5 rounded-[20px] border border-white/10 bg-black/20 px-4 py-3">
                        <p className="text-[0.68rem] uppercase tracking-[0.22em] text-slate-500">
                          Read next
                        </p>
                        <Link
                          href={`/news/${latestArticle.slug}`}
                          className="mt-2 inline-flex items-center text-sm font-semibold text-fuchsia-100 transition-colors hover:text-white"
                        >
                          Open article →
                        </Link>
                      </div>
                    </>
                  ) : (
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      No published article has been linked to this tag yet.
                    </p>
                  )}
                </div>
              </div>
            </section>

            <section className="mt-10">
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
                    Coverage
                  </p>
                  <h2 className="mt-2 text-2xl font-black tracking-[-0.05em] text-white sm:text-3xl">
                    Stories filed under this tag.
                  </h2>
                </div>
                <div className="hidden rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300 lg:inline-flex">
                  {tag.articleCount}{" "}
                  {tag.articleCount === 1 ? "article" : "articles"}
                </div>
              </div>

              {articles.length > 0 ? (
                <GlassPremiumArticleGrid articles={articles} />
              ) : (
                <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,17,27,0.92),rgba(5,7,12,0.98))] px-6 py-14 text-center shadow-[0_18px_55px_rgba(0,0,0,0.24)]">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-3xl text-fuchsia-200">
                    #
                  </div>
                  <p className="mt-5 text-lg font-semibold text-white">
                    This archive is waiting for its first published story.
                  </p>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-400">
                    Once articles are linked to this tag in Sanity, they will
                    appear here automatically.
                  </p>
                </div>
              )}
            </section>
          </div>

          <div className="space-y-6">
          
            <Sidebar trendingArticles={sidebarArticles} />
          </div>
        </div>
      </div>
    </>
  );
}
