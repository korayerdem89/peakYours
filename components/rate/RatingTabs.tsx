import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  withSpring,
  interpolateColor,
  useSharedValue,
} from 'react-native-reanimated';

interface RatingTabsProps {
  activeTab: 'good' | 'bad';
  onTabChange: (tab: 'good' | 'bad') => void;
  disabled?: boolean;
}

export function RatingTabs({ activeTab, onTabChange, disabled }: RatingTabsProps) {
  const indicatorPosition = useSharedValue(activeTab === 'good' ? 0 : 1);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(indicatorPosition.value * 100),
      },
    ],
  }));

  return (
    <View className="mx-3 mt-4 overflow-hidden rounded-lg bg-surface-light dark:bg-surface-dark">
      <View className="flex-row">
        <Pressable
          onPress={() => {
            if (!disabled) {
              onTabChange('good');
              indicatorPosition.value = 0;
            }
          }}
          className="flex-1 items-center py-3"
          style={{ opacity: disabled ? 0.5 : 1 }}>
          <Text className="font-poppins-medium text-sm text-text-light dark:text-text-dark">
            Good Sides
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {
            if (!disabled) {
              onTabChange('bad');
              indicatorPosition.value = 1;
            }
          }}
          className="flex-1 items-center py-3"
          style={{ opacity: disabled ? 0.5 : 1 }}>
          <Text className="font-poppins-medium text-sm text-text-light dark:text-text-dark">
            Bad Sides
          </Text>
        </Pressable>
      </View>

      <Animated.View
        style={[indicatorStyle]}
        className="bg-secondary-default absolute bottom-0 h-0.5 w-1/2"
      />
    </View>
  );
}
