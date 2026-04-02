import { ArticleCardSkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0A0F1E]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.92),rgba(10,15,30,0.98))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:p-8 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <Skeleton className="h-[120px] w-[120px] rounded-full" />
            <div className="min-w-0 flex-1">
              <Skeleton className="h-10 w-64 rounded-2xl" />
              <Skeleton className="mt-4 h-8 w-40 rounded-full" />
              <Skeleton className="mt-5 h-4 w-full max-w-2xl rounded-full" />
              <Skeleton className="mt-3 h-4 w-11/12 max-w-xl rounded-full" />
              <Skeleton className="mt-5 h-4 w-32 rounded-full" />
            </div>
          </div>
        </section>

        <div className="mx-auto mt-8 h-px w-full bg-white/10" />

        <section className="mt-8">
          <Skeleton className="mb-6 h-8 w-56 rounded-full" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <ArticleCardSkeleton key={index} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
