import { useEffect, useRef, useState } from "react";
import { createLanyard, type Lanyard as Sim, type LanyardFrame } from "../lib/lanyard";
import { isLowEndDevice, prefersReducedMotion } from "../lib/motion";
import { profile } from "../content";
import { IdCard } from "./IdCard";

const ANCHOR_Y = -14;
type Mode = "waiting" | "physics" | "static";
type Vec = { x: number; y: number };

function layout(area: HTMLElement, card: HTMLElement) {
  const width = area.clientWidth;
  const height = area.clientHeight;
  const cardWidth = card.offsetWidth;
  const cardHeight = card.offsetHeight;
  const desktop = width >= 480 && height >= 700;
  const want = desktop ? Math.min(230, height * 0.24) : 96;
  const ropeLength = Math.max(56, Math.min(want, height - cardHeight - 40 - ANCHOR_Y));
  return { width, height, cardWidth, cardHeight, ropeLength, anchor: { x: width / 2, y: ANCHOR_Y } };
}

function restFrame(l: ReturnType<typeof layout>): LanyardFrame {
  const rope: Vec[] = [];
  for (let i = 0; i <= 7; i++) rope.push({ x: l.anchor.x, y: l.anchor.y + (l.ropeLength * i) / 7 });
  return { rope, card: { x: l.anchor.x, y: l.anchor.y + l.ropeLength + l.cardHeight / 2, angle: 0 } };
}

function ropePath(p: Vec[]) {
  let d = `M${p[0].x.toFixed(1)} ${p[0].y.toFixed(1)}`;
  for (let i = 1; i < p.length - 1; i++) {
    const mx = (p[i].x + p[i + 1].x) / 2;
    const my = (p[i].y + p[i + 1].y) / 2;
    d += ` Q${p[i].x.toFixed(1)} ${p[i].y.toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`;
  }
  const last = p[p.length - 1];
  return `${d} L${last.x.toFixed(1)} ${last.y.toFixed(1)}`;
}

export function Lanyard({ start }: { start: boolean }) {
  const area = useRef<HTMLDivElement>(null);
  const rig = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const [mode, setMode] = useState<Mode>(() =>
    prefersReducedMotion() || isLowEndDevice() ? "static" : "waiting",
  );

  const draw = (f: LanyardFrame, cw: number, ch: number) => {
    if (rig.current) {
      rig.current.style.transform = `translate3d(${(f.card.x - cw / 2).toFixed(2)}px, ${(f.card.y - ch / 2).toFixed(2)}px, 0) rotate(${f.card.angle.toFixed(4)}rad)`;
      rig.current.style.visibility = "visible";
    }
    path.current?.setAttribute("d", ropePath(f.rope));
  };

  // Kartu statis: tergantung lurus tanpa fisika.
  useEffect(() => {
    if (mode !== "static" || !area.current || !card.current) return;
    const a = area.current;
    const c = card.current;
    const place = () => {
      const l = layout(a, c);
      draw(restFrame(l), l.cardWidth, l.cardHeight);
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(a);
    return () => ro.disconnect();
  }, [mode]);

  useEffect(() => {
    if (mode === "static") return;
    if (!start) return;
    const a = area.current;
    const c = card.current;
    const r = rig.current;
    if (!a || !c || !r) return;

    let disposed = false;
    let sim: Sim | null = null;
    let raf = 0;
    let last = 0;
    let running = false;
    let onScreen = true;
    let frames = 0;
    let slowTime = 0;
    let dims = layout(a, c);
    let make: ((drop: boolean) => void) | null = null;
    let lastWidth = dims.width;

    const loop = (now: number) => {
      if (!sim) return;
      const dt = last ? now - last : 16.7;
      last = now;
      // Deteksi perangkat lambat di detik-detik awal.
      if (frames < 90) {
        frames += 1;
        slowTime += dt;
        if (frames === 90 && slowTime / 90 > 42) {
          stop();
          setMode("static");
          return;
        }
      }
      sim.step(dt);
      draw(sim.frame(), dims.cardWidth, dims.cardHeight);
      raf = requestAnimationFrame(loop);
    };

    const play = () => {
      if (running || disposed || !sim || document.hidden || !onScreen) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const local = (e: PointerEvent): Vec => {
      const rect = a.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onDown = (e: PointerEvent) => {
      if (!sim || (e.pointerType === "mouse" && e.button !== 0)) return;
      c.setPointerCapture(e.pointerId);
      sim.grab(local(e));
      document.documentElement.classList.add("dragging");
      window.getSelection()?.removeAllRanges();
      play();
    };
    const onMove = (e: PointerEvent) => {
      if (sim?.isDragging()) sim.move(local(e));
    };
    const onUp = (e: PointerEvent) => {
      if (c.hasPointerCapture(e.pointerId)) c.releasePointerCapture(e.pointerId);
      sim?.release();
      document.documentElement.classList.remove("dragging");
    };

    const onVisibility = () => (document.hidden ? stop() : play());
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) play();
      else stop();
    });
    const ro = new ResizeObserver(() => {
      if (!make || Math.abs(a.clientWidth - lastWidth) < 2) return;
      lastWidth = a.clientWidth;
      make(false);
    });

    import("matter-js")
      .then(({ default: Matter }) => {
        if (disposed) return;
        make = (drop: boolean) => {
          sim?.destroy();
          dims = layout(a, c);
          sim = createLanyard(Matter, { ...dims, drop });
          setMode("physics");
          play();
        };
        make(true);
        c.addEventListener("pointerdown", onDown);
        c.addEventListener("pointermove", onMove);
        c.addEventListener("pointerup", onUp);
        c.addEventListener("pointercancel", onUp);
        document.addEventListener("visibilitychange", onVisibility);
        io.observe(a);
        ro.observe(a);
      })
      .catch(() => {
        if (!disposed) setMode("static");
      });

    return () => {
      disposed = true;
      stop();
      sim?.destroy();
      sim = null;
      io.disconnect();
      ro.disconnect();
      c.removeEventListener("pointerdown", onDown);
      c.removeEventListener("pointermove", onMove);
      c.removeEventListener("pointerup", onUp);
      c.removeEventListener("pointercancel", onUp);
      document.removeEventListener("visibilitychange", onVisibility);
      document.documentElement.classList.remove("dragging");
    };
  }, [start, mode === "static"]);

  const strapText = `${profile.school} · ${profile.major} · `.repeat(6);

  return (
    <div ref={area} className="absolute inset-0">
      <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        <path
          id="tali-lanyard"
          ref={path}
          d=""
          fill="none"
          stroke="var(--accent)"
          strokeWidth={15}
          strokeLinejoin="round"
        />
        <text
          fill="var(--on-accent)"
          fontSize={8.5}
          fontWeight={600}
          dominantBaseline="central"
          letterSpacing="0.04em"
        >
          <textPath href="#tali-lanyard">{strapText}</textPath>
        </text>
      </svg>

      <div
        ref={rig}
        className="absolute top-0 left-0 will-change-transform"
        style={{ visibility: "hidden", transform: "translate3d(0,-200vh,0)" }}
      >
        <div
          aria-hidden="true"
          className="absolute -top-[20px] left-1/2 z-10 h-[46px] w-[22px] -translate-x-1/2"
        >
          <div className="mx-auto h-[20px] w-[18px] rounded-[4px] border border-[#8EA0B8] bg-[linear-gradient(90deg,#C9D3E0,#F4F7FB_45%,#AEBBCB)]" />
          <div className="mx-auto -mt-[3px] h-[24px] w-[14px] rounded-full border-[3px] border-[#9AABC0]" />
        </div>
        <IdCard
          ref={card}
          className={mode === "physics" ? "cursor-grab touch-none select-text" : ""}
        />
      </div>
    </div>
  );
}

