import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        default: "#FFFDD0",
        primary: "#FF6347",
        secondary: "#32CD32",
        complement: "#FFA500",
        content: "#f8f9fa",
        ivory: "#FFFEEA",
        platinum: "#EAEAEA",
      },
    },
  },
  plugins: [],
};
export default config;
