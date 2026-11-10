import { useCallback, useEffect, useState } from "react";

export type Theme = "terang" | "gelap";
const KEY = "tema";

function current(): Theme {
  return document.documentElement.dataset.theme === "gelap" ? "gelap" : "terang";
}

function stored(): Theme | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === "terang" || v === "gelap" ? v : null;
  } catch {
    return null;
  }
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(current);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // Selama pengguna belum memilih sendiri, ikuti pengaturan sistem.
  useEffect(() => {
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (!stored()) setTheme(mq.matches ? "gelap" : "terang");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = useCallback(() => {
    setTheme((t) => {
      const next: Theme = t === "gelap" ? "terang" : "gelap";
      try {
        localStorage.setItem(KEY, next);
      } catch {
        /* abaikan */
      }
      return next;
    });
  }, []);

  return { theme, toggle };
}
