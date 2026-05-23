import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gfg: {
          green:      "#00895e",
          ocean:      "#3ab284",
          navy:       "#105d95",
          blue:       "#016ccc",
          lime:       "#00895e",
          orange:     "#FF9843",
          periwinkle: "#7D94F9",
          black:      "#0A0E0F",
          gray:       "#E9E9EA",
          white:      "#F5F5F7",
          lightgreen: "#f1f8f5",
          lightgreen2:"#d5f6e4",
          lightblue:  "#ecfcff",
          darkgreen:  "#0e201b",
        },
        // Semantic tokens — resolve to CSS vars
        base:      "var(--bg-base)",
        surface:   "var(--bg-surface)",
        raised:    "var(--bg-raised)",
        overlay:   "var(--bg-overlay)",
        primary:   "var(--text-primary)",
        secondary: "var(--text-secondary)",
        muted:     "var(--text-muted)",
        faint:     "var(--text-faint)",
      },
      backgroundColor: {
        base:    "var(--bg-base)",
        surface: "var(--bg-surface)",
        raised:  "var(--bg-raised)",
        overlay: "var(--bg-overlay)",
        card:    "var(--card-bg)",
      },
      textColor: {
        primary:   "var(--text-primary)",
        secondary: "var(--text-secondary)",
        muted:     "var(--text-muted)",
        faint:     "var(--text-faint)",
      },
      borderColor: {
        theme:       "var(--border)",
        "theme-strong": "var(--border-strong)",
      },
      fontFamily: {
        sans: ['"Source Sans 3"', "sans-serif"],
        body: ['"Source Sans 3"', "sans-serif"],
        alt:  ['"Source Sans 3"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
