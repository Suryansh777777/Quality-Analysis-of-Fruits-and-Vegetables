// app/dashboard/page.tsx
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

import {
  FruitData,
  ShelfLifePrediction,
  BatchData,
  NutritionalData,
} from "@/types/dashboard";

// Mock data

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
};

const mockShelfLifePrediction: ShelfLifePrediction = {
  optimum: 14,
  current: 10,
  factors: [
    { factor: "Temperature", impact: -1 },
    { factor: "Humidity", impact: -2 },
    { factor: "Initial Quality", impact: +1 },
  ],
};

const mockNutritionalData: NutritionalData = {
  labels: ["Sugars", "Fiber", "Vitamins", "Minerals", "Proteins"],
  datasets: [
    {
      data: [30, 20, 15, 25, 10],
      backgroundColor: [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)",
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
    <div className="space-y-8">
      <motion.div
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
          Fruit Quality Analysis Dashboard
        </h1>
        <Button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="bg-green-500 hover:bg-green-600"
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

      <div className="flex flex-wrap gap-4 items-center justify-between">
        <Select value={selectedFruit} onValueChange={setSelectedFruit}>
          <SelectTrigger className="w-[180px]">
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

        <div className="flex items-center gap-4">
          <Select
            value={selectedTimeRange}
            onValueChange={setSelectedTimeRange}
          >
            <SelectTrigger className="w-[140px]">
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
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analysis">Detailed Analysis</TabsTrigger>
          <TabsTrigger value="prediction">Predictions</TabsTrigger>
          <TabsTrigger value="batch">Batch Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Quality Score"
              value={`${currentData.qualityScore.toFixed(1)}%`}
              icon={<Apple className="h-4 w-4 text-green-400" />}
              showProgress={true}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <NutritionalChart data={mockNutritionalData} />
          </div>
        </TabsContent>

        <TabsContent value="analysis">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PhysicalProperties data={currentData} />
          </div>
        </TabsContent>

        <TabsContent value="batch">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Batch Tracking</CardTitle>
              <CardDescription>
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
  );
}
