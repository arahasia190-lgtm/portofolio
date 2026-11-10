import { contact, profile } from "../content";

export function Contact() {
  const links = [
    { label: "WhatsApp", href: contact.whatsappUrl, text: contact.whatsappLabel },
    { label: "GitHub", href: contact.githubUrl, text: contact.githubLabel },
    { label: "Toko/LinkedIn", href: contact.linkedinUrl, text: contact.linkedinLabel },
  ].filter((l) => l.href);

  return (
    <>
      <section id="kontak" aria-labelledby="judul-kontak" className="border-t border-line bg-surface">
        <div className="mx-auto max-w-[84rem] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <h2 id="judul-kontak" className="display max-w-[16ch] text-[clamp(2.6rem,8vw,5rem)]">
            {contact.heading}
          </h2>
          <p className="mt-5 max-w-[34rem] text-[1.1rem] text-muted">{contact.text}</p>
          <a
            href={`mailto:${contact.email}`}
            className="link-line mt-10 inline-block text-[clamp(1.6rem,6.5vw,3.4rem)] leading-tight font-[700] [font-stretch:85%] break-all"
          >
            {contact.email}
          </a>
          <dl className="mt-12 grid max-w-[46rem] border-t border-line sm:grid-cols-3">
            {links.map((l) => (
              <div key={l.label} className="border-b border-line py-4 sm:border-b-0 sm:pr-6">
                <dt className="text-[0.95rem] text-muted">{l.label}</dt>
                <dd className="mt-1">
                  <a href={l.href} target="_blank" rel="noreferrer" className="link-line font-[620] break-words">
                    {l.text}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-[84rem] flex-wrap justify-between gap-2 px-5 py-8 text-[0.95rem] text-muted sm:px-8 lg:px-12">
          <p>
            © {new Date().getFullYear()} {profile.fullName}
          </p>
          <p>Dibuat dengan React & Tailwind CSS.</p>
        </div>
      </footer>
    </>
  );
}
