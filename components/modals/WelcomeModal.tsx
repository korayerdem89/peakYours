import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { useTranslation } from '@/providers/LanguageProvider';

interface WelcomeModalProps {
  onClose: () => void;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;

export default function WelcomeModal({ onClose }: WelcomeModalProps) {
  const { t } = useTranslation();

  return (
    <Modal transparent animationType="fade" statusBarTranslucent onRequestClose={onClose}>
      <View className="flex-1 items-center justify-center bg-black/70">
        <View
          className="mx-6 rounded-2xl bg-background-light dark:bg-surface-dark"
          style={{ width: CARD_WIDTH }}>
          <Image
            source={{ uri: 'https://picsum.photos/400/200' }}
            className="h-48 w-full rounded-t-2xl"
            resizeMode="cover"
          />

          <View className="space-y-4 p-6">
            <Text
              className="font-semibold text-xl text-text-light dark:text-text-dark"
              style={{ fontFamily: 'Poppins_600SemiBold' }}>
              {t('welcome.title')}
            </Text>

            <Text
              className="text-base text-text-light-secondary dark:text-text-dark-secondary"
              style={{ fontFamily: 'Poppins_400Regular' }}>
              {t('welcome.description')}
            </Text>

            <TouchableOpacity
              onPress={onClose}
              className="mt-4 h-12 w-full items-center justify-center rounded-xl bg-primary-light active:opacity-60 dark:bg-primary-dark">
              <Text className="font-medium text-white" style={{ fontFamily: 'Poppins_500Medium' }}>
                {t('welcome.button')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
