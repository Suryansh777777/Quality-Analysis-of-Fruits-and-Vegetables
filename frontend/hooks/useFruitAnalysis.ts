import { useState, useEffect } from "react";
import type { FruitData, BatchData } from "@/types/dashboard";
import { mockData, mockBatchHistory } from "@/app/data/mockData";

export function useFruitAnalysis(selectedFruit: string) {
  // State declarations
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [currentFruitData, setCurrentFruitData] = useState<FruitData>(mockData[selectedFruit]);
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
    if (!file.type.startsWith('image/')) {
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
      if (!response.ok) throw new Error('Failed to fetch image');
      
      const blob = await response.blob();
      const file = new File([blob], "image.jpg", { type: blob.type });
      setSelectedImage(file);
      setImageUrl(URL.createObjectURL(file));
    } catch (error) {
      setError('Failed to load image from URL');
      console.error('Failed to load image from URL:', error);
    }
  };

  const handleCameraCapture = async () => {
    try {
      setError(null);
      const response = await fetch('http://localhost:8000/api/capture-image');
      if (!response.ok) throw new Error('Failed to capture image');

      const blob = await response.blob();
      const file = new File([blob], "camera-capture.jpg", { type: blob.type });
      setSelectedImage(file);
      setImageUrl(URL.createObjectURL(file));
    } catch (error) {
      setError('Failed to capture image from camera');
      console.error('Failed to capture image:', error);
    }
  };

  // Analysis and batch processing methods
  const handleAnalyze = () => setIsUploadDialogOpen(true);

  const processAnalysis = async (selectedFruitType: string) => {
    if (!selectedImage) return;

    try {
      setIsAnalyzing(true);
      setIsUploadDialogOpen(false);
      setError(null);

      // Create new batch data
      const analysisResult = mockData[selectedFruitType];
      const newFruitData: FruitData = {
        ...analysisResult,
        batchId: `${selectedFruitType.toUpperCase()}-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`,
      };

      const newBatch = {
        ...newFruitData,
        fruitType: selectedFruitType,
        bestBefore: new Date(Date.now() + newFruitData.shelfLife * 24 * 60 * 60 * 1000).toISOString(),
        expectedQuality: Math.max(0, newFruitData.qualityScore - 10),
      };

      // Update local state
      setCurrentFruitData(newFruitData);

      // Save to database
      await saveBatchToDatabase(newBatch);

    } catch (error) {
      setError('Analysis failed. Please try again.');
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
      setSelectedImage(null);
    }
  };

  // Database operations
  const saveBatchToDatabase = async (newBatch: any) => {
    try {
      const response = await fetch('/api/batches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBatch),
      });

      if (!response.ok) throw new Error('Failed to save batch data');

      const savedBatch = await response.json();
      updateBatchHistory(savedBatch);
    } catch (error) {
      console.error('Failed to save batch:', error);
      setError('Failed to save batch data');
    }
  };

  const updateBatchHistory = (savedBatch: any) => {
    setBatchHistory(prev => [{
      id: savedBatch.id,
      receivedDate: savedBatch.receivedDate,
      initialQuality: savedBatch.initialQuality,
      currentQuality: savedBatch.currentQuality,
      status: savedBatch.status,
      predictions: {
        bestBefore: savedBatch.bestBefore,
        expectedQuality: savedBatch.expectedQuality,
      },
    }, ...prev]);
  };

  const handleBatchSelect = async (batchId: string) => {
    try {
      setIsAnalyzing(true);
      
      const response = await fetch(`/api/batches/${batchId}`);
      if (!response.ok) throw new Error('Failed to fetch batch data');
      
      const batchData = await response.json();
      setCurrentFruitData(batchData);
      
      // Fallback to mock data
      const selectedBatch = mockBatchHistory.find((batch: BatchData) => batch.id === batchId);
      if (selectedBatch) {
        setCurrentFruitData({
          ...mockData[selectedFruit],
          batchId: selectedBatch.id,
          qualityScore: selectedBatch.currentQuality,
        });
      }
    } catch (error) {
      setError('Failed to load batch data');
      console.error('Failed to load batch data:', error);
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
    currentFruitData,
    batchHistory,
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