import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './resources/**/*.{js,js,ts,tsx,vue}', // all JS/React files
    './resources/**/*.blade.php',           // all Blade templates
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php', // optional pagination
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Figtree', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
