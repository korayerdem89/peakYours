import { create } from 'zustand';
import { InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';
import { Platform, StatusBar } from 'react-native';

const adUnitId = 'ca-app-pub-6312844121446107/7886655538';
const MIN_TIME_BETWEEN_ADS = 60 * 1000; // 1 dakika

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  keywords: [
    'zodiac',
    'tarot',
    'astrology',
    'personality',
    'psychology',
    'psychic',
    'personalgrowth',
    'spiritual',
    'spiritualgrowth',
    'spiritualjourney',
    'spiritualpath',
    'spiritualpractice',
    'spiritualteacher',
    'spiritualteachertraining',
    'fitness',
    'health',
    'wellness',
    'mindfulness',
    'meditation',
  ],
});

interface InterstitialState {
  isLoaded: boolean;
  lastShowTime: number;
  setIsLoaded: (loaded: boolean) => void;
  showAd: () => Promise<boolean>;
  loadAd: () => void;
  setLastShowTime: (time: number) => void;
  canShowAd: () => boolean;
}

export const useInterstitialAd = create<InterstitialState>((set, get) => ({
  isLoaded: false,
  lastShowTime: 0,
  setIsLoaded: (loaded) => set({ isLoaded: loaded }),
  setLastShowTime: (time) => set({ lastShowTime: time }),
  canShowAd: () => {
    const { lastShowTime } = get();
    const now = Date.now();
    return now - lastShowTime >= MIN_TIME_BETWEEN_ADS;
  },
  showAd: async () => {
    const { isLoaded, setIsLoaded, canShowAd, setLastShowTime } = get();

    if (!canShowAd()) {
      console.log('Not enough time has passed since the last ad');
      return false;
    }

    if (isLoaded) {
      try {
        await interstitial.show();
        setLastShowTime(Date.now());
        return true;
      } catch (error) {
        console.error('Error showing interstitial ad:', error);
        setIsLoaded(false);
        interstitial.load();
        return false;
      }
    }
    return false;
  },
  loadAd: () => {
    interstitial.load();
  },
}));

// Event listeners
interstitial.addAdEventListener(AdEventType.LOADED, () => {
  useInterstitialAd.getState().setIsLoaded(true);
});

interstitial.addAdEventListener(AdEventType.OPENED, () => {
  if (Platform.OS === 'ios') {
    StatusBar.setHidden(true);
  }
});

interstitial.addAdEventListener(AdEventType.CLOSED, () => {
  if (Platform.OS === 'ios') {
    StatusBar.setHidden(false);
  }
  const { setIsLoaded, loadAd } = useInterstitialAd.getState();
  setIsLoaded(false);
  loadAd();
});
