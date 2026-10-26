"use client";

import { useLayoutEffect } from "react";
import { Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/primitives/Icon";

const STORAGE_KEY = "rklt-theme";

type Theme = "night" | "day";

function readTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "night" || stored === "day") return stored;
  } catch {
    return "night";
  }

  try {
    if (window.matchMedia("(prefers-color-scheme: light)").matches) return "day";
    return "night";
  } catch {
    return "night";
  }
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  root.style.colorScheme = theme === "day" ? "light" : "dark";
}

interface ThemeToggleProps {
  locale: Locale;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  locale,
  className,
}) => {
  useLayoutEffect(() => {
    applyTheme(readTheme());
  }, []);

  const switchTheme = () => {
    const current =
      document.documentElement.getAttribute("data-theme") === "day"
        ? "day"
        : "night";
    const next: Theme = current === "day" ? "night" : "day";
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // The attribute still updates for this view.
    }
    applyTheme(next);
  };

  const toDay = locale === "ar" ? "نهار" : "Day";
  const toNight = locale === "ar" ? "ليل" : "Night";

  return (
    <button
      type="button"
      onClick={switchTheme}
      className={cn(
        "rklt-theme-toggle inline-flex h-10 w-10 items-center justify-center bg-transparent text-sand-100/80 transition-colors duration-300 hover:text-sand-100",
        className
      )}
    >
      <span className="rklt-theme-to-day">
        <Icon name="sun" size={17} aria-hidden="true" />
        <span className="sr-only">{toDay}</span>
      </span>
      <span className="rklt-theme-to-night">
        <Icon name="moon" size={17} aria-hidden="true" />
        <span className="sr-only">{toNight}</span>
      </span>
    </button>
  );
};
