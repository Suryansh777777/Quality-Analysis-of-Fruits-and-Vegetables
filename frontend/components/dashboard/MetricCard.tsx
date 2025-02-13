import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  showProgress?: boolean;
  progress?: number;
  trend?: {
    direction: "up" | "down";
    value: string;
    label: string;
  };
  description?: string;
}

export function MetricCard({
  title,
  value,
  icon,
  showProgress = false,
  progress = 0,
  trend,
  description,
}: MetricCardProps) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-200">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
        {showProgress && <Progress value={progress} className="mt-2" />}
        {trend && (
          <p className="text-xs text-gray-400 mt-2 flex items-center">
            {trend.direction === "up" ? (
              <TrendingUp className="h-4 w-4 mr-1 text-green-400" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-1 text-red-400" />
            )}
            <span
              className={
                trend.direction === "up" ? "text-green-400" : "text-red-400"
              }
            >
              {trend.value}
            </span>
            <span className="ml-1">{trend.label}</span>
          </p>
        )}
        {description && (
          <p className="text-xs text-gray-400 mt-2">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
