import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Animated, {
  FadeIn,
  withSpring,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
} from 'react-native-reanimated';
import { theme } from '@/constants/theme';
import { useTranslation } from '@/providers/LanguageProvider';
import { BlurView } from 'expo-blur';

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

interface UpgradeButtonProps {
  onPress?: () => void;
  className?: string;
}

export function UpgradeButton({ onPress, className = '' }: UpgradeButtonProps) {
  const { t } = useTranslation();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSequence(withSpring(0.95, { damping: 10 }), withSpring(1, { damping: 8 }));
    if (onPress) {
      onPress();
    } else {
      router.push('/modal/ideasPaywall');
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.9}
      className={`mt-4 w-full overflow-hidden rounded-2xl shadow-lg ${className}`}
      style={{
        shadowColor: theme.colors.primary.light,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
      }}>
      <AnimatedGradient
        colors={[theme.colors.primary.dark, theme.colors.primary.light]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[animatedStyle]}
        className="p-[1px]">
        <BlurView intensity={20} tint="dark" className="overflow-hidden rounded-2xl">
          <View className="bg-surface-dark/80 px-6 py-4">
            <Animated.View entering={FadeIn.duration(800)} className="items-center justify-center">
              <View className="flex-row items-center space-x-2">
                <Text className="text-center font-bold text-lg text-white">
                  {t('ideas.freemember.cta')}
                </Text>
                <View className="h-4 w-4">
                  <View className="absolute h-4 w-4 animate-ping rounded-full bg-primary-light opacity-75" />
                  <View className="relative h-3 w-3 rounded-full bg-primary-light" />
                </View>
              </View>
            </Animated.View>
          </View>
        </BlurView>
      </AnimatedGradient>
    </TouchableOpacity>
  );
}
