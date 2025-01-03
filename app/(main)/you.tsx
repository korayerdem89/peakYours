import React, { useCallback, useEffect } from 'react';
import {
  useWindowDimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
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
import { useAppUsage } from '@/hooks/useAppUsage';
import { router } from 'expo-router';
import WelcomeModal from '@/components/modals/WelcomeModal';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export default function YouScreen() {
  const { t, locale } = useTranslation();
  const layout = useWindowDimensions();
  const { colorScheme } = useColorScheme();
  const [index, setIndex] = useState(0);
  const { user } = useAuth();
  const { data: userData } = useUserData(user?.uid);

  const { isFirstTime, usageCount } = useAppUsage();
  const updateUser = useUpdateUser();
  const [shouldOpenDiscountedPaywall, setShouldOpenDiscountedPaywall] = useState(false);

  const [showWelcome, setShowWelcome] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    if (isFirstTime) {
      console.log('Setting showWelcome to true, isFirstTime:', isFirstTime);
      setShowWelcome(true);
    }
    setShouldOpenDiscountedPaywall(usageCount > 6 && usageCount % 4 === 0 && usageCount < 25);
  }, [isFirstTime, usageCount]);

  useEffect(() => {
    if (shouldOpenDiscountedPaywall) {
      router.push('/modal/discountedPaywall');
    }
  }, [shouldOpenDiscountedPaywall]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev === 0 ? 1 : 0));
    }, 10000); // 10 saniye

    return () => clearInterval(interval);
  }, []);

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

  const BANNER_HEIGHT = layout.height * 0.1;

  return (
    <SafeAreaView className="flex-1 bg-accent-light pt-4 dark:bg-background-dark">
      <View style={{ height: BANNER_HEIGHT }}>
        <ImageBackground
          source={require('@/assets/you/subscribeBanner.png')}
          style={{ height: '100%', width: layout.width, justifyContent: 'center' }}>
          {currentBanner === 0 ? (
            <Animated.View
              entering={FadeIn.duration(500)}
              exiting={FadeOut.duration(500)}
              className="w-full flex-row items-center justify-center gap-10 px-8">
              <Image
                source={require('@/assets/you/lookIcon.png')}
                className="w-16"
                resizeMode="contain"
              />
              <View className="flex-1 flex-row items-center gap-4">
                <Text className="font-medium text-sm text-primary-dark">
                  {t('you.subscribeText')}{' '}
                  <TouchableOpacity
                    onPress={() => router.push('/modal/paywall')}
                    className="active:opacity-60">
                    <Text className="font-bold text-base text-primary-dark underline">
                      {t('you.subscribeCTA')}
                    </Text>
                  </TouchableOpacity>
                </Text>
              </View>
            </Animated.View>
          ) : (
            <Animated.View
              entering={FadeIn.duration(500)}
              exiting={FadeOut.duration(500)}
              className="w-full flex-row items-center justify-center gap-10 px-8">
              <Image
                source={require('@/assets/you/rateIcon.png')}
                className="w-16"
                resizeMode="contain"
              />
              <Text className="flex-wrap font-medium text-sm text-primary-dark">
                {t('you.rateInvite')}{' '}
              </Text>
            </Animated.View>
          )}
        </ImageBackground>
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
        lazy={false}
      />
      <WelcomeModal visible={showWelcome} onClose={() => setShowWelcome(false)} />
    </SafeAreaView>
  );
}
