import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const batch = await prisma.batch.create({
      data: {
        id: data.batchId,
        fruitType: data.fruitType,
        receivedDate: new Date(),
        initialQuality: data.qualityScore,
        currentQuality: data.qualityScore,
        status: "Active",
        bestBefore: new Date(Date.now() + data.shelfLife * 24 * 60 * 60 * 1000),
        expectedQuality: Math.max(0, data.qualityScore - 10),
        
        // Fruit analysis data
        prediction: data.prediction,
        pHLevel: data.pHLevel,
        ripeness: data.ripeness,
        defects: data.defects,
        temperature: data.temperature,
        humidity: data.humidity,
        weight: data.weight,
        size: data.size,
        sugar: data.sugar,
        firmness: data.firmness,
        shelfLife: data.shelfLife,
        origin: data.origin,
        storageTime: data.storageTime
      }
    });

    return NextResponse.json(batch, { status: 201 });
  } catch (error) {
    console.error('Failed to create batch:', error);
    return NextResponse.json(
      { error: 'Failed to create batch' },
      { status: 500 }
    );
  }
} 