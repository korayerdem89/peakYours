import {
  View,
  Text,
  TouchableOpacity,
  Modal as RNModal,
  useWindowDimensions,
  Image,
} from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Entypo } from '@expo/vector-icons';
import { useTranslation } from '@/providers/LanguageProvider';
import { useState } from 'react';
import Toast from 'react-native-toast-message';

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

interface ZodiacModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (zodiacId: string) => Promise<void>;
}

export function ZodiacModal({ visible, onClose, onSubmit }: ZodiacModalProps) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelect = async (zodiacId: string) => {
    try {
      setIsSubmitting(true);
      await onSubmit(zodiacId);

      Toast.show({
        type: 'success',
        text1: t('zodiac.toast.title'),
        text2: t('zodiac.toast.message'),
        position: 'bottom',
        visibilityTime: 3000,
        autoHide: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <RNModal visible={visible} animationType="fade" transparent={false} statusBarTranslucent>
      <Animated.View
        entering={FadeIn}
        className="flex-1 bg-background-light pt-9 dark:bg-background-dark">
        <View className="border-b border-gray-200 px-4 py-4 dark:border-gray-700">
          <Text className="text-center font-semibold text-lg text-text-light dark:text-text-dark">
            {t('zodiac.modalTitle')}
          </Text>
          <Text className="mt-1 text-center font-regular text-sm text-text-light-secondary dark:text-text-dark-secondary">
            {t('zodiac.modalDescription')}
          </Text>
        </View>

        <View className="flex-1 px-3 py-2">
          <View className="flex-row flex-wrap justify-between">
            {ZODIAC_SIGNS.map((zodiac, index) => (
              <TouchableOpacity
                key={zodiac.id}
                onPress={() => handleSelect(zodiac.id)}
                disabled={isSubmitting}
                className="mb-3 w-[30%] rounded-lg bg-surface-light p-2 active:bg-gray-100 dark:bg-surface-dark dark:active:bg-gray-800">
                <View className="items-center">
                  <Text className="mb-1 font-medium text-2xl">{zodiac.icon}</Text>
                  <Text className="text-center font-medium text-sm text-text-light dark:text-text-dark">
                    {t(zodiac.name)}
                  </Text>
                  <Text className="text-center font-regular text-xs text-text-light-secondary dark:text-text-dark-secondary">
                    {zodiac.date}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="align-center flex-1 justify-center px-4 pb-8">
          <Image
            source={{
              uri: 'https://fastly.picsum.photos/id/690/200/300.jpg?hmac=YX9nONyDZ_zuGZ5wLOen_mxLWVHEsjpkADU43laON4M',
            }}
            className="h-80 w-full rounded-md border-8"
          />
        </View>
      </Animated.View>
    </RNModal>
  );
}
