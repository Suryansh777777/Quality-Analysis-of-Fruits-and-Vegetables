import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface MetricCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  showProgress?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  showProgress = false,
}) => {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {showProgress && typeof value === "number" && (
          <Progress value={value} className="mt-2" />
        )}
      </CardContent>
    </Card>
  );
};
