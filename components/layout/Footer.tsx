import Link from "next/link";

const FOOTER_GROUPS = [
  {
    title: "Explore",
    links: [
      ["Home", "/"],
      ["News", "/news"],
      ["Crypto Newswire", "/categories/crypto-newswire"],
      ["Web3 Builder", "/categories/web3-builder"],
    ],
  },
  {
    title: "Categories",
    links: [
      ["Crypto Newswire", "/categories/crypto-newswire"],
      ["Web3 Builder", "/categories/web3-builder"],
      ["Web3 Fraud Files", "/categories/web3-fraud-files"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "/about"],
      ["Contact", "/contact"],
      ["Editorial Policy", "/editorial-policy"],
      ["Privacy Policy", "/privacy-policy"],
      ["Terms & Conditions", "/terms"],
      ["Disclaimer", "/disclaimer"],
      ["Advertise", "/advertise"],
    ],
  },
] as const;

const SOCIAL_LINKS = [
  {
    label: "X",
    href: "https://x.com/crypticdailyhq",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Telegram",
    href: "https://t.me/CrypticDaily",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    label: "RSS",
    href: "/feed",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20 6.18 20C4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z" />
      </svg>
    ),
  },
] as const;

export function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden border-t border-white/8 bg-[#060606] text-[#ECE7DF]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 12% 10%, rgba(214,174,105,0.14) 0%, transparent 24%),
            linear-gradient(180deg, rgba(10,10,10,0.98) 0%, rgba(6,6,6,1) 100%)
          `,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="border-b border-white/8 pb-12">
          <div className="grid gap-12 lg:grid-cols-[1.35fr_0.8fr_0.8fr_0.95fr]">
            <section className="max-w-xl">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#D6AE69]">
                Independent Crypto Journal
              </p>
              <Link href="/" className="mt-5 inline-block">
                <div className="text-[clamp(2.3rem,6vw,4.6rem)] font-black leading-[0.92] tracking-[-0.08em] text-[#F5EFE6]">
                  Cryptic
                  <br />
                  Daily
                </div>
              </Link>
              <p className="mt-6 max-w-md text-sm leading-7 text-[#A89F93]">
                Daily reporting on crypto markets, builders, policy, and fraud
                without the noise floor most sites mistake for momentum.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {SOCIAL_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    aria-label={link.label}
                    className="inline-flex min-h-[44px] min-w-[44px] items-center gap-2 rounded-full border border-white/10 px-4 py-3 text-sm text-[#B8B0A4] transition-colors duration-200 hover:border-[#D6AE69]/40 hover:text-[#F3C981]"
                  >
                    {link.icon}
                    <span className="font-medium uppercase tracking-[0.16em]">
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            {FOOTER_GROUPS.map((group) => (
              <section key={group.title} className="lg:border-l lg:border-white/8 lg:pl-6">
                <h3 className="text-[0.75rem] font-semibold uppercase tracking-[0.28em] text-[#F3C981]">
                  {group.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {group.links.map(([label, href]) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="text-sm leading-6 text-[#A89F93] transition-colors duration-200 hover:text-[#F5EFE6]"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#B8B0A4]">
            © 2026 Cryptic Daily. All rights reserved.
          </p>
          <p className="max-w-2xl text-xs leading-6 uppercase tracking-[0.16em] text-[#746C62]">
            Cryptocurrency prices are for informational purposes only. Not
            financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
