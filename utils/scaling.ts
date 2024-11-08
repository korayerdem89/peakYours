import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const isSmall = width <= 375;

const guidelineBaseWidth = () => {
  if (isSmall) return 380;
  return 410;
};

const h = (size: number) => (width / guidelineBaseWidth()) * size;

const guidelineBaseHeight = () => {
  if (isSmall) return 600;
  else if (width > 410) return 680;
  return 720;
};

const v = (size: number) => (height / guidelineBaseHeight()) * size;

const guidelineBaseFonts = () => {
  if (width > 410) return 480;
  return 460;
};

const f = (size: number) => Math.round((width / guidelineBaseFonts()) * size);

export { h, v, f };
