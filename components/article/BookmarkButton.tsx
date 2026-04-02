'use client';

import { useState } from "react";

interface BookmarkButtonProps {
  articleSlug: string;
  initialBookmarked?: boolean;
}

export function BookmarkButton({ articleSlug, initialBookmarked = false }: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    // Optimistic update
    setBookmarked((prev) => !prev);
    try {
      const method = bookmarked ? "DELETE" : "POST";
      await fetch("/api/bookmarks", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleSlug }),
      });
    } catch {
      // Revert on error
      setBookmarked((prev) => !prev);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
      className={`p-2 rounded-lg transition-all duration-200 ${
        bookmarked
          ? "text-[#00D4FF] bg-[#00D4FF]/10 hover:bg-[#00D4FF]/20"
          : "text-[#9CA3AF] bg-white/5 hover:bg-white/10 hover:text-[#F9FAFB]"
      }`}
    >
      <svg className="w-5 h-5" fill={bookmarked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
    </button>
  );
}
