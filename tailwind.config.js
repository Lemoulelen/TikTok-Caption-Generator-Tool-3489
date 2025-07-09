/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
  safelist: [
    'text-red-500',
    'text-blue-500',
    'text-purple-500',
    'bg-red-50',
    'bg-blue-50',
    'bg-purple-50',
    'hover:bg-red-100',
    'hover:bg-blue-100',
    'hover:bg-purple-100',
    'bg-red-100',
    'bg-blue-100',
    'bg-purple-100',
    'text-red-600',
    'text-blue-600',
    'text-purple-600',
    'text-yellow-600',
    'text-green-600',
    'bg-yellow-100',
    'bg-green-100'
  ]
}