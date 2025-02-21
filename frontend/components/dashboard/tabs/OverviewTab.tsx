import { Apple, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { NutritionalChart } from "@/components/dashboard/NutritionalChart";
import { PhysicalProperties } from "@/components/dashboard/PhysicalProperties";
import type { FruitData } from "@/types/dashboard";

interface OverviewTabProps {
    currentData: FruitData;
    selectedFruit: string;
    mockNutritionalData: any; // Replace 'any' with proper type
}

export function OverviewTab({ currentData, selectedFruit, mockNutritionalData }: OverviewTabProps) {
    return (
        <>
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
                        <CardTitle className="text-white">Physical Properties</CardTitle>
                        <CardDescription className="text-gray-400">
                            Key measurements and characteristics
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <PhysicalProperties data={currentData} />
                    </CardContent>
                </Card>
            </div>
        </>
    );
} 