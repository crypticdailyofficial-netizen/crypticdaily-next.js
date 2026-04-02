import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0A0F1E]">
      <div className="mx-auto max-w-7xl">
        <div className="mt-5 overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(135deg,#090909_0%,#040404_55%,#010101_100%)] p-6 md:p-12">
          <div className="max-w-4xl rounded-[28px] border border-white/10 bg-white/[0.03] px-6 py-7 md:px-9">
            <Skeleton className="h-3 w-56 rounded-full" />
            <Skeleton className="mt-5 h-6 w-32 rounded-full" />
            <Skeleton className="mt-5 h-14 w-full max-w-3xl rounded-2xl" />
            <Skeleton className="mt-3 h-14 w-5/6 max-w-2xl rounded-2xl" />
            <div className="mt-5 flex flex-wrap gap-3">
              <Skeleton className="h-10 w-40 rounded-lg" />
              <Skeleton className="h-10 w-32 rounded-lg" />
              <Skeleton className="h-10 w-28 rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-5 max-w-7xl rounded-3xl border border-white/10 bg-neutral-950/20 p-4 sm:p-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <Skeleton className="mb-8 aspect-video w-full rounded-xl" />
            <Skeleton className="mb-8 h-28 w-full rounded-3xl" />
            <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <Skeleton className="h-8 w-2/3 rounded-full" />
              <Skeleton className="mt-6 h-4 w-full rounded-full" />
              <Skeleton className="mt-3 h-4 w-full rounded-full" />
              <Skeleton className="mt-3 h-4 w-11/12 rounded-full" />
              <Skeleton className="mt-10 h-7 w-1/2 rounded-full" />
              <Skeleton className="mt-4 h-4 w-full rounded-full" />
              <Skeleton className="mt-3 h-4 w-full rounded-full" />
              <Skeleton className="mt-3 h-4 w-10/12 rounded-full" />
            </div>
          </div>

          <div className="space-y-4">
            <Skeleton className="h-8 w-28 rounded-full" />
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <Skeleton className="h-32 w-full rounded-xl" />
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
