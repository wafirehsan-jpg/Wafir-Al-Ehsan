/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stitch: {
          bg: '#0F172A',
          card: '#1E293B',
          accent: '#38BDF8',
          purple: '#A855F7',
          emerald: '#10B981',
          rose: '#F43F5E',
          amber: '#F59E0B',
          muted: '#64748B',
          light: '#F8FAFC',
          dark: '#020617',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
