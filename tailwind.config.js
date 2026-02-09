/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'pastel-yellow-light': '#FEF9C3',
                'pastel-yellow': '#FDE047',
                'soft-pink-light': '#FBCFE8',
                'soft-pink': '#F472B6',
                'baby-blue': '#BAE6FD',
            },
            fontFamily: {
                'serif': ['Playfair Display', 'serif'],
                'sans': ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
