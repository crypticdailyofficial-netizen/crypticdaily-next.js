import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata(
  "About Us",
  "Learn about Cryptic Daily — your premier source for cryptocurrency news, market analysis, and blockchain insights.",
  "/about"
);

const TEAM = [
  { name: "Alex Rivera", role: "Senior Crypto Analyst", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
  { name: "Sarah Chen", role: "NFT & Web3 Reporter", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
  { name: "Marcus Johnson", role: "Markets & Regulation Editor", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
];

const STATS = [
  { label: "Articles Published", value: "12,400+" },
  { label: "Coins Covered", value: "2,000+" },
  { label: "Daily Readers", value: "150,000+" },
  { label: "Years Active", value: "5+" },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold font-heading text-[#F9FAFB] mb-6">About Cryptic Daily</h1>
        <p className="text-xl text-[#9CA3AF] leading-relaxed max-w-2xl mx-auto">
          We're your premier source for cryptocurrency news, DeFi insights, NFT market trends, and blockchain technology analysis. Founded in 2020, Cryptic Daily has grown to serve over 150,000 daily readers worldwide.
        </p>
      </div>

      {/* Mission */}
      <div className="bg-[#111827] border border-[#1E2A3A] rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold font-heading text-[#F9FAFB] mb-4">Our Mission</h2>
        <p className="text-[#9CA3AF] leading-relaxed text-lg">
          To democratize access to high-quality cryptocurrency information. We believe every investor, regardless of experience level, deserves clear, accurate, and timely information to make informed decisions in the crypto markets.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-[#111827] border border-[#1E2A3A] rounded-xl p-5 text-center">
            <p className="text-3xl font-bold font-heading text-[#00D4FF] mb-1">{stat.value}</p>
            <p className="text-sm text-[#9CA3AF]">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Team */}
      <h2 className="text-2xl font-bold font-heading text-[#F9FAFB] mb-8 text-center">Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TEAM.map((member) => (
          <div key={member.name} className="bg-[#111827] border border-[#1E2A3A] rounded-xl p-6 text-center hover:border-[#00D4FF]/30 transition-all duration-200">
            <img src={member.avatar} alt={member.name} className="w-20 h-20 rounded-full mx-auto mb-4 object-cover" />
            <h3 className="font-bold font-heading text-[#F9FAFB] mb-1">{member.name}</h3>
            <p className="text-sm text-[#00D4FF]">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
