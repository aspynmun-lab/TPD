"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

/** Toggles [data-theme] on <html>. Dark is the default. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const current = (document.documentElement.getAttribute("data-theme") as Theme) || "dark";
    setTheme(current);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("tpd-theme", next); } catch {}
    setTheme(next);
  }

  return (
    <button className="theme-toggle type-d1" onClick={toggle} aria-label="Toggle color theme">
      <span aria-hidden>{theme === "dark" ? "🌙" : "☀️"}</span>
      <span>{theme === "dark" ? "Dark" : "Light"}</span>
    </button>
  );
}
