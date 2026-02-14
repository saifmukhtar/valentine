/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                modern: {
                    primary: '#ff0080', // Vibrant Pink
                    secondary: '#7928ca', // Deep Purple
                    accent: '#00dfd8', // Teal/Cyan
                    dark: '#050505', // Rich Black
                    card: 'rgba(255, 255, 255, 0.05)', // Glassmorphism base
                }
            },
            fontFamily: {
                sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
                display: ['Great Vibes', 'cursive'],
                cursive: ['Great Vibes', 'cursive'],
            }
        },
    },
    plugins: [],
}
