import { View, Text, Pressable } from 'react-native';
import { memo } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

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
    // Artı butonu için opacity animasyonu
    const increaseButtonStyle = useAnimatedStyle(
      () => ({
        opacity: withTiming(points === maxPoints || remainingPoints === 0 ? 0.4 : 1, {
          duration: 200,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        }),
      }),
      [points, remainingPoints]
    );

    // Eksi butonu için opacity animasyonu
    const decreaseButtonStyle = useAnimatedStyle(
      () => ({
        opacity: withTiming(points === 0 ? 0.4 : 1, {
          duration: 200,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        }),
      }),
      [points]
    );

    // Modern segment render
    const renderSegments = () => {
      return Array.from({ length: maxPoints }, (_, index) => (
        <View key={index} className="flex-1 px-[1.5px]">
          <View
            className="h-2 rounded-full"
            style={{
              backgroundColor: points > index ? color : 'rgb(229, 231, 235)',
              opacity: points > index ? 1 : 0.5,
              transform: [{ scale: points > index ? 1 : 0.85 }],
            }}
          />
        </View>
      ));
    };

    return (
      <View className="mb-4">
        {/* Header Section */}
        <View className="mb-2 flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Text className="font-semibold text-sm" style={{ color }} numberOfLines={1}>
              {label}
            </Text>
            <Text className="text-xs text-gray-500">
              {points}/{maxPoints}
            </Text>
          </View>

          {/* Controls Section */}
          <View className="flex-row items-center gap-4 rounded-full bg-gray-50 px-2 py-1">
            <AnimatedPressable
              onPress={onDecrease}
              disabled={points === 0}
              hitSlop={16}
              style={[
                {
                  padding: 6,
                  borderRadius: 16,
                },
                decreaseButtonStyle,
              ]}>
              <MaterialIcons name="remove-circle-outline" size={22} color={color} />
            </AnimatedPressable>

            <Text className="w-8 text-center font-bold text-base" style={{ color }}>
              {points}
            </Text>

            <AnimatedPressable
              onPress={onIncrease}
              disabled={points === maxPoints || remainingPoints === 0}
              hitSlop={16}
              style={[
                {
                  padding: 6,
                  borderRadius: 16,
                },
                increaseButtonStyle,
              ]}>
              <MaterialIcons name="add-circle-outline" size={22} color={color} />
            </AnimatedPressable>
          </View>
        </View>

        {/* Progress Bar */}
        <View className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
          <View className="flex-row">{renderSegments()}</View>
        </View>
      </View>
    );
  },
  (prev, next) => {
    return prev.points === next.points && prev.remainingPoints === next.remainingPoints;
  }
);
