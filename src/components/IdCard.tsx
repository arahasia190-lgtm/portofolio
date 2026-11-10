import { forwardRef } from "react";
import { profile } from "../content";

/** Isi kartu ID. Posisi dan rotasinya diatur oleh Lanyard. */
export const IdCard = forwardRef<HTMLDivElement, { className?: string }>(function IdCard({ className = "" }, ref) {
  return (
    <div
      ref={ref}
      className={`relative w-[13.25rem] rounded-[16px] border border-line bg-surface p-3 pt-9 text-ink sm:w-[15rem] lg:w-[18rem] lg:p-4 lg:pt-10 ${className}`}
      style={{
        boxShadow: "var(--shadow)",
        WebkitMaskImage: "radial-gradient(circle 7px at 50% 17px, transparent 96%, #000 100%)",
        maskImage: "radial-gradient(circle 7px at 50% 17px, transparent 96%, #000 100%)",
      }}
    >
      <div className="absolute inset-x-3 top-3 flex items-center justify-between text-[0.66rem] leading-none text-muted lg:inset-x-4 lg:text-[0.72rem]">
        <span>Kartu pelajar</span>
        <span>{profile.grade}</span>
      </div>
      <div className="overflow-hidden rounded-[10px] bg-line">
        <img
          src="/foto.webp"
          width={960}
          height={1200}
          alt={profile.photoAlt}
          fetchPriority="high"
          decoding="async"
          draggable={false}
          className="aspect-[10/11] w-full object-cover object-[50%_22%]"
        />
      </div>
      <p className="mt-3 text-[1.2rem] leading-[1.05] font-[720] [font-stretch:85%] lg:text-[1.45rem]">{profile.fullName}</p>
      <p className="mt-1.5 text-[0.82rem] leading-snug lg:text-[0.9rem]">{profile.major}</p>
      <p className="text-[0.82rem] leading-snug text-muted lg:text-[0.9rem]">
        {profile.grade}, {profile.school}
      </p>
      <div className="mt-3 flex items-end justify-between gap-3 border-t border-line pt-2.5">
        <span className="font-mono text-[0.7rem] text-muted lg:text-[0.76rem]">{profile.studentId}</span>
        <span
          aria-hidden="true"
          className="h-6 w-20 text-ink lg:h-7 lg:w-24"
          style={{
            background:
              "repeating-linear-gradient(90deg, currentColor 0 2px, transparent 2px 3px, currentColor 3px 4px, transparent 4px 6px, currentColor 6px 9px, transparent 9px 10px, currentColor 10px 11px, transparent 11px 14px)",
          }}
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1.5 rounded-b-[16px] bg-accent" aria-hidden="true" />
    </div>
  );
});
