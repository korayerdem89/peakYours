export interface PersonalityAnimal {
  id: string;
  image: any; // For require() image imports
}

export interface LanguageContent {
  instruction: string;
  strengths: string;
  growthAreas: string;
  zodiacTitle: string;
  spiritAnimals: string;
  createTitle: string;
  animalMatch: string;
  animalCriteria: string[];
  storyTitle: string;
  paragraphs: string[];
}

export interface AnalysisResponse {
  spiritAnimal: string;
  analysis: string;
}

export interface StoredAnalysis {
  spiritAnimal: string;
  analysis: string;
  lastUpdatedAt: number;
  lastRaterCount: number;
  zodiacSign: string;
  locale: string;
}
