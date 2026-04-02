'use client';

import { useEffect, useRef } from "react";

interface AdUnitProps {
  slot: string;
  format?: "auto" | "horizontal" | "rectangle";
  className?: string;
}

export function AdUnit({ slot, format = "auto", className }: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;
    try {
      // @ts-expect-error adsbygoogle not typed
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense not available
    }
  }, []);

  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  if (!client) {
    // Show placeholder in dev
    return (
      <div className={`min-h-[90px] bg-white/5 border border-dashed border-white/10 rounded-xl flex items-center justify-center my-8 ${className}`}>
        <p className="text-xs text-[#4B5563]">Ad Unit ({slot})</p>
      </div>
    );
  }

  return (
    <div className={`min-h-[90px] my-8 overflow-hidden ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
