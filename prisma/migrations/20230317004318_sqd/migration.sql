/*
  Warnings:

  - You are about to drop the `HealthRecord` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "HealthRecord" DROP CONSTRAINT "HealthRecord_patientId_fkey";

-- DropTable
DROP TABLE "HealthRecord";

-- DropEnum
DROP TYPE "HealthRecordCategory";
