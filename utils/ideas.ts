import { AnalysisResponse, StoredAnalysis } from '@/types/ideas';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getStoredAnalysis(userId: string): Promise<StoredAnalysis | null> {
  try {
    const storedData = await AsyncStorage.getItem(`analysis_${userId}`);
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error('Error getting stored analysis:', error);
    return null;
  }
}

export async function storeAnalysis(
  userId: string,
  analysis: AnalysisResponse,
  zodiacSign: string,
  locale: string,
  raterCount: number
): Promise<void> {
  try {
    const analysisData: StoredAnalysis = {
      ...analysis,
      lastUpdatedAt: Date.now(),
      lastRaterCount: raterCount,
      zodiacSign,
      locale,
    };
    await AsyncStorage.setItem(`analysis_${userId}`, JSON.stringify(analysisData));
  } catch (error) {
    console.error('Error storing analysis:', error);
  }
}

export function shouldUpdateAnalysis(
  storedAnalysis: StoredAnalysis,
  currentLocale: string,
  currentZodiac: string,
  currentRaterCount: number
): boolean {
  const timeDiff = Date.now() - storedAnalysis.lastUpdatedAt;
  const daysPassed = timeDiff / (1000 * 60 * 60 * 24);

  return (
    daysPassed >= 7 ||
    storedAnalysis.locale !== currentLocale ||
    storedAnalysis.zodiacSign !== currentZodiac ||
    Math.abs(currentRaterCount - storedAnalysis.lastRaterCount) >= 5
  );
}
