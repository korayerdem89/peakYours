import firestore from '@react-native-firebase/firestore';

export const FirestoreService = {
  setDoc: async (
    collection: string,
    docId: string,
    data: any,
    options?: { merge?: boolean }
  ): Promise<void> => {
    try {
      await firestore().collection(collection).doc(docId).set(data, options);
    } catch (error) {
      console.error('Firestore setDoc error:', error);
      throw error;
    }
  },

  getDoc: async <T>(collection: string, docId: string): Promise<T | null> => {
    try {
      const doc = await firestore().collection(collection).doc(docId).get();

      return doc.exists ? (doc.data() as T) : null;
    } catch (error) {
      console.error('Firestore getDoc error:', error);
      throw error;
    }
  },

  updateDoc: async <T extends object>(
    collection: string,
    docId: string,
    data: Partial<T>
  ): Promise<void> => {
    try {
      await firestore().collection(collection).doc(docId).update(data);
    } catch (error) {
      console.error('Firestore updateDoc error:', error);
      throw error;
    }
  },
};
