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
          primary: "#0055ff",

          secondary: "#00aaa6",

          accent: "#00ffa1",

          neutral: "#132f25",

          "base-100": "#fefaff",

          info: "#0089f2",

          success: "#009e00",

          warning: "#d13500",

          error: "#ff324a",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
} satisfies Config;
