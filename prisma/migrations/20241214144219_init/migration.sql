/*
  Warnings:

  - The primary key for the `Borrow` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Borrow` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Borrow" DROP CONSTRAINT "Borrow_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Borrow_pkey" PRIMARY KEY ("userId", "bookId");
