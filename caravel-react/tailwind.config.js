/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      backgroundImage: {
        'hero-pattern': "linear-gradient(to right, rgba(209, 213, 219, 0.5), rgba(244, 114, 182, 0.8)), url('https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80')",
     },
      screens: {
        'xs': '475px',
      },
      colors: {
        'faintblue': 'rgb(239, 250, 250)',
      },
    },
  },
  plugins: [],
}