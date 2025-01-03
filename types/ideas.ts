export interface PersonalityAnimal {
  id: string;
  image: any; // For require() image imports
  names: Record<string, string>;
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
    storyTitle:
      'Create a story with these specifications (max 3 paragraphs, not exceeding 150 words total):',
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
    storyTitle:
      'Şu özelliklere sahip en fazla 3 paragraflık ve toplam maksimum 150 kelimeyi geçmeyecek şekilde hikaye oluştur:',
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
    storyTitle:
      'Crea una historia con estas especificaciones (máximo 3 párrafos, sin exceder 150 palabras en total):',
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
    names: {
      en: 'Independent Cat',
      tr: 'Bağımsız Kedi',
      es: 'Gato Independiente',
    },
  },
  ADAPTABLE_CHAMELEON: {
    id: 'chameleon',
    image: require('@/assets/animals/chameleon.png'),
    names: {
      en: 'Adaptable Chameleon',
      tr: 'Uyumlu Bukalemun',
      es: 'Camaleón Adaptable',
    },
  },
  PROTECTIVE_CRAB: {
    id: 'crab',
    image: require('@/assets/animals/crab.png'),
    names: {
      en: 'Protective Crab',
      tr: 'Koruyucu Yengeç',
      es: 'Cangrejo Protector',
    },
  },
  POWERFUL_DRAGON: {
    id: 'dragon',
    image: require('@/assets/animals/dragon.png'),
    names: {
      en: 'Powerful Dragon',
      tr: 'Güçlü Ejderha',
      es: 'Dragón Poderoso',
    },
  },
  GRACEFUL_FLAMINGO: {
    id: 'flamingo',
    image: require('@/assets/animals/flamingo.png'),
    names: {
      en: 'Graceful Flamingo',
      tr: 'Zarif Flamingo',
      es: 'Flamenco Elegante',
    },
  },
  CLEVER_FOX: {
    id: 'fox',
    image: require('@/assets/animals/fox.png'),
    names: {
      en: 'Clever Fox',
      tr: 'Zeki Tilki',
      es: 'Zorro Astuto',
    },
  },
  DETERMINED_GOAT: {
    id: 'goat',
    image: require('@/assets/animals/goat.png'),
    names: {
      en: 'Determined Goat',
      tr: 'Kararlı Keçi',
      es: 'Cabra Determinada',
    },
  },
  STRONG_GORILLA: {
    id: 'gorilla',
    image: require('@/assets/animals/gorilla.png'),
    names: {
      en: 'Strong Gorilla',
      tr: 'Güçlü Gorilla',
      es: 'Gorila Fuerte',
    },
  },
  CAUTIOUS_HEDGEHOG: {
    id: 'hedgehog',
    image: require('@/assets/animals/hedgehog.png'),
    names: {
      en: 'Cautious Hedgehog',
      tr: 'Tedbirli Kirpi',
      es: 'Erizo Cauteloso',
    },
  },
  AMBITIOUS_HORSE: {
    id: 'horse',
    image: require('@/assets/animals/horse.png'),
    names: {
      en: 'Ambitious Horse',
      tr: 'Hırslı At',
      es: 'Caballo Ambicioso',
    },
  },
  ENERGETIC_KANGAROO: {
    id: 'kangaroo',
    image: require('@/assets/animals/kangaroo.png'),
    names: {
      en: 'Energetic Kangaroo',
      tr: 'Enerjik Kanguru',
      es: 'Canguro Enérgico',
    },
  },
  LEADER_LION: {
    id: 'lion',
    image: require('@/assets/animals/lion.png'),
    names: {
      en: 'Leader Lion',
      tr: 'Lider Aslan',
      es: 'León Líder',
    },
  },
  WISE_OWL: {
    id: 'owl',
    image: require('@/assets/animals/owl.png'),
    names: {
      en: 'Wise Owl',
      tr: 'Bilge Baykuş',
      es: 'Búho Sabio',
    },
  },
  RESILIENT_PHOENIX: {
    id: 'phoenix',
    image: require('@/assets/animals/phoenix.png'),
    names: {
      en: 'Resilient Phoenix',
      tr: 'Dirençli Anka Kuşu',
      es: 'Fénix Resiliente',
    },
  },
  GENTLE_SEAHORSE: {
    id: 'seahorse',
    image: require('@/assets/animals/seahorse.png'),
    names: {
      en: 'Gentle Seahorse',
      tr: 'Nazik Denizatı',
      es: 'Caballito de Mar Gentil',
    },
  },
  PLAYFUL_SEAL: {
    id: 'seal',
    image: require('@/assets/animals/seal.png'),
    names: {
      en: 'Playful Seal',
      tr: 'Oyuncu Fok',
      es: 'Foca Juguetona',
    },
  },
  STRATEGIC_SNAKE: {
    id: 'snake',
    image: require('@/assets/animals/snake.png'),
    names: {
      en: 'Strategic Snake',
      tr: 'Stratejik Yılan',
      es: 'Serpiente Estratégica',
    },
  },
  PATIENT_SPIDER: {
    id: 'spider',
    image: require('@/assets/animals/spider.png'),
    names: {
      en: 'Patient Spider',
      tr: 'Sabırlı Örümcek',
      es: 'Araña Paciente',
    },
  },
  RESOURCEFUL_SQUIRREL: {
    id: 'squirrel',
    image: require('@/assets/animals/squirrel.png'),
    names: {
      en: 'Resourceful Squirrel',
      tr: 'Becerikli Sincap',
      es: 'Ardilla Ingeniosa',
    },
  },
  SOCIAL_TOUCAN: {
    id: 'toucan',
    image: require('@/assets/animals/toucan.png'),
    names: {
      en: 'Social Toucan',
      tr: 'Sosyal Tukan',
      es: 'Tucán Social',
    },
  },
  STEADY_TURTLE: {
    id: 'turtle',
    image: require('@/assets/animals/turtle.png'),
    names: {
      en: 'Steady Turtle',
      tr: 'Kararlı Kaplumbağa',
      es: 'Tortuga Constante',
    },
  },
  PEACEFUL_WHALE: {
    id: 'whale',
    image: require('@/assets/animals/whale.png'),
    names: {
      en: 'Peaceful Whale',
      tr: 'Huzurlu Balina',
      es: 'Ballena Pacífica',
    },
  },
  LOYAL_WOLF: {
    id: 'wolf',
    image: require('@/assets/animals/wolf.png'),
    names: {
      en: 'Loyal Wolf',
      tr: 'Sadık Kurt',
      es: 'Lobo Leal',
    },
  },
  DILIGENT_WOODPECKER: {
    id: 'woodpecker',
    image: require('@/assets/animals/woodpecker.png'),
    names: {
      en: 'Diligent Woodpecker',
      tr: 'Çalışkan Ağaçkakan',
      es: 'Pájaro Carpintero Diligente',
    },
  },
};
