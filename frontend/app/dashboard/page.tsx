"use client";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/home/Navbar";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

import { TabsContainer } from "@/components/dashboard/TabsContainer";
import { UploadDialog } from "@/components/dashboard/UploadDialog";
import { useFruitAnalysis } from "@/hooks/useFruitAnalysis"; // We'll create this hook
import { mockData, mockNutritionalData, mockShelfLifePrediction, mockBatchHistory } from "../data/mockData";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardControls } from "@/components/dashboard/DashboardControls";
import { FruitType } from "@/types/dashboard";

export default function Dashboard() {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedFruit, setSelectedFruit] = useState<FruitType>("apple");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const {
    isAnalyzing,
    isUploadDialogOpen,
    selectedImage,
    imageUrl,
    currentFruitData,
    batchHistory,
    handleAnalyze,
    handleImageUpload,
    handleUrlSubmit,
    handleCameraCapture,
    processAnalysis,
    setIsUploadDialogOpen,
    // handleBatchSelect,
  } = useFruitAnalysis(selectedFruit);

  if (!isMounted) {
    return null;
  }
  console.log({ currentFruitData });
  return (
    <>
      <Navbar />
      <DashboardLayout>
        <DashboardHeader
          isAnalyzing={isAnalyzing}
          onAnalyze={handleAnalyze}
        />

        <DashboardControls
          selectedFruit={selectedFruit}
          onFruitChange={setSelectedFruit}
          fruits={Object.keys(mockData)}
        />

        <TabsContainer
          currentData={currentFruitData}
          selectedFruit={selectedFruit}
          mockNutritionalData={mockNutritionalData}
          imageUrl={imageUrl}
          mockShelfLifePrediction={mockShelfLifePrediction}
          mockBatchHistory={batchHistory || mockBatchHistory}
        // onBatchSelect={handleBatchSelect}
        />

        <UploadDialog
          isOpen={isUploadDialogOpen}
          onOpenChange={setIsUploadDialogOpen}
          imageUrl={imageUrl}
          onImageUpload={handleImageUpload}
          onUrlSubmit={handleUrlSubmit}
          onCameraCapture={handleCameraCapture}
          onAnalyze={processAnalysis}
          selectedImage={selectedImage}
          availableFruits={Object.keys(mockData)}
          selectedFruitType={selectedFruit}
          setSelectedFruitType={setSelectedFruit}
        />
      </DashboardLayout>
    </>
  );
}
