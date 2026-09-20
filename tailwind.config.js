/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          950: '#05070d',
          900: '#090c14',
          800: '#0f1420',
          700: '#161c2c',
          600: '#1e2637',
        },
        accent: {
          cyan: '#22d3ee',
          blue: '#3b82f6',
          purple: '#a855f7',
          red: '#f43f5e',
          amber: '#f59e0b',
          green: '#34d399',
        },
      },
      fontFamily: {
        sans: ['"Inter"', '"Manrope"', 'system-ui', 'sans-serif'],
        display: ['"Manrope"', '"Inter"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px)',
        'glow-radial':
          'radial-gradient(circle at 50% 0%, rgba(59,130,246,0.18), transparent 60%)',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,0.06), 0 8px 30px -8px rgba(0,0,0,0.6)',
        'glow-cyan': '0 0 24px -4px rgba(34,211,238,0.45)',
        'glow-blue': '0 0 24px -4px rgba(59,130,246,0.45)',
        'glow-purple': '0 0 24px -4px rgba(168,85,247,0.45)',
        'glow-red': '0 0 24px -2px rgba(244,63,94,0.55)',
      },
      keyframes: {
        'pulse-dot': {
          '0%, 100%': { opacity: 1, boxShadow: '0 0 0 0 rgba(244,63,94,0.6)' },
          '50%': { opacity: 0.7, boxShadow: '0 0 0 6px rgba(244,63,94,0)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'pulse-dot': 'pulse-dot 1.8s ease-in-out infinite',
        scan: 'scan 4s linear infinite',
        'fade-up': 'fade-up 0.5s ease-out both',
        shimmer: 'shimmer 3s linear infinite',
        'spin-slow': 'spin-slow 6s linear infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
