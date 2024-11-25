// İngilizce karakterler için set (zaten büyük harfli)
const ENGLISH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export function generateRefCodes(userId: string) {
  // İngilizce için 4 karakterli kod
  let englishCode = '';
  for (let i = 0; i < 4; i++) {
    englishCode += ENGLISH_CHARS.charAt(Math.floor(Math.random() * ENGLISH_CHARS.length));
  }

  // userId'nin son 2 karakterini al ve büyük harfe çevir
  const userIdSuffix = userId.slice(-2).toUpperCase();

  return {
    en: `${englishCode}${userIdSuffix}`,
  };
}
