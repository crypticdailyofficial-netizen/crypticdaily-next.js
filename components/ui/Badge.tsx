import { cn } from "@/lib/utils";
import { CATEGORY_COLORS } from "@/lib/constants";

interface BadgeProps {
  label: string;
  category?: string;
  color?: string;
  className?: string;
  size?: "sm" | "md";
}

export function Badge({ label, category, color, className, size = "md" }: BadgeProps) {
  const badgeColor = color || (category ? CATEGORY_COLORS[category] : "#00D4FF");
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-semibold uppercase tracking-wider",
        size === "sm" ? "text-[10px] px-2 py-0.5" : "text-xs px-3 py-1",
        className
      )}
      style={{ backgroundColor: `${badgeColor}20`, color: badgeColor, border: `1px solid ${badgeColor}40` }}
    >
      {label}
    </span>
  );
}
