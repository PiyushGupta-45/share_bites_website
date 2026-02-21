/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#256d4a',
        accent: '#de6a3a',
        ink: '#1f2937',
      },
      boxShadow: {
        soft: '0 12px 30px rgba(13, 38, 24, 0.12)',
      },
    },
  },
  plugins: [],
};
