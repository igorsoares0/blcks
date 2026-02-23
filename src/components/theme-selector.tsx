"use client";

import { useState, useRef, useEffect } from "react";
import { themes, type Theme } from "@/lib/themes";
import { Button } from "@/components/ui/button";
import { Paintbrush } from "lucide-react";

interface ThemeSelectorProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export function ThemeSelector({
  currentTheme,
  onThemeChange,
}: ThemeSelectorProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 gap-2 text-xs"
        onClick={() => setOpen(!open)}
      >
        <Paintbrush className="h-3.5 w-3.5" />
        <span>{currentTheme.name}</span>
      </Button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 min-w-[140px] rounded-md border border-gray-200 bg-white p-1 shadow-md dark:border-gray-700 dark:bg-gray-900">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => {
                onThemeChange(theme);
                setOpen(false);
              }}
              className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <span className="flex gap-1">
                {theme.colorDots.map((color, i) => (
                  <span
                    key={i}
                    className="inline-block h-3.5 w-3.5 rounded-full border border-gray-200 dark:border-gray-700"
                    style={{ background: color }}
                  />
                ))}
              </span>
              <span>{theme.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
