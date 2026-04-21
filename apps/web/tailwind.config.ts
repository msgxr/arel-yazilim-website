import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts}',
    './src/content/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#2563eb',  // Cobalt Blue
          vibrant: '#3b82f6',
          dark:    '#1e40af',
          soft:    'rgba(37, 99, 235, 0.08)',
          glow:    'rgba(37, 99, 235, 0.4)',
          light:   '#60a5fa',
        },
        midnight: {
          DEFAULT: '#020617',
          card:    'rgba(2, 6, 23, 0.85)',
          dark:    '#0f172a',
          darker:  '#0a0f1c',
        },
        slate: {
          50:  '#F8F9FB',
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
        sans: [
          'var(--font-inter)',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'sans-serif',
        ],
      },
      borderRadius: {
        sm:   '6px',
        md:   '12px',
        lg:   '20px',
        xl:   '32px',
        full: '9999px',
      },
      boxShadow: {
        sm:         '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.06)',
        md:         '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
        lg:         '0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -2px rgba(0,0,0,0.02)',
        xl:         '0 20px 25px -5px rgba(0,0,0,0.05), 0 10px 10px -5px rgba(0,0,0,0.02)',
        glow:       '0 0 20px rgba(37,99,235,0.4)',
        'brand-lg': '0 12px 24px -6px rgba(37,99,235,0.4)',
        glass:      '0 8px 32px 0 rgba(31,38,135,0.07)',
      },
      backgroundImage: {
        'hero-gradient':
          'radial-gradient(circle at 20% 30%, rgba(37,99,235,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(37,99,235,0.1) 0%, transparent 50%)',
        'brand-gradient':
          'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
      },
      animation: {
        blink:        'blink 1.5s ease-in-out infinite',
        float:        'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        marquee:      'marquee 30s linear infinite',
        'fade-up':    'fadeUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':       { opacity: '0.3' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%':       { transform: 'translateY(-20px) rotate(2deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%':       { opacity: '0.8', transform: 'scale(1.1)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
