import { ExpoConfig } from '@expo/config';

const config: ExpoConfig = {
  name: 'peakYours',
  slug: 'peakyours',
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
    '@react-native-google-signin/google-signin',
    [
      'expo-build-properties',
      {
        ios: {
          useFrameworks: 'static',
        },
      },
    ],
  ],
  extra: {
    eas: {
      projectId: '825e19a8-f734-4813-b726-e5c2b215b0af',
    },
  },
  owner: 'korayerdem',
};

export default config;
