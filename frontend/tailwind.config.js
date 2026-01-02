/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
        extend: {
                borderRadius: {
                        lg: 'var(--radius)',
                        md: 'calc(var(--radius) - 2px)',
                        sm: 'calc(var(--radius) - 4px)'
                },
                colors: {
                        background: '#0a0a0f', // Very dark blue/black
                        foreground: '#e0e0e0', // Off-white
                        card: {
                                DEFAULT: 'rgba(19, 19, 31, 0.8)',
                                foreground: '#e0e0e0'
                        },
                        popover: {
                                DEFAULT: '#13131f',
                                foreground: '#e0e0e0'
                        },
                        primary: {
                                DEFAULT: '#00f0ff', // Cyan Neon
                                foreground: '#000000'
                        },
                        secondary: {
                                DEFAULT: '#7000ff', // Purple Neon
                                foreground: '#ffffff'
                        },
                        muted: {
                                DEFAULT: '#1f1f2e',
                                foreground: '#a0a0b0'
                        },
                        accent: {
                                DEFAULT: '#00ff9d', // Green Neon
                                foreground: '#000000'
                        },
                        destructive: {
                                DEFAULT: '#ff0055',
                                foreground: '#ffffff'
                        },
                        border: 'rgba(0, 240, 255, 0.1)',
                        input: '#1f1f2e',
                        ring: '#00f0ff',
                        chart: {
                                '1': 'hsl(var(--chart-1))',
                                '2': 'hsl(var(--chart-2))',
                                '3': 'hsl(var(--chart-3))',
                                '4': 'hsl(var(--chart-4))',
                                '5': 'hsl(var(--chart-5))'
                        }
                },
                fontFamily: {
                    sans: ['Inter', 'sans-serif'],
                    mono: ['Fira Code', 'monospace'],
                },
                keyframes: {
                        'accordion-down': {
                                from: {
                                        height: '0'
                                },
                                to: {
                                        height: 'var(--radix-accordion-content-height)'
                                }
                        },
                        'accordion-up': {
                                from: {
                                        height: 'var(--radix-accordion-content-height)'
                                },
                                to: {
                                        height: '0'
                                }
                        }
                },
                animation: {
                        'accordion-down': 'accordion-down 0.2s ease-out',
                        'accordion-up': 'accordion-up 0.2s ease-out'
                }
        }
  },
  plugins: [require("tailwindcss-animate")],
};
