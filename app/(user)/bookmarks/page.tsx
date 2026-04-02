import Link from "next/link";
import { ArticleCard } from "@/components/article/ArticleCard";
import { MOCK_ARTICLES } from "@/lib/constants";

export default function BookmarksPage() {
  // In production, fetch from Supabase using Clerk userId
  const bookmarks = MOCK_ARTICLES.slice(0, 2);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold font-heading text-[#F9FAFB] mb-3">My Bookmarks</h1>
        <p className="text-[#9CA3AF]">Articles you've saved for later reading</p>
      </div>

      {bookmarks.length === 0 ? (
        <div className="text-center py-20 bg-[#111827] border border-[#1E2A3A] rounded-2xl">
          <p className="text-5xl mb-4">🔖</p>
          <h2 className="text-xl font-bold font-heading text-[#F9FAFB] mb-3">No bookmarks yet</h2>
          <p className="text-[#9CA3AF] mb-6">Start reading and save articles you want to come back to.</p>
          <Link href="/news" className="inline-flex px-6 py-3 bg-[#00D4FF] text-[#0A0F1E] font-bold rounded-full hover:bg-[#00B8E0] transition-all duration-200">
            Browse News →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((article) => (
            <div key={article.id} className="relative group">
              <ArticleCard article={article} />
              <button
                aria-label="Remove bookmark"
                className="absolute top-3 right-3 p-1.5 bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-lg text-[#EF4444] opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-[#EF4444]/20"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
