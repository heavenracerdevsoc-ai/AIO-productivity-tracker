import React, { useEffect, useState } from "react";

const THEME_KEY = "theme";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || "dark");

  useEffect(() => {
    const html = document.documentElement;
    if (theme === "light") {
      html.classList.add("light");
    } else {
      html.classList.remove("light");
    }
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  return (
    <button onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))} style={{ padding: "6px 10px", borderRadius: 6, border: "none", cursor: "pointer", background: "transparent", color: "var(--text)" }}>
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};

export default ThemeToggle;
