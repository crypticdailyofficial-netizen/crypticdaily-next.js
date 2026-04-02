import { ArticleCard } from "./ArticleCard";
import { ArticleCardSkeleton } from "@/components/ui/Skeleton";
import type { Article } from "@/types/article";

interface ArticleGridProps {
  articles: Article[];
  loading?: boolean;
  columns?: 2 | 3;
}

export function ArticleGrid({ articles, loading = false, columns = 3 }: ArticleGridProps) {
  if (loading) {
    return (
      <div className={`grid gap-6 ${columns === 3 ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 md:grid-cols-2"}`}>
        {Array.from({ length: 6 }).map((_, i) => (
          <ArticleCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!articles.length) {
    return (
      <div className="text-center py-20">
        <p className="text-4xl mb-4">📰</p>
        <p className="text-[#9CA3AF] text-lg">No articles found</p>
      </div>
    );
  }

  return (
    <div className={`grid gap-6 ${columns === 3 ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 md:grid-cols-2"}`}>
      {articles.map((article) => (
        <ArticleCard key={article.id ?? article.slug} article={article} />
      ))}
    </div>
  );
}
