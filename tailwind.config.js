/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        blueprint: {
          bg: '#0A2647',
          panel: '#0F3460',
          panelLight: '#154479',
          line: '#3E6B96',
          lineBright: '#7EC8E3',
          paper: '#F1F6FB',
          muted: '#7FA0C2',
          marker: '#FF6B4A',
          markerDark: '#E5522F',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'blueprint-grid':
          'linear-gradient(rgba(126,200,227,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(126,200,227,0.07) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-24': '24px 24px',
      },
    },
  },
  plugins: [],
};
