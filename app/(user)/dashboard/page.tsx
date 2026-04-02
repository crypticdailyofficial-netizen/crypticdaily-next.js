import Link from "next/link";
import { MOCK_ARTICLES } from "@/lib/constants";
import { ArticleCard } from "@/components/article/ArticleCard";

export default function DashboardPage() {
  // In production, get user from Clerk: const { user } = useUser()
  const mockUser = { firstName: "Crypto", imageUrl: null };
  const recentBookmarks = MOCK_ARTICLES.slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-[#111827] to-[#0A0F1E] border border-[#1E2A3A] rounded-2xl p-8 mb-10">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#00D4FF]/20 flex items-center justify-center text-[#00D4FF] text-2xl font-bold">
            {mockUser.firstName?.charAt(0) ?? "U"}
          </div>
          <div>
            <h1 className="text-2xl font-bold font-heading text-[#F9FAFB]">Welcome back, {mockUser.firstName}!</h1>
            <p className="text-[#9CA3AF]">Here's your reading dashboard</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Articles Read", value: "47", icon: "📰" },
          { label: "Bookmarks", value: "12", icon: "🔖" },
          { label: "Comments", value: "8", icon: "💬" },
          { label: "Days Active", value: "23", icon: "📅" },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#111827] border border-[#1E2A3A] rounded-xl p-5 text-center">
            <p className="text-2xl mb-1">{stat.icon}</p>
            <p className="text-2xl font-bold font-heading text-[#00D4FF]">{stat.value}</p>
            <p className="text-xs text-[#9CA3AF]">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Bookmarks */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold font-heading text-[#F9FAFB]">Recent Bookmarks</h2>
          <Link href="/bookmarks" className="text-sm text-[#00D4FF] hover:underline">View all →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentBookmarks.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>

      {/* Auth notice */}
      <div className="bg-[#111827] border border-dashed border-[#1E2A3A] rounded-xl p-6 text-center">
        <p className="text-[#9CA3AF] text-sm">Connect Clerk to enable real authentication and personalized data.</p>
        <Link href="/sign-in" className="inline-flex mt-3 text-xs text-[#00D4FF] hover:underline">Set up authentication →</Link>
      </div>
    </div>
  );
}
