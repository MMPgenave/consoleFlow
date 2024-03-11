"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

const ThemeProvider = ({
  children,
}: {
  // eslint-disable-next-line no-undef
  children: ReactNode;
}) => {
  const [mode, setMode] = useState("");

  function setAppTheme() {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme:dark)").matches)
    ) {
      setMode("dark");
      document.documentElement.classList.add("dark");
    } else {
      setMode("light");
      document.documentElement.classList.remove("dark");
    }
  }

  useEffect(() => {
    setAppTheme();
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
export function useTheme() {
  return useContext(ThemeContext);
}
