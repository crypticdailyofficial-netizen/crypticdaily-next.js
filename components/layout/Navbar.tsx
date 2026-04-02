'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { SearchBar } from "@/components/ui/SearchBar";
import { MOCK_COINS } from "@/lib/constants";
import { formatPrice, formatPercentage } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/news", label: "News" },
  { href: "/coins", label: "Coins" },
  { href: "/categories/defi", label: "DeFi" },
  { href: "/categories/nfts", label: "NFTs" },
  { href: "/categories/markets", label: "Markets" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0A0F1E]/95 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.05)]"
            : "bg-[#0A0F1E]"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between" aria-label="Main navigation">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" aria-label="Cryptic Daily Home">
            <span className="text-xl font-bold font-heading text-[#00D4FF] group-hover:text-white transition-colors duration-200">
              ⚡ Cryptic Daily
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-white/5 rounded-lg transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Search toggle desktop */}
            <div className="hidden md:block">
              {searchOpen ? (
                <SearchBar onClose={() => setSearchOpen(false)} className="w-64" />
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  aria-label="Open search"
                  className="p-2 text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-white/5 rounded-lg transition-all duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              )}
            </div>

            {/* Auth buttons - placeholder for Clerk */}
            <Link
              href="/sign-in"
              className="hidden md:inline-flex items-center px-4 py-2 text-sm font-semibold text-[#0A0F1E] bg-[#00D4FF] rounded-full hover:bg-[#00B8E0] hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all duration-200"
            >
              Sign In
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileOpen}
              className="md:hidden p-2 text-[#9CA3AF] hover:text-[#F9FAFB] rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-[#111827] border-t border-[#1E2A3A] animate-fade-in">
            <div className="px-4 py-4 space-y-1">
              <SearchBar className="mb-4" />
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-white/5 rounded-lg transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-[#1E2A3A] mt-2">
                <Link href="/sign-in" className="block px-3 py-2 text-sm font-semibold text-[#00D4FF]">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
