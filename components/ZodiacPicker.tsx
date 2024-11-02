import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated';
import { Entypo } from '@expo/vector-icons';
import { useTranslation } from '@/providers/LanguageProvider';

interface ZodiacSign {
  id: string;
  name: string;
  icon: string;
  date: string;
}

const ZODIAC_SIGNS: ZodiacSign[] = [
  { id: 'aries', name: 'zodiac.aries', icon: '♈', date: '21/03 - 19/04' },
  { id: 'taurus', name: 'zodiac.taurus', icon: '♉', date: '20/04 - 20/05' },
  { id: 'gemini', name: 'zodiac.gemini', icon: '♊', date: '21/05 - 20/06' },
  { id: 'cancer', name: 'zodiac.cancer', icon: '♋', date: '21/06 - 22/07' },
  { id: 'leo', name: 'zodiac.leo', icon: '♌', date: '23/07 - 22/08' },
  { id: 'virgo', name: 'zodiac.virgo', icon: '♍', date: '23/08 - 22/09' },
  { id: 'libra', name: 'zodiac.libra', icon: '♎', date: '23/09 - 22/10' },
  { id: 'scorpio', name: 'zodiac.scorpio', icon: '♏', date: '23/10 - 21/11' },
  { id: 'sagittarius', name: 'zodiac.sagittarius', icon: '♐', date: '22/11 - 21/12' },
  { id: 'capricorn', name: 'zodiac.capricorn', icon: '♑', date: '22/12 - 19/01' },
  { id: 'aquarius', name: 'zodiac.aquarius', icon: '♒', date: '20/01 - 18/02' },
  { id: 'pisces', name: 'zodiac.pisces', icon: '♓', date: '19/02 - 20/03' },
];

interface ZodiacPickerProps {
  onSelect: (zodiacId: string) => void;
}

export function ZodiacPicker({ onSelect }: ZodiacPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<ZodiacSign | null>(null);
  const { t } = useTranslation();

  const handleSelect = (zodiac: ZodiacSign) => {
    setSelected(zodiac);
    setIsOpen(false);
    onSelect(zodiac.id);
  };

  return (
    <View className="w-full">
      <TouchableOpacity
        onPress={() => setIsOpen(!isOpen)}
        className="flex-row items-center justify-between rounded-lg bg-background-light p-4 dark:bg-surface-dark">
        <View className="flex-row items-center">
          <Text className="text-lg text-text-light dark:text-text-dark">
            {selected ? `${selected.icon} ${t(selected.name)}` : t('zodiac.select')}
          </Text>
        </View>
        <Animated.View style={{ transform: [{ rotate: isOpen ? '180deg' : '0deg' }] }}>
          <Entypo name="chevron-down" size={24} color="#8F9BB3" />
        </Animated.View>
      </TouchableOpacity>

      {isOpen && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          layout={Layout}
          className="absolute top-[calc(100%+8px)] z-50 w-full rounded-lg bg-background-light shadow-lg dark:bg-surface-dark">
          <ScrollView
            className="max-h-[300px]"
            showsVerticalScrollIndicator={true}
            bounces={false}
            keyboardShouldPersistTaps="handled"
            scrollEventThrottle={16}
            contentContainerStyle={{ paddingVertical: 8 }}>
            {ZODIAC_SIGNS.map((zodiac, index) => (
              <View key={zodiac.id}>
                <TouchableOpacity
                  onPress={() => handleSelect(zodiac)}
                  delayPressIn={200}
                  activeOpacity={0.7}
                  className="flex-row items-center p-4 active:bg-gray-100 dark:active:bg-gray-800">
                  <View className="flex-1 flex-row items-center">
                    <Text className="mr-2 text-2xl">{zodiac.icon}</Text>
                    <View>
                      <Text
                        className="text-base text-text-light dark:text-text-dark"
                        numberOfLines={1}>
                        {t(zodiac.name)}
                      </Text>
                      <Text
                        className="text-sm text-text-light-secondary dark:text-text-dark-secondary"
                        numberOfLines={1}>
                        {zodiac.date}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                {index < ZODIAC_SIGNS.length - 1 && (
                  <View className="h-[1px] w-full bg-gray-200 dark:bg-gray-700" />
                )}
              </View>
            ))}
          </ScrollView>
        </Animated.View>
      )}
    </View>
  );
}
