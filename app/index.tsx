import { View, Text } from 'react-native';
import Button from '@/components/Button';

export default function Home() {
  return (
    <View className="flex-1 gap-4 p-4">
      <Button onPress={() => console.log('Pressed!')} title="Button" />
      <Text>Hello</Text>
    </View>
  );
}
