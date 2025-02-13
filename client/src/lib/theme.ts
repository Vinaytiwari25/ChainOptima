import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  theme: "dark" | "light";
  setTheme: (theme: "dark" | "light") => void;
}

export const useTheme = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "dark",
      setTheme: (theme) => {
        set({ theme });
        if (theme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      },
    }),
    {
      name: "theme-storage",
    }
  )
);

// Initialize theme on app load
if (typeof window !== "undefined") {
  const theme = useTheme.getState().theme;
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  }
}
