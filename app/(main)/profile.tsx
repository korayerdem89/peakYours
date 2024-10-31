import { View, Text } from 'react-native';

export default function ProfileScreen() {
  return (
    <View className="bg-background-tab flex-1 flex-1 items-center justify-center dark:bg-background-dark">
      <Text className="font-poppins-semibold text-2xl text-text-light dark:text-text-dark">
        Profile Screen
      </Text>
    </View>
  );
}
