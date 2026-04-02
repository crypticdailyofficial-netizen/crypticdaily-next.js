import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { formatRelativeDate } from "@/lib/utils";
import type { Article } from "@/types/article";

interface ArticleCardProps {
  article: Article;
  layout?: "vertical" | "horizontal";
}

export function ArticleCard({ article, layout = "vertical" }: ArticleCardProps) {
  if (layout === "horizontal") {
    return (
      <Link href={`/news/${article.slug}`} className="group flex gap-4 bg-[#111827] border border-[#1E2A3A] rounded-xl overflow-hidden hover:border-[#00D4FF]/50 hover:shadow-[0_0_20px_rgba(0,212,255,0.1)] transition-all duration-200 p-3">
        <div className="flex-shrink-0 relative w-24 h-24 rounded-lg overflow-hidden">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex-1 min-w-0 py-1">
          <Badge label={article.category.title} category={article.category.slug} size="sm" className="mb-2" />
          <h3 className="text-sm font-semibold text-[#F9FAFB] group-hover:text-[#00D4FF] transition-colors duration-200 line-clamp-2 leading-5">
            {article.title}
          </h3>
          <p className="text-xs text-[#9CA3AF] mt-1.5">
            {formatRelativeDate(article.publishedAt)} · {article.readingTime ?? 5} min read
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/news/${article.slug}`}
      className="group block bg-[#111827] border border-[#1E2A3A] rounded-xl overflow-hidden hover:border-[#00D4FF]/50 hover:shadow-[0_0_20px_rgba(0,212,255,0.15)] transition-all duration-200"
      aria-label={article.title}
    >
      {/* Cover Image */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-3 left-3">
          <Badge label={article.category.title} category={article.category.slug} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-base font-semibold text-[#F9FAFB] group-hover:text-[#00D4FF] transition-colors duration-200 line-clamp-2 leading-6 mb-2">
          {article.title}
        </h3>
        <p className="text-sm text-[#9CA3AF] line-clamp-2 leading-5 mb-4">
          {article.excerpt}
        </p>
        {/* Bottom row */}
        <div className="flex items-center gap-2">
          <div className="relative w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={article.author.avatar}
              alt={article.author.name}
              fill
              className="object-cover"
            />
          </div>
          <span className="text-xs text-[#9CA3AF] flex-1 truncate">{article.author.name}</span>
          <span className="text-xs text-[#4B5563]">·</span>
          <span className="text-xs text-[#9CA3AF] whitespace-nowrap">{formatRelativeDate(article.publishedAt)}</span>
          <span className="text-xs text-[#4B5563]">·</span>
          <span className="text-xs text-[#9CA3AF] whitespace-nowrap">{article.readingTime ?? 5} min</span>
        </div>
      </div>
    </Link>
  );
}
