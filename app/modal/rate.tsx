import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, ScrollView, useWindowDimensions, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from '@/providers/LanguageProvider';
import { ReferenceCodeInput } from '@/components/rate/ReferenceCodeInput';
import { UserNotFound } from '@/components/rate/UserNotFound';
import Animated, { FadeIn } from 'react-native-reanimated';
import { TabView, SceneMap, TabBar, Route } from 'react-native-tab-view';
import { useColorScheme } from 'nativewind';
import { theme } from '@/constants/theme';
import { TabViewProps } from '@/types';
import { FirestoreService } from '@/services/firestore';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { RefCode } from '@/types/refCode';
import { UserData } from '@/types/user';
import { Image as RNImage } from 'react-native';
import { GoodSidesRateRoute } from '@/components/rate/GoodSidesRateRoute';
import { BadSidesRateRoute } from '@/components/rate/BadSidesRateRoute';

const DEFAULT_AVATAR = 'https://ui-avatars.com/api/?background=random';

export default function RateScreen() {
  const { t, locale } = useTranslation();
  const layout = useWindowDimensions();
  const { colorScheme } = useColorScheme();
  const [referenceCode, setReferenceCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [userNotFound, setUserNotFound] = useState(false);
  const [foundUserId, setFoundUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  const routes = useMemo(
    () => [
      { key: 'goodsides', title: t('tabs.goodsides') },
      { key: 'badsides', title: t('tabs.badsides') },
    ],
    [locale, t]
  );

  const renderScene = useCallback(
    ({ route }: { route: Route }) => {
      switch (route.key) {
        case 'goodsides':
          return <GoodSidesRateRoute referenceCode={referenceCode} />;
        case 'badsides':
          return <BadSidesRateRoute referenceCode={referenceCode} />;
        default:
          return null;
      }
    },
    [referenceCode]
  );

  const renderTabBar = useMemo(
    () => (props: TabViewProps) => (
      <TabBar
        {...props}
        indicatorStyle={{
          backgroundColor:
            colorScheme === 'dark' ? theme.colors.accent.light : theme.colors.secondary.dark,
        }}
        style={{
          backgroundColor: colorScheme === 'dark' ? '#131A2A' : '#FAFAFA',
          opacity: userNotFound || isLoading ? 0.5 : 1,
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
          colorScheme === 'dark' ? theme.colors.accent.light : theme.colors.secondary.dark
        }
        inactiveColor={colorScheme === 'dark' ? '#C5CEE0' : '#8F9BB3'}
        pressColor="transparent"
        scrollEnabled={false}
        onTabPress={({ preventDefault }) => {
          if (userNotFound || isLoading) {
            preventDefault();
          }
        }}
      />
    ),
    [colorScheme, layout.width, userNotFound, isLoading]
  );

  const formatDisplayName = (displayName: string | null) => {
    if (!displayName) return '';

    const names = displayName.trim().split(' ');
    if (names.length === 1) return names[0];

    const firstName = names[0];
    const lastName = names[names.length - 1];
    const lastNameInitial = lastName.charAt(0);
    const dots = '.';

    return `${firstName} ${lastNameInitial}${dots}`;
  };

  const handleCodeChange = async (code: string) => {
    setReferenceCode(code);
    setUserNotFound(false);
    setFoundUserId(null);
    setUserData(null);

    if (code.length === 6) {
      setIsLoading(true);
      try {
        const refCodeDoc = await FirestoreService.getDoc<RefCode>('refCodes', code);

        if (!refCodeDoc) {
          setUserNotFound(true);
        } else {
          const userDoc = await FirestoreService.getDoc<UserData>('users', refCodeDoc.userId);
          if (userDoc) {
            setFoundUserId(refCodeDoc.userId);
            setUserData(userDoc);
          } else {
            setUserNotFound(true);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setUserNotFound(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleClearInput = () => {
    setReferenceCode('');
    setUserNotFound(false);
    setFoundUserId(null);
    setUserData(null);
  };

  const initialLayout = useMemo(
    () => ({
      width: layout.width,
      height: 0,
    }),
    [layout.width]
  );

  const handleClose = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <View className="flex-1 p-3">
        <View className="">
          <Pressable
            onPress={handleClose}
            className="w-full items-end"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <AntDesign
              name="closecircleo"
              size={24}
              color={colorScheme === 'dark' ? theme.colors.error.light : theme.colors.error.dark}
            />
          </Pressable>
          <Text className="text-center font-semibold text-lg text-primary-dark dark:text-primary-dark">
            {t('personality.rating.rateFriends')}
          </Text>
          <Text className="mb-2 text-center font-regular text-sm text-text-light-secondary dark:text-text-dark-secondary">
            {t('personality.rating.description')}
          </Text>

          <ReferenceCodeInput
            value={referenceCode}
            onChangeText={handleCodeChange}
            onClear={handleClearInput}
            isLoading={isLoading}
          />

          {userNotFound && !isLoading && <UserNotFound />}

          {userData && !isLoading && (
            <Animated.View
              entering={FadeIn.duration(200)}
              className="mt-1 flex-row items-center rounded-2xl bg-surface-light p-3 dark:bg-surface-dark">
              <RNImage
                source={{ uri: userData.photoURL || DEFAULT_AVATAR }}
                className="h-10 w-10 rounded-full bg-gray-200"
              />
              <Text className="font-poppins-medium ml-3 text-base text-text-light dark:text-text-dark">
                {t('personality.rating.rateUser', {
                  name: formatDisplayName(userData.displayName),
                })}
              </Text>
            </Animated.View>
          )}
        </View>

        {foundUserId && !isLoading && (
          <View className="mt-2 flex-1">
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              renderTabBar={renderTabBar}
              onIndexChange={setIndex}
              initialLayout={initialLayout}
              style={{ flex: 1 }}
              swipeEnabled={true}
              lazy={false}
              animationEnabled={true}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
