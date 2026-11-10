import { useEffect, useRef } from "react";
import gsap from "gsap";
import { profile } from "../content";
import { markIntroSeen, prefersReducedMotion } from "../lib/motion";

const MIN_MS = 2200;
const MAX_MS = 3500;

type Props = {
  /** Tirai mulai terangkat: saatnya kartu jatuh. */
  onReveal: () => void;
  /** Intro selesai dan boleh dilepas dari DOM. */
  onDone: () => void;
};

function waitForAssets(onEach: () => void) {
  const fonts = (document.fonts?.load('760 80% 1em "Bricolage"') ?? Promise.resolve())
    .then(() => document.fonts?.ready)
    .catch(() => undefined);
  const photo = new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = img.onerror = () => resolve();
    img.src = "/foto.webp";
    img.decode?.().then(() => resolve(), () => resolve());
  });
  return [fonts, photo].map((p) => p.then(onEach));
}

export function Intro({ onReveal, onDone }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const numBox = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const barBox = useRef<HTMLDivElement>(null);
  const finish = useRef<(fast: boolean) => void>(() => {});

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    // Kunci scroll di html DAN body (HP butuh keduanya).
    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    body.style.overflow = "hidden";
    const unlock = () => {
      html.style.overflow = "";
      html.style.overscrollBehavior = "";
      body.style.overflow = "";
    };

    const reduced = prefersReducedMotion();

    let done = 0;
    const total = 2;
    let raf = 0;
    let ended = false;
    let revealed = false;
    let tl: gsap.core.Timeline | null = null;
    let lastShown = 0;
    const t0 = performance.now();
    waitForAssets(() => {
      done += 1;
    });

    const reveal = () => {
      if (revealed) return;
      revealed = true;
      html.classList.remove("has-intro");
      onReveal();
    };

    const cleanup = () => {
      unlock();
      markIntroSeen();
      reveal();
      onDone();
    };

    const render = (p: number) => {
      const shown = Math.max(1, Math.min(100, Math.round(p * 100)));
      if (shown !== lastShown && num.current) {
        lastShown = shown;
        num.current.textContent = String(shown);
        root.current?.setAttribute("aria-valuenow", String(shown));
      }
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };

    finish.current = (fast: boolean) => {
      if (ended) return;
      ended = true;
      cancelAnimationFrame(raf);
      tl?.kill();
      if (fast || reduced) {
        gsap.to(root.current, {
          autoAlpha: 0,
          duration: fast ? 0.25 : 0.4,
          ease: "power1.out",
          onStart: reveal,
          onComplete: cleanup,
        });
        return;
      }
      tl = gsap
        .timeline({ onComplete: cleanup })
        .to([numBox.current?.firstElementChild, barBox.current?.firstElementChild], {
          yPercent: -110,
          duration: 0.55,
          ease: "power3.in",
          stagger: 0.06,
        })
        .to(root.current, { yPercent: -100, duration: 0.85, ease: "power4.inOut" }, "+=0.05")
        .call(reveal, [], "-=0.3");
    };

    const tick = (now: number) => {
      const elapsed = now - t0;
      const real = done / total;
      // Angka tidak boleh mendahului pemuatan nyata: tertahan di 90% sampai aset siap.
      const allowed = real >= 1 || elapsed >= MAX_MS ? 1 : 0.15 + 0.75 * real;
      const byTime = reduced ? 1 : Math.min(1, elapsed / MIN_MS);
      const eased = 1 - Math.pow(1 - byTime, 2.2);
      const target = Math.min(eased, allowed);
      render(target);
      if (target >= 1 && (reduced ? true : elapsed >= MIN_MS)) {
        finish.current(false);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      tl?.kill();
      unlock();
    };
  }, [onReveal, onDone]);

  return (
    <div
      ref={root}
      className="fixed inset-0 z-50 flex h-[100dvh] touch-none flex-col justify-between bg-[#07101F] px-5 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))] text-[#E6F0FF] sm:px-10 sm:pb-10"
      role="progressbar"
      aria-label="Memuat halaman"
      aria-valuemin={1}
      aria-valuemax={100}
      aria-valuenow={1}
    >
      <div className="flex items-start justify-between gap-4">
        <p className="text-[0.95rem] text-[#9FB4D3]">
          {profile.fullName}
          <span className="hidden sm:inline"> · {profile.major}</span>
        </p>
        <button
          type="button"
          onClick={() => finish.current(true)}
          className="rounded-full border border-[#2A4470] px-4 py-2 text-[0.95rem] text-[#E6F0FF] hover:border-[#4DA3FF]"
        >
          Lewati intro
        </button>
      </div>

      <div
        ref={numBox}
        className="flex flex-1 items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="relative inline-block font-[760] leading-[0.82] tracking-[-0.04em] tabular-nums"
          style={{ fontSize: "min(37vw, 21rem)", fontStretch: "75%" }}
        >
          <span ref={num}>1</span>
          <span className="text-[#4DA3FF]">%</span>
        </div>
      </div>

      <div ref={barBox} className="overflow-hidden">
        <div className="h-[2px] bg-[#1B2E4F]">
          <div ref={bar} className="h-full origin-left scale-x-0 bg-[#4DA3FF]" />
        </div>
      </div>
    </div>
  );
}