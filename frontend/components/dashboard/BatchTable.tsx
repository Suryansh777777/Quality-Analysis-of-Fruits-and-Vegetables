import React from "react";
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

export function BatchTable({ data }: BatchTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-gray-300">Batch ID</TableHead>
          <TableHead className="text-gray-300">Timestamp</TableHead>
          <TableHead className="text-gray-300">Fruit Type</TableHead>
          <TableHead className="text-gray-300">Quality Score</TableHead>
          <TableHead className="text-gray-300">Status</TableHead>
          <TableHead className="text-gray-300">Shelf Life</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((batch) => (
          <TableRow
            key={batch.id}
            className="cursor-pointer hover:bg-gray-700/50 transition-colors"
          >
            <TableCell className="font-medium text-white">{batch.id}</TableCell>
            <TableCell className="text-gray-300">
              {new Date(batch.timestamp).toLocaleDateString()}
            </TableCell>
            <TableCell className="text-gray-300">
              {batch.fruitData.fruitType}
            </TableCell>
            <TableCell className="text-gray-300">
              {batch.fruitData.qualityScore}%
            </TableCell>
            <TableCell>
              <BatchStatusBadge status={batch.status} />
            </TableCell>
            <TableCell className="text-gray-300">
              {batch.fruitData.shelfLifeDays} days
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function BatchStatusBadge({ status }: { status: string }) {
  let badgeClass = "";
  switch (status.toLowerCase()) {
    case "active":
      badgeClass = "bg-green-500 hover:bg-green-600";
      break;
    case "archived":
      badgeClass = "bg-gray-500 hover:bg-gray-600";
      break;
    default:
      badgeClass = "bg-gray-500 hover:bg-gray-600";
  }

  return <Badge className={`${badgeClass} text-white`}>{status}</Badge>;
}
