import { useEffect, useRef } from "react";
import gsap from "gsap";
import { profile } from "../content";
import { prefersReducedMotion } from "../lib/motion";
import { Lanyard } from "./Lanyard";

export function Hero({ start }: { start: boolean }) {
  const text = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = text.current;
    if (!el || !start) return;
    const items = el.querySelectorAll<HTMLElement>("[data-masuk]");
    if (prefersReducedMotion()) {
      gsap.set(items, { autoAlpha: 1 });
      return;
    }
    // Teks masuk setelah kartu jatuh dan memantul pertama kali.
    const tween = gsap.fromTo(
      items,
      { autoAlpha: 0, y: 26 },
      { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.12, delay: 0.95, clearProps: "transform" },
    );
    return () => {
      tween.kill();
    };
  }, [start]);

  return (
    <section
      id="beranda"
      aria-labelledby="judul-hero"
      className="relative touch-pan-y"
      style={{
        background:
          "radial-gradient(120% 70% at 78% 0%, var(--glow), transparent 60%), radial-gradient(80% 50% at 0% 100%, var(--glow), transparent 70%)",
      }}
    >
      <div className="mx-auto grid max-w-[84rem] lg:min-h-svh lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative h-[33rem] sm:h-[36rem] lg:order-2 lg:h-auto lg:min-h-[44rem]">
          <Lanyard start={start} />
        </div>

        <div ref={text} className="px-5 pb-20 sm:px-8 lg:order-1 lg:self-center lg:px-12 lg:pt-28 lg:pb-24">
          {profile.status && (
            <p data-masuk className="invisible mb-6 inline-flex items-center gap-2.5 rounded-full border border-line px-3.5 py-1.5 text-[0.95rem]">
              <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
              {profile.status}
            </p>
          )}
          <h1
            id="judul-hero"
            data-masuk
            className="display invisible text-[clamp(3.1rem,13.5vw,7.4rem)] [text-wrap:balance]"
          >
            {profile.fullName}
          </h1>
          <p data-masuk className="invisible mt-6 text-[1.08rem] font-[600] sm:text-[1.2rem]">
            Siswa {profile.grade.toLowerCase()} {profile.major} di {profile.school}.
          </p>
          <p data-masuk className="invisible mt-3 max-w-[36rem] text-[1.08rem] text-muted sm:text-[1.15rem]">
            {profile.tagline}
          </p>
          <div data-masuk className="invisible mt-9 flex flex-wrap gap-3">
            <a
              href="#proyek"
              className="rounded-full bg-accent px-6 py-3 text-[1rem] font-[650] text-on-accent hover:bg-ink hover:text-bg"
            >
              Lihat proyek
            </a>
            <a href="#kontak" className="rounded-full border border-ink/25 px-6 py-3 text-[1rem] font-[650] hover:border-ink">
              Hubungi saya
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
