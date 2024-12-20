import React, { useCallback, useEffect } from 'react';
import { useWindowDimensions, StatusBar, Platform } from 'react-native';
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
import BadSidesRoute from '@/components/main/BadSidesRoute';
import { BannerAd, BannerAdSize, RequestOptions } from 'react-native-google-mobile-ads';
import NetInfo from '@react-native-community/netinfo';

export default function YouScreen() {
  const { t, locale } = useTranslation();
  const layout = useWindowDimensions();
  const { colorScheme } = useColorScheme();
  const [index, setIndex] = useState(0);
  const { user } = useAuth();
  const { data: userData } = useUserData(user?.uid);
  const updateUser = useUpdateUser();
  const [bannerError, setBannerError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRY = 3;
  const RETRY_DELAY = 5000;

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

  const handleBannerError = useCallback(
    async (error: Error) => {
      console.error('Banner ad failed to load:', error);
      setBannerError(true);

      const networkState = await NetInfo.fetch();

      if (networkState.isConnected && retryCount < MAX_RETRY) {
        setTimeout(() => {
          setBannerError(false);
          setRetryCount((prev) => prev + 1);
        }, RETRY_DELAY);
      }
    },
    [retryCount]
  );

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected && bannerError) {
        setBannerError(false);
        setRetryCount(0);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [bannerError]);

  const requestOptions: RequestOptions = {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['personality', 'zodiac', 'traits', 'self-discovery', 'character'],
  };

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
          colorScheme === 'dark' ? theme.colors.primary.light : theme.colors.primary.dark
        }
        inactiveColor={colorScheme === 'dark' ? '#C5CEE0' : '#8F9BB3'}
        pressColor="transparent"
        scrollEnabled={false}
      />
    ),
    [colorScheme, layout.width]
  );

  return (
    <SafeAreaView className="flex-1 bg-accent-light pt-10 dark:bg-background-dark">
      {!bannerError && (
        <BannerAd
          unitId={'ca-app-pub-6312844121446107/2492397048'}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={requestOptions}
          onAdFailedToLoad={handleBannerError}
          onAdLoaded={() => {
            setBannerError(false);
            setRetryCount(0);
          }}
        />
      )}
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
