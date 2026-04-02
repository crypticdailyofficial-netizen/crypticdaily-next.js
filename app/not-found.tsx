import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold font-heading text-[#00D4FF] mb-4">404</div>
        <h1 className="text-2xl font-bold font-heading text-[#F9FAFB] mb-4">Page Not Found</h1>
        <p className="text-[#9CA3AF] mb-8 leading-relaxed">
          The page you're looking for doesn't exist. It may have been moved, deleted, or the URL is incorrect.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="px-6 py-3 bg-[#00D4FF] text-[#0A0F1E] font-semibold rounded-full hover:bg-[#00B8E0] transition-all duration-200">
            Go Home
          </Link>
          <Link href="/news" className="px-6 py-3 bg-white/5 text-[#F9FAFB] font-semibold rounded-full border border-white/10 hover:bg-white/10 transition-all duration-200">
            Latest News
          </Link>
        </div>
      </div>
    </div>
  );
}
