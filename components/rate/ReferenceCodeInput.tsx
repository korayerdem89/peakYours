import React from 'react';
import { View, TextInput, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import { useTranslation } from '@/providers/LanguageProvider';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

interface ReferenceCodeInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  isLoading: boolean;
}

export function ReferenceCodeInput({
  value,
  onChangeText,
  onClear,
  isLoading,
}: ReferenceCodeInputProps) {
  const { t } = useTranslation();

  const containerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withSpring(isLoading ? 0.98 : 1),
      },
    ],
  }));

  return (
    <Animated.View
      style={[containerStyle]}
      className="mx-3 flex-row items-center rounded-xl bg-surface-light p-3 dark:bg-surface-dark">
      {value.length > 0 ? (
        <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)}>
          <Pressable onPress={onClear}>
            <MaterialIcons name="cancel" size={24} color={theme.colors.secondary.default} />
          </Pressable>
        </Animated.View>
      ) : (
        <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)}>
          <MaterialIcons name="search" size={20} color={theme.colors.secondary.default} />
        </Animated.View>
      )}

      <AnimatedTextInput
        value={value.toUpperCase()}
        onChangeText={(text) => onChangeText(text.toUpperCase().slice(0, 6))}
        placeholder={t('personality.rating.enterRefCode')}
        maxLength={6}
        autoFocus={true}
        editable={!isLoading}
        className="flex-1 pl-3 font-regular text-sm text-text-light dark:text-text-dark"
        placeholderTextColor={theme.colors.text.light}
        autoCapitalize="characters"
      />

      {isLoading && (
        <Animated.View entering={FadeIn.duration(300)} exiting={FadeOut.duration(200)}>
          <MaterialIcons
            name="refresh"
            size={24}
            color={theme.colors.secondary.default}
            style={{ transform: [{ rotate: '45deg' }] }}
          />
        </Animated.View>
      )}
    </Animated.View>
  );
}