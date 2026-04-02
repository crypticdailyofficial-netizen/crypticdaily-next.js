import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { Badge } from "@/components/ui/Badge";
import { ArticleMeta } from "@/components/article/ArticleMeta";
import { ArticleDetail } from "@/components/article/ArticleDetail";
import { ShareButtons } from "@/components/article/ShareButtons";
import { BookmarkButton } from "@/components/article/BookmarkButton";
import { RelatedArticles } from "@/components/article/RelatedArticles";
import { CommentSection } from "@/components/comments/CommentSection";
import { AdUnit } from "@/components/ads/AdUnit";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import { BreadcrumbJsonLd, BreadcrumbNav } from "@/components/seo/BreadcrumbJsonLd";
import { MOCK_ARTICLES } from "@/lib/constants";
import { generateArticleMetadata } from "@/lib/seo";

export const revalidate = 300;

export async function generateStaticParams() {
  return MOCK_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;
  const article = MOCK_ARTICLES.find((a) => a.slug === slug);
  if (!article) return {};
  return generateArticleMetadata({
    title: article.seoTitle || article.title,
    excerpt: article.seoDescription || article.excerpt,
    slug: article.slug,
    coverImage: article.coverImage,
    publishedAt: article.publishedAt,
    author: { name: article.author.name },
  });
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const article = MOCK_ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  const relatedArticles = MOCK_ARTICLES.filter(
    (a) => a.category.slug === article.category.slug && a.slug !== article.slug
  );

  return (
    <>
      <ArticleJsonLd
        title={article.title}
        excerpt={article.excerpt}
        slug={article.slug}
        coverImage={article.coverImage}
        publishedAt={article.publishedAt}
        authorName={article.author.name}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", path: "/" },
        { name: article.category.title, path: `/categories/${article.category.slug}` },
        { name: article.title, path: `/news/${article.slug}` },
      ]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          {/* Article */}
          <article>
            {/* Breadcrumb */}
            <BreadcrumbNav items={[
              { name: "Home", path: "/" },
              { name: article.category.title, path: `/categories/${article.category.slug}` },
              { name: article.title, path: `/news/${article.slug}` },
            ]} />

            {/* Category + Bookmark */}
            <div className="flex items-center justify-between mb-4">
              <Badge label={article.category.title} category={article.category.slug} />
              <BookmarkButton articleSlug={article.slug} />
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold font-heading text-[#F9FAFB] leading-tight mb-6">
              {article.title}
            </h1>

            {/* Meta */}
            <ArticleMeta article={article} views={article.views} />

            {/* Share buttons */}
            <div className="mt-4 mb-6">
              <ShareButtons title={article.title} slug={article.slug} />
            </div>

            {/* Hero Image */}
            <div className="relative aspect-video rounded-xl overflow-hidden mb-8">
              <Image src={article.coverImage} alt={article.title} fill className="object-cover" priority />
            </div>

            {/* Ad Unit */}
            <AdUnit slot="2345678901" />

            {/* Body */}
            <ArticleDetail article={article} />

            {/* Ad Unit 2 */}
            <AdUnit slot="3456789012" />

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-[#1E2A3A]">
                <span className="text-sm text-[#9CA3AF]">Tags:</span>
                {article.tags.map((tag) => (
                  <Link
                    key={tag.slug}
                    href={`/search?q=${tag.title}`}
                    className="text-sm px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[#9CA3AF] hover:text-[#00D4FF] hover:border-[#00D4FF]/30 transition-all duration-200"
                  >
                    #{tag.title}
                  </Link>
                ))}
              </div>
            )}

            {/* Author Bio */}
            <div className="mt-8 p-6 bg-[#111827] border border-[#1E2A3A] rounded-xl flex gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <Image src={article.author.avatar} alt={article.author.name} fill className="object-cover" />
              </div>
              <div>
                <p className="font-bold text-[#F9FAFB] font-heading">{article.author.name}</p>
                <p className="text-sm text-[#00D4FF] mb-2">{article.author.role}</p>
                <p className="text-sm text-[#9CA3AF] leading-relaxed">{article.author.bio}</p>
                {article.author.twitter && (
                  <a href={article.author.twitter} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-[#00D4FF] hover:underline mt-2">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    Follow on X
                  </a>
                )}
              </div>
            </div>

            {/* Related Articles */}
            <RelatedArticles articles={relatedArticles} />

            {/* Comments */}
            <CommentSection articleSlug={article.slug} />
          </article>

          {/* Sidebar */}
          <Sidebar />
        </div>
      </div>
    </>
  );
}
