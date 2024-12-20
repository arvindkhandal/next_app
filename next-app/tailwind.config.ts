import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'blue-1': '#101828',
        'blue-2': '#1D2939',
        'blue-3': '#253BFF',
        green: '#9FF443',
        white: '#FFF',
        'gray-1': '#667085',
        'gray-2': '#475467',
        'gray-3': '#EAECF0',
        'gray-4': '#F9AFB',
      },
    },
  },
  plugins: [],
} satisfies Config
