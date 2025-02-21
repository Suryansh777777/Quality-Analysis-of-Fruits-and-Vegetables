import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { FruitData } from "@/types/dashboard";

interface AnalysisTabProps {
    currentData: FruitData;
    selectedFruit: string;
    imageUrl: string;
}

export function AnalysisTab({ currentData, selectedFruit, imageUrl }: AnalysisTabProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                    <CardTitle className="text-white">Detailed Metrics</CardTitle>
                    <CardDescription className="text-gray-400">
                        Comprehensive analysis of fruit quality
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {Object.entries(currentData).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center">
                                <span className="text-gray-400 capitalize">
                                    {key.replace(/([A-Z])/g, " $1").trim()}
                                </span>
                                <span className="font-semibold text-white">
                                    {typeof value === "object" ? JSON.stringify(value) : value}
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
                            src={imageUrl || "/assets/apple.png"}
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
    );
} 