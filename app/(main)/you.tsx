import React, { useCallback, useEffect } from 'react';
import { View, useWindowDimensions, Text, Pressable, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useState, useMemo } from 'react';
import { useColorScheme } from 'nativewind';
import { theme } from '@/constants/theme';
import GoodSidesRoute from '../../components/main/GoodSidesRoute';
import { useTranslation } from '@/providers/LanguageProvider';
import { TabViewProps } from '@/types';
import { useAuth } from '@/store/useAuth';
import { useFocusEffect } from '@react-navigation/native';
import { useUpdateUser, useUserData } from '@/hooks/useUserQueries';
import QuoteCard from '@/components/main/QuoteCard';
import BadSidesRoute from '@/components/main/BadSidesRoute';
import {
  BannerAd,
  BannerAdSize,
  InterstitialAd,
  AdEventType,
} from 'react-native-google-mobile-ads';
import { useInterstitialAd } from '@/store/useInterstitialAd';
import { useLoadingStore } from '@/store/useLoadingStore';

const adUnitId = 'ca-app-pub-6312844121446107/7886655538';

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

export default function YouScreen() {
  const { t, locale } = useTranslation();
  const layout = useWindowDimensions();
  const { colorScheme } = useColorScheme();
  const [index, setIndex] = useState(0);
  const { user } = useAuth();
  const [loaded, setLoaded] = useState(false);
  const { data: userData } = useUserData(user?.uid);
  const updateUser = useUpdateUser();
  const showAd = useInterstitialAd((state) => state.showAd);
  const isLoaded = useInterstitialAd((state) => state.isLoaded);

  const routes = useMemo(
    () => [
      { key: 'goodsides', title: t('tabs.goodsides') },
      { key: 'badsides', title: t('tabs.badsides') },
    ],
    [locale, t]
  );

  const initialLayout = {
    width: layout.width,
  };

  const renderScene = SceneMap({
    goodsides: GoodSidesRoute,
    badsides: BadSidesRoute,
  });

  useEffect(() => {
    const unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
    });

    const unsubscribeOpened = interstitial.addAdEventListener(AdEventType.OPENED, () => {
      if (Platform.OS === 'ios') {
        StatusBar.setHidden(true);
      }
    });

    const unsubscribeClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      if (Platform.OS === 'ios') {
        StatusBar.setHidden(false);
      }
      setLoaded(false);
      interstitial.load();
    });

    interstitial.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeOpened();
      unsubscribeClosed();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (userData?.zodiacSign && user?.uid) {
        updateUser.mutateAsync({
          userId: user.uid,
          data: { zodiacSign: userData.zodiacSign },
        });
      }
    }, [userData?.zodiacSign])
  );

  const renderTabBar = useCallback(
    (props: TabViewProps) => (
      <TabBar
        {...props}
        indicatorStyle={{
          backgroundColor:
            colorScheme === 'dark' ? theme.colors.primary.dark : theme.colors.primary.light,
        }}
        style={{
          backgroundColor: colorScheme === 'dark' ? '#131A2A' : '#FAFAFA',
          marginTop: 10,
        }}
        tabStyle={{
          width: layout.width / 2,
          flex: 1,
        }}
        labelStyle={{
          fontFamily: 'Poppins_600SemiBold',
          textTransform: 'none',
          width: '100%',
          textAlign: 'center',
        }}
        activeColor={
          colorScheme === 'dark' ? theme.colors.primary.light : theme.colors.secondary.dark
        }
        inactiveColor={colorScheme === 'dark' ? '#C5CEE0' : '#8F9BB3'}
        pressColor="transparent"
        scrollEnabled={false}
        onTabPress={() => {
          if (isLoaded) {
            showAd();
          }
        }}
      />
    ),
    [colorScheme, layout.width, isLoaded, showAd]
  );

  if (!loaded) return null;

  return (
    <SafeAreaView className="flex-1 bg-accent-light pt-10 dark:bg-background-dark">
      <BannerAd
        unitId={'ca-app-pub-6312844121446107/2492397048'}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdFailedToLoad={(error: Error) => {
          console.error('Banner ad failed to load:', error);
        }}
      />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
        lazy={false}
      />
    </SafeAreaView>
  );
}
