import { PrismaClient } from '@prisma/client';
import type { FruitData, BatchData, FruitType } from '@/types/dashboard';

const prisma = new PrismaClient();

export class DatabaseService {
  async createBatch(fruitData: FruitData): Promise<BatchData> {
    const prefix = fruitData.fruitType.substring(0, 3).toUpperCase();
    
    // Create timestamp in IST
    const indianTime = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      hour12: false,
    });
    
    // Format: YYYYMMDD-HHMM
    const date = new Date(indianTime);
    const dateStr = date.getFullYear().toString() +
      String(date.getMonth() + 1).padStart(2, '0') +
      String(date.getDate()).padStart(2, '0');
    const timeStr = String(date.getHours()).padStart(2, '0') +
      String(date.getMinutes()).padStart(2, '0');
    
    // Format: APL-20240318-1430
    const customId = `${prefix}-${dateStr}-${timeStr}`;

    const batch = await prisma.batch.create({
      data: {
        id: customId,
        timestamp: date,
        prediction: fruitData.prediction,
        fruitType: fruitData.fruitType,
        freshness: fruitData.freshness,
        ripeness: fruitData.ripeness,
        shelfLifeDays: fruitData.shelfLifeDays,
        confidence: fruitData.confidence,
        qualityScore: fruitData.qualityScore,
        temperature: fruitData.storageMetrics.temperature,
        humidity: fruitData.storageMetrics.humidity,
      },
    });

    return this.mapToBatchData(batch);
  }

  async getBatch(id: string): Promise<BatchData | null> {
    const batch = await prisma.batch.findUnique({
      where: { id },
    });

    return batch ? this.mapToBatchData(batch) : null;
  }

  async getBatchHistory(fruitType?: FruitType): Promise<BatchData[]> {
    const batches = await prisma.batch.findMany({
      where: fruitType ? { fruitType } : undefined,
      // orderBy: { timestamp: 'desc' },
    });

    return batches.map(this.mapToBatchData);
  }

  private mapToBatchData(batch: any): BatchData {
    return {
      id: batch.id,
      timestamp: batch.timestamp,
      status: batch.status,
      notes: batch.notes,
      fruitData: {
        prediction: batch.prediction,
        fruitType: batch.fruitType,
        freshness: batch.freshness,
        ripeness: batch.ripeness,
        shelfLifeDays: batch.shelfLifeDays,
        confidence: batch.confidence,
        qualityScore: batch.qualityScore,
        storageMetrics: {
          temperature: batch.temperature,
          humidity: batch.humidity,
        },
      },
    };
  }
} 