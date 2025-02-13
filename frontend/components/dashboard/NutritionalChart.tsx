import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { NutritionalData } from "@/frontend/types/dashboard";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface NutritionalChartProps {
  data: NutritionalData;
}

export function NutritionalChart({ data }: NutritionalChartProps) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Nutritional Composition</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            nutrients: {
              label: "Nutrients",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[400px]"
        >
          <Pie
            data={data}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "right" as const,
                  labels: {
                    color: "rgb(229, 231, 235)", // text-gray-200
                  },
                },
                tooltip: {
                  backgroundColor: "rgb(31, 41, 55)", // bg-gray-800
                  titleColor: "rgb(229, 231, 235)", // text-gray-200
                  bodyColor: "rgb(229, 231, 235)", // text-gray-200
                  borderColor: "rgb(75, 85, 99)", // border-gray-600
                  borderWidth: 1,
                },
                datalabels: {
                  color: "white",
                  font: {
                    weight: "bold",
                    size: 14,
                  },
                  formatter: (value: number) => {
                    return `${value}%`;
                  },
                },
              },
            }}
          />
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
