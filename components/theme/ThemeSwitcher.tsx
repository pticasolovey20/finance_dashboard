"use client";

import { useTheme } from "next-themes";

import { Switch } from "@/components/ui/switch";

const ThemeSwitcher = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const isDarkTheme = resolvedTheme === "dark";

  const toggleTheme = () => setTheme(isDarkTheme ? "light" : "dark");

  return (
    <div className="flex items-center gap-4">
      <span>Light</span>

      <Switch
        aria-label="theme switcher"
        checked={isDarkTheme}
        onCheckedChange={toggleTheme}
      />

      <span>Dark</span>
    </div>
  );
};

export default ThemeSwitcher;
