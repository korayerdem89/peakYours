import { MobileAds } from 'react-native-google-mobile-ads';

// Test cihazlarını yapılandır
MobileAds()
  .setRequestConfiguration({
    testDeviceIdentifiers: ['EMULATOR'],
  })
  .then(() => {
    console.log('Test devices configured');
  });
