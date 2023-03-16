-- CreateEnum
CREATE TYPE "DisussionCategory" AS ENUM ('ANNONCEMENTS', 'GENERAL', 'IDEAS', 'POLLS');

-- CreateEnum
CREATE TYPE "TypeCertificat" AS ENUM ('Work', 'Intern');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'CONFIRMED', 'REJECTED');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "Contract" AS ENUM ('CDI', 'CDD', 'INTERN');

-- CreateEnum
CREATE TYPE "Title" AS ENUM ('BACKEND_DEVELOPER', 'FRONTEND_DEVELOPER', 'FULLSTACK_DEVELOPER', 'CEO', 'CTO', 'DESIGNER');

-- CreateEnum
CREATE TYPE "EmployeeStatu" AS ENUM ('FULLTIME', 'PARTTIME', 'FREELANCE', 'INTERN');

-- CreateEnum
CREATE TYPE "WorkingShift" AS ENUM ('08h -> 17h', '10h -> 19h', '12h -> 21h');

-- CreateTable
CREATE TABLE "User" (
    "matricule" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "adress" TEXT,
    "salary" TEXT,
    "picture" TEXT,
    "intragrationDate" TIMESTAMP(3),
    "password" TEXT,
    "rtH" TEXT,
    "rtP" TEXT,
    "rtS" TEXT,
    "secret" TEXT,
    "role" "Role" NOT NULL DEFAULT E'USER',
    "contract" "Contract",
    "status" "EmployeeStatu",
    "shift" "WorkingShift",
    "title" "Title",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("matricule")
);

-- CreateTable
CREATE TABLE "Bill" (
    "billId" SERIAL NOT NULL,
    "companyName" TEXT,
    "description" TEXT,
    "reference" TEXT,
    "rc" TEXT,
    "ice" TEXT,
    "receipt" TEXT,
    "price" DOUBLE PRECISION,
    "creator" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bill_pkey" PRIMARY KEY ("billId")
);

-- CreateTable
CREATE TABLE "Product" (
    "productId" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "totalPrice" DOUBLE PRECISION,
    "billId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "ProductCategory" (
    "categoryId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("categoryId")
);

-- CreateTable
CREATE TABLE "Departement" (
    "departementId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "managerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Departement_pkey" PRIMARY KEY ("departementId")
);

-- CreateTable
CREATE TABLE "Presence" (
    "presenceId" SERIAL NOT NULL,
    "shiftStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "shiftEnd" TIMESTAMP(3) NOT NULL,
    "motif" TEXT,
    "justified" BOOLEAN NOT NULL DEFAULT false,
    "absenceHours" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Presence_pkey" PRIMARY KEY ("presenceId")
);

-- CreateTable
CREATE TABLE "Application" (
    "applicationId" SERIAL NOT NULL,
    "applicationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "handleDate" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL DEFAULT E'PENDING',
    "userId" TEXT NOT NULL,
    "certificatId" INTEGER,
    "vacationId" INTEGER,
    "handledBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("applicationId")
);

-- CreateTable
CREATE TABLE "Certificat" (
    "certificationId" SERIAL NOT NULL,
    "type" "TypeCertificat" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Certificat_pkey" PRIMARY KEY ("certificationId")
);

-- CreateTable
CREATE TABLE "Vacation" (
    "vacationId" SERIAL NOT NULL,
    "startingDate" TIMESTAMP(3) NOT NULL,
    "endingDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vacation_pkey" PRIMARY KEY ("vacationId")
);

-- CreateTable
CREATE TABLE "Discussion" (
    "dicussionId" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "contenu" TEXT NOT NULL,
    "image" TEXT,
    "category" "DisussionCategory" NOT NULL,
    "tags" TEXT[],
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Discussion_pkey" PRIMARY KEY ("dicussionId")
);

-- CreateTable
CREATE TABLE "_Members" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_discussions" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ProductCategory_label_key" ON "ProductCategory"("label");

-- CreateIndex
CREATE UNIQUE INDEX "Departement_managerId_key" ON "Departement"("managerId");

-- CreateIndex
CREATE UNIQUE INDEX "Application_certificatId_key" ON "Application"("certificatId");

-- CreateIndex
CREATE UNIQUE INDEX "Application_vacationId_key" ON "Application"("vacationId");

-- CreateIndex
CREATE UNIQUE INDEX "_Members_AB_unique" ON "_Members"("A", "B");

-- CreateIndex
CREATE INDEX "_Members_B_index" ON "_Members"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_discussions_AB_unique" ON "_discussions"("A", "B");

-- CreateIndex
CREATE INDEX "_discussions_B_index" ON "_discussions"("B");

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_creator_fkey" FOREIGN KEY ("creator") REFERENCES "User"("matricule") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_billId_fkey" FOREIGN KEY ("billId") REFERENCES "Bill"("billId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ProductCategory"("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Departement" ADD CONSTRAINT "Departement_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "User"("matricule") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Presence" ADD CONSTRAINT "Presence_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("matricule") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("matricule") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_handledBy_fkey" FOREIGN KEY ("handledBy") REFERENCES "User"("matricule") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_certificatId_fkey" FOREIGN KEY ("certificatId") REFERENCES "Certificat"("certificationId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_vacationId_fkey" FOREIGN KEY ("vacationId") REFERENCES "Vacation"("vacationId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discussion" ADD CONSTRAINT "Discussion_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("matricule") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Members" ADD CONSTRAINT "_Members_A_fkey" FOREIGN KEY ("A") REFERENCES "Departement"("departementId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Members" ADD CONSTRAINT "_Members_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("matricule") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_discussions" ADD CONSTRAINT "_discussions_A_fkey" FOREIGN KEY ("A") REFERENCES "Departement"("departementId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_discussions" ADD CONSTRAINT "_discussions_B_fkey" FOREIGN KEY ("B") REFERENCES "Discussion"("dicussionId") ON DELETE CASCADE ON UPDATE CASCADE;
