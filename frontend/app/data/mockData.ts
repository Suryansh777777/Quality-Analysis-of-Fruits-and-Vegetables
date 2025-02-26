import { BatchData, FruitData, NutritionalData, ShelfLifePredictionData } from "@/types/dashboard";

// Mock data 
export const mockData: Record<string, FruitData> = {
  "Apple": {
    prediction: "Fresh",
    qualityScore: 92,
    pHLevel: 3.5,
    ripeness: 85,
    defects: 8,
    temperature: 22,
    humidity: 65,
    weight: 180, // grams
    size: {
      length: 7.5, // cm
      width: 7.2,  // cm
    },
    sugar: 12.5,  // brix
    firmness: 85, // scale 0-100
    shelfLife: 14, // days
    batchId: "APPLE-2024-001",
    origin: "Washington, USA",
    storageTime: 2 // days
  },
  "Banana": {
    prediction: "Ripe",
    qualityScore: 88,
    pHLevel: 4.5,
    ripeness: 90,
    defects: 5,
    temperature: 21,
    humidity: 70,
    weight: 120,
    size: {
      length: 18.0,
      width: 3.5,
    },
    sugar: 15.0,
    firmness: 65,
    shelfLife: 7,
    batchId: "BANANA-2024-001",
    origin: "Ecuador",
    storageTime: 3
  },
    Orange: {
      prediction: "Grade A",
      qualityScore: 90,
      pHLevel: 3.8,
      ripeness: 75,
      defects: 3,
      temperature: 21,
      humidity: 55,
      weight: 140,
      size: { length: 7, width: 7 },
      sugar: 10,
      firmness: 80,
      shelfLife: 21,
      batchId: "ORG-2024-001",
      origin: "Citrus Groves LLC",
      storageTime: 72,
    },
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
  
  export const mockNutritionalData: Record<string, NutritionalData> = {
    Apple: {
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
    Banana: {
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
    Orange: {
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
  };
  
  export const mockBatchHistory: BatchData[] = [
    {
      id: "APL-2024-001",
      receivedDate: "2024-03-15",
      initialQuality: 90,
      currentQuality: 85,
      status: "In Storage",
      predictions: {
        bestBefore: "2024-03-29",
        expectedQuality: 75,
      },
    },
    {
      id: "BAN-2024-001",
      receivedDate: "2024-03-18",
      initialQuality: 85,
      currentQuality: 78,
      status: "In Transit",
      predictions: {
        bestBefore: "2024-03-25",
        expectedQuality: 70,
      },
    },
    {
      id: "ORG-2024-001",
      receivedDate: "2024-03-20",
      initialQuality: 95,
      currentQuality: 90,
      status: "In Storage",
      predictions: {
        bestBefore: "2024-04-10",
        expectedQuality: 80,
      },
    },
  ];