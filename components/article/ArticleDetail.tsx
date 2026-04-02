import Image from "next/image";
import type { Article } from "@/types/article";

interface ArticleDetailProps {
  article: Article;
}

export function ArticleDetail({ article }: ArticleDetailProps) {
  if (!article.body) return null;
  // Render the body as HTML (from mock data) or plain text
  return (
    <div
      className="prose prose-invert prose-lg max-w-none
        prose-headings:font-heading prose-headings:text-[#F9FAFB]
        prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
        prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
        prose-p:text-[#D1D5DB] prose-p:leading-relaxed
        prose-a:text-[#00D4FF] prose-a:no-underline hover:prose-a:underline
        prose-blockquote:border-l-[#00D4FF] prose-blockquote:bg-white/5 prose-blockquote:rounded-r-lg prose-blockquote:py-1 prose-blockquote:pl-4 prose-blockquote:text-[#9CA3AF]
        prose-code:text-[#00D4FF] prose-code:bg-white/5 prose-code:rounded prose-code:px-1
        prose-img:rounded-xl"
      dangerouslySetInnerHTML={{ __html: article.body }}
    />
  );
}
