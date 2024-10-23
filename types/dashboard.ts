export interface FruitData {
  qualityScore: number;
  pHLevel: number;
  ripeness: number;
  defects: number;
  temperature: number;
  humidity: number;
  weight: number;
  size: {
    length: number;
    width: number;
  };
  sugar: number;
  firmness: number;
  shelfLife: number;
  batchId: string;
  origin: string;
  storageTime: number;
}

export interface ShelfLifePrediction {
  optimum: number;
  current: number;
  factors: Array<{
    factor: string;
    impact: number;
  }>;
}

export interface BatchData {
  id: string;
  receivedDate: string;
  initialQuality: number;
  currentQuality: number;
  status: string;
  predictions: {
    bestBefore: string;
    expectedQuality: number;
  };
}

export interface NutritionalData {
  labels: string[];
  datasets: Array<{
    data: number[];
    backgroundColor: string[];
  }>;
}

export interface ChartConfig {
  [key: string]: {
    theme?: string;
    color?: string;
  };
}
