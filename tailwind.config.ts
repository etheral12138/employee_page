import { heroui } from "@heroui/react";

import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "spin-logo": "spin 20s linear infinite",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
} satisfies Config;
