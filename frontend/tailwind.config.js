module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      screens: {
        xs: '370px',
      },
      // backgroundImage: {
      //   'about-us': "url('/images/about-us.jpg')",
      // },
    },
  },
  plugins: [],
};
