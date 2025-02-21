"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

import { TabsContainer } from "@/components/dashboard/TabsContainer";
import { UploadDialog } from "@/components/dashboard/UploadDialog";
import { useFruitAnalysis } from "@/hooks/useFruitAnalysis"; // We'll create this hook
import { mockData, mockNutritionalData, mockShelfLifePrediction, mockBatchHistory } from "../data/mockData";
import type { FruitData } from "@/types/dashboard";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardControls } from "@/components/dashboard/DashboardControls";

export default function Dashboard() {
  const [selectedFruit, setSelectedFruit] = useState<string>("Apple");
  const [autoUpdateEnabled, setAutoUpdateEnabled] = useState<boolean>(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>("week");

  const {
    isAnalyzing,
    isUploadDialogOpen,
    selectedImage,
    imageUrl,
    currentFruitData,
    handleAnalyze,
    handleImageUpload,
    processAnalysis,
    setIsUploadDialogOpen,
  } = useFruitAnalysis(selectedFruit);

  useEffect(() => {
    if (autoUpdateEnabled) {
      const interval = setInterval(() => {
        setSelectedFruit((prev) => {
          const fruits = Object.keys(mockData);
          const currentIndex = fruits.indexOf(prev);
          return fruits[(currentIndex + 1) % fruits.length];
        });
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [autoUpdateEnabled]);

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
          selectedTimeRange={selectedTimeRange}
          autoUpdateEnabled={autoUpdateEnabled}
          onFruitChange={setSelectedFruit}
          onTimeRangeChange={setSelectedTimeRange}
          onAutoUpdateChange={setAutoUpdateEnabled}
          fruits={Object.keys(mockData)}
        />

        <TabsContainer
          currentData={currentFruitData}
          selectedFruit={selectedFruit}
          mockNutritionalData={mockNutritionalData}
          imageUrl={imageUrl}
          mockShelfLifePrediction={mockShelfLifePrediction}
          mockBatchHistory={mockBatchHistory}
        />

        <UploadDialog
          isOpen={isUploadDialogOpen}
          onOpenChange={setIsUploadDialogOpen}
          imageUrl={imageUrl}
          onImageUpload={handleImageUpload}
          onAnalyze={processAnalysis}
          selectedImage={selectedImage}
        />
      </DashboardLayout>
    </>
  );
}
