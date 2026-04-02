import type { ReactNode } from "react";
import type { Article } from "@/types/article";

interface ArticleDetailProps {
  article?: Pick<Article, "body">;
  children?: ReactNode;
}

export function ArticleDetail({ article, children }: ArticleDetailProps) {
  const body = article?.body;

  if (!children && !body) return null;

  return (
    <section className="relative overflow-hidden rounded-[28px] border border-violet-400/10 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.10),transparent_20%),linear-gradient(180deg,rgba(16,12,24,0.92)_0%,rgba(8,8,12,0.90)_100%)] shadow-[0_0_50px_rgba(168,85,247,0.08),0_28px_80px_rgba(0,0,0,0.48)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.10),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.03),transparent_22%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/25 to-transparent" />

      <div
        className="
          relative z-10 max-w-none px-5 py-6 text-[17px] leading-8 text-zinc-200 md:px-8 md:py-8

          [&_h2]:relative [&_h2]:mt-14 [&_h2]:mb-6 [&_h2]:pl-6
          [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:tracking-[-0.04em] [&_h2]:text-white md:[&_h2]:text-4xl
          [&_h2]:before:absolute [&_h2]:before:left-0 [&_h2]:before:top-1 [&_h2]:before:bottom-1 [&_h2]:before:w-[3px]
          [&_h2]:before:[background:linear-gradient(#43e97b_0%,#38f9d7_100%)]

          [&_h3]:relative [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:pl-5
          [&_h3]:text-2xl [&_h3]:font-medium [&_h3]:text-violet-200 md:[&_h3]:text-3xl
          [&_h3]:before:absolute [&_h3]:before:left-0 [&_h3]:before:top-1 [&_h3]:before:bottom-1 [&_h3]:before:w-[3px]
          [&_h3]:before:[background:linear-gradient(#43e97b_0%,#38f9d7_100%)]

          [&_h4]:relative [&_h4]:mt-8 [&_h4]:mb-3 [&_h4]:pl-4
          [&_h4]:text-xl [&_h4]:font-medium [&_h4]:text-zinc-100 md:[&_h4]:text-2xl
          [&_h4]:before:absolute [&_h4]:before:left-0 [&_h4]:before:top-1 [&_h4]:before:bottom-1 [&_h4]:before:w-[3px]
          [&_h4]:before:[background:linear-gradient(#43e97b_0%,#38f9d7_100%)]

          [&_p]:my-5 [&_p]:text-zinc-200
          [&_strong]:font-semibold [&_strong]:text-white
          [&_em]:text-zinc-100

          [&_a]:font-medium [&_a]:text-violet-300 [&_a]:underline [&_a]:decoration-violet-300/30 [&_a]:underline-offset-4
          hover:[&_a]:decoration-violet-300/70 hover:[&_a]:text-violet-200

          [&_ul]:my-6 [&_ul]:space-y-3 [&_ul]:pl-6
          [&_ul>li]:marker:text-violet-300
          [&_ol]:my-6 [&_ol]:space-y-3 [&_ol]:pl-6
          [&_ol>li]:marker:text-violet-300

          [&_blockquote]:my-8 [&_blockquote]:rounded-2xl
          [&_blockquote]:bg-white/[0.04] [&_blockquote]:px-5 [&_blockquote]:py-4
          [&_blockquote]:text-zinc-100 [&_blockquote]:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]

          [&_hr]:my-10 [&_hr]:border-white/10

          [&_img]:my-8 [&_img]:rounded-2xl [&_img]:border [&_img]:border-white/10
          [&_img]:shadow-[0_20px_50px_rgba(0,0,0,0.35)]

          [&_pre]:my-8 [&_pre]:overflow-x-auto [&_pre]:rounded-2xl
          [&_pre]:bg-black/35 [&_pre]:p-4 [&_pre]:text-sm [&_pre]:text-violet-100

          [&_code]:rounded-md [&_code]:bg-white/[0.06] [&_code]:px-1.5 [&_code]:py-0.5
          [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:text-violet-200
          [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-violet-100

          [&_table]:my-8 [&_table]:w-full [&_table]:overflow-hidden [&_table]:rounded-2xl
          [&_table]:border [&_table]:border-white/10 [&_table]:bg-white/[0.03]
          [&_thead]:bg-white/[0.05]
          [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:text-sm [&_th]:font-semibold [&_th]:text-white
          [&_td]:border-t [&_td]:border-white/10 [&_td]:px-4 [&_td]:py-3 [&_td]:text-sm [&_td]:text-zinc-200

          [&_figure]:my-8
          [&_figcaption]:mt-3 [&_figcaption]:text-sm [&_figcaption]:text-zinc-500
        "
      >
        {children}
        {!children && typeof body === "string" ? (
          <div dangerouslySetInnerHTML={{ __html: body }} />
        ) : null}
      </div>
    </section>
  );
}
