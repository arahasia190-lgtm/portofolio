import { skills } from "../content";

export function Skills() {
  return (
    <section id="keahlian" aria-labelledby="judul-keahlian" className="border-t border-line">
      <div className="mx-auto max-w-[84rem] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <h2 id="judul-keahlian" className="display text-[clamp(2.6rem,8vw,5rem)]">
          Keahlian
        </h2>
        <div className="mt-12 grid gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
          <div>
            <h3 className="text-[1.3rem] font-[700]">Sudah dipakai di proyek</h3>
            <p className="mt-1 text-muted">{skills.usedIntro}</p>
            <ul className="mt-6 border-t border-line">
              {skills.used.map((s) => (
                <li key={s.name} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line py-3.5">
                  <span className="text-[1.25rem] font-[650] [font-stretch:90%]">{s.name}</span>
                  <span className="text-[0.95rem] text-muted">{s.where}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[1.3rem] font-[700]">Sedang dipelajari</h3>
            <p className="mt-1 text-muted">{skills.learningIntro}</p>
            <ul className="mt-6 space-y-6">
              {skills.learning.map((s) => (
                <li key={s.name} className="border-l-2 border-accent pl-4">
                  <span className="block text-[1.25rem] font-[650] [font-stretch:90%]">{s.name}</span>
                  <span className="block text-[0.98rem] text-muted">{s.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
