import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewTab } from "./tabs/OverviewTab";
import { AnalysisTab } from "./tabs/AnalysisTab";
import { PredictionTab } from "./tabs/PredictionTab";
import { BatchTab } from "./tabs/BatchTab";
import type { FruitData } from "@/types/dashboard";

interface TabsContainerProps {
    currentData: FruitData;
    selectedFruit: string;
    mockNutritionalData: any;
    imageUrl: string;
    mockShelfLifePrediction: any;
    mockBatchHistory: any;
}

export function TabsContainer({
    currentData,
    selectedFruit,
    mockNutritionalData,
    imageUrl,
    mockShelfLifePrediction,
    mockBatchHistory,
}: TabsContainerProps) {
    return (
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
                <OverviewTab
                    currentData={currentData}
                    selectedFruit={selectedFruit}
                    mockNutritionalData={mockNutritionalData}
                />
            </TabsContent>

            <TabsContent value="analysis">
                <AnalysisTab
                    currentData={currentData}
                    selectedFruit={selectedFruit}
                    imageUrl={imageUrl}
                />
            </TabsContent>

            <TabsContent value="prediction">
                <PredictionTab data={mockShelfLifePrediction} />
            </TabsContent>

            <TabsContent value="batch">
                <BatchTab data={mockBatchHistory} />
            </TabsContent>
        </Tabs>
    );
} 