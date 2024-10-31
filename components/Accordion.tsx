import { View, Text, TouchableOpacity, LayoutChangeEvent } from 'react-native';
import { useState, useCallback } from 'react';
import Animated, { useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import Entypo from '@expo/vector-icons/Entypo';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

export function Accordion({ title, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { height: layoutHeight } = event.nativeEvent.layout;
    setContentHeight(layoutHeight);
  }, []);

  const animatedStyle = useAnimatedStyle(
    () => ({
      height: withTiming(isOpen ? contentHeight : 0, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      }),
      opacity: withTiming(isOpen ? 1 : 0, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      }),
    }),
    [isOpen, contentHeight]
  );

  const iconStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          rotate: withTiming(isOpen ? '180deg' : '0deg', {
            duration: 300,
            easing: Easing.inOut(Easing.ease),
          }),
        },
      ],
    }),
    [isOpen]
  );

  return (
    <View className="overflow-hidden rounded-lg bg-background-light dark:bg-surface-dark">
      <TouchableOpacity
        onPress={() => setIsOpen(!isOpen)}
        className="flex-row items-center justify-between p-4">
        <Text className="text-md text-text-light dark:text-text-dark">{title}</Text>
        <Animated.View style={iconStyle}>
          <Entypo name="chevron-down" className="text-text-light dark:text-text-dark" size={14} />
        </Animated.View>
      </TouchableOpacity>

      <Animated.View style={[animatedStyle]} className="overflow-hidden">
        <View onLayout={onLayout} className="absolute left-0 right-0">
          {children}
        </View>
      </Animated.View>
    </View>
  );
}
