import Image, { type StaticImageData } from "next/image";

export interface EditorialHeroBannerProps {
  color: string;
  eyebrow: string;
  title: string;
  description: string;
  articleCount: number;
  bannerImage?: StaticImageData;
  bannerImageAlt?: string;
}

function formatCount(value: number) {
  return value.toString().padStart(2, "0");
}

function getRevealStyle(delayMs: number) {
  return {
    animationDelay: `${delayMs}ms`,
    animationFillMode: "both" as const,
  };
}

export default function EditorialHeroBanner({
  color,
  eyebrow,
  title,
  description,
  articleCount,
  bannerImage,
  bannerImageAlt,
}: EditorialHeroBannerProps) {
  const eyebrowTokens = eyebrow
    .split("·")
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 3);

  return (
    <section
      className="group relative mb-10 overflow-hidden rounded-[34px] border border-cyan-400/15 bg-[#040812] text-white shadow-[0_32px_120px_rgba(0,0,0,0.52)] motion-safe:animate-fade-up"
      style={getRevealStyle(0)}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 12% 16%, ${color}24 0%, transparent 26%),
            radial-gradient(circle at 86% 78%, rgba(94,234,212,0.12) 0%, transparent 22%),
            linear-gradient(135deg, rgba(6,10,18,0.98) 0%, rgba(6,14,24,0.96) 45%, rgba(2,6,10,1) 100%)
          `,
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(116,144,174,0.18) 1px, transparent 1px),
            linear-gradient(90deg, rgba(116,144,174,0.14) 1px, transparent 1px)
          `,
          backgroundSize: "68px 68px",
          maskImage:
            "linear-gradient(180deg, rgba(0,0,0,0.95), rgba(0,0,0,0.18))",
        }}
      />

      <div
        className="pointer-events-none absolute -right-16 top-8 h-72 w-72 rounded-full blur-3xl motion-safe:animate-float-y"
        style={{
          background: `radial-gradient(circle, ${color}30 0%, transparent 72%)`,
          animationDuration: "4.8s",
        }}
      />

      <div className="pointer-events-none absolute left-0 top-0 h-20 w-20 border-l border-t border-cyan-300/40" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-24 w-24 border-b border-r border-cyan-300/30" />
      <div className="pointer-events-none absolute right-[320px] top-0 hidden h-full w-px bg-[linear-gradient(180deg,transparent,rgba(72,201,255,0.26),transparent)] xl:block" />

      <div className="relative z-10 grid xl:grid-cols-[minmax(0,1.45fr)_320px]">
        <div className="p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div
              className="inline-flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-cyan-100/70 motion-safe:animate-fade-up"
              style={getRevealStyle(90)}
            >
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: color, boxShadow: `0 0 14px ${color}` }}
              />
              Cryptic Daily // Future Desk
            </div>

            <div
              className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.04] px-3 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-white/72 [clip-path:polygon(0_0,calc(100%-12px)_0,100%_50%,calc(100%-12px)_100%,0_100%)] motion-safe:animate-fade-up"
              style={getRevealStyle(150)}
            >
              <span className="text-white/38">Sector</span>
              <span style={{ color }}>{eyebrow}</span>
            </div>
          </div>

          <div className="relative pt-7">
            <p
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 select-none text-[clamp(68px,12vw,164px)] font-black uppercase leading-none tracking-[-0.09em] text-cyan-200/[0.05]"
            >
              2077
            </p>

            <h1
              className="relative max-w-4xl text-balance text-[clamp(42px,7vw,84px)] font-black uppercase leading-[0.88] tracking-[-0.065em] text-transparent motion-safe:animate-fade-up"
              style={{
                backgroundImage: `linear-gradient(180deg, #F8FCFF 0%, #D6E8F6 42%, ${color} 100%)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                textShadow: "0 0 28px rgba(255,255,255,0.08)",
                ...getRevealStyle(220),
              }}
            >
              {title}
            </h1>
          </div>

          <div className="mt-6 max-w-3xl">
            <div
              className="h-[2px] bg-[linear-gradient(90deg,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.24)_46%,transparent_100%)] motion-safe:animate-fade-in"
              style={getRevealStyle(300)}
            />
          </div>

          <p
            className="mt-6 max-w-3xl text-balance text-[1rem] leading-8 text-[#9FB4C8] md:text-[1.05rem] motion-safe:animate-fade-up"
            style={getRevealStyle(360)}
          >
            {description}
          </p>

          <div
            className="mt-8 flex flex-wrap items-center gap-3 motion-safe:animate-fade-up"
            style={getRevealStyle(420)}
          >
            {eyebrowTokens.map((token, index) => (
              <span
                key={token}
                className="border px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#DDEBFA] [clip-path:polygon(0_0,calc(100%-10px)_0,100%_50%,calc(100%-10px)_100%,0_100%,10px_50%)]"
                style={{
                  borderColor:
                    index === 0 ? `${color}66` : "rgba(255,255,255,0.12)",
                  background:
                    index === 0
                      ? `linear-gradient(135deg, ${color}24 0%, rgba(255,255,255,0.04) 100%)`
                      : "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                  boxShadow:
                    index === 0
                      ? `inset 0 0 0 1px ${color}22`
                      : "inset 0 0 0 1px rgba(255,255,255,0.04)",
                }}
              >
                {token}
              </span>
            ))}
          </div>
        </div>

        <aside className="relative overflow-hidden border-t border-white/10 bg-[linear-gradient(180deg,rgba(9,18,30,0.88)_0%,rgba(3,8,14,0.95)_100%)] xl:border-l xl:border-t-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_28%)]" />
          <div
            className="absolute left-0 top-0 h-full w-[2px]"
            style={{
              background: `linear-gradient(180deg, ${color} 0%, rgba(255,255,255,0) 100%)`,
            }}
          />

          <div className="relative p-5 xl:p-6">
            <article
              className="border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_100%)] p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03),0_24px_48px_rgba(0,0,0,0.28)] [clip-path:polygon(0_0,calc(100%-18px)_0,100%_18px,100%_100%,18px_100%,0_calc(100%-18px))] motion-safe:animate-fade-up"
              style={getRevealStyle(260)}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-[0.64rem] uppercase tracking-[0.32em] text-white/45">
                  Stories Live
                </p>
                <span
                  className="inline-flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.26em]"
                  style={{ color }}
                >
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ backgroundColor: color, boxShadow: `0 0 12px ${color}` }}
                  />
                  Synced
                </span>
              </div>

              <div className="mt-5">
                <p className="text-6xl font-black leading-none tracking-[-0.1em] text-white">
                  {formatCount(articleCount)}
                </p>
                <p className="mt-3 text-sm leading-6 text-[#8FA6BB]">
                  Live desk inventory for the current coverage stream.
                </p>
              </div>

              <div className="mt-6 flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span
                    key={index}
                    className="h-1.5 flex-1 rounded-full"
                    style={{
                      background:
                        index < 3
                          ? `linear-gradient(90deg, ${color}, rgba(255,255,255,0.28))`
                          : "rgba(255,255,255,0.08)",
                    }}
                  />
                ))}
              </div>
            </article>

            {bannerImage ? (
              <div
                className="relative mt-4 overflow-hidden border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.02)_100%)] p-2 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03),0_24px_48px_rgba(0,0,0,0.22)] [clip-path:polygon(0_0,calc(100%-18px)_0,100%_18px,100%_100%,18px_100%,0_calc(100%-18px))] motion-safe:animate-fade-up"
                style={getRevealStyle(340)}
              >
                <div className="relative aspect-[4/5] overflow-hidden [clip-path:polygon(0_0,calc(100%-14px)_0,100%_14px,100%_100%,14px_100%,0_calc(100%-14px))]">
                  <Image
                    src={bannerImage}
                    alt={bannerImageAlt ?? title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(min-width: 1280px) 280px, (min-width: 1024px) 320px, 100vw"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,18,0.02)_0%,rgba(4,8,18,0.14)_48%,rgba(4,8,18,0.68)_100%)]" />
                </div>
              </div>
            ) : null}
          </div>
        </aside>
      </div>
    </section>
  );
}
