import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#67e8f9",

          secondary: "#bae6fd",

          accent: "#d8b4fe",

          neutral: "#292524",

          "base-100": "#fff9ef",

          info: "#00ccff",

          success: "#00de88",

          warning: "#f43f5e",

          error: "#ff658e",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
} satisfies Config;
