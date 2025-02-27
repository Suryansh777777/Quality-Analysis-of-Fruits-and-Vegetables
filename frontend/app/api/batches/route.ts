import { DatabaseService } from '@/services/database';
import { FruitData, FruitType } from '@/types/dashboard';

const db = new DatabaseService();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fruitType = searchParams.get('fruitType') as FruitType | undefined;
  const data = await db.getBatchHistory(fruitType);
  return Response.json(data);
}

export async function POST(request: Request) {
  const fruitData: FruitData = await request.json();
  const data = await db.createBatch(fruitData);
  return Response.json(data);
} 