'use client';

import { useState, useCallback } from "react";
import type { SupabaseComment } from "@/lib/supabase/types";

export function useComments(articleSlug: string) {
  const [comments, setComments] = useState<SupabaseComment[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/comments?articleSlug=${encodeURIComponent(articleSlug)}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [articleSlug]);

  const addComment = useCallback(async (content: string) => {
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ articleSlug, content }),
    });
    if (!res.ok) throw new Error("Failed to post comment");
    const comment: SupabaseComment = await res.json();
    setComments((prev) => [comment, ...prev]);
    return comment;
  }, [articleSlug]);

  const deleteComment = useCallback(async (commentId: string) => {
    await fetch(`/api/comments/${commentId}`, { method: "DELETE" });
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  }, []);

  return { comments, loading, fetchComments, addComment, deleteComment };
}
