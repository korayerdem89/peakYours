import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

interface TraitRating {
  name: string;
  points: number;
}

interface RatingData {
  traits: TraitRating[];
  ratedBy: string;
  createdAt: FirebaseFirestoreTypes.FieldValue;
  updatedAt: FirebaseFirestoreTypes.FieldValue;
}

export const RatingService = {
  async saveRating(
    referenceCode: string,
    ratedBy: string,
    traits: TraitRating[],
    type: 'goodsides' | 'badsides'
  ) {
    const ratingData: RatingData = {
      traits,
      ratedBy,
      createdAt: firestore.FieldValue.serverTimestamp(),
      updatedAt: firestore.FieldValue.serverTimestamp(),
    };

    await firestore()
      .collection('refCodes')
      .doc(referenceCode)
      .collection(type)
      .doc(ratedBy)
      .set(ratingData);
  },

  async deleteRating(referenceCode: string, userId: string, type: 'goodsides' | 'badsides') {
    await firestore()
      .collection('refCodes')
      .doc(referenceCode)
      .collection(type)
      .doc(userId)
      .delete();
  },

  async checkExistingRating(referenceCode: string, userId: string, type: 'goodsides' | 'badsides') {
    try {
      const doc = await firestore()
        .collection('refCodes')
        .doc(referenceCode)
        .collection(type)
        .doc(userId)
        .get();

      return doc.exists;
    } catch (error) {
      console.error('Error checking existing rating:', error);
      throw error;
    }
  },

  async getPreviousRating(referenceCode: string, userId: string, type: 'goodsides' | 'badsides') {
    try {
      const doc = await firestore()
        .collection('refCodes')
        .doc(referenceCode)
        .collection(type)
        .doc(userId)
        .get();

      if (doc.exists) {
        return doc.data() as RatingData;
      }
      return null;
    } catch (error) {
      console.error('Error getting previous rating:', error);
      throw error;
    }
  },
};
