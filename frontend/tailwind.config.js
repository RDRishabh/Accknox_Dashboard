/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* Hide scrollbar for WebKit */
          '-webkit-overflow-scrolling': 'touch',
          'scrollbar-width': 'none', /* For Firefox */
          '&::-webkit-scrollbar': {
            display: 'none', /* Hide scrollbar for WebKit browsers */
          },
        },
      });
    },
  ],
}