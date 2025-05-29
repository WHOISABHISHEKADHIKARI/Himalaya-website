module.exports = {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}","./cosmic/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'loading': {
          '0%': {
            width: '0',
            transform: 'translateX(-100%)',
          },
          '50%': {
            width: '100%',
            transform: 'translateX(0)',
          },
          '100%': {
            width: '100%',
            transform: 'translateX(100%)',
          },
        },
      },
      animation: {
        'fade-in': 'fade-in 1s ease-out',
        'fade-in-up': 'fade-in-up 1s ease-out',
        'loading': 'loading 3s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'loading-reduced': 'loading 6s ease-in-out infinite',
      },
      perspective: {
        '1000': '1000px',
      },
      rotate: {
        'y-180': '180deg',
      },
      transformStyle: {
        '3d': 'preserve-3d',
      },
      backfaceVisibility: {
        'hidden': 'hidden',
      },
    },
  },
  plugins: [],
}
