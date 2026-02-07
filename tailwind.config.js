/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        paper: 'var(--paper)',
        chalk: 'var(--chalk)',
        muted: 'var(--muted)',
        accent: 'var(--accent)',
        ember: 'var(--ember)',
        leaf: 'var(--leaf)',
        sky: 'var(--sky)',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Roboto Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
