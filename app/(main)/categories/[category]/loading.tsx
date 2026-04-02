import { ArticleCardSkeleton, Skeleton } from "@/components/ui/Skeleton";

function CategoryHeroSkeleton() {
  return (
    <div className="overflow-hidden rounded-[34px] border border-white/10 bg-[#040812] shadow-[0_32px_120px_rgba(0,0,0,0.52)]">
      <div className="relative grid xl:grid-cols-[minmax(0,1.45fr)_280px]">
        <div className="p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <Skeleton className="h-4 w-40 rounded-full" />
            <Skeleton className="h-9 w-40 rounded-full" />
          </div>

          <div className="pt-7">
            <Skeleton className="h-16 w-full max-w-3xl rounded-[22px]" />
            <Skeleton className="mt-4 h-16 w-4/5 max-w-2xl rounded-[22px]" />
          </div>

          <div className="mt-6 max-w-3xl">
            <Skeleton className="h-[2px] w-full rounded-full" />
          </div>

          <div className="mt-6 space-y-3">
            <Skeleton className="h-4 w-full rounded-full" />
            <Skeleton className="h-4 w-11/12 rounded-full" />
            <Skeleton className="h-4 w-4/5 rounded-full" />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-9 w-28 rounded-[999px] border border-white/8"
              />
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 bg-[linear-gradient(180deg,rgba(9,18,30,0.88)_0%,rgba(3,8,14,0.95)_100%)] xl:border-l xl:border-t-0">
          <div className="p-5 xl:p-6">
            <div className="rounded-[26px] border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center justify-between gap-3">
                <Skeleton className="h-3 w-24 rounded-full" />
                <Skeleton className="h-3 w-16 rounded-full" />
              </div>

              <Skeleton className="mt-5 h-14 w-20 rounded-[18px]" />
              <div className="mt-4 space-y-2">
                <Skeleton className="h-4 w-full rounded-full" />
                <Skeleton className="h-4 w-4/5 rounded-full" />
              </div>

              <div className="mt-6 flex gap-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className="h-1.5 flex-1 rounded-full"
                  />
                ))}
              </div>
            </div>

            <Skeleton className="mt-5 h-44 w-full rounded-[26px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CategorySidebarSkeleton() {
  return (
    <div className="overflow-hidden rounded-[22px] border border-white/8 bg-[#090909] shadow-[0_20px_60px_rgba(0,0,0,0.34)]">
      <div className="border-b border-white/8 px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Skeleton className="h-2 w-2 rounded-full" />
            <Skeleton className="h-3 w-28 rounded-full" />
          </div>
          <Skeleton className="h-3 w-10 rounded-full" />
        </div>
      </div>

      <div className="px-5 py-2">
        <div className="divide-y divide-white/8">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-[40px_1fr_auto] items-start gap-4 py-[15px]"
            >
              <Skeleton className="h-5 w-8 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-full rounded-full" />
                {index === 0 ? (
                  <Skeleton className="h-5 w-5/6 rounded-full" />
                ) : null}
              </div>
              <Skeleton className="mt-1 h-4 w-4 rounded-full" />
            </div>
          ))}
        </div>

        <div className="border-t border-white/8 py-4">
          <Skeleton className="h-4 w-40 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0A0F1E]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          <CategoryHeroSkeleton />
          <CategorySidebarSkeleton />
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <ArticleCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
