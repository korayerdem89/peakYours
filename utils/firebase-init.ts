import app from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

interface FirebaseServices {
  auth: typeof auth;
  firestore: typeof firestore;
  storage: typeof storage;
}

function initializeFirebase(): FirebaseServices {
  // Native platformlar için google-services.json ve GoogleService-Info.plist
  // dosyaları kullanılacağından manuel yapılandırma yapmaya gerek yok

  return {
    auth,
    firestore,
    storage,
  };
}

export default initializeFirebase;
