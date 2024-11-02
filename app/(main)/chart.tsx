import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useState } from 'react';
import { i18n } from '@/providers/LanguageProvider';
import { useColorScheme } from 'nativewind';
import { theme } from '@/constants/theme';
import GoodSidesRoute from '../../components/main/GoodSidesRoute';

// Bad sides için geçici komponent
const BadsidesRoute = React.memo(() => (
  <View className="flex-1 bg-background-tab p-4 dark:bg-background-dark">
    {/* Bad sides içeriği */}
  </View>
));

export default function Chart() {
  const layout = useWindowDimensions();
  const { colorScheme } = useColorScheme();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'goodsides', title: i18n.t('tabs.goodsides') },
    { key: 'badsides', title: i18n.t('tabs.badsides') },
  ]);

  // initialLayout'u performans için ekleyelim
  const initialLayout = {
    width: layout.width,
  };

  // SceneMap'i optimize edelim
  const renderScene = SceneMap({
    goodsides: GoodSidesRoute,
    badsides: BadsidesRoute,
  });

  const renderTabBar = (props: any) => (
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

  return (
    <SafeAreaView className="flex-1 bg-background-tab dark:bg-background-dark">
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
        lazy={false} // Performans için lazy loading'i kapatıyoruz
      />
    </SafeAreaView>
  );
}
