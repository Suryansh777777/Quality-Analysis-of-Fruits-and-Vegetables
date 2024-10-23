import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { FruitData } from "@/types/dashboard";

interface PhysicalPropertiesProps {
  data: FruitData;
}

export const PhysicalProperties: React.FC<PhysicalPropertiesProps> = ({
  data,
}) => {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle>Physical Properties</CardTitle>
        <CardDescription>
          Size, weight, and firmness measurements
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Weight</span>
            <span className="font-bold">{data.weight}g</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Size (L × W)</span>
            <span className="font-bold">
              {data.size.length}cm × {data.size.width}cm
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>Firmness</span>
            <span className="font-bold">{data.firmness}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
