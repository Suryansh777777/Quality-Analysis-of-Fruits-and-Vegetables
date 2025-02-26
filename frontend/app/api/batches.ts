import { DatabaseService } from '@/services/database';
import { FruitData } from '@/types/dashboard';
import { FruitType } from '@/types/dashboard';
;

const db = new DatabaseService();

export async function createBatch(fruitData: FruitData) {
  return await db.createBatch(fruitData);
}

export async function getBatchHistory(fruitType?: FruitType) {
  return await db.getBatchHistory(fruitType);
} 