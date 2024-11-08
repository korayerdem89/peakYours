import React from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { theme } from '@/constants/theme';

export function UserNotFound() {
  return (
    <Animated.View
      entering={FadeIn.duration(400)}
      exiting={FadeOut.duration(300)}
      className="my-4 flex-row items-center justify-center gap-2">
      <MaterialIcons name="person-off" size={24} color={theme.colors.error.default} />
      <Text className="font-poppins-medium text-error-default text-base">User not found</Text>
    </Animated.View>
  );
}
