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

export const languageSpecificContent: Record<string, LanguageContent> = {
  en: {
    instruction:
      'Analyze the personality traits and zodiac sign to find the most suitable spirit animal.',
    strengths: 'Strengths:',
    growthAreas: 'Growth Areas:',
    zodiacTitle: 'Zodiac Sign:',
    spiritAnimals: 'Available Spirit Animals:',
    createTitle: 'Create Analysis',
    animalMatch: 'Match the most suitable spirit animal based on:',
    animalCriteria: [
      '- Personality trait scores',
      '- Zodiac sign characteristics',
      '- Overall personality pattern',
    ],
    storyTitle: 'Create a personalized story that:',
    paragraphs: [
      '- Explains why this spirit animal matches their personality',
      "- Highlights their strengths through the animal's characteristics",
      '- Suggests growth areas using gentle metaphors',
    ],
  },
  tr: {
    instruction:
      "Kişilik özelliklerini ve burç özelliklerini analiz ederek en uygun spirit animal'ı bul.",
    strengths: 'Güçlü Yönler:',
    growthAreas: 'Gelişim Alanları:',
    zodiacTitle: 'Burç:',
    spiritAnimals: 'Mevcut Spirit Animals:',
    createTitle: 'Analiz Oluştur',
    animalMatch: "En uygun spirit animal'ı şunlara göre seç:",
    animalCriteria: ['- Kişilik özelliği puanları', '- Burç özellikleri', '- Genel kişilik yapısı'],
    storyTitle: 'Şu özelliklere sahip kişisel bir hikaye oluştur:',
    paragraphs: [
      "- Bu spirit animal'ın neden kişiliğiyle eşleştiğini açıkla",
      '- Hayvanın özellikleri üzerinden güçlü yanlarını vurgula',
      '- Nazik metaforlar kullanarak gelişim alanlarını öner',
    ],
  },
  es: {
    instruction:
      'Analiza los rasgos de personalidad y el signo zodiacal para encontrar el animal espiritual más adecuado.',
    strengths: 'Fortalezas:',
    growthAreas: 'Áreas de Crecimiento:',
    zodiacTitle: 'Signo Zodiacal:',
    spiritAnimals: 'Animales Espirituales Disponibles:',
    createTitle: 'Crear Análisis',
    animalMatch: 'Encuentra el animal espiritual más adecuado basado en:',
    animalCriteria: [
      '- Puntuaciones de rasgos de personalidad',
      '- Características del signo zodiacal',
      '- Patrón general de personalidad',
    ],
    storyTitle: 'Crea una historia personalizada que:',
    paragraphs: [
      '- Explique por qué este animal espiritual coincide con su personalidad',
      '- Destaque sus fortalezas a través de las características del animal',
      '- Sugiera áreas de crecimiento usando metáforas suaves',
    ],
  },
};

export const PERSONALITY_ANIMALS: Record<string, PersonalityAnimal> = {
  INDEPENDENT_CAT: {
    id: 'cat',
    image: require('@/assets/animals/cat.png'),
  },
  ADAPTABLE_CHAMELEON: {
    id: 'chameleon',
    image: require('@/assets/animals/chameleon.png'),
  },
  PROTECTIVE_CRAB: {
    id: 'crab',
    image: require('@/assets/animals/crab.png'),
  },
  POWERFUL_DRAGON: {
    id: 'dragon',
    image: require('@/assets/animals/dragon.png'),
  },
  GRACEFUL_FLAMINGO: {
    id: 'flamingo',
    image: require('@/assets/animals/flamingo.png'),
  },
  CLEVER_FOX: {
    id: 'fox',
    image: require('@/assets/animals/fox.png'),
  },
  DETERMINED_GOAT: {
    id: 'goat',
    image: require('@/assets/animals/goat.png'),
  },
  STRONG_GORILLA: {
    id: 'gorilla',
    image: require('@/assets/animals/gorilla.png'),
  },
  CAUTIOUS_HEDGEHOG: {
    id: 'hedgehog',
    image: require('@/assets/animals/hedgehog.png'),
  },
  AMBITIOUS_HORSE: {
    id: 'horse',
    image: require('@/assets/animals/horse.png'),
  },
  ENERGETIC_KANGAROO: {
    id: 'kangaroo',
    image: require('@/assets/animals/kangaroo.png'),
  },
  LEADER_LION: {
    id: 'lion',
    image: require('@/assets/animals/lion.png'),
  },
  WISE_OWL: {
    id: 'owl',
    image: require('@/assets/animals/owl.png'),
  },
  RESILIENT_PHOENIX: {
    id: 'phoenix',
    image: require('@/assets/animals/phoenix.png'),
  },
  GENTLE_SEAHORSE: {
    id: 'seahorse',
    image: require('@/assets/animals/seahorse.png'),
  },
  PLAYFUL_SEAL: {
    id: 'seal',
    image: require('@/assets/animals/seal.png'),
  },
  STRATEGIC_SNAKE: {
    id: 'snake',
    image: require('@/assets/animals/snake.png'),
  },
  PATIENT_SPIDER: {
    id: 'spider',
    image: require('@/assets/animals/spider.png'),
  },
  RESOURCEFUL_SQUIRREL: {
    id: 'squirrel',
    image: require('@/assets/animals/squirrel.png'),
  },
  SOCIAL_TOUCAN: {
    id: 'toucan',
    image: require('@/assets/animals/toucan.png'),
  },
  STEADY_TURTLE: {
    id: 'turtle',
    image: require('@/assets/animals/turtle.png'),
  },
  PEACEFUL_WHALE: {
    id: 'whale',
    image: require('@/assets/animals/whale.png'),
  },
  LOYAL_WOLF: {
    id: 'wolf',
    image: require('@/assets/animals/wolf.png'),
  },
  DILIGENT_WOODPECKER: {
    id: 'woodpecker',
    image: require('@/assets/animals/woodpecker.png'),
  },
};
