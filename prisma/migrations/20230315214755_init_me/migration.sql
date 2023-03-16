/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `contract` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `intragrationDate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `matricule` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `salary` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `shift` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Application` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Bill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Certificat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Departement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Discussion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Presence` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vacation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Members` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_discussions` table. If the table is not empty, all the data it contains will be lost.
  - The required column `id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_certificatId_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_handledBy_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_userId_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_vacationId_fkey";

-- DropForeignKey
ALTER TABLE "Bill" DROP CONSTRAINT "Bill_creator_fkey";

-- DropForeignKey
ALTER TABLE "Departement" DROP CONSTRAINT "Departement_managerId_fkey";

-- DropForeignKey
ALTER TABLE "Discussion" DROP CONSTRAINT "Discussion_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "Presence" DROP CONSTRAINT "Presence_userId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_billId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "_Members" DROP CONSTRAINT "_Members_A_fkey";

-- DropForeignKey
ALTER TABLE "_Members" DROP CONSTRAINT "_Members_B_fkey";

-- DropForeignKey
ALTER TABLE "_discussions" DROP CONSTRAINT "_discussions_A_fkey";

-- DropForeignKey
ALTER TABLE "_discussions" DROP CONSTRAINT "_discussions_B_fkey";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "contract",
DROP COLUMN "intragrationDate",
DROP COLUMN "matricule",
DROP COLUMN "salary",
DROP COLUMN "shift",
DROP COLUMN "status",
DROP COLUMN "title",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Application";

-- DropTable
DROP TABLE "Bill";

-- DropTable
DROP TABLE "Certificat";

-- DropTable
DROP TABLE "Departement";

-- DropTable
DROP TABLE "Discussion";

-- DropTable
DROP TABLE "Presence";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "ProductCategory";

-- DropTable
DROP TABLE "Vacation";

-- DropTable
DROP TABLE "_Members";

-- DropTable
DROP TABLE "_discussions";

-- DropEnum
DROP TYPE "Contract";

-- DropEnum
DROP TYPE "DisussionCategory";

-- DropEnum
DROP TYPE "EmployeeStatu";

-- DropEnum
DROP TYPE "Status";

-- DropEnum
DROP TYPE "Title";

-- DropEnum
DROP TYPE "TypeCertificat";

-- DropEnum
DROP TYPE "WorkingShift";
