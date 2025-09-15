/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(210 40% 98%)',
        foreground: 'hsl(210 40% 10%)',
        'foreground-muted': 'hsl(210 40% 30%)',
        'background-subtle': 'hsl(210 40% 97%)',
        surface: 'hsl(210 40% 100%)',
        primary: 'hsl(220 89.1% 46.5%)',
        accent: 'hsl(12 76.9% 53.1%)',
        danger: 'hsl(0 72% 47%)',
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '16px',
        'xl': '24px',
      },
      spacing: {
        'sm': '8px',
        'md': '12px',
        'lg': '20px',
        'xl': '24px',
      },
      boxShadow: {
        'card': '0 8px 24px hsla(210, 40%, 10%, 0.12)',
        'float': '0 4px 16px hsla(0, 0%, 0%, 0.08)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      transitionTimingFunction: {
        'custom': 'cubic-bezier(0.22,1,0.36,1)',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '400': '400ms',
      },
    },
  },
  plugins: [],
}
