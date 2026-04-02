'use client';

import { useState } from "react";
import { CommentItem } from "./CommentItem";
import { CommentForm } from "./CommentForm";
import type { SupabaseComment } from "@/lib/supabase/types";

interface CommentSectionProps {
  articleSlug: string;
  initialComments?: SupabaseComment[];
}

export function CommentSection({ articleSlug, initialComments = [] }: CommentSectionProps) {
  const [comments, setComments] = useState<SupabaseComment[]>(initialComments);
  const isSignedIn = false; // Replace with Clerk useUser()

  const handleCommentAdded = (comment: SupabaseComment) => {
    setComments((prev) => [comment, ...prev]);
  };

  return (
    <section className="mt-12 border-t border-[#1E2A3A] pt-10">
      <h2 className="text-xl font-bold font-heading text-[#F9FAFB] mb-6">
        Comments ({comments.length})
      </h2>

      {/* Comment form or sign-in prompt */}
      {isSignedIn ? (
        <CommentForm articleSlug={articleSlug} onCommentAdded={handleCommentAdded} />
      ) : (
        <div className="bg-[#111827] border border-[#1E2A3A] rounded-xl p-6 text-center mb-8">
          <p className="text-[#9CA3AF] mb-4">Sign in to join the conversation</p>
          <a
            href="/sign-in"
            className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-[#0A0F1E] bg-[#00D4FF] rounded-full hover:bg-[#00B8E0] transition-all duration-200"
          >
            Sign In to Comment
          </a>
        </div>
      )}

      {/* Comments list */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-[#9CA3AF] text-center py-8">Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        )}
      </div>
    </section>
  );
}
