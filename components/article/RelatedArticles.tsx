import Link from "next/link";
import { ArticleCard } from "./ArticleCard";
import type { Article } from "@/types/article";

interface RelatedArticlesProps {
  articles: Article[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles.length) return null;

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold font-heading text-[#F9FAFB] mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.slice(0, 3).map((article) => (
          <ArticleCard key={article.id ?? article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
