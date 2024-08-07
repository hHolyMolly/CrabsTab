/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        white: 'var(--white)',
        black: 'var(--black)',

        grey: {
          100: 'var(--grey-100)',
          200: 'var(--grey-200)',
          300: 'var(--grey-300)',
          500: 'var(--grey-500)',
          800: 'var(--grey-800)',
        },

        orange: {
          200: 'var(--orange-200)',
          300: 'var(--orange-300)',
          500: 'var(--orange-500)',
        },
      },
    },
    screens: {
      sm: '425px',
      md: '640px',
      lg: '768px',
      xl: '1024px',
      '2xl': '1200px',

      'any-hover': { raw: '(hover: hover)' },
    },
    container: {
      screens: {
        sm: '425px',
        md: '640px',
        lg: '768px',
        xl: '1024px',
        '2xl': '1200px',
        '3xl': '1440px',
      },
      center: true,
      padding: {
        DEFAULT: '15px',
        sm: '20px',
        lg: '30px',
        xl: '40px',
        '2xl': '60px',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
};
