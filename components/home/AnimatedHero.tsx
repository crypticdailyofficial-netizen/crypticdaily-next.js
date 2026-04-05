"use client";

import { useEffect, useRef, useState } from "react";

const FINAL_TEXT = "CRYPTIC DAILY";
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*";

function Coin({ className = "", symbol }: { className?: string; symbol: string }) {
  return (
    <div
      className={`cd-coin absolute rounded-full border border-amber-400/15 bg-amber-400/[0.04] backdrop-blur-xl animate-float ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.18),transparent_36%),linear-gradient(135deg,rgba(255,255,255,0.06),transparent_55%,rgba(255,255,255,0.02))]" />
      <div className="relative flex h-full w-full items-center justify-center" style={{ transform: "translateZ(18px)" }}>
        <span className="text-lg font-black text-white md:text-2xl">{symbol}</span>
      </div>
    </div>
  );
}

function MiniCard({ className = "", title, value }: { className?: string; title: string; value: string }) {
  return (
    <div
      className={`cd-card absolute rounded-2xl border border-amber-400/10 bg-amber-400/[0.03] p-3 backdrop-blur-xl shadow-[0_20px_70px_rgba(146,64,14,0.22)] animate-float-delayed ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_40%,rgba(255,255,255,0.02))]" />
      <div className="relative" style={{ transform: "translateZ(18px)" }}>
        <p className="text-[9px] uppercase tracking-[0.28em] text-white/55">{title}</p>
        <p className="mt-1 text-sm font-black text-white md:text-base">{value}</p>
      </div>
    </div>
  );
}

export default function AnimatedHero() {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const el = titleRef.current;
    if (!el) return;

    const totalDuration = 2000;
    const steps = FINAL_TEXT.length + 1;
    const stepDuration = totalDuration / steps;
    let frame = 0;
    let rafId: number;
    let lastTime = performance.now();

    const tick = (now: number) => {
      if (now - lastTime >= stepDuration) {
        frame++;
        lastTime = now;
      }

      const revealCount = Math.min(frame, FINAL_TEXT.length);
      el.textContent = FINAL_TEXT.split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < revealCount) return FINAL_TEXT[i];
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        })
        .join("");

      if (frame <= FINAL_TEXT.length) {
        rafId = requestAnimationFrame(tick);
      } else {
        el.textContent = FINAL_TEXT;
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section
      className="relative h-[40vh] min-h-[290px] w-full overflow-hidden text-white bg-[radial-gradient(circle_at_top,rgba(180,83,9,0.14),transparent_26%),linear-gradient(180deg,#090807_0%,#16110f_50%,#090807_100%)] rounded-3xl"
      style={{ perspective: "1400px" }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(217,119,6,0.03),transparent,rgba(120,53,15,0.03))]" />

      <div className="cd-orb absolute left-[7%] top-[16%] h-20 w-20 rounded-full bg-amber-400/12 blur-2xl md:h-28 md:w-28 animate-orb" />
      <div className="cd-orb absolute right-[9%] top-[18%] h-24 w-24 rounded-full bg-orange-400/10 blur-2xl md:h-32 md:w-32 animate-orb-delayed" />
      <div className="cd-orb absolute bottom-[8%] left-[22%] h-16 w-16 rounded-full bg-yellow-300/8 blur-2xl md:h-24 md:w-24 animate-orb" />

      <div className="cd-ring absolute left-[11%] top-[18%] hidden h-32 w-32 rounded-full border border-amber-300/10 md:block animate-spin-slow" />
      <div className="cd-ring absolute bottom-[10%] right-[14%] hidden h-24 w-24 rounded-full border border-amber-300/10 md:block animate-spin-slow" />

      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <Coin className="left-[10%] top-[22%] h-16 w-16" symbol="₿" />
        <Coin className="right-[14%] top-[24%] h-14 w-14" symbol="Ξ" />
        <Coin className="right-[24%] bottom-[16%] h-12 w-12" symbol="◈" />
        <MiniCard className="left-[19%] bottom-[16%] w-28" title="Volume" value="$94B" />
        <MiniCard className="right-[20%] bottom-[18%] w-28" title="Pulse" value="+8.4%" />
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:56px_56px]" />

      <div
        className="relative z-10 flex h-full items-center justify-center px-4 transition-opacity duration-700"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-2 text-[9px] font-medium uppercase tracking-[0.38em] text-amber-200/90 md:text-[11px]">
            Crypto • Markets • Alpha
          </p>
          <h1
            ref={titleRef}
            className="bg-gradient-to-b from-[#fff4e6] via-[#f8d9b0] to-[#d6a36f] bg-clip-text text-3xl font-black uppercase leading-none tracking-[0.08em] text-transparent sm:text-4xl md:text-6xl"
            style={{ textShadow: "0 0 26px rgba(255,255,255,0.05)" }}
          >
            CRYPTIC DAILY
          </h1>
          <div className="mx-auto mt-3 h-px w-28 bg-gradient-to-r from-transparent via-amber-500/70 to-transparent md:w-36" />
          <p className="mx-auto mt-3 max-w-xl text-xs leading-6 text-amber-50/65 md:text-sm">
            Real-time crypto coverage with a cinematic scrambled headline effect.
          </p>
        </div>
      </div>
    </section>
  );
}
