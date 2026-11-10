import { useCallback, useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Intro } from "./components/Intro";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Journey } from "./components/Journey";
import { Contact } from "./components/Contact";
import { introSeen } from "./lib/motion";
import { useTheme } from "./lib/theme";

export default function App() {
  const { theme, toggle } = useTheme();
  const [showIntro, setShowIntro] = useState(() => !introSeen());
  const [revealed, setRevealed] = useState(() => !showIntro);

  const onReveal = useCallback(() => setRevealed(true), []);
  const onDone = useCallback(() => setShowIntro(false), []);

  return (
    <>
      {showIntro && <Intro onReveal={onReveal} onDone={onDone} />}
      <div inert={showIntro}>
        <a href="#isi" className="skip-link rounded-full bg-accent px-4 py-2 font-[650] text-on-accent">
          Langsung ke isi
        </a>
        <Header theme={theme} onToggle={toggle} />
        <main id="isi">
          <Hero start={revealed} />
          <Skills />
          <Projects />
          <Journey />
          <Contact />
        </main>
      </div>
    </>
  );
}
