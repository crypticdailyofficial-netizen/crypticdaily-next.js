import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#111827] border-t border-[#1E2A3A] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="text-xl font-bold font-heading text-[#00D4FF]">⚡ Cryptic Daily</span>
            </Link>
            <p className="text-sm text-[#9CA3AF] leading-relaxed max-w-xs">
              Your daily source for cryptocurrency news, market analysis, and blockchain insights.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://twitter.com/crypticdaily" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="p-2 bg-white/5 rounded-lg text-[#9CA3AF] hover:text-[#00D4FF] hover:bg-white/10 transition-all duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" aria-label="Telegram" className="p-2 bg-white/5 rounded-lg text-[#9CA3AF] hover:text-[#00D4FF] hover:bg-white/10 transition-all duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              </a>
              <a href="/feed" aria-label="RSS Feed" className="p-2 bg-white/5 rounded-lg text-[#9CA3AF] hover:text-[#00D4FF] hover:bg-white/10 transition-all duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20 6.18 20C4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-[#F9FAFB] uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[["Home", "/"], ["News", "/news"], ["Coins", "/coins"], ["Markets", "/categories/markets"]].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-[#9CA3AF] hover:text-[#00D4FF] transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h3 className="text-sm font-semibold text-[#F9FAFB] uppercase tracking-wider mb-4">Categories</h3>
            <ul className="space-y-2">
              {[["DeFi", "/categories/defi"], ["NFTs", "/categories/nfts"], ["Regulation", "/categories/regulation"], ["Web3", "/categories/web3"], ["Markets", "/categories/markets"]].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-[#9CA3AF] hover:text-[#00D4FF] transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h3 className="text-sm font-semibold text-[#F9FAFB] uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2">
              {[["About", "/about"], ["Contact", "/contact"], ["Privacy Policy", "/privacy-policy"], ["Advertise", "/contact"]].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-[#9CA3AF] hover:text-[#00D4FF] transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-8 border-t border-[#1E2A3A] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#9CA3AF]">
            © 2026 Cryptic Daily. All rights reserved.
          </p>
          <p className="text-xs text-[#4B5563]">
            Cryptocurrency prices are for informational purposes only. Not financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
