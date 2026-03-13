import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: '#E8531D',
          vibrant: '#FF5722',
          dark: '#BF360C',
          soft: 'rgba(232, 83, 29, 0.08)',
          glow: 'rgba(232, 83, 29, 0.4)',
          light: '#FF7043',
        },
        brand: {
          dark: '#0F1115',
          darker: '#08090B',
          card: 'rgba(255, 255, 255, 0.85)',
        },
        slate: {
          50: '#F8F9FB',
          100: '#F1F3F5',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      },
      borderRadius: {
        sm: '6px',
        md: '12px',
        lg: '20px',
        xl: '32px',
        full: '9999px',
      },
      boxShadow: {
        sm: '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.06)',
        md: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
        lg: '0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -2px rgba(0,0,0,0.02)',
        xl: '0 20px 25px -5px rgba(0,0,0,0.05), 0 10px 10px -5px rgba(0,0,0,0.02)',
        glow: '0 0 20px rgba(232,83,29,0.4)',
        'orange-lg': '0 12px 24px -6px rgba(232,83,29,0.4)',
        glass: '0 8px 32px 0 rgba(31,38,135,0.07)',
      },
      backgroundImage: {
        'hero-gradient':
          'radial-gradient(circle at 20% 30%, rgba(232,83,29,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(232,83,29,0.1) 0%, transparent 50%)',
        'orange-gradient': 'linear-gradient(135deg, #E8531D 0%, #FF5722 100%)',
      },
      animation: {
        blink: 'blink 1.5s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite',
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
        'typewriter-cursor': 'blink 1s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.1)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
