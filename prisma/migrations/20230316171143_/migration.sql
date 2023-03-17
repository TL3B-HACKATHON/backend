-- CreateEnum
CREATE TYPE "Role" AS ENUM ('HEALTH_PROFESSIONAL', 'PATIENT');

-- CreateEnum
CREATE TYPE "HealthRecordCategory" AS ENUM ('DIAGNOSIS', 'PRESCRIPTION', 'TEST_RESULTS');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'ACCEPTED', 'REVOQUED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "address" TEXT,
    "picture" TEXT,
    "password" TEXT,
    "rtH" TEXT,
    "rtP" TEXT,
    "rtS" TEXT,
    "secret" TEXT,
    "role" "Role" NOT NULL DEFAULT E'PATIENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Autorization" (
    "patientId" TEXT NOT NULL,
    "professionalID" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT E'PENDING',
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Autorization_pkey" PRIMARY KEY ("patientId","professionalID")
);

-- CreateTable
CREATE TABLE "HealthRecord" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "category" "HealthRecordCategory" NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "HealthRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Autorization" ADD CONSTRAINT "Autorization_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Autorization" ADD CONSTRAINT "Autorization_professionalID_fkey" FOREIGN KEY ("professionalID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthRecord" ADD CONSTRAINT "HealthRecord_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
