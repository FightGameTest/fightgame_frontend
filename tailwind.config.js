module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        m5x7: ["m5x7"],
        daydream: ["daydream"],
      },
      cursor: {
        default: 'url(/images/cursor/cursor.png), default',
        pointer: 'url(/images/cursor/CursorHand.png), pointer',
      },
    },
  },
  plugins: [],
};
