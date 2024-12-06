import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Firebase servislerinin konfigürasyonu
firestore().settings({
  cacheSizeBytes: firestore.CACHE_SIZE_UNLIMITED,
});

// Firebase servislerinin instance'larını oluştur
const db = firestore();
const fbAuth = auth();
const fbStorage = storage();

// Hata yakalama
const handleError = (error: Error) => {
  console.error('Firebase Error:', error);
};

// Global bir state temizleme fonksiyonu
let clearAuthStates: (() => void) | null = null;

export const registerClearAuthStates = (callback: () => void) => {
  clearAuthStates = callback;
};

// Firebase servislerini export et
export { db, fbAuth, fbStorage, handleError, GoogleSignin };

// Tip tanımlamaları
export type FirebaseError = {
  code: string;
  message: string;
  nativeErrorMessage?: string;
};

// Yardımcı fonksiyonlar
export const signOut = async () => {
  try {
    // Önce state'leri temizle
    if (clearAuthStates) {
      clearAuthStates();
    }

    // Sonra sign out işlemlerini yap
    await Promise.all([
      GoogleSignin.signOut().catch(() => null), // Hata olsa bile devam et
      fbAuth.signOut(),
    ]);
  } catch (error) {
    handleError(error as Error);
    throw error;
  }
};

export const getCurrentUser = () => {
  return fbAuth.currentUser;
};

// Firestore koleksiyon referansları
export const collections = {
  users: db.collection('users'),
  profiles: db.collection('profiles'),
  // Diğer koleksiyonlar...
};
