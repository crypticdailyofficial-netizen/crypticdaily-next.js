import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { AuthorAvatar } from "./AuthorAvatar";
import { formatRelativeDate } from "@/lib/utils";
import type { Article } from "@/types/article";

interface ArticleCardProps {
  article: Article;
  layout?: "vertical" | "horizontal";
}

const metaChipClass =
  "inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white/62";

export function ArticleCard({ article, layout = "vertical" }: ArticleCardProps) {
  if (layout === "horizontal") {
    return (
      <article className="group relative flex gap-4 overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(8,11,16,0.98),rgba(4,6,10,0.98))] p-3.5 shadow-[0_18px_48px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300/25 hover:shadow-[0_26px_70px_rgba(0,0,0,0.32)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.26),transparent)]" />
        <div className="pointer-events-none absolute inset-y-6 right-0 w-px bg-[linear-gradient(180deg,transparent,rgba(34,211,238,0.22),transparent)]" />
        <div className="pointer-events-none absolute -right-10 top-0 h-28 w-28 rounded-full bg-cyan-400/[0.08] blur-3xl" />

        <Link
          href={`/news/${article.slug}`}
          className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-[18px] border border-white/10 bg-[linear-gradient(135deg,#111827,#0B1220)]"
          aria-label={article.title}
        >
          {article.coverImage ? (
            <Image
              src={article.coverImage}
              alt={article.coverImageAlt || article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              placeholder={article.coverImageBlurDataURL ? "blur" : "empty"}
              blurDataURL={article.coverImageBlurDataURL ?? undefined}
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,212,255,0.18),transparent_55%),linear-gradient(135deg,#111827,#020617)]" />
          )}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.18)_58%,rgba(0,0,0,0.46)_100%)]" />
        </Link>

        <div className="relative z-10 flex min-w-0 flex-1 flex-col justify-between py-1">
          <Link href={`/categories/${article.category.slug}`} className="inline-flex">
            <Badge
              label={article.category.title}
              category={article.category.slug}
              color={article.category.color}
              size="sm"
              className="mb-3"
            />
          </Link>

          <Link href={`/news/${article.slug}`} className="block">
            <h3 className="line-clamp-2 text-[15px] font-semibold leading-6 text-white transition-colors duration-200 group-hover:text-amber-50">
              {article.title}
            </h3>
          </Link>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className={metaChipClass}>
              {formatRelativeDate(article.publishedAt)}
            </span>
            <span className="inline-flex items-center rounded-full border border-amber-300/20 bg-amber-300/[0.08] px-2.5 py-1.5 text-[11px] uppercase tracking-[0.18em] text-amber-100/84">
              {article.readingTime ?? 5} min read
            </span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group relative block overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(8,11,16,0.98),rgba(4,6,10,0.99))] shadow-[0_22px_55px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:border-amber-300/25 hover:shadow-[0_30px_80px_rgba(0,0,0,0.34)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.08),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(251,191,36,0.08),transparent_28%)]" />

      <div className="relative aspect-video overflow-hidden border-b border-white/10 bg-[linear-gradient(135deg,#111827,#0F172A)]">
        <Link href={`/news/${article.slug}`} className="relative block h-full" aria-label={article.title}>
          {article.coverImage ? (
            <Image
              src={article.coverImage}
              alt={article.coverImageAlt || article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              placeholder={article.coverImageBlurDataURL ? "blur" : "empty"}
              blurDataURL={article.coverImageBlurDataURL ?? undefined}
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,212,255,0.18),transparent_55%),linear-gradient(135deg,#111827,#020617)]" />
          )}
        </Link>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),transparent_36%,rgba(0,0,0,0.42)_100%)]" />

        <div className="absolute left-4 top-4 z-10">
          <Link href={`/categories/${article.category.slug}`} className="inline-flex">
            <Badge
              label={article.category.title}
              category={article.category.slug}
              color={article.category.color}
            />
          </Link>
        </div>

        <div className="absolute bottom-4 right-4 z-10">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-black/35 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white/72 backdrop-blur-sm">
            {article.readingTime ?? 5} min read
          </span>
        </div>
      </div>

      <Link href={`/news/${article.slug}`} className="block" aria-label={article.title}>
        <div className="relative z-10 p-5">
          <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-white/40">
            {formatRelativeDate(article.publishedAt)}
          </p>
          <h3 className="mb-3 line-clamp-2 text-lg font-semibold leading-7 text-white transition-colors duration-200 group-hover:text-amber-50">
            {article.title}
          </h3>
          <p className="line-clamp-3 text-sm leading-6 text-[#A8B0BC]">
            {article.excerpt}
          </p>
        </div>
      </Link>

      <div className="relative z-10 border-t border-white/10 px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          {article.author.slug ? (
            <Link
              href={`/author/${article.author.slug}`}
              className="flex min-w-0 flex-1 items-center gap-2.5 transition-colors duration-200 hover:text-amber-100"
            >
              <AuthorAvatar
                name={article.author.name}
                src={article.author.avatar}
                className="h-7 w-7 flex-shrink-0 border border-white/10"
                fallbackClassName="text-[10px]"
              />
              <span className="truncate text-xs uppercase tracking-[0.16em] text-[#A8B0BC]">
                {article.author.name}
              </span>
            </Link>
          ) : (
            <span className="flex min-w-0 flex-1 items-center gap-2.5">
              <AuthorAvatar
                name={article.author.name}
                src={article.author.avatar}
                className="h-7 w-7 flex-shrink-0 border border-white/10"
                fallbackClassName="text-[10px]"
              />
              <span className="truncate text-xs uppercase tracking-[0.16em] text-[#A8B0BC]">
                {article.author.name}
              </span>
            </span>
          )}

          <div className="flex items-center gap-2">
            <span className={metaChipClass}>{formatRelativeDate(article.publishedAt)}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ArticleCard;
