/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Ana renkler
        primary: {
          DEFAULT: '#7C4DFF',
          light: '#B47CFF',
          dark: '#5C3DBF',
        },
        secondary: {
          DEFAULT: '#6693f5',
          light: '#96b5f8',
          dark: '#3671f2',
        },
        accent: {
          DEFAULT: '#f8de7e',
          light: '#f9e496',
          dark: '##f4cb35',
        },
        // Arka plan renkleri
        background: {
          light: '#FFFFFF',
          dark: '#131A2A',
          tab: '#eaf0fd',
        },
        // Metin renkleri
        text: {
          light: '#2E3A59',
          'light-secondary': '#8F9BB3',
          dark: '#EDF1F7',
          'dark-secondary': '#C5CEE0',
        },
        // Yardımcı renkler
        surface: {
          light: '#F7F9FC',
          dark: '#1A2138',
        },
        border: {
          light: '#E4E9F2',
          dark: '#222B45',
        },
        success: {
          DEFAULT: '#00E096',
          light: '#33E6AD',
          dark: '#00A870',
        },
        warning: {
          DEFAULT: '#FFAA00',
          light: '#FFBB33',
          dark: '#BF8000',
        },
        error: {
          DEFAULT: '#FF3D71',
          light: '#FF668F',
          dark: '#BF2D55',
        },
        personality: {
          extraversion: '#6366F1', // Indigo - Dışadönüklük
          agreeableness: '#14B8A6', // Teal - Uyumluluk
          conscientiousness: '#F59E0B', // Amber - Sorumluluk
          emotional: '#8B5CF6', // Violet - Duygusal Denge
          openness: '#EC4899', // Pink - Deneyime Açıklık
          empathy: '#06B6D4', // Cyan - Empati
          creativity: '#F43F5E', // Rose - Yaratıcılık
        },
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        full: '9999px',
      },
      fontSize: {
        xs: ['12px', '16px'],
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['18px', '28px'],
        xl: ['20px', '28px'],
        '2xl': ['24px', '32px'],
        '3xl': ['30px', '36px'],
      },
      fontFamily: {
        thin: ['Poppins_100Thin'],
        extralight: ['Poppins_200ExtraLight'],
        light: ['Poppins_300Light'],
        regular: ['Poppins_400Regular'],
        medium: ['Poppins_500Medium'],
        semibold: ['Poppins_600SemiBold'],
        bold: ['Poppins_700Bold'],
        extrabold: ['Poppins_800ExtraBold'],
        black: ['Poppins_900Black'],
        'thin-italic': ['Poppins_100Thin_Italic'],
        'extralight-italic': ['Poppins_200ExtraLight_Italic'],
        'light-italic': ['Poppins_300Light_Italic'],
        'regular-italic': ['Poppins_400Regular_Italic'],
        'medium-italic': ['Poppins_500Medium_Italic'],
        'semibold-italic': ['Poppins_600SemiBold_Italic'],
        'bold-italic': ['Poppins_700Bold_Italic'],
        'extrabold-italic': ['Poppins_800ExtraBold_Italic'],
        'black-italic': ['Poppins_900Black_Italic'],
      },
      // Responsive breakpoints
      screens: {
        sm: '380px',
        md: '420px',
        lg: '680px',
        tablet: '1024px',
      },
      // Gölgeler
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      // Animasyonlar
      animation: {
        fast: '200ms',
        normal: '300ms',
        slow: '500ms',
      },
    },
  },
  plugins: [],
};
