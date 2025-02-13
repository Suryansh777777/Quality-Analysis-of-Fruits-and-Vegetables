import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ShelfLifePredictionData } from "@/frontend/types/dashboard";

interface ShelfLifePredictionProps {
  data: ShelfLifePredictionData;
}

export function ShelfLifePrediction({ data }: ShelfLifePredictionProps) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Shelf Life Prediction</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Optimum Shelf Life</span>
            <span className="font-semibold text-white">
              {data.optimum} days
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Current Prediction</span>
            <span className="font-semibold text-white">
              {data.current} days
            </span>
          </div>
          <Progress
            value={(data.current / data.optimum) * 100}
            className="w-full"
          />
          <h4 className="font-semibold text-white mt-4">Influencing Factors</h4>
          {data.factors.map((factor, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-gray-400">{factor.factor}</span>
              <span
                className={`font-semibold ${
                  factor.impact > 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {factor.impact > 0 ? "+" : ""}
                {factor.impact} days
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
