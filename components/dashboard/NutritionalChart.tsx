import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register the required chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface NutritionalData {
  labels: string[];
  datasets: Array<{
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }>;
}

interface NutritionalChartProps {
  data: NutritionalData;
}

export const NutritionalChart: React.FC<NutritionalChartProps> = ({ data }) => {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle>Nutritional Analysis</CardTitle>
        <CardDescription>Breakdown of key nutrients</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] relative">
          <Pie
            data={data}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "right",
                  labels: {
                    color: "white",
                  },
                },
              },
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default NutritionalChart;
