/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,tsx}", "./components/**/*.{js,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Ana renkler
        primary: {
          DEFAULT: '#7C4DFF',
          light: '#B47CFF',
          dark: '#5C3DBF'
        },
        secondary: {
          DEFAULT: '#00E5FF',
          light: '#33EEFF',
          dark: '#00ACBF'
        },
        accent: {
          DEFAULT: '#FF3D71',
          light: '#FF668F',
          dark: '#BF2D55'
        },
        // Arka plan renkleri
        background: {
          light: '#FFFFFF',
          dark: '#131A2A'
        },
        // Metin renkleri
        text: {
          light: '#2E3A59',
          'light-secondary': '#8F9BB3',
          dark: '#EDF1F7',
          'dark-secondary': '#C5CEE0'
        },
        // Yardımcı renkler
        surface: {
          light: '#F7F9FC',
          dark: '#1A2138'
        },
        border: {
          light: '#E4E9F2',
          dark: '#222B45'
        },
        success: {
          DEFAULT: '#00E096',
          light: '#33E6AD',
          dark: '#00A870'
        },
        warning: {
          DEFAULT: '#FFAA00',
          light: '#FFBB33',
          dark: '#BF8000'
        },
        error: {
          DEFAULT: '#FF3D71',
          light: '#FF668F',
          dark: '#BF2D55'
        }
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
        '3xl': '64px'
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        full: '9999px'
      },
      fontSize: {
        xs: ['12px', '16px'],
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['18px', '28px'],
        xl: ['20px', '28px'],
        '2xl': ['24px', '32px'],
        '3xl': ['30px', '36px']
      },
      fontFamily: {
        'poppins': ['Poppins-Regular'],
        'poppins-medium': ['Poppins-Medium'],
        'poppins-semibold': ['Poppins-SemiBold'],
        'poppins-bold': ['Poppins-Bold']
      },
      // Responsive breakpoints
      screens: {
        sm: '380px',
        md: '420px',
        lg: '680px',
        tablet: '1024px'
      },
      // Gölgeler
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
      },
      // Animasyonlar
      animation: {
        fast: '200ms',
        normal: '300ms',
        slow: '500ms'
      }
    }
  },
  plugins: []
}
