interface CommunityProps {
  twitterHref?: string;
  telegramHref?: string;
}

function TwitterIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.503 11.24H16.17l-4.714-6.231-5.4 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.714 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function SendIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function UsersIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <path d="M20 8v6" />
      <path d="M23 11h-6" />
    </svg>
  );
}

export default function Community({
  twitterHref = "https://x.com/crypticdailyhq",
  telegramHref = "https://t.me/CrypticDaily",
}: CommunityProps) {
  return (
    <section className="relative isolate mx-auto mt-10 min-h-[240px] max-w-7xl overflow-hidden rounded-2xl bg-neutral-950 ring-1 ring-white/10">
      <div
        className="animate-gradient-pan absolute -inset-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(56,189,248,0.10) 0 36px, rgba(99,102,241,0.08) 36px 72px, rgba(56,189,248,0.10) 72px 108px)",
          backgroundSize: "480px 480px",
        }}
      />

      <div className="relative p-6 sm:p-8">
        <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-300">
          <h1 className="flex items-center gap-2 rounded-xl bg-red-600 px-5 text-lg font-extrabold text-white sm:text-2xl">
            <UsersIcon className="h-4 w-4" />
            Join our community
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <a
            href={twitterHref}
            target="_blank"
            rel="noreferrer"
            className="group relative block rounded-xl bg-neutral-950 p-4 shadow-lg shadow-sky-500/20 ring-1 ring-white/10 transition sm:p-5"
            aria-label="Join Discussion on X (Twitter)"
          >
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-black/40 ring-1 ring-sky-400/40">
                <TwitterIcon className="h-5 w-5 text-sky-300" />
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold leading-5 text-white">
                  Join Discussion on X (Twitter)
                </div>
                <div className="text-xs leading-5 text-neutral-300">
                  Follow updates, threads, and live conversations.
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 ring-1 ring-white/10 transition group-hover:opacity-100" />
          </a>

          <a
            href={telegramHref}
            target="_blank"
            rel="noreferrer"
            className="group relative block rounded-xl bg-neutral-950 p-4 shadow-lg shadow-cyan-500/20 ring-1 ring-white/10 transition sm:p-5"
            aria-label="Join Community on Telegram"
          >
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-black/40 ring-1 ring-cyan-400/40">
                <SendIcon className="h-5 w-5 text-cyan-300" />
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold leading-5 text-white">
                  Join Community on Telegram
                </div>
                <div className="text-xs leading-5 text-neutral-300">
                  Chat with members, get drops, and AMAs.
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 ring-1 ring-white/10 transition group-hover:opacity-100" />
          </a>
        </div>
      </div>
    </section>
  );
}
