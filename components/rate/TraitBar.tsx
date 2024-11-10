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
  disabled?: boolean;
  style?: any;
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
    disabled = false,
    style,
  }: TraitBarProps) => {
    // Artı butonu için opacity animasyonu
    const increaseButtonStyle = useAnimatedStyle(
      () => ({
        opacity: withTiming(disabled || points === maxPoints || remainingPoints === 0 ? 0.4 : 1, {
          duration: 200,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        }),
      }),
      [points, remainingPoints, disabled]
    );

    // Eksi butonu için opacity animasyonu
    const decreaseButtonStyle = useAnimatedStyle(
      () => ({
        opacity: withTiming(disabled || points === 0 ? 0.4 : 1, {
          duration: 200,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        }),
      }),
      [points, disabled]
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
      <View className="mb-3">
        <View className="mb-0.5 flex-row items-center justify-between">
          <View className="flex-row items-center gap-1">
            <Text className="text-2xs font-medium" style={{ color }} numberOfLines={1}>
              {label}
            </Text>
            <Text className="text-xs text-gray-500">
              {points}/{maxPoints}
            </Text>
          </View>

          <View className="flex-row items-center gap-1.5 rounded-full bg-gray-50 px-1 py-0.5">
            <AnimatedPressable
              onPress={onDecrease}
              disabled={disabled || points === 0}
              hitSlop={8}
              style={[
                {
                  padding: 3,
                  borderRadius: 10,
                },
                decreaseButtonStyle,
              ]}>
              <MaterialIcons
                name="remove-circle-outline"
                size={16}
                color={disabled ? '#9CA3AF' : color}
              />
            </AnimatedPressable>

            <Text
              className="w-5 text-center font-bold text-xs"
              style={{ color: disabled ? '#9CA3AF' : color }}>
              {points}
            </Text>

            <AnimatedPressable
              onPress={onIncrease}
              disabled={disabled || points === maxPoints || remainingPoints === 0}
              hitSlop={12}
              style={[
                {
                  padding: 4,
                  borderRadius: 12,
                },
                increaseButtonStyle,
              ]}>
              <MaterialIcons name="add-circle-outline" size={18} color={color} />
            </AnimatedPressable>
          </View>
        </View>

        <View className="h-1 w-full overflow-hidden rounded-full bg-gray-100">
          <View className="flex-row">{renderSegments()}</View>
        </View>
      </View>
    );
  },
  (prev, next) => {
    return prev.points === next.points && prev.remainingPoints === next.remainingPoints;
  }
);
