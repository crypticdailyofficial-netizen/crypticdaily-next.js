import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { formatRelativeDate } from "@/lib/utils";
import type { Article } from "@/types/article";

interface ArticleMetaProps {
  article: Article;
  views?: number;
}

export function ArticleMeta({ article, views }: ArticleMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-[#9CA3AF]">
      {/* Author */}
      <Link href={`/`} className="flex items-center gap-2 hover:text-[#00D4FF] transition-colors duration-200 group">
        <div className="relative w-8 h-8 rounded-full overflow-hidden">
          <Image
            src={article.author.avatar}
            alt={article.author.name}
            fill
            className="object-cover"
          />
        </div>
        <span className="font-medium text-[#F9FAFB] group-hover:text-[#00D4FF] transition-colors">{article.author.name}</span>
      </Link>
      <span className="text-[#1E2A3A]">·</span>
      <span>{formatRelativeDate(article.publishedAt)}</span>
      <span className="text-[#1E2A3A]">·</span>
      <span>{article.readingTime ?? 5} min read</span>
      {views !== undefined && (
        <>
          <span className="text-[#1E2A3A]">·</span>
          <span>{views.toLocaleString()} views</span>
        </>
      )}
    </div>
  );
}
