import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { NutritionalData } from "@/types/dashboard";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface NutritionalChartProps {
  data: NutritionalData;
}

export function NutritionalChart({ data }: NutritionalChartProps) {
  const [windowWidth, setWindowWidth] = React.useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Nutritional Composition</CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-6">
        <ChartContainer
          config={{
            nutrients: {
              label: "Nutrients",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[250px] w-full max-w-[300px] mx-auto sm:max-w-none sm:h-[400px]"
        >
          <Pie
            data={data}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              layout: {
                padding: {
                  left: windowWidth < 640 ? 2 : 10,
                  right: windowWidth < 640 ? 2 : 10,
                  top: windowWidth < 640 ? 2 : 10,
                  bottom: windowWidth < 640 ? 2 : 10,
                }
              },
              plugins: {
                legend: {
                  position: windowWidth < 640 ? 'bottom' as const : 'right' as const,
                  align: 'center',
                  labels: {
                    color: "rgb(229, 231, 235)",
                    padding: windowWidth < 640 ? 6 : 20,
                    boxWidth: windowWidth < 640 ? 10 : 20,
                    font: {
                      size: windowWidth < 640 ? 10 : 14
                    }
                  },
                },
                tooltip: {
                  backgroundColor: "rgb(31, 41, 55)",
                  titleColor: "rgb(229, 231, 235)",
                  bodyColor: "rgb(229, 231, 235)",
                  borderColor: "rgb(75, 85, 99)",
                  borderWidth: 1,
                },
                datalabels: {
                  color: "white",
                  font: {
                    weight: "bold",
                    size: windowWidth < 640 ? 9 : 14,
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
