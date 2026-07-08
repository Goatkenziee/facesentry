import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(240 10% 3.9%)",
        foreground: "hsl(0 0% 98%)",
        card: "hsl(240 10% 5.9%)",
        "card-foreground": "hsl(0 0% 98%)",
        popover: "hsl(240 10% 5.9%)",
        "popover-foreground": "hsl(0 0% 98%)",
        primary: "hsl(217 91% 60%)",
        "primary-foreground": "hsl(0 0% 100%)",
        secondary: "hsl(240 4% 16%)",
        "secondary-foreground": "hsl(0 0% 98%)",
        muted: "hsl(240 4% 16%)",
        "muted-foreground": "hsl(240 5% 65%)",
        accent: "hsl(240 4% 16%)",
        "accent-foreground": "hsl(0 0% 98%)",
        destructive: "hsl(0 63% 50%)",
        "destructive-foreground": "hsl(0 0% 100%)",
        border: "hsl(240 4% 16%)",
        input: "hsl(240 4% 16%)",
        ring: "hsl(217 91% 60%)",
        success: "hsl(142 71% 45%)",
        warning: "hsl(38 92% 50%)",
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        "pulse-scan": "pulse-scan 2s ease-in-out infinite",
      },
      keyframes: {
        "pulse-scan": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
