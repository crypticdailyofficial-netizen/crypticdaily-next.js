import Image from "next/image";
import { formatRelativeDate } from "@/lib/utils";
import type { SupabaseComment } from "@/lib/supabase/types";

interface CommentItemProps {
  comment: SupabaseComment;
}

export function CommentItem({ comment }: CommentItemProps) {
  return (
    <div className="flex gap-3 bg-[#111827] border border-[#1E2A3A] rounded-xl p-4">
      {comment.user_avatar ? (
        <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
          <Image src={comment.user_avatar} alt={comment.user_name} fill className="object-cover" />
        </div>
      ) : (
        <div className="w-9 h-9 rounded-full bg-[#00D4FF]/20 flex items-center justify-center flex-shrink-0 text-[#00D4FF] font-bold text-sm">
          {comment.user_name.charAt(0).toUpperCase()}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-sm text-[#F9FAFB]">{comment.user_name}</span>
          <span className="text-xs text-[#9CA3AF]">{formatRelativeDate(comment.created_at)}</span>
        </div>
        <p className="text-sm text-[#D1D5DB] leading-relaxed">{comment.content}</p>
      </div>
    </div>
  );
}
