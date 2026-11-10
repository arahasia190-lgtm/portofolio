import { profile } from "../content";
import type { Theme } from "../lib/theme";

const nav = [
  { href: "#keahlian", label: "Keahlian" },
  { href: "#proyek", label: "Proyek" },
  { href: "#perjalanan", label: "Perjalanan" },
  { href: "#kontak", label: "Kontak" },
];

export function Header({ theme, onToggle }: { theme: Theme; onToggle: () => void }) {
  const dark = theme === "gelap";
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-[84rem] items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12">
        <a href="#beranda" className="text-[1.15rem] font-[700] [font-stretch:85%]">
          {profile.nickname}
        </a>
        <nav aria-label="Navigasi utama" className="hidden md:block">
          <ul className="flex gap-7 text-[0.98rem]">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="hover:text-muted">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          onClick={onToggle}
          aria-label={dark ? "Ganti ke mode terang" : "Ganti ke mode gelap"}
          className="flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-2 text-[0.92rem]"
        >
          {dark ? <SunIcon /> : <MoonIcon />}
          <span>{dark ? "Terang" : "Gelap"}</span>
        </button>
      </div>
    </header>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
