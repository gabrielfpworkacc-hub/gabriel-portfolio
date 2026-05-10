/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0D0D0D',
        accent: '#8B5E3C',
        'dark-surface': '#2A1A12',
        background: '#F5F1EA',
        highlight: '#B88A44',
        charcoal: '#0D0D0D',
        walnut: '#8B5E3C',
        espresso: '#2A1A12',
        offwhite: '#F5F1EA',
        gold: '#B88A44',
      },
      fontFamily: {
        heading: ['"Inter"', 'sans-serif'],
        drama: ['"Playfair Display"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        '2xl': '2rem',
        '3xl': '3rem',
        '4xl': '4rem',
      },
      letterSpacing: {
        'tight-custom': '-0.02em',
        'tighter-custom': '-0.04em',
      },
    },
  },
  plugins: [],
};
