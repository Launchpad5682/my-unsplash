import React, { useState, useEffect } from "react";

function useTheme() {
  const [theme, setTheme] = useState("dark");
  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add(theme);
  }, [theme]);

  return [colorTheme, setTheme];
}

export default useTheme;
