import '@/global.css';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { View, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { useEffect } from 'react';
import { useDarkMode } from '@/store/useDarkMode';
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
import { RevenueCatProvider } from '@/providers/RevenueCatProvider';
import { TraitProvider } from '@/providers/TraitProvider';
import { useAppUsage } from '@/hooks/useAppUsage';

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

// Protected Route kontrolü için yeni component
function InitialLayout() {
  const segments = useSegments();
  const router = useRouter();
  const { user } = useAuth();
  const { setIsLoading } = useLoadingStore();
  const { isFirstTime } = useAppUsage();
  console.log(isFirstTime, 'isFirsttt');
  useEffect(() => {
    async function initialNavigation() {
      try {
        setIsLoading(true);
        await SplashScreen.hideAsync();

        // Kullanıcı durumuna göre tek seferlik yönlendirme
        if (!user && segments[0] !== '(onboarding)') {
          router.replace('/(onboarding)');
        } else if (user && segments[0] !== '(main)') {
          router.replace('/(main)/you');
        }
      } catch (error) {
        console.error('Navigation error:', error);
        router.replace('/(onboarding)');
      } finally {
        setIsLoading(false);
      }
    }

    initialNavigation();
  }, [user]);

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
  // const systemColorScheme = useColorScheme();
  const { setDarkMode } = useDarkMode();
  const { isLoading } = useLoadingStore();

  // Query yapılandırmasını uygula
  useQueryConfig();

  useEffect(() => {
    setDarkMode(false);
  }, []);

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
      <RevenueCatProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <LanguageProvider>
            <ThemeProvider>
              <View className="flex-1 bg-background-light dark:bg-background-dark">
                <AuthProvider>
                  <TraitProvider>
                    <InitialLayout />
                  </TraitProvider>
                </AuthProvider>
                <LoadingModal visible={isLoading} />
                <Toast config={toastConfig} />
              </View>
            </ThemeProvider>
          </LanguageProvider>
        </GestureHandlerRootView>
      </RevenueCatProvider>
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
