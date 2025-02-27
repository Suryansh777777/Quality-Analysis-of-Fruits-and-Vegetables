import { IDEAL_CONDITIONS } from "@/app/data/idealData";
import { FruitType } from "@/types/dashboard";
import { Thermometer, Droplets, Clock, Scale, AlertCircle } from "lucide-react";

interface IdealConditionsProps {
    fruitType: string;
    currentData: any;
}


export function IdealConditions({ fruitType, currentData }: IdealConditionsProps) {
    const idealValues = IDEAL_CONDITIONS[fruitType];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-700/30 p-4 rounded-lg">
                    <div className="flex items-center space-x-4 mb-3">
                        <Thermometer className="h-8 w-8 text-blue-400" />
                        <div>
                            <p className="text-sm font-medium text-gray-400">Temperature</p>
                            <p className="text-lg font-semibold text-white">
                                {idealValues.temperature.min}-{idealValues.temperature.max}{idealValues.temperature.unit}
                            </p>
                            {currentData.storageMetrics?.temperature && (
                                <p className="text-sm text-gray-500">
                                    Current: {currentData.storageMetrics.temperature}{idealValues.temperature.unit}
                                </p>
                            )}
                        </div>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">{idealValues.temperature.description}</p>
                </div>

                <div className="bg-gray-700/30 p-4 rounded-lg">
                    <div className="flex items-center space-x-4 mb-3">
                        <Droplets className="h-8 w-8 text-blue-400" />
                        <div>
                            <p className="text-sm font-medium text-gray-400">Humidity</p>
                            <p className="text-lg font-semibold text-white">
                                {idealValues.humidity.min}-{idealValues.humidity.max}{idealValues.humidity.unit}
                            </p>
                            {currentData.storageMetrics?.humidity && (
                                <p className="text-sm text-gray-500">
                                    Current: {currentData.storageMetrics.humidity}{idealValues.humidity.unit}
                                </p>
                            )}
                        </div>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">{idealValues.humidity.description}</p>
                </div>

                <div className="bg-gray-700/30 p-4 rounded-lg">
                    <div className="flex items-center space-x-4 mb-3">
                        <Clock className="h-8 w-8 text-blue-400" />
                        <div>
                            <p className="text-sm font-medium text-gray-400">Optimal Shelf Life</p>
                            <p className="text-lg font-semibold text-white">
                                {idealValues.shelfLife.value} {idealValues.shelfLife.unit}
                            </p>
                            {currentData.shelfLifeDays && (
                                <p className="text-sm text-gray-500">
                                    Estimated: {currentData.shelfLifeDays} days
                                </p>
                            )}
                        </div>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">{idealValues.shelfLife.description}</p>
                </div>

                <div className="bg-gray-700/30 p-4 rounded-lg">
                    <div className="flex items-center space-x-4 mb-3">
                        <Scale className="h-8 w-8 text-blue-400" />
                        <div>
                            <p className="text-sm font-medium text-gray-400">Typical Weight</p>
                            <p className="text-lg font-semibold text-white">
                                {idealValues.weight.min}-{idealValues.weight.max}{idealValues.weight.unit}
                            </p>
                        </div>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">{idealValues.weight.description}</p>
                </div>
            </div>

            <div className="bg-gray-700/30 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                    <AlertCircle className="h-5 w-5 text-blue-400" />
                    <h3 className="text-white font-medium">Storage Tips</h3>
                </div>
                <ul className="list-disc list-inside space-y-2">
                    {idealValues.tips.map((tip, index) => (
                        <li key={index} className="text-sm text-gray-300">{tip}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
} 