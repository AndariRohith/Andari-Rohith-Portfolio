/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        portfolio: {
          bg: '#F0F4FC',
          dark: '#0A0D14',
          darkCard: '#121826',
          accent: '#6366F1',
          accentSky: '#06B6D4',
          accentPurple: '#A855F7',
          accentPink: '#EC4899',
          accentAmber: '#F59E0B',
          accentEmerald: '#10B981',
          slate: '#475569',
          lightSlate: '#94A3B8',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-indigo': '0 0 30px -5px rgba(99, 102, 241, 0.45)',
        'glow-cyan': '0 0 30px -5px rgba(6, 182, 212, 0.45)',
        'glow-purple': '0 0 30px -5px rgba(168, 85, 247, 0.45)',
        'glow-amber': '0 0 30px -5px rgba(245, 158, 11, 0.45)',
        'glow-3d': '0 20px 40px -15px rgba(99, 102, 241, 0.25)',
        'card-3d': '0 12px 36px -6px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(99, 102, 241, 0.1)',
        'card-3d-dark': '0 16px 40px -8px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.05)' },
        },
        gradientMove: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        floatSlow: 'float 9s ease-in-out infinite',
        pulseGlow: 'pulseGlow 5s ease-in-out infinite',
        gradient: 'gradientMove 8s ease infinite',
        rotateSlow: 'rotateSlow 25s linear infinite',
      }
    },
  },
  plugins: [],
}
