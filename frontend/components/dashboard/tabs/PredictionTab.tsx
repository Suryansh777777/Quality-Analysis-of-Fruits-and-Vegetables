import { ShelfLifePrediction } from "@/components/dashboard/ShelfLifePrediction";

interface PredictionTabProps {
    data: any; // Replace 'any' with proper type
}

export function PredictionTab({ data }: PredictionTabProps) {
    return <ShelfLifePrediction data={data} />;
} 