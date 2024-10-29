/** @type {import('tailwindcss').Config} */
module.exports = {
    
      content: ["./app/**/*.{js,ts,tsx}", "./components/**/*.{js,ts,tsx}"],
    
    presets: [require("nativewind/preset")],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          // Ana renkler
          primary: {
            DEFAULT: '#7C4DFF', // Canlı mor
            light: '#9669FF',
            dark: '#6B42DB',
          },
          secondary: {
            DEFAULT: '#00E5FF', // Parlak cyan
            light: '#33EEFF',
            dark: '#00B8D4',
          },
          accent: {
            DEFAULT: '#FF3D71', // Neon pembe
            light: '#FF6B9B',
            dark: '#DB2C66',
          },
  
          // Nötr renkler
          background: {
            light: '#FFFFFF',
            dark: '#131A2A',
          },
          surface: {
            light: '#F7F9FC',
            dark: '#1A2138',
          },
          card: {
            light: '#FFFFFF',
            dark: '#1E2745',
          },
  
          // Metin renkleri
          text: {
            light: '#2E3A59',
            dark: '#EDF1F7',
            secondary: {
              light: '#8F9BB3',
              dark: '#A6B1C6',
            },
          },
        },
        fontFamily: {
          poppins: ['Poppins-Regular'],
          'poppins-medium': ['Poppins-Medium'],
          'poppins-semibold': ['Poppins-SemiBold'],
          'poppins-bold': ['Poppins-Bold'],
        },
        fontSize: {
          xs: ['12px', '16px'],
          sm: ['14px', '20px'],
          base: ['16px', '24px'],
          lg: ['18px', '28px'],
          xl: ['20px', '28px'],
          '2xl': ['24px', '32px'],
          '3xl': ['30px', '36px'],
          '4xl': ['36px', '40px'],
        },
      },
    },
    plugins: [],
  }
