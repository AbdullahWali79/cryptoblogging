import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        crypto: {
          dark: '#0a0e27',
          blue: '#1e3a8a',
          'blue-light': '#3b82f6',
          'blue-dark': '#1e40af',
        },
      },
    },
  },
  plugins: [],
}
export default config

