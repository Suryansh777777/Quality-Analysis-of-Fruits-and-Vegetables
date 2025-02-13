"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Apple, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { MetricCard } from "@/components/dashboard/MetricCard";
import { NutritionalChart } from "@/components/dashboard/NutritionalChart";
import { PhysicalProperties } from "@/components/dashboard/PhysicalProperties";
import { BatchTable } from "@/components/dashboard/BatchTable";
import { ShelfLifePrediction } from "@/components/dashboard/ShelfLifePrediction";

import type {
  FruitData,
  BatchData,
  NutritionalData,
  ShelfLifePredictionData,
} from "@/types/dashboard";
import Navbar from "@/components/Navbar";

// Mock data (TypeScript interfaces should be defined in @/types/dashboard.ts)
const mockData: Record<string, FruitData> = {
  Apple: {
    qualityScore: 85,
    pHLevel: 3.5,
    ripeness: 70,
    defects: 5,
    temperature: 22,
    humidity: 60,
    weight: 150,
    size: { length: 7.5, width: 7.2 },
    sugar: 14,
    firmness: 75,
    shelfLife: 14,
    batchId: "APL-2024-001",
    origin: "Local Farm A",
    storageTime: 48,
  },
  Banana: {
    qualityScore: 78,
    pHLevel: 4.8,
    ripeness: 65,
    defects: 8,
    temperature: 23,
    humidity: 65,
    weight: 120,
    size: { length: 20, width: 3.5 },
    sugar: 12,
    firmness: 60,
    shelfLife: 7,
    batchId: "BAN-2024-001",
    origin: "Tropical Imports Inc.",
    storageTime: 24,
  },
  Orange: {
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

const mockShelfLifePrediction: ShelfLifePredictionData = {
  optimum: 14,
  current: 10,
  factors: [
    { factor: "Temperature", impact: -1 },
    { factor: "Humidity", impact: -2 },
    { factor: "Initial Quality", impact: 1 },
  ],
};

const mockNutritionalData: NutritionalData = {
  labels: ["Sugars", "Fiber", "Vitamins", "Minerals", "Proteins"],
  datasets: [
    {
      data: [30, 20, 15, 25, 10],
      backgroundColor: [
        "rgba(59, 130, 246, 0.6)",
        "rgba(16, 185, 129, 0.6)",
        "rgba(251, 191, 36, 0.6)",
        "rgba(239, 68, 68, 0.6)",
        "rgba(139, 92, 246, 0.6)",
      ],
    },
  ],
};

const mockBatchHistory: BatchData[] = [
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

export default function Dashboard() {
  const [selectedFruit, setSelectedFruit] = useState<string>("Apple");
  const [autoUpdateEnabled, setAutoUpdateEnabled] = useState<boolean>(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>("week");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const currentData = mockData[selectedFruit];

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
  };

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
      <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            className="flex flex-col sm:flex-row justify-between items-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-green-200 mb-4 sm:mb-0">
              Fruit Quality Analysis Dashboard
            </h1>
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="bg-black text-white w-full sm:w-auto"
            >
              {isAnalyzing ? (
                <>
                  Analyzing... <Camera className="ml-2 h-4 w-4 animate-pulse" />
                </>
              ) : (
                <>
                  Start New Analysis <Camera className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
            <Select value={selectedFruit} onValueChange={setSelectedFruit}>
              <SelectTrigger className="w-full sm:w-[180px] bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Select produce" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(mockData).map((fruit) => (
                  <SelectItem key={fruit} value={fruit}>
                    {fruit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Select
                value={selectedTimeRange}
                onValueChange={setSelectedTimeRange}
              >
                <SelectTrigger className="w-full sm:w-[140px] bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Last 24 Hours</SelectItem>
                  <SelectItem value="week">Last 7 Days</SelectItem>
                  <SelectItem value="month">Last 30 Days</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={autoUpdateEnabled}
                  onCheckedChange={setAutoUpdateEnabled}
                  id="auto-update"
                />
                <label htmlFor="auto-update" className="text-sm text-gray-400">
                  Auto Cycle
                </label>
              </div>
            </div>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="bg-gray-800 text-gray-400 mb-6 flex flex-wrap">
              <TabsTrigger
                value="overview"
                className="flex-1 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="analysis"
                className="flex-1 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
              >
                Detailed Analysis
              </TabsTrigger>
              <TabsTrigger
                value="prediction"
                className="flex-1 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
              >
                Predictions
              </TabsTrigger>
              <TabsTrigger
                value="batch"
                className="flex-1 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
              >
                Batch Tracking
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <MetricCard
                  title="Quality Score"
                  value={`${currentData.qualityScore.toFixed(1)}%`}
                  icon={<Apple className="h-4 w-4 text-blue-400" />}
                  showProgress={true}
                  progress={currentData.qualityScore}
                  trend={{
                    direction: "up",
                    value: "5%",
                    label: "from last week",
                  }}
                />
                <MetricCard
                  title="pH Level"
                  value={currentData.pHLevel.toFixed(2)}
                  icon={<Apple className="h-4 w-4 text-blue-400" />}
                  showProgress={true}
                  progress={(currentData.pHLevel / 14) * 100}
                  description="Optimal range: 3.0 - 4.5"
                />
                <MetricCard
                  title="Ripeness"
                  value={`${currentData.ripeness.toFixed(1)}%`}
                  icon={<Apple className="h-4 w-4 text-green-400" />}
                  showProgress={true}
                  progress={currentData.ripeness}
                  trend={{
                    direction: "up",
                    value: "2%",
                    label: "from yesterday",
                  }}
                />
                <MetricCard
                  title="Defects"
                  value={`${currentData.defects.toFixed(1)}%`}
                  icon={<Apple className="h-4 w-4 text-red-400" />}
                  showProgress={true}
                  progress={currentData.defects}
                  trend={{
                    direction: "down",
                    value: "1.5%",
                    label: "from last batch",
                  }}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Nutritional Data
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Breakdown of nutritional components
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <NutritionalChart data={mockNutritionalData} />
                  </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Physical Properties
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Key measurements and characteristics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PhysicalProperties data={currentData} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analysis">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Detailed Metrics
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Comprehensive analysis of fruit quality
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(currentData).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between items-center"
                        >
                          <span className="text-gray-400 capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </span>
                          <span className="font-semibold text-white">
                            {typeof value === "object"
                              ? JSON.stringify(value)
                              : value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Image Analysis</CardTitle>
                    <CardDescription className="text-gray-400">
                      Visual inspection results
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center">
                    <div className="relative w-full h-64 sm:h-80 md:h-96">
                      <img
                        src="/assets/apple.png"
                        alt={`${selectedFruit} image analysis`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                        {selectedFruit}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="prediction">
              <ShelfLifePrediction data={mockShelfLifePrediction} />
            </TabsContent>

            <TabsContent value="batch">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Batch Tracking</CardTitle>
                  <CardDescription className="text-gray-400">
                    Current batch information and history
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <BatchTable data={mockBatchHistory} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
