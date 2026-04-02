import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleGrid } from "@/components/article/ArticleGrid";
import { Sidebar } from "@/components/layout/Sidebar";
import { MOCK_ARTICLES, CATEGORIES, CATEGORY_COLORS } from "@/lib/constants";

export const revalidate = 120;

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!cat) return {};
  return {
    title: `${cat.title} News | Cryptic Daily`,
    description: cat.description,
    alternates: { canonical: `https://crypticdaily.com/categories/${cat.slug}` },
  };
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!cat) notFound();

  const color = CATEGORY_COLORS[category] || "#00D4FF";
  const articles = MOCK_ARTICLES.filter((a) => a.category.slug === category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Category Hero */}
      <div
        className="rounded-2xl p-8 md:p-12 mb-10 border"
        style={{ background: `linear-gradient(135deg, ${color}15 0%, #111827 100%)`, borderColor: `${color}30` }}
      >
        <div className="max-w-2xl">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
            style={{ backgroundColor: `${color}20`, color }}
          >
            {cat.title}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-[#F9FAFB] mb-4">{cat.title} News</h1>
          <p className="text-[#9CA3AF] text-lg">{cat.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        <div>
          {articles.length > 0 ? (
            <ArticleGrid articles={articles} />
          ) : (
            <div className="text-center py-16">
              <p className="text-5xl mb-4">📰</p>
              <p className="text-[#9CA3AF]">No articles in this category yet. Check back soon!</p>
            </div>
          )}
        </div>
        <Sidebar />
      </div>
    </div>
  );
}
