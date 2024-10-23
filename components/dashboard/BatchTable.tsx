import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BatchData } from "@/types/dashboard";

interface BatchTableProps {
  data: BatchData[];
}

export const BatchTable: React.FC<BatchTableProps> = ({ data }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Batch ID</TableHead>
          <TableHead>Received Date</TableHead>
          <TableHead>Initial Quality</TableHead>
          <TableHead>Current Quality</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Best Before</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((batch) => (
          <TableRow key={batch.id}>
            <TableCell>{batch.id}</TableCell>
            <TableCell>{batch.receivedDate}</TableCell>
            <TableCell>{batch.initialQuality}%</TableCell>
            <TableCell>{batch.currentQuality}%</TableCell>
            <TableCell>
              <Badge
                variant={
                  batch.status === "In Storage" ? "secondary" : "default"
                }
              >
                {batch.status}
              </Badge>
            </TableCell>
            <TableCell>{batch.predictions.bestBefore}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
