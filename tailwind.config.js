/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./App.{js,jsx,ts,tsx}",
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#7210FF',
                    light: '#F3E8FF',
                },
                secondary: {
                    red: '#FF3B30',
                    blue: '#007AFF',
                    green: '#34C759',
                    orange: '#FF9500',
                    yellow: '#FFC107',
                },
            },
        },
    },
    plugins: [],
}
