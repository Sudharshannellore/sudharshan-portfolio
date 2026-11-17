/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#080A09', 2: '#0D100E', 3: '#121613' },
        bone: '#F5F5F0',
        mute: '#92978F',
        lime: { DEFAULT: '#C5F467', dim: '#9BC24F' },
        line: 'rgba(255,255,255,0.09)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: { tightest: '-0.055em' },
    },
  },
  plugins: [],
};
