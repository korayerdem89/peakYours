import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import Button from '@/components/Button';
import { Feather } from '@expo/vector-icons';
import { useDarkMode } from '@/store/useDarkMode';
import { theme } from '@/constants/theme';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function OnboardingScreen() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const handleThemeToggle = () => {
    rotation.value = withSequence(withSpring(rotation.value + 180), withTiming(0));
    toggleDarkMode();
  };

  return (
    <View
      className="
      flex-1 
      items-center 
      justify-center 
      bg-background-light
      p-4
      dark:bg-background-dark
    ">
      <AnimatedPressable
        onPress={handleThemeToggle}
        style={[animatedStyle]}
        className="absolute right-6 top-12 p-2">
        <Feather
          name={isDarkMode ? 'sun' : 'moon'}
          size={24}
          color={isDarkMode ? theme.colors.text.dark : theme.colors.text.light}
        />
      </AnimatedPressable>

      <Text
        className={`
        font-poppins-semibold 
        mb-8 
        text-2xl 
        ${isDarkMode ? 'text-text-dark' : 'text-text-light'}
      `}>
        Onboarding Screen
      </Text>

      <Button
        onPress={() => router.push('/(auth)/sign-in')}
        className="w-full"
        title="Go to Sign In"
        variant="primary"
        size="sm"
      />
    </View>
  );
}
