import React from "react";
import { FruitData } from "@/frontend/types/dashboard";
import { Badge } from "@/components/ui/badge";

interface PhysicalPropertiesProps {
  data: FruitData;
}

export function PhysicalProperties({ data }: PhysicalPropertiesProps) {
  const properties = [
    { label: "Weight", value: `${data.weight}g` },
    { label: "Size", value: `${data.size.length}cm x ${data.size.width}cm` },
    { label: "Sugar Content", value: `${data.sugar}%` },
    { label: "Firmness", value: `${data.firmness}%` },
  ];

  return (
    <div className="space-y-4">
      {properties.map((prop, index) => (
        <div key={index} className="flex justify-between items-center">
          <span className="text-gray-400">{prop.label}</span>
          <Badge variant="secondary">{prop.value}</Badge>
        </div>
      ))}
      <div className="flex justify-between items-center">
        <span className="text-gray-400">Origin</span>
        <Badge variant="outline" className="text-blue-400 border-blue-400">
          {data.origin}
        </Badge>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-400">Storage Time</span>
        <Badge variant="outline" className="text-green-400 border-green-400">
          {data.storageTime} hours
        </Badge>
      </div>
    </div>
  );
}
