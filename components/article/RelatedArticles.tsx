import { ArticleCard } from "./ArticleCard";
import type { Article } from "@/types/article";

interface RelatedArticlesProps {
  articles: Article[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles.length) return null;

  const visibleArticles = articles.slice(0, 3);

  return (
    <section className="relative mt-14 overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(7,10,16,0.98),rgba(3,5,10,0.98))]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,212,255,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(244,114,182,0.08),transparent_24%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)]" />
      <div className="pointer-events-none absolute right-10 top-10 h-24 w-24 rounded-full border border-cyan-300/10" />

      <div className="relative z-10 p-5 sm:p-6 md:p-8">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-200/55">
              Continue Reading
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-[2rem]">
              Related Articles
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/52 sm:text-[15px]">
              Additional reporting and adjacent stories connected to this topic.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-cyan-100/80">
            <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.9)]" />
            {visibleArticles.length} Picks
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {visibleArticles.map((article) => (
            <ArticleCard key={article.id ?? article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
