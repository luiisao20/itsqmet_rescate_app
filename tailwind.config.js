/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: '#F4F7F3',
        card: '#D8E4DC',
        color: '#2F5744',
        button: '#7CA893',
        icons: '#CFE5E0',
        danger: '#F44336',
        success: '#5FAF68'
      },
      fontFamily: {
        thin: ["Inter_pt-Thin"],
        light: ["Inter_pt-Light"],
        normal: ["Inter_pt-Regular"],
        medium: ["Inter_pt-Medium"],
        semibold: ["Inter_pt-SemiBold"],
        bold: ["Inter_pt-Bold"],
        extrabold: ["Inter_pt-ExtraBold"],
      },
    },
  },
  plugins: [],
};
