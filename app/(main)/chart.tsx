import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useState } from 'react';
import { i18n } from '@/providers/LanguageProvider';
import { useColorScheme } from 'nativewind';
import { theme } from '@/constants/theme';
// Tab içerikleri için ayrı komponentler
const GoodsidesRoute = React.memo(() => (
  <View className="bg-background-tab flex-1 p-4 dark:bg-background-dark">
    {/* Good sides içeriği */}
  </View>
));

const BadsidesRoute = React.memo(() => (
  <View className="bg-background-tab flex-1 p-4 dark:bg-background-dark">
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

  const renderScene = SceneMap({
    goodsides: GoodsidesRoute,
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
        backgroundColor: colorScheme === 'dark' ? '#131A2A' : '#FDF9EA',
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
    <SafeAreaView className="bg-background-tab flex-1 dark:bg-background-dark">
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
}
