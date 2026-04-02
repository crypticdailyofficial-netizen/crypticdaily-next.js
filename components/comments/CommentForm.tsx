'use client';

import { useState } from "react";
import type { SupabaseComment } from "@/lib/supabase/types";

interface CommentFormProps {
  articleSlug: string;
  onCommentAdded: (comment: SupabaseComment) => void;
}

export function CommentForm({ articleSlug, onCommentAdded }: CommentFormProps) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleSlug, content }),
      });
      if (!res.ok) throw new Error("Failed to post comment");
      const comment = await res.json();
      onCommentAdded(comment);
      setContent("");
    } catch {
      setError("Failed to post comment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share your thoughts..."
        rows={4}
        aria-label="Comment text"
        className="w-full bg-[#111827] border border-[#1E2A3A] rounded-xl px-4 py-3 text-[#F9FAFB] placeholder-[#4B5563] focus:outline-none focus:border-[#00D4FF]/50 resize-none transition-all duration-200 text-sm"
      />
      {error && <p className="text-sm text-[#EF4444] mt-2">{error}</p>}
      <div className="flex justify-end mt-3">
        <button
          type="submit"
          disabled={loading || !content.trim()}
          className="px-5 py-2.5 text-sm font-semibold text-[#0A0F1E] bg-[#00D4FF] rounded-full hover:bg-[#00B8E0] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {loading ? "Posting…" : "Post Comment"}
        </button>
      </div>
    </form>
  );
}
