/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        framer: {
          bg: '#f4f8f7',
          dark: '#142a2b',
          muted: '#647878',
          teal: '#007f70',
          tealHover: '#00665a',
          tealLight: '#e6f3f0',
          tealBorder: '#cde4df',
          card: '#ffffff',
          border: '#e2ece9',
        },
        brand: {
          50: '#f0fdf9',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#007f70',
          600: '#00665a',
          700: '#0f4f46',
          800: '#113b35',
          900: '#142a2b',
        }
      },
      fontFamily: {
        sans: ['"General Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '18px',
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        'framer': '0 2px 14px rgba(20, 42, 43, 0.05)',
        'framer-hover': '0 8px 30px rgba(0, 127, 112, 0.08)',
        'framer-card': '0 1px 3px rgba(20, 42, 43, 0.04), 0 6px 16px rgba(20, 42, 43, 0.02)',
      }
    },
  },
  plugins: [],
}
