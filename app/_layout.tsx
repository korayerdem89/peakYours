import '@/global.css';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Platform,
  AppState,
  AppStateStatus,
} from 'react-native';
import { useEffect, useRef } from 'react';
import { useDarkMode } from '@/store/useDarkMode';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { AuthProvider } from '@/providers/AuthProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAuth } from '@/store/useAuth';
import { LanguageProvider } from '@/providers/LanguageProvider';
import Toast from 'react-native-toast-message';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useOnlineManager } from '@/hooks/useOnlineManager';
import { useAppState } from '@/hooks/useAppState';
import { toastConfig } from '@/config/toast';
import { useInterstitialAd } from '@/store/useInterstitialAd';
import { LoadingModal } from '@/components/LoadingModal';
import { useLoadingStore } from '@/store/useLoadingStore';

import {
  useFonts,
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light_Italic,
  Poppins_400Regular_Italic,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black_Italic,
} from '@expo-google-fonts/poppins';
import { AdEventType, AppOpenAd } from 'react-native-google-mobile-ads';

const MIN_TIME_BETWEEN_ADS = 60 * 1000; // 1 dakika (milisaniye cinsinden)

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: '(onboarding)',
};

// Loading overlay component
const LoadingOverlay = () => (
  <View style={styles.overlay}>
    <ActivityIndicator size="large" color="#7C4DFF" />
  </View>
);

const appOpenAdUnitId = 'ca-app-pub-6312844121446107/5033994003';

// Protected Route kontrolü için yeni component
function InitialLayout() {
  const segments = useSegments();
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const { lastShowTime, setLastShowTime, canShowAd } = useInterstitialAd();
  const { isLoading: globalLoading } = useLoadingStore();

  const showAppOpenAd = async (): Promise<AppOpenAd | null> => {
    if (!user?.zodiacSign || !canShowAd()) return null;

    const appOpenAd = AppOpenAd.createForAdRequest(appOpenAdUnitId, {
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

    try {
      await appOpenAd.load();

      appOpenAd.addAdEventListener(AdEventType.LOADED, () => {
        console.log('App Open Ad loaded');
        appOpenAd.show().catch(console.error);
        setLastShowTime(Date.now());
      });

      appOpenAd.addAdEventListener(AdEventType.ERROR, (error) => {
        console.error('App Open Ad error:', error);
      });

      appOpenAd.addAdEventListener(AdEventType.CLOSED, () => {
        console.log('App Open Ad closed');
      });

      return appOpenAd;
    } catch (error) {
      console.error('App Open Ad load error:', error);
      return null;
    }
  };

  useEffect(() => {
    let appOpenAd: AppOpenAd | null = null;

    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active' && canShowAd()) {
        if (appOpenAd) {
          appOpenAd.removeAllListeners();
        }
        appOpenAd = await showAppOpenAd();
      }
    };

    // İlk açılışta reklamı göster
    showAppOpenAd().then((ad) => {
      appOpenAd = ad;
    });

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
      if (appOpenAd) {
        appOpenAd.removeAllListeners();
      }
    };
  }, [user]);

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inOnboardingGroup = segments[0] === '(onboarding)';
    const inMainGroup = segments[0] === '(main)';

    if (!user) {
      // Kullanıcı giriş yapmamışsa ve main grubuna erişmeye çalışıyorsa
      if (inMainGroup) {
        router.replace('/(onboarding)');
      }
    } else {
      // Kullanıcı giriş yapmışsa ve auth veya onboarding grubundaysa
      if (inAuthGroup || inOnboardingGroup) {
        router.replace('/(main)/you');
      }
    }
  }, [user, segments, isLoading]);

  return <Stack screenOptions={{ headerShown: false }} />;
}

// Query Client yapılandırması
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 saat
      staleTime: 1000 * 60 * 5, // 5 dakika
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: Platform.OS === 'web',
      refetchOnReconnect: true,
      refetchOnMount: true,
    },
    mutations: {
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

// App State ve Focus yönetimi için hook'lar
function useQueryConfig() {
  useOnlineManager();
  useAppState();
}

export default function RootLayout() {
  const systemColorScheme = useColorScheme();
  const { setDarkMode } = useDarkMode();

  // Query yapılandırmasını uygula
  useQueryConfig();

  useEffect(() => {
    setDarkMode(systemColorScheme === 'dark');
  }, [systemColorScheme]);

  let [fontsLoaded, fontError] = useFonts({
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light_Italic,
    Poppins_400Regular_Italic,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black_Italic,
  });

  useEffect(() => {
    const hideSplash = async () => {
      if (fontsLoaded || fontError) {
        await SplashScreen.hideAsync();
      }
    };

    hideSplash();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return <LoadingOverlay />;
  }

  if (fontError) {
    console.error('Font yükleme hatası:', fontError);
    // Hata durumunda varsayılan fontlarla devam et
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <LanguageProvider>
          <ThemeProvider>
            <View className="flex-1 bg-background-light dark:bg-background-dark">
              <AuthProvider>
                <InitialLayout />
              </AuthProvider>
              <Toast config={toastConfig} />
            </View>
          </ThemeProvider>
        </LanguageProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});
