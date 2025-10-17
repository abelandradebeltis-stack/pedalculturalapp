
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'jardim-noturno': '#586453',
        'cinza-asfalto': '#6b6a68',
        'cinza-urbano': '#C3C1BA',
        'uniforme-escolar': '#597B99',
        'patativa': '#4a4a4a',
        'rosa-carinho': '#EBCED0',
        'whitesmoke-20': '#F5F5F533',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
