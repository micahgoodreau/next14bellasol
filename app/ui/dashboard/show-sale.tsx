"use client";
import type { Database } from "@/database.types";

interface Property {
  id: string;
  unit_number: number;
}
export default function ShowSale(properties: Property[]) {
  return (
    <>
      {properties.map((property) => (
        <p>{property.id}</p>
      ))}
      <p>Test</p>
    </>
  );
}
