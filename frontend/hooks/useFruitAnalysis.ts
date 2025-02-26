import { useState, useEffect } from "react";
import type { FruitData, BatchData } from "@/types/dashboard";
import { mockData,mockBatchHistory } from "@/app/data/mockData";


export function useFruitAnalysis(selectedFruit: string) {
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [currentFruitData, setCurrentFruitData] = useState<FruitData>(mockData[selectedFruit]);
  const [batchHistory, setBatchHistory] = useState<BatchData[]>(mockBatchHistory);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
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
    }
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

  const handleAnalyze = async () => {
    setIsUploadDialogOpen(true);
  };

  const processAnalysis = async (selectedFruitType: string) => {
    if (!selectedImage) return;

    try {
      setIsAnalyzing(true);
      setIsUploadDialogOpen(false);
      setError(null);

      // For now, using mock data for the analysis result
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
      try {
        const response = await fetch('/api/batches', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newBatch),
        });

        if (!response.ok) {
          throw new Error('Failed to save batch data');
        }

        const savedBatch = await response.json();
        
        // Update batch history with the new batch
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

      } catch (error) {
        console.error('Failed to save batch:', error);
        setError('Failed to save batch data');
      }

    } catch (error) {
      setError('Analysis failed. Please try again.');
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
      setSelectedImage(null);
    }
  };

  const handleBatchSelect = async (batchId: string) => {
    try {
      setIsAnalyzing(true);
      
      // In production, this would be a DB query
      const response = await fetch(`/api/batches/${batchId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch batch data');
      }
      
      const batchData = await response.json();
      setCurrentFruitData(batchData);
      
      // For now, using mock data until DB is set up
      const selectedBatch = mockBatchHistory.find((batch: BatchData) => batch.id === batchId);
      if (selectedBatch) {
        const batchData: FruitData = {
          ...mockData[selectedFruit],
          batchId: selectedBatch.id,
          qualityScore: selectedBatch.currentQuality,
          // Add other specific batch data here
        };
        
        setCurrentFruitData(batchData);
      }
    } catch (error) {
      setError('Failed to load batch data');
      console.error('Failed to load batch data:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };


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