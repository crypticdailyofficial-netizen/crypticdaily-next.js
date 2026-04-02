import { ArticleCardSkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0A0F1E]">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-10 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3">
          <Skeleton className="h-4 w-40 rounded-full" />
        </div>

        <div className="pb-10">
          <div className="rounded-3xl border border-white/10 bg-[linear-gradient(180deg,#090807_0%,#16110f_50%,#090807_100%)] px-6 py-10 md:px-10">
            <div className="mx-auto max-w-3xl text-center">
              <Skeleton className="mx-auto h-3 w-36 rounded-full" />
              <Skeleton className="mx-auto mt-4 h-16 w-full max-w-2xl rounded-2xl" />
              <Skeleton className="mx-auto mt-4 h-px w-28 rounded-full" />
              <Skeleton className="mx-auto mt-4 h-4 w-full max-w-xl rounded-full" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-14">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#03030A]">
              <Skeleton className="h-[420px] w-full rounded-none" />
              <div className="p-8 md:p-10">
                <Skeleton className="h-6 w-28 rounded-full" />
                <Skeleton className="mt-5 h-10 w-full max-w-2xl rounded-xl" />
                <Skeleton className="mt-3 h-4 w-full max-w-xl rounded-full" />
                <div className="mt-7 flex items-center gap-4">
                  <Skeleton className="h-11 w-11 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32 rounded-full" />
                    <Skeleton className="h-3 w-40 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[36px] border border-white/10 bg-white/[0.04] p-8">
              <Skeleton className="h-8 w-40 rounded-full" />
              <Skeleton className="mt-4 h-4 w-full max-w-2xl rounded-full" />
              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <ArticleCardSkeleton key={index} />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Skeleton className="h-8 w-28 rounded-full" />
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <Skeleton className="h-40 w-full rounded-xl" />
                <Skeleton className="mt-4 h-4 w-24 rounded-full" />
                <Skeleton className="mt-3 h-5 w-full rounded-full" />
                <Skeleton className="mt-2 h-5 w-4/5 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
