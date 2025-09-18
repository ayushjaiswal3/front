/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,  // ✅ Ensures Tailwind takes priority over Flowbite
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/**/*.js",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("tailwind-scrollbar"),
    require("flowbite/plugin"),
  ],
};
