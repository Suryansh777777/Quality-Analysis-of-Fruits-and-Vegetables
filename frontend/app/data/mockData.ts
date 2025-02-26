import { BatchData, FruitData, NutritionalData, FruitType, ShelfLifePredictionData } from "@/types/dashboard";

// Mock data 
export const mockData: Record<FruitType, FruitData> = {
  apple: {
    prediction: "fresh_apple_ripe",
    fruitType: "apple",
    freshness: "fresh",
    ripeness: "ripe",
    shelfLifeDays: 7,
    confidence: 95,
    qualityScore: 92,
    storageMetrics: {
      temperature: 4,
      humidity: 90
    }
  },
  banana: {
    prediction: "fresh_banana_ripe",
    fruitType: "banana",
    freshness: "fresh",
    ripeness: "ripe",
    shelfLifeDays: 5,
    confidence: 88,
    qualityScore: 85,
    storageMetrics: {
      temperature: 13,
      humidity: 85
    }
  },
  orange: {
    prediction: "fresh_orange_ripe",
    fruitType: "orange",
    freshness: "fresh",
    ripeness: "ripe",
    shelfLifeDays: 10,
    confidence: 92,
    qualityScore: 90,
    storageMetrics: {
      temperature: 8,
      humidity: 85
    }
  },
  capsicum: {
    prediction: "fresh_capsicum_ripe",
    fruitType: "capsicum",
    freshness: "fresh",
    ripeness: "ripe",
    shelfLifeDays: 7,
    confidence: 89,
    qualityScore: 87,
    storageMetrics: {
      temperature: 7,
      humidity: 95
    }
  },
  bitterground: {
    prediction: "fresh_bitterground_ripe",
    fruitType: "bitterground",
    freshness: "fresh",
    ripeness: "ripe",
    shelfLifeDays: 6,
    confidence: 86,
    qualityScore: 84,
    storageMetrics: {
      temperature: 10,
      humidity: 85
    }
  },
  tomato: {
    prediction: "fresh_tomato_ripe",
    fruitType: "tomato",
    freshness: "fresh",
    ripeness: "ripe",
    shelfLifeDays: 8,
    confidence: 91,
    qualityScore: 88,
    storageMetrics: {
      temperature: 13,
      humidity: 90
    }
  }
};

export const mockShelfLifePrediction: ShelfLifePredictionData = {
  optimum: 14,
  current: 10,
  factors: [
    { factor: "Temperature", impact: -1 },
    { factor: "Humidity", impact: -2 },
    { factor: "Initial Quality", impact: 1 },
  ],
};

export const mockNutritionalData: Record<FruitType, NutritionalData> = {
  apple: {
    labels: ["Sugars", "Fiber", "Vitamins", "Minerals", "Proteins"],
    datasets: [{
      data: [10.4, 2.4, 4.6, 1.6, 0.3],
      backgroundColor: [
        "rgba(59, 130, 246, 0.6)",
        "rgba(16, 185, 129, 0.6)",
        "rgba(251, 191, 36, 0.6)",
        "rgba(239, 68, 68, 0.6)",
        "rgba(139, 92, 246, 0.6)",
      ],
    }],
  },
  banana: {
    labels: ["Sugars", "Fiber", "Vitamins", "Minerals", "Proteins"],
    datasets: [{
      data: [12.2, 2.6, 8.7, 3.2, 1.1],
      backgroundColor: [
        "rgba(59, 130, 246, 0.6)",
        "rgba(16, 185, 129, 0.6)",
        "rgba(251, 191, 36, 0.6)",
        "rgba(239, 68, 68, 0.6)",
        "rgba(139, 92, 246, 0.6)",
      ],
    }],
  },
  orange: {
    labels: ["Sugars", "Fiber", "Vitamins", "Minerals", "Proteins"],
    datasets: [{
      data: [9.3, 2.4, 12.1, 2.8, 0.9],
      backgroundColor: [
        "rgba(59, 130, 246, 0.6)",
        "rgba(16, 185, 129, 0.6)",
        "rgba(251, 191, 36, 0.6)",
        "rgba(239, 68, 68, 0.6)",
        "rgba(139, 92, 246, 0.6)",
      ],
    }],
  },
  capsicum: {
    labels: ["Sugars", "Fiber", "Vitamins", "Minerals", "Proteins"],
    datasets: [{
      data: [4.2, 1.7, 15.3, 2.1, 0.9],
      backgroundColor: [
        "rgba(59, 130, 246, 0.6)",
        "rgba(16, 185, 129, 0.6)",
        "rgba(251, 191, 36, 0.6)",
        "rgba(239, 68, 68, 0.6)",
        "rgba(139, 92, 246, 0.6)",
      ],
    }],
  },
  bitterground: {
    labels: ["Sugars", "Fiber", "Vitamins", "Minerals", "Proteins"],
    datasets: [{
      data: [3.7, 2.8, 8.4, 2.6, 1.0],
      backgroundColor: [
        "rgba(59, 130, 246, 0.6)",
        "rgba(16, 185, 129, 0.6)",
        "rgba(251, 191, 36, 0.6)",
        "rgba(239, 68, 68, 0.6)",
        "rgba(139, 92, 246, 0.6)",
      ],
    }],
  },
  tomato: {
    labels: ["Sugars", "Fiber", "Vitamins", "Minerals", "Proteins"],
    datasets: [{
      data: [3.9, 1.2, 13.7, 2.4, 0.9],
      backgroundColor: [
        "rgba(59, 130, 246, 0.6)",
        "rgba(16, 185, 129, 0.6)",
        "rgba(251, 191, 36, 0.6)",
        "rgba(239, 68, 68, 0.6)",
        "rgba(139, 92, 246, 0.6)",
      ],
    }],
  }
};

export const mockBatchHistory: BatchData[] = [
  {
    id: "BATCH-001",
    timestamp: new Date("2024-03-15"),
    status: "active",
    notes: "First batch of the day",
    fruitData: mockData.apple
  },
  {
    id: "BATCH-002",
    timestamp: new Date("2024-03-15"),
    status: "active",
    notes: "Second batch",
    fruitData: {
      ...mockData.banana,
      ripeness: "underripe",
      prediction: "fresh_banana_underripe"
    }
  },
  {
    id: "BATCH-003",
    timestamp: new Date("2024-03-16"),
    status: "active",
    notes: "Morning batch",
    fruitData: {
      ...mockData.orange,
      ripeness: "overripe",
      prediction: "fresh_orange_overripe"
    }
  }
];