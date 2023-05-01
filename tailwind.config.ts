import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('tailwindcss-debug-screens')
  ],
    variants: {
        scrollbar: ['rounded']
    }
} satisfies Config;
