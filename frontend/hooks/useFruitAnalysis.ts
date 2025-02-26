import { useState } from "react";
import type {
  FruitType,
  FruitData,
  FruitLabel,
  BatchData,
  Freshness,
  Ripeness,
} from "@/types/dashboard";
// import { mockData, mockBatchHistory } from "@/app/data/mockData";
import {
  SHELF_LIFE_MAPPING,
  STORAGE_RECOMMENDATIONS,
  calculateQualityScore,
} from "@/types/dashboard";
import { mockData, mockBatchHistory } from "@/app/data/mockData";

export function useFruitAnalysis(selectedFruit: FruitType) {
  // State declarations
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [currentFruitData, setCurrentFruitData] = useState<FruitData | null>(mockData[selectedFruit]);
  const [batchHistory, setBatchHistory] = useState<BatchData[]>(mockBatchHistory);
  const [error, setError] = useState<string | null>(null);

  // Image handling methods
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("File size too large. Please upload an image under 5MB.");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }

    setSelectedImage(file);
    setImageUrl(URL.createObjectURL(file));
    setError(null);
  };

  const handleUrlSubmit = async (url: string) => {
    try {
      setError(null);
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch image");

      const blob = await response.blob();
      const file = new File([blob], "image.jpg", { type: blob.type });
      setSelectedImage(file);
      setImageUrl(URL.createObjectURL(file));
    } catch (error) {
      setError("Failed to load image from URL");
      console.error("Failed to load image from URL:", error);
    }
  };

  const handleCameraCapture = async () => {
    try {
      setError(null);
      const response = await fetch("http://localhost:8000/api/capture-image");
      if (!response.ok) throw new Error("Failed to capture image");

      const blob = await response.blob();
      const file = new File([blob], "camera-capture.jpg", { type: blob.type });
      setSelectedImage(file);
      setImageUrl(URL.createObjectURL(file));
    } catch (error) {
      setError("Failed to capture image from camera");
      console.error("Failed to capture image:", error);
    }
  };

  // Analysis and batch processing methods
  const handleAnalyze = () => setIsUploadDialogOpen(true);

  const processAnalysis = async () => {
    if (!selectedImage) return;

    try {
      setIsAnalyzing(true);
      setIsUploadDialogOpen(false);

      let newFruitData: FruitData;

      try {
        const formData = new FormData();
        formData.append("file", selectedImage);
        // formData.append("fruitType", selectedFruit);

      // API call to your ML backend
      const response = await fetch('http://localhost:8000/predict', {  // Updated endpoint
        method: 'POST',
        body: formData,
    });
        if (!response.ok) throw new Error("Analysis failed");

        const result = await response.json();
        console.log({result});
        // TODO: Add fruit type to the result
        const prediction = `${result.freshness}_${result.fruit_type}_${result.ripeness}` as FruitLabel;
      //   {
      //     "result": {
      //         "class": "fresh_apple_ripe",
      //         "fruit_type": "apple",
      //         "freshness": "fresh",
      //         "ripeness": "ripe",
      //         "shelf_life_days": 7,
      //         "confidence": 99.8
      //     }
      // }
        newFruitData = {
          prediction,
          fruitType: result.fruit_type,
          freshness: result.freshness as Freshness,
          ripeness: result.ripeness as Ripeness,
          shelfLifeDays: result.shelf_life_days,
          confidence: Number(result.confidence),
          // TODO: Add quality score Maths
          qualityScore: calculateQualityScore(
            Number(result.confidence),
            result.freshness as Freshness,
            result.ripeness as Ripeness
          ),
          storageMetrics: STORAGE_RECOMMENDATIONS[result.fruit_type as FruitType],
        };
        console.log({newFruitData});

      } catch (error) {
        console.warn("API call failed, using mock data:", error);
        // Fallback to mock data if API fails
        newFruitData = mockData[selectedFruit];
      }

      setCurrentFruitData(newFruitData);
      await saveBatchToDatabase(newFruitData);
    } catch (error) {
      setError("Analysis failed. Using mock data.");
      setCurrentFruitData(mockData[selectedFruit]);
    } finally {
      setIsAnalyzing(false);
      setSelectedImage(null);
    }
  };
//   {
//     "newFruitData": {
//         "prediction": "fresh_apple_ripe",
//         "fruitType": "apple",
//         "freshness": "fresh",
//         "ripeness": "ripe",
//         "shelfLifeDays": 7,
//         "confidence": 99.8,
//         "qualityScore": 100,
//         "storageMetrics": {
//             "temperature": 4,
//             "humidity": 90
//         }
//     }
// }
  // Database operations
  const saveBatchToDatabase = async (newFruitData: FruitData) => {
    try {
      const response = await fetch("/api/batches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFruitData),
      });

      if (!response.ok) throw new Error("Failed to save batch data");

      const savedBatch: BatchData = await response.json();
      setBatchHistory(prev => [savedBatch, ...prev]);
    } catch (error) {
      console.warn("Failed to save batch, using mock data:", error);
      // Add to mock batch history if API fails
      const mockBatch: BatchData = {
        id: `BATCH-${Date.now()}`,
        timestamp: new Date(),
        status: "active",
        notes: "Mock batch data",
        fruitData: newFruitData
      };
      setBatchHistory(prev => [mockBatch, ...prev]);
    }
  };

  const handleBatchSelect = async (batchId: string) => {
    try {
      setIsAnalyzing(true);
      const response = await fetch(`/api/batches/${batchId}`);
      
      if (!response.ok) throw new Error("Failed to fetch batch data");

      const batchData: BatchData = await response.json();
      setCurrentFruitData(batchData.fruitData);
    } catch (error) {
      console.warn("Failed to load batch, using mock data:", error);
      // Use mock data if API fails
      const mockBatch = mockBatchHistory.find(b => b.id === batchId);
      if (mockBatch) {
        setCurrentFruitData(mockBatch.fruitData);
      } else {
        setCurrentFruitData(mockData[selectedFruit]);
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Return hook values and methods
  return {
    isAnalyzing,
    isUploadDialogOpen,
    selectedImage,
    imageUrl,
    currentFruitData: currentFruitData || mockData[selectedFruit], // Fallback to mock data
    batchHistory: batchHistory.length > 0 ? batchHistory : mockBatchHistory, // Fallback to mock history
    error,
    handleAnalyze,
    handleImageUpload,
    handleUrlSubmit,
    handleCameraCapture,
    processAnalysis,
    setIsUploadDialogOpen,
    handleBatchSelect,
  };
}
