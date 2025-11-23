// module.exports = {
//   content: [
//     './apps/**/*.{html,ts}',
//     './libs/**/*.{html,ts}',
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
//   important: true,
// }

module.exports = {
  content: [
    './apps/**/*.{html,ts}',
    './libs/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
  important: true,
}