export interface Theme {
  id: string;
  name: string;
  colors: Record<string, string>; // light mode CSS variable overrides
  colorsDark: Record<string, string>; // dark mode CSS variable overrides
  colorDots: string[]; // preview dots for the UI
}

/**
 * Expand theme colors to include both `--varname` and `--color-varname` variants.
 * Tailwind v4 uses `--color-*` variables in generated utility classes.
 */
function expandColors(colors: Record<string, string>): Record<string, string> {
  const expanded: Record<string, string> = {};
  for (const [key, value] of Object.entries(colors)) {
    expanded[key] = value;
    if (key.startsWith("--") && !key.startsWith("--color-")) {
      expanded[`--color-${key.slice(2)}`] = value;
    }
  }
  return expanded;
}

/**
 * Generate a full blue+purple palette remap for a given hue.
 * Many blocks hardcode `bg-blue-600`, `text-blue-400`, `from-purple-600`, etc.
 * In Tailwind v4 these use `var(--color-blue-600)`, so we can override them.
 */
function bluePurplePaletteRemap(hue: number): Record<string, string> {
  return {
    // Blue palette remap
    "--color-blue-50": `oklch(0.97 0.014 ${hue})`,
    "--color-blue-100": `oklch(0.932 0.032 ${hue})`,
    "--color-blue-200": `oklch(0.882 0.059 ${hue})`,
    "--color-blue-300": `oklch(0.809 0.105 ${hue})`,
    "--color-blue-400": `oklch(0.707 0.165 ${hue})`,
    "--color-blue-500": `oklch(0.623 0.214 ${hue})`,
    "--color-blue-600": `oklch(0.546 0.245 ${hue})`,
    "--color-blue-700": `oklch(0.488 0.243 ${hue})`,
    "--color-blue-800": `oklch(0.424 0.199 ${hue})`,
    "--color-blue-900": `oklch(0.379 0.146 ${hue})`,
    "--color-blue-950": `oklch(0.282 0.091 ${hue})`,
    // Purple palette remap (shift hue slightly for gradient variety)
    "--color-purple-50": `oklch(0.977 0.014 ${hue + 30})`,
    "--color-purple-100": `oklch(0.946 0.033 ${hue + 30})`,
    "--color-purple-200": `oklch(0.902 0.063 ${hue + 30})`,
    "--color-purple-300": `oklch(0.827 0.119 ${hue + 30})`,
    "--color-purple-400": `oklch(0.714 0.203 ${hue + 30})`,
    "--color-purple-500": `oklch(0.627 0.265 ${hue + 30})`,
    "--color-purple-600": `oklch(0.558 0.288 ${hue + 30})`,
    "--color-purple-700": `oklch(0.496 0.265 ${hue + 30})`,
    "--color-purple-800": `oklch(0.438 0.218 ${hue + 30})`,
    "--color-purple-900": `oklch(0.381 0.176 ${hue + 30})`,
    "--color-purple-950": `oklch(0.291 0.149 ${hue + 30})`,
    // Indigo palette (often used in gradients with blue)
    "--color-indigo-50": `oklch(0.962 0.018 ${hue + 15})`,
    "--color-indigo-100": `oklch(0.930 0.034 ${hue + 15})`,
    "--color-indigo-200": `oklch(0.870 0.065 ${hue + 15})`,
    "--color-indigo-300": `oklch(0.785 0.115 ${hue + 15})`,
    "--color-indigo-400": `oklch(0.673 0.182 ${hue + 15})`,
    "--color-indigo-500": `oklch(0.585 0.233 ${hue + 15})`,
    "--color-indigo-600": `oklch(0.511 0.262 ${hue + 15})`,
    "--color-indigo-700": `oklch(0.457 0.240 ${hue + 15})`,
    "--color-indigo-800": `oklch(0.398 0.195 ${hue + 15})`,
    "--color-indigo-900": `oklch(0.359 0.144 ${hue + 15})`,
    "--color-indigo-950": `oklch(0.257 0.09 ${hue + 15})`,
  };
}

export const themes: Theme[] = [
  {
    id: "default",
    name: "Default",
    colors: {},
    colorsDark: {},
    colorDots: ["oklch(0.205 0 0)", "oklch(0.97 0 0)"],
  },
  {
    id: "blue",
    name: "Blue",
    colors: expandColors({
      "--primary": "oklch(0.451 0.211 261.099)",
      "--primary-foreground": "oklch(0.985 0 0)",
      "--ring": "oklch(0.451 0.211 261.099)",
      "--accent": "oklch(0.932 0.032 255.585)",
      "--accent-foreground": "oklch(0.21 0.066 265.755)",
      "--secondary": "oklch(0.932 0.032 255.585)",
      "--secondary-foreground": "oklch(0.21 0.066 265.755)",
      "--chart-1": "oklch(0.488 0.243 264.376)",
      "--chart-2": "oklch(0.6 0.118 184.704)",
    }),
    colorsDark: expandColors({
      "--primary": "oklch(0.623 0.214 259.815)",
      "--primary-foreground": "oklch(0.145 0.03 260)",
      "--ring": "oklch(0.623 0.214 259.815)",
      "--accent": "oklch(0.269 0.049 260)",
      "--accent-foreground": "oklch(0.985 0.015 260)",
      "--secondary": "oklch(0.269 0.049 260)",
      "--secondary-foreground": "oklch(0.985 0.015 260)",
      "--chart-1": "oklch(0.623 0.214 259.815)",
      "--chart-2": "oklch(0.696 0.17 162.48)",
    }),
    colorDots: ["oklch(0.451 0.211 261.099)", "oklch(0.932 0.032 255.585)"],
  },
  {
    id: "rose",
    name: "Rose",
    colors: {
      ...expandColors({
        "--primary": "oklch(0.585 0.233 3.958)",
        "--primary-foreground": "oklch(0.985 0 0)",
        "--ring": "oklch(0.585 0.233 3.958)",
        "--accent": "oklch(0.95 0.03 10)",
        "--accent-foreground": "oklch(0.25 0.07 10)",
        "--secondary": "oklch(0.95 0.03 10)",
        "--secondary-foreground": "oklch(0.25 0.07 10)",
        "--chart-1": "oklch(0.585 0.233 3.958)",
        "--chart-2": "oklch(0.65 0.2 30)",
      }),
      ...bluePurplePaletteRemap(10),
    },
    colorsDark: {
      ...expandColors({
        "--primary": "oklch(0.7 0.21 5)",
        "--primary-foreground": "oklch(0.15 0.03 5)",
        "--ring": "oklch(0.7 0.21 5)",
        "--accent": "oklch(0.27 0.05 5)",
        "--accent-foreground": "oklch(0.985 0.015 5)",
        "--secondary": "oklch(0.27 0.05 5)",
        "--secondary-foreground": "oklch(0.985 0.015 5)",
        "--chart-1": "oklch(0.7 0.21 5)",
        "--chart-2": "oklch(0.65 0.2 30)",
      }),
      ...bluePurplePaletteRemap(10),
    },
    colorDots: ["oklch(0.585 0.233 3.958)", "oklch(0.95 0.03 10)"],
  },
  {
    id: "emerald",
    name: "Emerald",
    colors: {
      ...expandColors({
        "--primary": "oklch(0.531 0.176 155.215)",
        "--primary-foreground": "oklch(0.985 0 0)",
        "--ring": "oklch(0.531 0.176 155.215)",
        "--accent": "oklch(0.94 0.04 155)",
        "--accent-foreground": "oklch(0.22 0.06 155)",
        "--secondary": "oklch(0.94 0.04 155)",
        "--secondary-foreground": "oklch(0.22 0.06 155)",
        "--chart-1": "oklch(0.531 0.176 155.215)",
        "--chart-2": "oklch(0.6 0.118 184.704)",
      }),
      ...bluePurplePaletteRemap(155),
    },
    colorsDark: {
      ...expandColors({
        "--primary": "oklch(0.66 0.18 155)",
        "--primary-foreground": "oklch(0.145 0.03 155)",
        "--ring": "oklch(0.66 0.18 155)",
        "--accent": "oklch(0.27 0.05 155)",
        "--accent-foreground": "oklch(0.985 0.015 155)",
        "--secondary": "oklch(0.27 0.05 155)",
        "--secondary-foreground": "oklch(0.985 0.015 155)",
        "--chart-1": "oklch(0.66 0.18 155)",
        "--chart-2": "oklch(0.6 0.118 184.704)",
      }),
      ...bluePurplePaletteRemap(155),
    },
    colorDots: ["oklch(0.531 0.176 155.215)", "oklch(0.94 0.04 155)"],
  },
  {
    id: "amber",
    name: "Amber",
    colors: {
      ...expandColors({
        "--primary": "oklch(0.554 0.177 66.899)",
        "--primary-foreground": "oklch(0.985 0 0)",
        "--ring": "oklch(0.554 0.177 66.899)",
        "--accent": "oklch(0.95 0.04 70)",
        "--accent-foreground": "oklch(0.25 0.06 70)",
        "--secondary": "oklch(0.95 0.04 70)",
        "--secondary-foreground": "oklch(0.25 0.06 70)",
        "--chart-1": "oklch(0.554 0.177 66.899)",
        "--chart-2": "oklch(0.646 0.222 41.116)",
      }),
      ...bluePurplePaletteRemap(70),
    },
    colorsDark: {
      ...expandColors({
        "--primary": "oklch(0.68 0.19 68)",
        "--primary-foreground": "oklch(0.145 0.03 68)",
        "--ring": "oklch(0.68 0.19 68)",
        "--accent": "oklch(0.27 0.05 68)",
        "--accent-foreground": "oklch(0.985 0.015 68)",
        "--secondary": "oklch(0.27 0.05 68)",
        "--secondary-foreground": "oklch(0.985 0.015 68)",
        "--chart-1": "oklch(0.68 0.19 68)",
        "--chart-2": "oklch(0.646 0.222 41.116)",
      }),
      ...bluePurplePaletteRemap(70),
    },
    colorDots: ["oklch(0.554 0.177 66.899)", "oklch(0.95 0.04 70)"],
  },
];
