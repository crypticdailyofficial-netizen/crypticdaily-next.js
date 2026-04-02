'use client';

import { useState, useCallback } from "react";

export function useBookmark(articleSlug: string, initialBookmarked = false) {
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [loading, setLoading] = useState(false);

  const toggle = useCallback(async () => {
    setLoading(true);
    const prev = bookmarked;
    setBookmarked((b) => !b); // optimistic
    try {
      const method = prev ? "DELETE" : "POST";
      const res = await fetch("/api/bookmarks", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleSlug }),
      });
      if (!res.ok) throw new Error("Bookmark API error");
    } catch {
      setBookmarked(prev); // revert
    } finally {
      setLoading(false);
    }
  }, [articleSlug, bookmarked]);

  return { bookmarked, loading, toggle };
}
