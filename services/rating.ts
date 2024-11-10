import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { TraitAverages, RatingData, TraitRating } from '@/types/traits';

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

  async getTraitAverages(
    referenceCode: string,
    type: 'goodsides' | 'badsides'
  ): Promise<TraitAverages[]> {
    try {
      const ratingsRef = firestore().collection('refCodes').doc(referenceCode).collection(type);

      const snapshot = await ratingsRef.get();

      if (snapshot.empty) {
        return [];
      }

      const traitTotals = new Map<string, { total: number; count: number }>();

      snapshot.docs.forEach((doc) => {
        const data = doc.data() as RatingData;
        if (!data.traits) return;

        data.traits.forEach((trait) => {
          const current = traitTotals.get(trait.name) || { total: 0, count: 0 };
          traitTotals.set(trait.name, {
            total: current.total + trait.points,
            count: current.count + 1,
          });
        });
      });

      return Array.from(traitTotals.entries()).map(([trait, { total, count }]) => ({
        trait,
        averagePoints: Number((total / count).toFixed(1)),
        totalRatings: count,
      }));
    } catch (error) {
      console.error('Error fetching trait averages:', error);
      throw error;
    }
  },
};
