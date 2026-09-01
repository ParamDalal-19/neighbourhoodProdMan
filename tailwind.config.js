/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#FFF4ED',
          100: '#FFE6D5',
          200: '#FFC9A8',
          300: '#FFA36F',
          400: '#FF7A38',
          500: '#F4600A',
          600: '#E8590C',
          700: '#C4460A',
          800: '#9C380E',
          900: '#7E300F',
        },
        ink: {
          50: '#F7F7F8',
          100: '#EEEEF0',
          200: '#D9D9DE',
          300: '#B8B8C2',
          400: '#8F8F9E',
          500: '#6E6E80',
          600: '#54545F',
          700: '#3F3F49',
          800: '#292933',
          900: '#18181F',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(24,24,31,0.04), 0 4px 12px rgba(24,24,31,0.06)',
        'card-hover': '0 2px 4px rgba(24,24,31,0.06), 0 12px 24px rgba(24,24,31,0.10)',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0, transform: 'translateY(4px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'toast-in': {
          '0%': { opacity: 0, transform: 'translateY(-8px) translateX(-50%)' },
          '100%': { opacity: 1, transform: 'translateY(0) translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.25s ease-out',
        'toast-in': 'toast-in 0.25s ease-out',
        shimmer: 'shimmer 1.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
