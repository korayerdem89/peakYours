import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { useTranslation } from '@/providers/LanguageProvider';

interface WelcomeModalProps {
  onClose: () => void;
  visible: boolean;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;
const COUNTDOWN_SECONDS = 4;

export default function WelcomeModal({ onClose, visible }: WelcomeModalProps) {
  const { t } = useTranslation();
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsButtonEnabled(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}>
      <View className="flex-1 items-center justify-center bg-black/70">
        <View
          className="mx-6 rounded-2xl bg-background-light dark:bg-surface-dark"
          style={{ width: CARD_WIDTH }}>
          <Image
            source={require('@/assets/rate/friends.png')}
            className="h-48 w-full rounded-t-2xl"
            resizeMode="cover"
          />

          <View className="gap-4 p-6">
            <Text
              className="font-semibold text-base text-text-light dark:text-text-dark"
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
              disabled={!isButtonEnabled}
              className={`mt-4 h-12 w-full items-center justify-center rounded-xl ${
                isButtonEnabled
                  ? 'bg-primary-light active:opacity-60 dark:bg-primary-dark'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}>
              <View className="flex-row items-center space-x-2">
                <Text
                  className="font-medium text-white"
                  style={{ fontFamily: 'Poppins_500Medium' }}>
                  {t('welcome.button')}
                </Text>
                {!isButtonEnabled && (
                  <Text
                    className="font-medium text-white"
                    style={{ fontFamily: 'Poppins_500Medium' }}>
                    ({countdown})
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
