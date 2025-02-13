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
import { BatchData } from "@/frontend/types/dashboard";

interface BatchTableProps {
  data: BatchData[];
}

export function BatchTable({ data }: BatchTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-gray-300">Batch ID</TableHead>
          <TableHead className="text-gray-300">Received Date</TableHead>
          <TableHead className="text-gray-300">Initial Quality</TableHead>
          <TableHead className="text-gray-300">Current Quality</TableHead>
          <TableHead className="text-gray-300">Status</TableHead>
          <TableHead className="text-gray-300">Best Before</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((batch) => (
          <TableRow key={batch.id}>
            <TableCell className="font-medium text-white">{batch.id}</TableCell>
            <TableCell className="text-gray-300">
              {batch.receivedDate}
            </TableCell>
            <TableCell className="text-gray-300">
              {batch.initialQuality}%
            </TableCell>
            <TableCell className="text-gray-300">
              {batch.currentQuality}%
            </TableCell>
            <TableCell>
              <BatchStatusBadge status={batch.status} />
            </TableCell>
            <TableCell className="text-gray-300">
              {batch.predictions.bestBefore}
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
    case "in storage":
      badgeClass = "bg-blue-500 hover:bg-blue-600";
      break;
    case "in transit":
      badgeClass = "bg-yellow-500 hover:bg-yellow-600";
      break;
    case "delivered":
      badgeClass = "bg-green-500 hover:bg-green-600";
      break;
    default:
      badgeClass = "bg-gray-500 hover:bg-gray-600";
  }

  return <Badge className={`${badgeClass} text-white`}>{status}</Badge>;
}
