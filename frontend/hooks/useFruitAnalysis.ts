import { useState } from "react";

import type { FruitData } from "@/types/dashboard";
import { mockData } from "@/app/data/mockData";

export function useFruitAnalysis(selectedFruit: string) {
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [currentFruitData, setCurrentFruitData] = useState<FruitData>(mockData.Apple);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleAnalyze = async () => {
    setIsUploadDialogOpen(true);
  };

  const processAnalysis = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setIsUploadDialogOpen(false);

    const formData = new FormData();
    formData.append('file', selectedImage);

    try {
      const response = await fetch('http://localhost:8000/api/analyze-fruit', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        const fruitName = result.data.prediction
          .split('_')
          .pop()
          .charAt(0).toUpperCase() +
          result.data.prediction
            .split('_')
            .pop()
            .slice(1).toLowerCase();

        if (mockData[fruitName]) {
          const newFruitData: FruitData = {
            prediction: result.data.prediction,
            qualityScore: result.data.quality_score,
            pHLevel: 3.5,
            ripeness: result.data.quality_score,
            defects: 100 - result.data.quality_score,
            temperature: 22,
            humidity: 60,
            weight: result.data.physical_properties.weight,
            size: result.data.physical_properties.size,
            sugar: result.data.nutritional_data.sugars,
            firmness: result.data.physical_properties.firmness,
            shelfLife: 14,
            batchId: `${result.data.prediction.toUpperCase()}-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`,
            origin: "Analysis Result",
            storageTime: 0
          };

          setCurrentFruitData(newFruitData);
        }
      }
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
      setSelectedImage(null);
    }
  };

  return {
    isAnalyzing,
    isUploadDialogOpen,
    selectedImage,
    imageUrl,
    currentFruitData,
    handleAnalyze,
    handleImageUpload,
    processAnalysis,
    setIsUploadDialogOpen,
  };
} 