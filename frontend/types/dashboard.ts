export type FruitType = 'apple' | 'banana' | 'orange' | 'capsicum' | 'bitterground' | 'tomato';

export type Freshness = 'fresh' | 'rotten';

export type Ripeness = 'ripe' | 'underripe' | 'overripe';

export type FruitLabel = 
  | `fresh_${FruitType}_${'ripe' | 'underripe' | 'overripe'}`
  | `rotten_${FruitType}`;

// Enhanced interface based on the model's output
export interface FruitData {
  prediction: FruitLabel;
  fruitType: FruitType;
  freshness: Freshness;
  ripeness: Ripeness ;
  shelfLifeDays: number;
  confidence: number;
  batchId?: string;
  // Derived/calculated values for display
  qualityScore: number;      // Based on confidence and freshness
  storageMetrics: {
    temperature: number;     // Recommended storage temperature
    humidity: number;        // Recommended humidity
  };
}

// Constants for frontend use
export const SHELF_LIFE_MAPPING: Record<FruitLabel, number> = {
  'fresh_apple_ripe': 7,
  'fresh_apple_underripe': 10,
  'fresh_apple_overripe': 3,
  'fresh_banana_ripe': 5,
  'fresh_banana_underripe': 7,
  'fresh_banana_overripe': 2,
  'fresh_orange_ripe': 10,
  'fresh_orange_underripe': 14,
  'fresh_orange_overripe': 5,
  'fresh_capsicum_ripe': 7,
  'fresh_capsicum_underripe': 10,
  'fresh_capsicum_overripe': 3,
  'fresh_bitterground_ripe': 6,
  'fresh_bitterground_underripe': 8,
  'fresh_bitterground_overripe': 2,
  'fresh_tomato_ripe': 8,
  'fresh_tomato_underripe': 12,
  'fresh_tomato_overripe': 4,
  'rotten_apple': 0,
  'rotten_banana': 0,
  'rotten_orange': 0,
  'rotten_capsicum': 0,
  'rotten_bitterground': 0,
  'rotten_tomato': 0
};

// Storage recommendations
export const STORAGE_RECOMMENDATIONS: Record<FruitType, { temperature: number; humidity: number }> = {
  apple: { temperature: 4, humidity: 90 },
  banana: { temperature: 13, humidity: 85 },
  orange: { temperature: 8, humidity: 85 },
  capsicum: { temperature: 7, humidity: 95 },
  bitterground: { temperature: 10, humidity: 85 },
  tomato: { temperature: 13, humidity: 90 }
};

// Helper function to calculate quality score
export const calculateQualityScore = (confidence: number, freshness: Freshness, ripeness: Ripeness | null): number => {
  let baseScore = confidence;
  
  if (freshness === 'rotten') return 0;
  
  // Adjust score based on ripeness
  switch (ripeness) {
    case 'ripe':
      baseScore *= 1;
      break;
    case 'underripe':
      baseScore *= 0.9;
      break;
    case 'overripe':
      baseScore *= 0.7;
      break;
  }
  
  return Math.round(baseScore);
};

// Example usage:
const sampleFruitData: FruitData = {
  prediction: 'fresh_apple_ripe',
  fruitType: 'apple',
  freshness: 'fresh',
  ripeness: 'ripe',
  shelfLifeDays: SHELF_LIFE_MAPPING['fresh_apple_ripe'],
  confidence: 98.5,
  qualityScore: 98,
  storageMetrics: STORAGE_RECOMMENDATIONS['apple']
};

export interface NutritionalData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
  }[];
}

export interface ShelfLifePredictionData {
  optimum: number;
  current: number;
  factors: {
    factor: string;
    impact: number;
  }[];
}

export interface BatchData {
  id: string;
  timestamp: Date;
  fruitData: FruitData;
  status: 'active' | 'archived';
  notes?: string;
}

export interface ChartConfig {
  [key: string]: {
    theme?: string;
    color?: string;
  };
}

// pH value ranges for fruits based on ripeness
export const FRUIT_PH_LEVELS: Record<FruitType, Record<Ripeness, { min: number; max: number }>> = {
  apple: {
    ripe: { min: 3.3, max: 3.9 },
    underripe: { min: 3.0, max: 3.3 },
    overripe: { min: 3.9, max: 4.5 }
  },
  banana: {
    ripe: { min: 4.5, max: 5.2 },
    underripe: { min: 5.2, max: 5.8 },
    overripe: { min: 4.0, max: 4.5 }
  },
  orange: {
    ripe: { min: 3.3, max: 4.2 },
    underripe: { min: 3.0, max: 3.3 },
    overripe: { min: 4.2, max: 4.8 }
  },
  capsicum: {
    ripe: { min: 4.8, max: 5.2 },
    underripe: { min: 5.2, max: 5.8 },
    overripe: { min: 4.5, max: 4.8 }
  },
  bitterground: {
    ripe: { min: 5.1, max: 5.6 },
    underripe: { min: 5.6, max: 6.0 },
    overripe: { min: 4.8, max: 5.1 }
  },
  tomato: {
    ripe: { min: 4.2, max: 4.5 },
    underripe: { min: 4.5, max: 4.9 },
    overripe: { min: 3.8, max: 4.2 }
  }
};

// Helper function to get ideal pH range
export const getIdealPhRange = (fruitType: FruitType, ripeness: Ripeness) => {
  return FRUIT_PH_LEVELS[fruitType][ripeness];
};
