import Link from "next/link";
import { format } from "date-fns";
import { AuthorAvatar } from "./AuthorAvatar";
import { formatRelativeDate } from "@/lib/utils";
import type { Article } from "@/types/article";

interface ArticleMetaProps {
  article: Article;
  views?: number;
}

export function ArticleMeta({ article, views }: ArticleMetaProps) {
  const updatedAt = article.updatedAt ? new Date(article.updatedAt) : null;
  const showUpdatedAt =
    updatedAt !== null &&
    updatedAt.getTime() !== new Date(article.publishedAt).getTime();
  const metaChipBase =
    "inline-flex items-center rounded-full px-3 py-2 text-[11px] font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]";

  return (
    <div className="grid gap-3 text-sm md:grid-cols-[1fr_auto] md:items-center">
      <Link
        href={`/author/${article.author.slug}`}
        className="flex items-center gap-3 text-zinc-100 transition hover:text-emerald-300"
      >
        <AuthorAvatar
          name={article.author.name}
          src={article.author.avatar}
          className="h-10 w-10 border border-emerald-400/20"
          fallbackClassName="text-xs"
        />

        <div>
          <p className="font-medium">{article.author.name}</p>
          <p className="text-xs mt-1 uppercase tracking-[0.24em] text-zinc-500">
            Editorial desk
          </p>
        </div>
      </Link>

      <div className="flex flex-wrap mt-2 items-center gap-2 text-xs uppercase tracking-[0.22em] text-zinc-400">
        <span
          className={`${metaChipBase} border border-amber-300/20 bg-amber-300/[0.08] text-amber-50/90`}
        >
          {formatRelativeDate(article.publishedAt)}
        </span>

        {showUpdatedAt && (
          <span
            className={`${metaChipBase} border border-cyan-400/20 bg-cyan-400/[0.08] text-cyan-50/90 normal-case tracking-normal`}
          >
            Updated {format(updatedAt, "MMMM d, yyyy")}
          </span>
        )}

        <span
          className={`${metaChipBase} border border-fuchsia-400/20 bg-fuchsia-400/[0.08] text-fuchsia-50/90`}
        >
          {article.readingTime ?? 5} min read
        </span>

        {views !== undefined && (
          <span
            className={`${metaChipBase} border border-emerald-400/20 bg-emerald-400/10 text-emerald-200`}
          >
            {views.toLocaleString()} views
          </span>
        )}
      </div>
    </div>
  );
}
