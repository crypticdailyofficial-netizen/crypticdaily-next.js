import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF] disabled:opacity-50";

  const variants = {
    primary: "bg-[#00D4FF] text-[#0A0F1E] hover:bg-[#00B8E0] hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]",
    secondary: "bg-[#7C3AED] text-white hover:bg-[#6D28D9] hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]",
    ghost: "bg-white/5 text-[#F9FAFB] hover:bg-white/10 border border-white/10",
    outline: "border border-[#00D4FF] text-[#00D4FF] hover:bg-[#00D4FF]/10",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-5 py-2.5",
    lg: "text-base px-7 py-3",
  };

  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}
