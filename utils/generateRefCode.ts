// İngilizce ve Çince karakterler için iki ayrı set
const ENGLISH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const CHINESE_CHARS = '的一是不了人我在有他这为之大来以个中上们';

export function generateRefCodes(userId: string) {
  // İngilizce için 4 karakterli kod
  let englishCode = '';
  for (let i = 0; i < 4; i++) {
    englishCode += ENGLISH_CHARS.charAt(Math.floor(Math.random() * ENGLISH_CHARS.length));
  }

  // Çince için 4 karakterli kod
  let chineseCode = '';
  for (let i = 0; i < 4; i++) {
    chineseCode += CHINESE_CHARS.charAt(Math.floor(Math.random() * CHINESE_CHARS.length));
  }

  return {
    en: `${englishCode}${userId.slice(-2)}`, // Son 2 karakteri userId'den al
    zh: `${chineseCode}${userId.slice(-2)}`,
  };
}
