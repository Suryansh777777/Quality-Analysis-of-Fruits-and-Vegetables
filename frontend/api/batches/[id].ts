import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    switch (req.method) {
      case 'GET':
        const batch = await prisma.batch.findUnique({
          where: { id: String(id) },
        });
        if (batch) {
          res.status(200).json(batch);
        } else {
          res.status(404).json({ error: 'Batch not found' });
        }
        break;

      case 'POST':
        const newBatch = await prisma.batch.create({
          data: req.body,
        });
        res.status(201).json(newBatch);
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Request error:', error);
    res.status(500).json({ error: 'Error processing request' });
  }
} 