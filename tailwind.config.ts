import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: '#48A23F',
        'primary-dark': '#3D8F36',
        'primary-bg': '#EEF6ED',
        'primary-bg-hover': '#DCE9D8',
        'text-main': '#222222',
        'text-muted': '#555555',
        'text-deep': '#0f172a',
        'border-default': '#CCCCCC',
        'gray-80': '#333333',
        overlay: '#000000A6',
        error: '#DD3636',
      },
      fontSize: {
        h1: [
          '80px',
          {
            lineHeight: '64px',
            fontWeight: '400',
            letterSpacing: '0',
          },
        ],
        h2: [
          '64px',
          {
            lineHeight: '80px',
            fontWeight: '700',
            letterSpacing: '0',
          },
        ],
        h3: [
          '48px',
          {
            lineHeight: '63px',
            fontWeight: '700',
            letterSpacing: '0',
          },
        ],
        'h4-bold': [
          '32px',
          {
            lineHeight: '44px',
            fontWeight: '700',
            letterSpacing: '0',
          },
        ],
        'h4-small': [
          '25px',
          {
            lineHeight: '44px',
            fontWeight: '700',
            letterSpacing: '0',
          },
        ],
        h4: [
          '22px',
          {
            lineHeight: '34px',
            fontWeight: '200',
            letterSpacing: '0',
          },
        ],
        'h5-bold': [
          '28px',
          {
            lineHeight: '40px',
            fontWeight: '700',
            letterSpacing: '0',
          },
        ],
        h5: [
          '20px',
          {
            lineHeight: '40px',
            fontWeight: '300',
            letterSpacing: '0',
          },
        ],
        'h6-bold': [
          '22px',
          {
            lineHeight: '32px',
            fontWeight: '700',
            letterSpacing: '0',
          },
        ],
        h6: [
          '22px',
          {
            lineHeight: '32px',
            fontWeight: '150',
            letterSpacing: '0',
          },
        ],
        'h6-small': [
          '24px',
          {
            lineHeight: '36px',
            fontWeight: '700',
            letterSpacing: '0',
          },
        ],
        'body-large': [
          '16px',
          {
            lineHeight: '28px',
            fontWeight: '200',
            letterSpacing: '0',
          },
        ],
        'body-large-bold': [
          '20px',
          {
            lineHeight: '28px',
            fontWeight: '700',
            letterSpacing: '0',
          },
        ],
        'body-large-small': [
          '20px',
          {
            lineHeight: '28px',
            fontWeight: '300',
            letterSpacing: '0',
          },
        ],
        'body-medium': [
          '16px',
          {
            lineHeight: '22px',
            fontWeight: '300',
            letterSpacing: '0',
          },
        ],
        'body-medium-bold': [
          '16px',
          {
            lineHeight: '22px',
            fontWeight: '700',
            letterSpacing: '0',
          },
        ],
        'body-small': [
          '12px',
          {
            lineHeight: '18px',
            fontWeight: '300',
            letterSpacing: '0',
          },
        ],
        'body-small-bold': [
          '12px',
          {
            lineHeight: '18px',
            fontWeight: '600',
            letterSpacing: '0',
          },
        ],
      },
    },
  },
  plugins: [
    function ({
      addUtilities,
    }: {
      addUtilities: (utilities: Record<string, Record<string, string>>) => void;
    }) {
      addUtilities({
        '.text-body-large': {
          fontFamily: 'WeblySleek UI, system-ui, Avenir, Helvetica, Arial, sans-serif',
        },
        '.text-body-small': {
          fontFamily: 'WeblySleek UI, system-ui, Avenir, Helvetica, Arial, sans-serif',
        },
        '.text-body-large-small': {
          fontFamily: 'WeblySleek UI, system-ui, Avenir, Helvetica, Arial, sans-serif',
        },
        '.text-body-medium': {
          fontFamily: 'WeblySleek UI, system-ui, Avenir, Helvetica, Arial, sans-serif',
        },
        '.text-h4': {
          fontFamily: 'WeblySleek UI, system-ui, Avenir, Helvetica, Arial, sans-serif',
        },
        '.text-h4-h': {
          fontFamily: 'WeblySleek UI, system-ui, Avenir, Helvetica, Arial, sans-serif',
        },
        '.text-h6': {
          fontFamily: 'WeblySleek UI, system-ui, Avenir, Helvetica, Arial, sans-serif',
        },
        '.text-h5': {
          fontFamily: 'WeblySleek UI, system-ui, Avenir, Helvetica, Arial, sans-serif',
        },
      });
    },
  ],
} satisfies Config;
