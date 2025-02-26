-- CreateTable
CREATE TABLE "Batch" (
    "id" TEXT NOT NULL,
    "fruitType" TEXT NOT NULL,
    "receivedDate" TIMESTAMP(3) NOT NULL,
    "initialQuality" DOUBLE PRECISION NOT NULL,
    "currentQuality" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "bestBefore" TIMESTAMP(3) NOT NULL,
    "expectedQuality" DOUBLE PRECISION NOT NULL,
    "prediction" TEXT NOT NULL,
    "pHLevel" DOUBLE PRECISION NOT NULL,
    "ripeness" DOUBLE PRECISION NOT NULL,
    "defects" DOUBLE PRECISION NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "humidity" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "size" JSONB NOT NULL,
    "sugar" DOUBLE PRECISION NOT NULL,
    "firmness" DOUBLE PRECISION NOT NULL,
    "shelfLife" INTEGER NOT NULL,
    "origin" TEXT NOT NULL,
    "storageTime" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Batch_pkey" PRIMARY KEY ("id")
);
