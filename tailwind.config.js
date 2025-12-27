/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    neon: '#3effff', // Icy Cyan (High contrast against dark blue)
                    dark: '#050B14', // Deep Space Blue (matches fundogamer.jpg aesthetic)
                    purple: '#8b5cf6', // Vivid Violet
                    card: '#0f172a', // Deep Slate for cards
                    pink: '#ec4899', // Neon Pink accent
                    accent: '#1e293b' // Slate-800
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Rajdhani', 'sans-serif'],
            },
            backgroundImage: {
                'hero-pattern': "url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop')",
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'scroll': 'scroll 20s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'pulse-glow': {
                    '0%, 100%': { opacity: 1, boxShadow: '0 0 20px #00ff9d' },
                    '50%': { opacity: .7, boxShadow: '0 0 10px #00ff9d' },
                },
                scroll: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-100%)' },
                }
            }
        },
    },
    plugins: [],
}
