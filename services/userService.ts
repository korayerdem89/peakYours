import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

export async function deleteUser(userId: string | undefined) {
  if (!userId) throw new Error('User ID is required');

  try {
    const batch = firestore().batch();

    // 1. Önce user dokümanını al (refCodes'u almak için)
    const userDoc = await firestore().collection('users').doc(userId).get();
    const userData = userDoc.data();

    // 2. Kullanıcının refCodes altındaki ratings'lerini sil
    if (userData?.refCodes?.en) {
      const goodSidesRef = firestore()
        .collection('refCodes')
        .doc(userData.refCodes.en)
        .collection('goodsides');

      const badSidesRef = firestore()
        .collection('refCodes')
        .doc(userData.refCodes.en)
        .collection('badsides');

      // Good ve bad sides ratings'leri sil
      const [goodSidesSnapshot, badSidesSnapshot] = await Promise.all([
        goodSidesRef.get(),
        badSidesRef.get(),
      ]);

      goodSidesSnapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      badSidesSnapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
    }

    // 3. userTasks dokümanını sil
    const userTasksRef = firestore().collection('userTasks').doc(userId);
    batch.delete(userTasksRef);

    // 4. user dokümanını sil
    const userRef = firestore().collection('users').doc(userId);
    batch.delete(userRef);

    // 5. Batch işlemini gerçekleştir
    await batch.commit();

    // 6. Firebase Auth'dan kullanıcıyı sil
    const currentUser = auth().currentUser;
    if (currentUser) {
      await currentUser.delete();
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

export async function resetUserTraits(userId: string) {
  try {
    // Firestore'dan traits ve lastTasksDates'i sil
    await firestore().collection('users').doc(userId).update({
      traits: firestore.FieldValue.delete(),
      lastTasksDates: firestore.FieldValue.delete(),
    });

    // İlgili query'leri invalidate et
    await Promise.all([
      // User query'sini invalidate et
      queryClient.invalidateQueries({ queryKey: ['user', userId] }),

      // Good ve Bad traits query'lerini invalidate et
      queryClient.invalidateQueries({
        queryKey: ['traitAverages', userId, 'goodsides'],
      }),
      queryClient.invalidateQueries({
        queryKey: ['traitAverages', userId, 'badsides'],
      }),

      // Trait details query'lerini invalidate et
      queryClient.invalidateQueries({
        queryKey: ['traitDetails', userId, 'goodsides'],
      }),
      queryClient.invalidateQueries({
        queryKey: ['traitDetails', userId, 'badsides'],
      }),
    ]);
  } catch (error) {
    console.error('Error resetting user traits:', error);
    throw error;
  }
}
