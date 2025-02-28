import { Apple, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { NutritionalChart } from "@/components/dashboard/NutritionalChart";
import { IdealConditions } from "@/components/dashboard/IdealConditions";
import type { FruitData } from "@/types/dashboard";
import { FRUIT_PH_LEVELS } from "@/types/dashboard";

interface OverviewTabProps {
    currentData: FruitData;
    selectedFruit: string;
    mockNutritionalData: any; // Replace 'any' with proper type
}

export function OverviewTab({ currentData, selectedFruit, mockNutritionalData }: OverviewTabProps) {
    // Get pH range based on fruit type and ripeness
    const phRange = currentData.ripeness ?
        FRUIT_PH_LEVELS[currentData.fruitType][currentData.ripeness] :
        { min: 0, max: 0 };
    console.log(currentData.ripeness);

    // Calculate average pH for display
    const averagePh = (phRange.min + phRange.max) / 2;

    type RipenessState = 'underripe' | 'ripe' | 'overripe';

    const getRipenessPercentage = (ripeness: string | undefined) => {
        const ranges = {
            'underripe': { min: 15, max: 35 },
            'ripe': { min: 65, max: 85 },
            'overripe': { min: 90, max: 100 }
        } as const;

        const range = ranges[(ripeness) as RipenessState];
        return Math.floor(Math.random() * (range.max - range.min + 1) + range.min);
    };

    const ripenessPercentage = getRipenessPercentage(currentData.ripeness);

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <MetricCard
                    title="Quality Score"
                    value={`${currentData.qualityScore}%`}
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
                    value={averagePh.toFixed(1)}
                    icon={<Apple className="h-4 w-4 text-blue-400" />}
                    showProgress={true}
                    progress={(averagePh / 14) * 100}
                    description={`Optimal range: ${phRange.min} - ${phRange.max}`}
                />
                <MetricCard
                    title="Ripeness"
                    value={`${ripenessPercentage}%`}
                    icon={<Apple className="h-4 w-4 text-green-400" />}
                    showProgress={true}
                    progress={ripenessPercentage}
                    description={`Current state: ${currentData.ripeness || 'Unknown'}`}
                />
                <MetricCard
                    title="Prediction"
                    value={`${currentData.prediction}`}
                    icon={<Target className="h-4 w-4 text-blue-400" />}
                    description="AI-powered quality prediction"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                        <CardTitle className="text-white">Nutritional Data</CardTitle>
                        <CardDescription className="text-gray-400">
                            Breakdown of nutritional components
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <NutritionalChart data={mockNutritionalData[selectedFruit]} />
                    </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                        <CardTitle className="text-white">Ideal Conditions</CardTitle>
                        <CardDescription className="text-gray-400">
                            Optimal storage and handling parameters
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <IdealConditions fruitType={selectedFruit} currentData={currentData} />
                    </CardContent>
                </Card>
            </div>
        </>
    );
} 