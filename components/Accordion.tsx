import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import Animated, {
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import Entypo from '@expo/vector-icons/Entypo';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

export function Accordion({ title, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: withSpring(isOpen ? 100 : 0, {
        damping: 15,
        mass: 1,
        stiffness: 100,
      }),
      opacity: withSpring(isOpen ? 1 : 0),
    };
  }, [isOpen]);

  const iconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withSpring(`${isOpen ? 180 : 0}deg`, {
            damping: 15,
            mass: 1,
            stiffness: 100,
          }),
        },
      ],
    };
  }, [isOpen]);

  return (
    <View className="overflow-hidden rounded-lg bg-surface-light dark:bg-surface-dark">
      <TouchableOpacity
        onPress={() => setIsOpen(!isOpen)}
        className="flex-row items-center justify-between p-4">
        <Text className="text-md text-text-light dark:text-text-dark">{title}</Text>
        <Animated.View style={iconStyle}>
          <Entypo name="chevron-down" className="text-text-light dark:text-text-dark" size={14} />
        </Animated.View>
      </TouchableOpacity>

      <Animated.View style={animatedStyle} className="px-4">
        {children}
      </Animated.View>
    </View>
  );
}
