export interface Theme {
  id: string;
  name: string;
  colors: Record<string, string>; // light mode CSS variable overrides
  colorsDark: Record<string, string>; // dark mode CSS variable overrides
  colorDots: string[]; // preview dots for the UI
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
    colors: {
      "--primary": "oklch(0.451 0.211 261.099)",
      "--primary-foreground": "oklch(0.985 0 0)",
      "--ring": "oklch(0.451 0.211 261.099)",
      "--accent": "oklch(0.932 0.032 255.585)",
      "--accent-foreground": "oklch(0.21 0.066 265.755)",
      "--secondary": "oklch(0.932 0.032 255.585)",
      "--secondary-foreground": "oklch(0.21 0.066 265.755)",
      "--chart-1": "oklch(0.488 0.243 264.376)",
      "--chart-2": "oklch(0.6 0.118 184.704)",
    },
    colorsDark: {
      "--primary": "oklch(0.623 0.214 259.815)",
      "--primary-foreground": "oklch(0.145 0.03 260)",
      "--ring": "oklch(0.623 0.214 259.815)",
      "--accent": "oklch(0.269 0.049 260)",
      "--accent-foreground": "oklch(0.985 0.015 260)",
      "--secondary": "oklch(0.269 0.049 260)",
      "--secondary-foreground": "oklch(0.985 0.015 260)",
      "--chart-1": "oklch(0.623 0.214 259.815)",
      "--chart-2": "oklch(0.696 0.17 162.48)",
    },
    colorDots: ["oklch(0.451 0.211 261.099)", "oklch(0.932 0.032 255.585)"],
  },
  {
    id: "rose",
    name: "Rose",
    colors: {
      "--primary": "oklch(0.585 0.233 3.958)",
      "--primary-foreground": "oklch(0.985 0 0)",
      "--ring": "oklch(0.585 0.233 3.958)",
      "--accent": "oklch(0.95 0.03 10)",
      "--accent-foreground": "oklch(0.25 0.07 10)",
      "--secondary": "oklch(0.95 0.03 10)",
      "--secondary-foreground": "oklch(0.25 0.07 10)",
      "--chart-1": "oklch(0.585 0.233 3.958)",
      "--chart-2": "oklch(0.65 0.2 30)",
    },
    colorsDark: {
      "--primary": "oklch(0.7 0.21 5)",
      "--primary-foreground": "oklch(0.15 0.03 5)",
      "--ring": "oklch(0.7 0.21 5)",
      "--accent": "oklch(0.27 0.05 5)",
      "--accent-foreground": "oklch(0.985 0.015 5)",
      "--secondary": "oklch(0.27 0.05 5)",
      "--secondary-foreground": "oklch(0.985 0.015 5)",
      "--chart-1": "oklch(0.7 0.21 5)",
      "--chart-2": "oklch(0.65 0.2 30)",
    },
    colorDots: ["oklch(0.585 0.233 3.958)", "oklch(0.95 0.03 10)"],
  },
  {
    id: "emerald",
    name: "Emerald",
    colors: {
      "--primary": "oklch(0.531 0.176 155.215)",
      "--primary-foreground": "oklch(0.985 0 0)",
      "--ring": "oklch(0.531 0.176 155.215)",
      "--accent": "oklch(0.94 0.04 155)",
      "--accent-foreground": "oklch(0.22 0.06 155)",
      "--secondary": "oklch(0.94 0.04 155)",
      "--secondary-foreground": "oklch(0.22 0.06 155)",
      "--chart-1": "oklch(0.531 0.176 155.215)",
      "--chart-2": "oklch(0.6 0.118 184.704)",
    },
    colorsDark: {
      "--primary": "oklch(0.66 0.18 155)",
      "--primary-foreground": "oklch(0.145 0.03 155)",
      "--ring": "oklch(0.66 0.18 155)",
      "--accent": "oklch(0.27 0.05 155)",
      "--accent-foreground": "oklch(0.985 0.015 155)",
      "--secondary": "oklch(0.27 0.05 155)",
      "--secondary-foreground": "oklch(0.985 0.015 155)",
      "--chart-1": "oklch(0.66 0.18 155)",
      "--chart-2": "oklch(0.6 0.118 184.704)",
    },
    colorDots: ["oklch(0.531 0.176 155.215)", "oklch(0.94 0.04 155)"],
  },
];
