import { ExpoConfig } from '@expo/config';

const config: ExpoConfig = {
  name: 'peakYours',
  slug: 'peakYours',
  version: '1.0.0',
  scheme: 'com.peakyours.app',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.peakyours.app',
    googleServicesFile: './GoogleService-Info.plist',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.peakyours.app',
    googleServicesFile: './google-services.json',
  },
  plugins: [
    '@react-native-firebase/app',
    '@react-native-firebase/auth',
    [
      'expo-build-properties',
      {
        ios: {
          useFrameworks: 'static',
        },
      },
    ],
  ],
};

export default config;
