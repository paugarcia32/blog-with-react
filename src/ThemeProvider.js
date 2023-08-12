import React, { createContext, useContext, useEffect, useState } from "react";
import sunIcon from "./Assets/sun.png";
import moonIcon from "./Assets/moon.png";
import darkLogo from "./Assets/logo-dark-theme.png";
import lightLogo from "./Assets/logo-light-theme.png";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    localStorage.getItem("selectedTheme") || "light"
  );
  const logoUrl = theme === "dark" ? darkLogo : lightLogo;

  const setDarkMode = () => {
    setTheme("dark");
    document.querySelector("body").setAttribute("data-theme", "dark");
    localStorage.setItem("selectedTheme", "dark");
  };

  const setLightMode = () => {
    setTheme("light");
    document.querySelector("body").setAttribute("data-theme", "light");
    localStorage.setItem("selectedTheme", "light");
  };

  const toggleTheme = () => {
    if (theme === "dark") {
      setLightMode();
    } else {
      setDarkMode();
    }
  };

  useEffect(() => {
    const icon = document.getElementById("icon");
    if (theme === "dark") {
      icon.src = sunIcon;
    } else {
      icon.src = moonIcon;
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, logoUrl }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
