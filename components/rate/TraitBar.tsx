import { View, Text, Pressable, useWindowDimensions, ViewStyle } from 'react-native';
import { memo } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { theme } from '@/constants/theme';

interface TraitBarProps {
  name: string;
  points: number;
  color: string;
  maxPoints: number;
  onIncrease: () => void;
  onDecrease: () => void;
  remainingPoints: number;
  label: string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const TraitBar = memo(
  ({
    name,
    points,
    color,
    maxPoints,
    onIncrease,
    onDecrease,
    remainingPoints,
    label,
  }: TraitBarProps) => {
    const layout = useWindowDimensions();

    const animatedStyle = useAnimatedStyle(() => {
      return {
        width: `${(points / maxPoints) * 100}%`,
        backgroundColor: color,
      } as ViewStyle;
    });

    return (
      <View className="xs:mb-2 flex-row items-center justify-between sm:mb-2.5 md:mb-3">
        <View className="flex-1">
          <Text className="xs:text-xs font-medium text-text-light dark:text-text-dark sm:text-sm md:text-base">
            {label}
          </Text>
          <View className="xs:mt-1 flex-row items-center sm:mt-1.5 md:mt-2">
            <Animated.View
              style={animatedStyle}
              className="xs:h-1.5 rounded-full sm:h-2 md:h-2.5"
            />
          </View>
        </View>

        <View className="xs:ml-2 flex-row items-center sm:ml-2.5 md:ml-3">
          <Pressable
            onPress={onDecrease}
            disabled={points === 0}
            className="xs:p-1 rounded-full sm:p-1.5 md:p-2">
            <MaterialIcons
              name="remove-circle-outline"
              size={layout.width < 380 ? 20 : layout.width < 420 ? 22 : 24}
              color={points === 0 ? theme.colors.text.light : color}
            />
          </Pressable>

          <Text className="xs:w-6 xs:text-xs text-center font-medium sm:w-7 sm:text-sm md:w-8 md:text-base">
            {points}
          </Text>

          <Pressable
            onPress={onIncrease}
            disabled={points === maxPoints || remainingPoints === 0}
            className="xs:p-1 rounded-full sm:p-1.5 md:p-2">
            <MaterialIcons
              name="add-circle-outline"
              size={layout.width < 380 ? 20 : layout.width < 420 ? 22 : 24}
              color={
                points === maxPoints || remainingPoints === 0 ? theme.colors.text.light : color
              }
            />
          </Pressable>
        </View>
      </View>
    );
  },
  (prev, next) => {
    return prev.points === next.points && prev.remainingPoints === next.remainingPoints;
  }
);
