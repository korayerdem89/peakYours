import { ExpoConfig } from '@expo/config';

const config: ExpoConfig = {
  name: 'peakYours',
  slug: 'peakyours',
  version: '1.0.1',
  scheme: 'com.peakyours.app',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'cover',
    backgroundColor: '#5C3DBF',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.peakyours.app',
    googleServicesFile: './GoogleService-Info.plist',
    buildNumber: '1.0.1',
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
    '@react-native-google-signin/google-signin',
    [
      'expo-build-properties',
      {
        ios: {
          useFrameworks: 'static',
        },
      },
    ],
    [
      'react-native-google-mobile-ads',
      {
        androidAppId: 'ca-app-pub-6312844121446107~1320311407',
        iosAppId: 'ca-app-pub-6312844121446107/2492397048',
      },
    ],
  ],
  extra: {
    OPENAI_API_KEY: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
    eas: {
      projectId: '825e19a8-f734-4813-b726-e5c2b215b0af',
    },
  },
  owner: 'korayerdem',
};

export default config;
