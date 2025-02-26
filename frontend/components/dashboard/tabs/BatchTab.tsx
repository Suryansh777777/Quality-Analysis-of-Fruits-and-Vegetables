import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BatchTable } from "@/components/dashboard/BatchTable";

interface BatchTabProps {
    data: BatchData[];
    onBatchSelect: (batchId: string) => void;
}

export function BatchTab({ data, onBatchSelect }: BatchTabProps) {
    return (
        <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
                <CardTitle className="text-white">Batch Tracking</CardTitle>
                <CardDescription className="text-gray-400">
                    Current batch information and history
                </CardDescription>
            </CardHeader>
            <CardContent>
                <BatchTable data={data} onBatchSelect={onBatchSelect} />
            </CardContent>
        </Card>
    );
} 