import { journey } from "../content";

export function Journey() {
  return (
    <section id="perjalanan" aria-labelledby="judul-perjalanan" className="border-t border-line">
      <div className="mx-auto max-w-[84rem] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <h2 id="judul-perjalanan" className="display max-w-[14ch] text-[clamp(2.6rem,8vw,5rem)]">
          Perjalanan kelas 10 sampai 12
        </h2>
        <ol className="mt-12 lg:mt-16">
          {journey.map((j, i) => (
            <li key={j.grade} className="relative grid gap-2 pb-12 pl-8 last:pb-0 md:grid-cols-[14rem_1fr] md:gap-10 md:pl-10">
              {i < journey.length - 1 && (
                <span className="absolute top-3 bottom-0 left-[5px] w-px bg-line" aria-hidden="true" />
              )}
              <span className="absolute top-2 left-0 h-[11px] w-[11px] rounded-full bg-accent" aria-hidden="true" />
              <div>
                <p className="text-[1.6rem] leading-tight font-[720] [font-stretch:85%]">{j.grade}</p>
                <p className="text-[0.95rem] text-muted">{j.period}</p>
              </div>
              <div className="max-w-[40rem]">
                <h3 className="text-[1.2rem] font-[680]">{j.title}</h3>
                <p className="mt-1.5 text-muted">{j.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
