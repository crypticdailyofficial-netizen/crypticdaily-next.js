'use client';

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  onClose?: () => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({ onClose, placeholder = "Search crypto news...", className }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      onClose?.();
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          aria-label="Search"
          className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-[#F9FAFB] placeholder-[#9CA3AF] focus:outline-none focus:border-[#00D4FF]/50 focus:bg-white/8 transition-all duration-200"
        />
      </div>
    </form>
  );
}
