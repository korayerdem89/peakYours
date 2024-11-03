import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Text } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { BounceIn, FadeOut } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

const TAB_ICONS = {
  chart: {
    active: 'pie-chart',
    inactive: 'pie-chart-outline',
  },
  analysis: {
    active: 'analytics',
    inactive: 'analytics-outline',
  },
  tasks: {
    active: 'checkmark-circle',
    inactive: 'checkmark-circle-outline',
  },
  settings: {
    active: 'settings',
    inactive: 'settings-outline',
  },
};

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom,
        },
      ]}
      className="bg-background-light dark:bg-surface-dark">
      <View className="flex-row items-center justify-around py-2">
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          // @ts-ignore
          const iconName = TAB_ICONS[route.name]?.[isFocused ? 'active' : 'inactive'];

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              className={`items-center justify-center p-2 ${
                isFocused ? 'bg-background-tab dark:bg-background-dark' : ''
              } min-w-[80px] rounded-2xl`}
              style={isFocused ? styles.activeTab : null}>
              <Animated.View
                entering={BounceIn.duration(500)}
                exiting={FadeOut}
                className="items-center">
                <Ionicons
                  name={iconName}
                  size={24}
                  className={
                    isFocused
                      ? 'text-primary-light dark:text-primary-dark'
                      : 'text-text-light-secondary dark:text-text-dark-secondary'
                  }
                />
                <Text
                  className={`mt-1 font-medium text-xs ${
                    isFocused
                      ? 'text-primary-light dark:text-primary-dark'
                      : 'text-text-light-secondary dark:text-text-dark-secondary'
                  }`}>
                  {options.title || route.name}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  activeTab: {
    shadowColor: '#7C4DFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
});
