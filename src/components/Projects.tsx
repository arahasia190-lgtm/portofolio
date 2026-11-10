import { projects } from "../content";

export function Projects() {
  return (
    <section id="proyek" aria-labelledby="judul-proyek" className="border-t border-line bg-surface">
      <div className="mx-auto max-w-[84rem] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <h2 id="judul-proyek" className="display text-[clamp(2.6rem,8vw,5rem)]">
          Proyek
        </h2>
        <div className="mt-12 space-y-20 lg:mt-16 lg:space-y-32">
          {projects.map((p, i) => (
            <article
              key={p.title}
              aria-labelledby={`proyek-${i}`}
              className="grid gap-7 lg:grid-cols-12 lg:items-center lg:gap-12"
            >
              <figure className={`lg:col-span-7 ${i % 2 ? "lg:order-2" : ""}`}>
                <img
                  src={p.image}
                  alt={p.imageAlt}
                  width={1200}
                  height={750}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/10] w-full rounded-[10px] border border-line bg-bg object-cover"
                />
              </figure>
              <div className="lg:col-span-5">
                <p className="text-[0.98rem] text-muted">
                  {p.kind} · {p.year}
                </p>
                <h3 id={`proyek-${i}`} className="display mt-2 text-[clamp(2.3rem,6.5vw,4.2rem)]">
                  {p.title}
                </h3>
                <p className="mt-5">{p.problem}</p>
                <p className="mt-3">{p.solution}</p>
                <dl className="mt-6 grid gap-3 border-t border-line pt-5 text-[0.98rem] sm:grid-cols-[6rem_1fr]">
                  <dt className="text-muted">Peran</dt>
                  <dd>{p.role}</dd>
                  <dt className="text-muted">Stack</dt>
                  <dd>{p.stack.join(", ")}</dd>
                </dl>
                {(p.demoUrl || p.repoUrl) && (
                  <p className="mt-6 flex flex-wrap gap-x-7 gap-y-2 font-[650]">
                    {p.demoUrl && (
                      <a href={p.demoUrl} target="_blank" rel="noreferrer" className="link-line">
                        Buka demo<span className="sr-only"> {p.title} (tab baru)</span>
                      </a>
                    )}
                    {p.repoUrl && (
                      <a href={p.repoUrl} target="_blank" rel="noreferrer" className="link-line">
                        Kode di GitHub<span className="sr-only"> {p.title} (tab baru)</span>
                      </a>
                    )}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
