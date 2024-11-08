import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { theme } from '../constants/theme';
import { useDarkMode } from '@/store/useDarkMode';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  title?: string;
  isLoading?: boolean;
}

function Button({
  variant = 'primary',
  size = 'md',
  title,
  disabled,
  style,
  isLoading,
  ...props
}: ButtonProps) {
  const { isDarkMode } = useDarkMode();
  const scale = useSharedValue(1);
  const pressed = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(pressed.value, [0, 1], [1, 0.8], Extrapolate.CLAMP);

    return {
      transform: [{ scale: scale.value }],
      opacity,
    };
  });

  const handlePressIn = () => {
    pressed.value = withSpring(1);
    scale.value = withSpring(0.95, {
      damping: 10,
      stiffness: 400,
    });
  };

  const handlePressOut = () => {
    pressed.value = withSpring(0);
    scale.value = withSequence(
      withSpring(1.02, { damping: 10, stiffness: 400 }),
      withSpring(1, { damping: 10, stiffness: 400 })
    );
  };

  return (
    <AnimatedTouchable
      disabled={disabled || isLoading}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.button,
        variant === 'primary' && styles.primaryButton,
        variant === 'secondary' && styles.secondaryButton,
        variant === 'outline' && styles.outlineButton,
        size === 'sm' && styles.smallButton,
        size === 'md' && styles.mediumButton,
        size === 'lg' && styles.largeButton,
        disabled && styles.disabledButton,
        isDarkMode && styles.darkModeButton,
        !isDarkMode && variant !== 'outline' && { ...theme.shadows.md },
        animatedStyle,
        style,
      ]}
      {...props}>
      <Text
        style={[
          styles.text,
          size === 'sm' && styles.smallText,
          size === 'md' && styles.mediumText,
          size === 'lg' && styles.largeText,
          variant === 'outline' && styles.outlineText,
          isDarkMode && styles.darkModeText,
        ]}>
        {title}
      </Text>
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background.light,

    overflow: 'hidden',
  },
  primaryButton: {
    backgroundColor: theme.colors.primary.default,
  },
  secondaryButton: {
    backgroundColor: theme.colors.secondary.default,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary.default,
  },
  disabledButton: {
    opacity: 0.5,
  },
  text: {
    color: theme.colors.text.dark,
    fontSize: theme.fontSize.base,
    fontWeight: '500',
  },
  outlineText: {
    color: theme.colors.primary.default,
  },
  smallButton: {
    padding: theme.spacing.sm,
  },
  mediumButton: {
    padding: theme.spacing.md,
  },
  largeButton: {
    padding: theme.spacing.lg,
  },
  smallText: {
    fontSize: theme.fontSize.sm,
    fontFamily: theme.fontFamily.regular,
  },
  mediumText: {
    fontSize: theme.fontSize.base,
    fontFamily: theme.fontFamily.regular,
  },
  largeText: {
    fontSize: theme.fontSize.lg,
    fontFamily: theme.fontFamily.regular,
  },
  darkModeButton: {
    borderColor: theme.colors.text.dark,
  },
  darkModeText: {
    color: theme.colors.text.dark,
  },
});

export default Button;
