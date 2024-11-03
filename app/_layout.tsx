import '@/global.css';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { View, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useDarkMode } from '@/store/useDarkMode';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { AuthProvider } from '@/providers/AuthProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAuth } from '@/store/useAuth';
import { LanguageProvider } from '@/providers/LanguageProvider';
import Toast from 'react-native-toast-message';
import { QueryClient, QueryClientProvider, focusManager } from '@tanstack/react-query';
import { AppStateStatus, AppState } from 'react-native';
import { useOnlineManager } from '@/hooks/useOnlineManager';
import { useAppState } from '@/hooks/useAppState';

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
  const { user, isLoading } = useAuth();

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
        router.replace('/(main)/chart');
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
              <Toast />
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
