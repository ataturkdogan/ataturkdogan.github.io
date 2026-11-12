/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#06060f',
        blue:     '#00d4ff',
        purple:   '#8b5cf6',
        pink:     '#f0abfc',
        text1:    '#eeeeff',
        text2:    '#8888aa',
        text3:    '#484866',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'gradient-shift': 'gradientShift 8s ease infinite',
        'float-a':        'floatA 16s ease-in-out infinite',
        'float-b':        'floatB 19s ease-in-out infinite 3s',
        'glow-pulse':     'glowPulse 10s ease-in-out infinite',
        'grid-scroll':    'gridScroll 4.5s linear infinite',
        'horizon-pulse':  'horizonPulse 3.5s ease-in-out infinite',
        'shimmer':        'shimmer 4s linear infinite',
        'border-pulse':   'borderPulse 3s ease-in-out infinite',
      },
      keyframes: {
        gradientShift: {
          '0%':   { backgroundPosition: '0% 50%' },
          '50%':  { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        floatA: {
          '0%,100%': { transform: 'translateY(0) rotate(0deg)' },
          '33%':     { transform: 'translateY(-28px) rotate(1.5deg)' },
          '66%':     { transform: 'translateY(-14px) rotate(-1deg)' },
        },
        floatB: {
          '0%,100%': { transform: 'translateY(0) translateX(0)' },
          '50%':     { transform: 'translateY(-34px) translateX(20px)' },
        },
        glowPulse: {
          '0%,100%': { opacity: '.4', transform: 'scale(1)' },
          '50%':     { opacity: '.75', transform: 'scale(1.07)' },
        },
        gridScroll: {
          from: { backgroundPosition: '0 0' },
          to:   { backgroundPosition: '0 70px' },
        },
        horizonPulse: {
          '0%,100%': { opacity: '.6' },
          '50%':     { opacity: '1' },
        },
        shimmer: {
          '0%':   { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(220%)' },
        },
        borderPulse: {
          '0%,100%': { opacity: '.3' },
          '50%':     { opacity: '.85' },
        },
      },
      backdropBlur: {
        xs: '4px',
      },
    },
  },
  plugins: [],
}
