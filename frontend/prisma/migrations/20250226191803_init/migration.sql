-- CreateTable
CREATE TABLE "Batch" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'active',
    "notes" TEXT,
    "prediction" TEXT NOT NULL,
    "fruitType" TEXT NOT NULL,
    "freshness" TEXT NOT NULL,
    "ripeness" TEXT,
    "shelfLifeDays" INTEGER NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,
    "qualityScore" INTEGER NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "humidity" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Batch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Batch_fruitType_idx" ON "Batch"("fruitType");

-- CreateIndex
CREATE INDEX "Batch_freshness_idx" ON "Batch"("freshness");

-- CreateIndex
CREATE INDEX "Batch_timestamp_idx" ON "Batch"("timestamp");
