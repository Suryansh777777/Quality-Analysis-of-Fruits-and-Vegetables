import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BatchTable } from "@/components/dashboard/BatchTable";

interface BatchTabProps {
    data: any; // Replace 'any' with proper type
}

export function BatchTab({ data }: BatchTabProps) {
    return (
        <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
                <CardTitle className="text-white">Batch Tracking</CardTitle>
                <CardDescription className="text-gray-400">
                    Current batch information and history
                </CardDescription>
            </CardHeader>
            <CardContent>
                <BatchTable data={data} />
            </CardContent>
        </Card>
    );
} 