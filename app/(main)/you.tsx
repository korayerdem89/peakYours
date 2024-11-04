import React, { useCallback } from 'react';
import { View, useWindowDimensions, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useState, useMemo } from 'react';
import { useColorScheme } from 'nativewind';
import { theme } from '@/constants/theme';
import GoodSidesRoute from '../../components/main/GoodSidesRoute';
import { useTranslation } from '@/providers/LanguageProvider';
import { TabRoute, TabViewProps } from '@/types';
import { useAuth } from '@/store/useAuth';
import { useFocusEffect } from '@react-navigation/native';
import { useUpdateUser, useUserData } from '@/hooks/useUserQueries';
import QuoteCard from '@/components/main/QuoteCard';

// Bad sides için geçici komponent
const BadsidesRoute = React.memo(() => (
  <View className="flex-1 bg-background-tab p-4 dark:bg-background-dark">
    {/* Bad sides içeriği */}
  </View>
));

export default function YouScreen() {
  const { t, locale } = useTranslation();
  const layout = useWindowDimensions();
  const { colorScheme } = useColorScheme();
  const [index, setIndex] = useState(0);
  const { user } = useAuth();
  const { data: userData } = useUserData(user?.uid);
  const updateUser = useUpdateUser();
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
    badsides: BadsidesRoute,
  });

  const renderTabBar = (props: TabViewProps) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor:
          colorScheme === 'dark' ? theme.colors.accent.light : theme.colors.secondary.dark,
      }}
      style={{
        backgroundColor: colorScheme === 'dark' ? '#131A2A' : '#FAFAFA',
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
      activeColor={colorScheme === 'dark' ? theme.colors.accent.light : theme.colors.secondary.dark}
      inactiveColor={colorScheme === 'dark' ? '#C5CEE0' : '#8F9BB3'}
      pressColor="transparent"
      scrollEnabled={false}
    />
  );

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

  return (
    <SafeAreaView className="flex-1 bg-background-tab dark:bg-background-dark">
      <View className="px-4 pt-4">
        <QuoteCard />
      </View>
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
