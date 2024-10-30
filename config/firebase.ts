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
    await GoogleSignin.signOut();
    await fbAuth.signOut();
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
